import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { appendFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

const app = "nimamoradirad";
const {
  LIARA_API_TOKEN: token,
  GITHUB_SHA: sha,
  GITHUB_TOKEN: githubToken,
} = process.env;
assert(
  token && githubToken && /^[a-f0-9]{40}$/.test(sha),
  "Missing deployment credentials or commit SHA",
);
const terminalStates = new Set([
  "READY",
  "FAILED",
  "TIMEDOUT",
  "CANCELED",
  "UNHEALTHY",
]);

async function api(path, method = "GET") {
  // Only retry reads: repeating a release-creation request can start two releases.
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(`https://api.liara.ir/${path}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok)
        throw new Error(`Liara ${method} ${path}: HTTP ${response.status}`);
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      if (method !== "GET" || attempt === 3) throw error;
      await delay(5000);
    }
  }
}

async function isLatestCommit() {
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/git/ref/heads/main`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
      signal: AbortSignal.timeout(20000),
    },
  );
  assert(response.ok, `Cannot verify main: HTTP ${response.status}`);
  return (await response.json()).object.sha === sha;
}

async function waitForIdle() {
  for (let attempt = 0; attempt < 60; attempt++) {
    const data = await api(`v1/projects/${app}/releases?count=20&page=1`);
    const active = data.releases.filter(
      (release) => !terminalStates.has(release.state),
    );
    if (!active.length) return data;
    console.log(
      `Waiting for Liara: ${active.map((release) => `${release.tag} ${release.state}`).join(", ")}`,
    );
    await delay(10000);
  }
  throw new Error(
    "Liara still has an active release; refusing to start an overlapping deployment",
  );
}

async function main() {
  const { project } = await api(`v1/projects/${app}`);
  if (!project.zeroDowntime) {
    const { plans } = await api("v1/me");
    const supportsZeroDowntime =
      plans.projectBundlePlans[project.planID]?.[project.bundlePlanID]
        ?.zeroDowntime;
    if (supportsZeroDowntime === false) {
      console.warn(
        "::warning::This Liara plan does not support zero downtime. Deployment may briefly restart the app. No billing changes were made.",
      );
    } else {
      await api(`v1/projects/${project._id}/zero-downtime/enable`, "POST");
      assert(
        (await api(`v1/projects/${app}`)).project.zeroDowntime,
        "Could not enable zero-downtime deployment",
      );
      console.log("Enabled Liara zero-downtime deployment");
    }
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    await waitForIdle();
    if (!(await isLatestCommit())) {
      console.log(
        "A newer main commit is queued; skipping this obsolete deployment",
      );
      await appendFile(process.env.GITHUB_OUTPUT, "deployed=false\n");
      return;
    }
    const message = `GitHub ${sha} run ${process.env.GITHUB_RUN_ID} attempt ${attempt}`;
    let cliOutput = "";
    const exitCode = await new Promise((resolve, reject) => {
      const child = spawn(
        "liara",
        [
          "deploy",
          "--path=build/liara",
          "--app=nimamoradirad",
          "--platform=docker",
          "--port=3000",
          "--build-location=iran",
          `--api-token=${token}`,
          `--message=${message}`,
          "--no-app-logs",
        ],
        { stdio: ["ignore", "pipe", "pipe"] },
      );
      for (const stream of [child.stdout, child.stderr]) {
        stream.on("data", (chunk) => {
          process.stdout.write(chunk);
          cliOutput = (cliOutput + chunk.toString()).slice(-64000);
        });
      }
      child.once("error", reject);
      child.once("exit", resolve);
    });
    // The CLI may lose its connection after Liara accepted the upload. Settle
    // that release before retrying, so an older attempt cannot deploy later.
    const data = await waitForIdle();
    const release = data.releases.find(
      (release) => release.message === message,
    );
    if (release?.state === "READY" && release._id === data.currentRelease) {
      console.log(
        `Liara ${release.tag} is current and READY (CLI exit ${exitCode})`,
      );
      await appendFile(
        process.env.GITHUB_OUTPUT,
        `deployed=true\nrelease=${release.tag}\n`,
      );
      return;
    }
    console.error(
      `Attempt ${attempt}: CLI exit ${exitCode}, release ${release?.state || "not created"}`,
    );
    if (!release && /CODE\s+(?:400|401|403|404|428)\b/.test(cliOutput)) {
      throw new Error(
        "Liara rejected the deployment configuration or credentials; retrying the same upload would not fix it",
      );
    }
    if (attempt < 3) await delay(attempt * 20000);
  }
  throw new Error(
    "Liara did not activate the expected release after three attempts",
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
