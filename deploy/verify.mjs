import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

const [origin, sha, attempts = "1"] = process.argv.slice(2);
assert(
  origin && /^[a-f0-9]{40}$/.test(sha),
  "Usage: verify.mjs <origin> <commit SHA> [attempts]",
);
const assets = new Set();

async function request(path) {
  const response = await fetch(new URL(path, origin), {
    redirect: "error",
    signal: AbortSignal.timeout(15000),
    headers: { "Cache-Control": "no-cache" },
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response;
}

async function verify() {
  assets.clear();
  const health = await request(`/api/health?verify=${sha}-${Date.now()}`);
  assert.match(health.headers.get("cache-control") || "", /no-store/);
  assert.equal(
    (await health.json()).sha,
    sha,
    "Live release is a different commit",
  );

  for (const locale of ["en", "fa", "de"]) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    const copy = JSON.parse(
      await readFile(`src/messages/${locale}/azita-mohajer.json`, "utf8"),
    );
    for (const route of [prefix || "/", `${prefix}/projects/azita-mohajer`]) {
      const response = await request(route);
      assert.equal(
        response.headers.get("x-deployment-sha"),
        sha,
        `${route}: stale release`,
      );
      const html = await response.text();
      assert.match(
        html,
        new RegExp(`<html\\b[^>]*\\blang="${locale}"`),
        `${route}: wrong locale`,
      );
      if (route.includes("azita-mohajer")) {
        // Compare actual rendered text with the checked-out translations.
        const escape = (text) =>
          text
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#x27;");
        assert(
          html.includes(escape(copy.hero.title)),
          `${route}: current hero text missing`,
        );
      }
      const references = [...html.matchAll(/(?:src|href)="([^"<>]+)"/g)].map(
        (match) => match[1].replaceAll("&amp;", "&"),
      );
      const chunks = references.filter(
        (url) =>
          url.startsWith("/_next/static/") && /\.(?:js|css)(?:\?|$)/.test(url),
      );
      assert(
        chunks.some((url) => /\.js(?:\?|$)/.test(url)),
        `${route}: JavaScript missing`,
      );
      assert(
        chunks.some((url) => /\.css(?:\?|$)/.test(url)),
        `${route}: stylesheet missing`,
      );
      chunks.forEach((url) => assets.add(url));
      console.log(`Verified ${route}: ${locale}, ${sha.slice(0, 7)}`);
    }
  }

  assets.add("/assets/projects/azita-mohajer/desktop-site.png");
  assets.add("/nima-moradirad-resume.pdf");
  // Compare bytes, so a 200 response containing an error page or old asset fails.
  for (const asset of assets) {
    const path = decodeURIComponent(new URL(asset, origin).pathname);
    const local = path.startsWith("/_next/")
      ? path.replace("/_next/", ".next/")
      : `public${path}`;
    const expected = await readFile(local);
    const actual = Buffer.from(await (await request(asset)).arrayBuffer());
    const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
    assert.equal(
      hash(actual),
      hash(expected),
      `${path}: deployed asset differs from tested build`,
    );
  }
  console.log(
    `Verified ${assets.size} assets against the build on disk at ${origin}`,
  );
}

for (let attempt = 1; ; attempt++) {
  try {
    await verify();
    break;
  } catch (error) {
    console.error(`Verification ${attempt}/${attempts}: ${error.message}`);
    if (attempt >= Number(attempts)) {
      process.exitCode = 1;
      break;
    }
    await delay(10000);
  }
}
