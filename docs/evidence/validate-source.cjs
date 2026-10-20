#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS evidence utility. */
// Read-only source audit. Uses Node built-ins; does not import app code or run tests.
// Keep this snapshot schema aligned with src/types/portfolio.ts when content evolves.
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "../..");
const locales = ["en", "fa", "de"];
const output = path.join(__dirname, "T02-source-validation.json");
const failures = [];
const checks = [];
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const exists = (relative) => fs.existsSync(path.join(root, relative));
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const check = (name, pass, detail) => {
  checks.push({ name, pass, detail });
  if (!pass) failures.push(name);
};
const array = (items) => ({ array: items });
const optional = (type) => ({ optional: type });
const strings = array("string");
const link = { id: "string", label: "string", href: "string" };
const contentCard = { id: "string", index: "string", title: "string", text: "string" };
const portfolioSchema = {
  identity: {
    name: "string", initials: "string", role: "string", shortRole: "string",
    location: "string", availability: "string", email: "string",
    resumeUrl: "string", resumePreview: "string", intro: "string", statement: "string",
  },
  navigation: array(link), signals: strings,
  about: { eyebrow: "string", paragraphs: strings, principles: array(contentCard) },
  experience: array({
    id: "string", period: "string", role: "string", company: "string",
    summary: "string", highlights: strings, technologies: strings,
  }),
  projects: array({
    id: "string", number: "string", title: "string", category: "string",
    summary: "string", contribution: "string", image: "string", imageAlt: "string",
    logo: optional("string"), logoAlt: optional("string"), technologies: strings,
    href: optional("string"), featured: "boolean", accent: { enum: ["lime", "violet", "coral"] },
  }),
  capabilities: array({
    id: "string", index: "string", title: "string", label: "string",
    description: "string", skills: strings,
  }),
  education: { title: "string", institution: "string", note: "string", languages: strings },
  socialLinks: array(link),
};

function schemaErrors(value, schema, at = "$") {
  if (schema && Object.hasOwn(schema, "optional")) {
    return value === undefined ? [] : schemaErrors(value, schema.optional, at);
  }
  if (typeof schema === "string") return typeof value === schema ? [] : [`${at}: expected ${schema}`];
  if (schema.enum) return schema.enum.includes(value) ? [] : [`${at}: invalid enum value`];
  if (schema.array) {
    return Array.isArray(value)
      ? value.flatMap((item, i) => schemaErrors(item, schema.array, `${at}[${i}]`))
      : [`${at}: expected array`];
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return [`${at}: expected object`];
  return Object.entries(schema).flatMap(([key, type]) => schemaErrors(value[key], type, `${at}.${key}`));
}

function shape(value, at = "$") {
  if (Array.isArray(value)) return [`${at}:array(${value.length})`, ...value.flatMap((item, i) => shape(item, `${at}[${i}]`))];
  if (value !== null && typeof value === "object") return Object.keys(value).sort().flatMap((key) => shape(value[key], `${at}.${key}`));
  return [`${at}:${typeof value}`];
}

function jsonFiles(locale) {
  return fs.readdirSync(path.join(root, "src/messages", locale)).filter((file) => file.endsWith(".json")).sort();
}

function git(...args) {
  try { return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim(); }
  catch { return null; }
}

const catalogs = {};
for (const locale of locales) {
  catalogs[locale] = {};
  for (const file of jsonFiles(locale)) {
    try {
      catalogs[locale][file] = JSON.parse(read(`src/messages/${locale}/${file}`));
      check(`json:${locale}/${file}`, true, "Parsed without importing application code");
    } catch (error) {
      check(`json:${locale}/${file}`, false, error.message);
    }
  }
}

const portfolio = catalogs.en["portfolio.json"];
const localeSummary = [];
const assetReferences = [];
const idGroups = ["navigation", "experience", "projects", "capabilities", "socialLinks", "about.principles"];
const groupAt = (value, dotted) => dotted.split(".").reduce((item, key) => item?.[key], value);

for (const locale of locales) {
  check(`catalog-files:${locale}`, equal(jsonFiles("en"), jsonFiles(locale)), jsonFiles(locale));
  for (const file of Object.keys(catalogs.en)) {
    const same = equal(shape(catalogs.en[file]), shape(catalogs[locale][file]));
    check(`catalog-shape:${locale}/${file}`, same, "Recursive key/type/array-length parity against EN");
  }
  const localized = catalogs[locale]["portfolio.json"];
  const errors = schemaErrors(localized, portfolioSchema);
  check(`portfolio-schema:${locale}`, errors.length === 0, errors);
  if (errors.length) continue;
  const ids = {};
  for (const group of idGroups) {
    ids[group] = groupAt(localized, group).map((item) => item.id);
    const reference = groupAt(portfolio, group)?.map((item) => item.id);
    check(`ordered-ids:${locale}/${group}`, equal(ids[group], reference), ids[group]);
    check(`unique-ids:${locale}/${group}`, new Set(ids[group]).size === ids[group].length, ids[group].length);
  }
  localeSummary.push({ locale, catalogs: Object.keys(catalogs[locale]).length, projects: localized.projects.length, experiences: localized.experience.length, ids });
  for (const asset of [localized.identity.resumeUrl, localized.identity.resumePreview, ...localized.projects.flatMap((item) => [item.image, item.logo].filter(Boolean))]) {
    const target = path.resolve(root, "public", asset.replace(/^\/+/, ""));
    const insidePublic = target.startsWith(path.join(root, "public") + path.sep);
    const present = insidePublic && fs.existsSync(target) && fs.statSync(target).isFile();
    check(`asset:${locale}/${asset}`, present, present ? fs.statSync(target).size : "Missing or outside public");
    assetReferences.push({ locale, path: asset, bytes: present ? fs.statSync(target).size : null });
  }
}

const projectDirectory = path.join(root, "src/app/[locale]/projects");
const sourceProjectRoutes = fs.readdirSync(projectDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(projectDirectory, entry.name, "page.tsx")))
  .map((entry) => `/projects/${entry.name}`).sort();
const linkedProjectRoutes = (portfolio?.projects ?? []).map((item) => item.href).filter((href) => href?.startsWith("/projects/")).sort();
check("routes:internal-project-links", equal(sourceProjectRoutes, linkedProjectRoutes), { sourceProjectRoutes, linkedProjectRoutes });
const sitemapRoutes = [...read("src/app/sitemap.ts").matchAll(/pathname:\s*"([^"]+)"/g)].map((match) => match[1]).sort();
check("routes:sitemap-source", equal(sitemapRoutes, ["/", ...sourceProjectRoutes].sort()), sitemapRoutes);
for (const relative of [
  "src/app/[locale]/page.tsx", "src/app/[locale]/layout.tsx", "src/app/[locale]/[...rest]/page.tsx",
  "src/app/[locale]/manifest.webmanifest/route.ts", "src/app/manifest.webmanifest/route.ts",
  "src/app/api/contact/route.ts", "src/app/api/health/route.ts", "src/app/robots.ts",
]) check(`route-file:${relative}`, exists(relative), "Source file presence only");
for (const route of sourceProjectRoutes) {
  const source = read(`src/app/[locale]${route}/page.tsx`);
  check(`route-metadata:${route}`, /generateMetadata/.test(source) && /canonical/.test(source) && /languages/.test(source), "Metadata declaration tokens; no server rendering assertion");
}
const modeledLocalizedRoutes = locales.flatMap((locale) => ["/", ...sourceProjectRoutes].map((route) => locale === "en" ? route : `/${locale}${route === "/" ? "" : route}`));

function inventory(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? inventory(absolute) : [{ path: path.relative(root, absolute).replaceAll(path.sep, "/"), bytes: fs.statSync(absolute).size }];
  });
}
const publicFiles = inventory(path.join(root, "public"));
const report = {
  generatedAtUtc: new Date().toISOString(),
  command: "node docs/evidence/validate-source.cjs",
  node: process.version,
  source: { branch: git("branch", "--show-current"), head: git("rev-parse", "HEAD"), trackedChanges: git("diff", "--name-only", "HEAD", "--", "src", "package.json", "package-lock.json", "next.config.js", "public", "deploy", ".github") },
  status: failures.length ? "FAIL" : "PASS",
  summary: { checks: checks.length, failed: failures.length, localeSummary, modeledLocalizedRoutes, publicFiles: publicFiles.length, publicBytes: publicFiles.reduce((total, item) => total + item.bytes, 0) },
  scope: "Local JSON/schema/ordered IDs/asset/source-route validation only. This is not a test-suite, live-route, browser, contact, PDF, Lighthouse or Sarochi runtime result.",
  t02CombinedStatus: "PARTIAL: Sarochi Git access is resolved in T04_CLAIMS_AND_SAROCHI.md; live rendered Sarochi remains unverified.",
  failures, checks, assetReferences, publicInventory: publicFiles,
};
fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n", "utf8");
console.log(`${report.status}: ${checks.length} source checks, ${failures.length} failed; ${localeSummary.length} locales; ${publicFiles.length} public files / ${report.summary.publicBytes} bytes.`);
console.log(`Saved ${path.relative(root, output).replaceAll(path.sep, "/")}`);
process.exitCode = failures.length ? 1 : 0;
