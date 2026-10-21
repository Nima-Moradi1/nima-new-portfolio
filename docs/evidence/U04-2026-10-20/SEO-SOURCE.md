# U04 SEO and cache source audit — 2026-10-20

This record covers source inspection and bounded configuration checks. It does not establish browser performance, Core Web Vitals or final deployed response headers. Those require the integrated production build and deployment evidence.

## Implemented

- `next.config.js`: public `/assets/`, `/fonts/` and `/brand/` responses now request `Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=3600`. Browser TTL is one hour; shared-cache TTL is one day. These URLs are unversioned, so they deliberately retain a bounded freshness window rather than `immutable`. Hashed `/_next/static` assets keep Next's built-in immutable policy. HTML, contact API, health API, credentials and deployment workflow are unchanged by this patch.
- `next.config.js`: deployment identity also accepts Vercel's `VERCEL_GIT_COMMIT_SHA`, after existing `GITHUB_SHA` and `DEPLOYMENT_SHA`. The existing deployment header and health response can therefore identify a Vercel Git release without changing the other deployment paths.
- `src/app/sitemap.ts`: removed `new Date()` as every route's `lastModified`. A build/generation date does not establish when each project's content changed. Omitted optional timestamps are more accurate than invented freshness. All 18 existing locale URLs remain.
- `public/assets/kinetic/*.webp` and `src/content/project-textures.ts`: seven geometry-specific derivatives retain the actual owner-project captures, proportionally resized to at most 720px and encoded as WebP quality 82. No source screenshot, content record, case-study image or historic claim was changed. SHA-256 content digests in filenames allow a dedicated one-year immutable cache rule, after the general bounded public-media rule. Seven texture bytes fall from **470,684 to 132,410** (338,274 bytes / 71.9% saved); see `texture-budget.json` for per-file paths, dimensions, provenance and bytes. This is an actual byte reduction, not a measured LCP/CPU improvement.

## Source findings

| Area | Finding |
| --- | --- |
| Locale metadata | Localized titles/descriptions and canonical EN `/`, FA `/fa`, DE `/de` exist, with EN/FA/DE and `x-default` alternates. The five retained case-study metadata functions also supply canonical URLs and locale alternates. |
| Robots | Allows public routes, disallows `/api/`, and references the sitemap. |
| Structured data | Locale layout emits escaped, parseable Person JSON-LD from real identity/social records. Historic job titles are not rewritten. No reviews or invented metrics are emitted. |
| Social images | Original generated NM image route uses explicit 1200×630 dimensions and localized text. Its default function uses Next 16 asynchronous `params`; metadata generation retains synchronous `params` as documented. |
| Server content | Home returns a server-rendered semantic hero, project/experience content and FAQ. Canvas is `aria-hidden`. Reader/no-JS behavior needs the integrated browser check. |
| Cache boundary | Next's public files otherwise use revalidation by default. Bounded explicit media TTL improves repeat visits; it does not reduce cold WebGL JavaScript compilation or demonstrate FCP/LCP improvement. |
| Image engine | Existing global `images.unoptimized` and Sharp tracing exclusions support the existing standalone deployment arrangement. No image-runtime dependency or hosting behavior was changed. |
| Fonts | IRANYekan WOFF2 files use `font-display: swap`; regular/medium/bold are approximately 26/28/28 KiB. Geist and Geist Mono use `next/font` with swap. No font package or licensed asset was changed. |
| Deployment canonical | `NEXT_PUBLIC_SITE_URL` takes priority. Otherwise `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` supplies the origin on Vercel. The final deployed canonical origin must be checked against the intended public host. |

`TTL` means cache time-to-live; it is separate from FCP, LCP, TTFB and TBT. A lab report is not field p75 INP/Core Web Vitals.

## Measured optimization decision

The coordinating local production Lighthouse run identified repeat-visit cache warnings and seven full-size screenshot textures, while its principal slowdown was Three.js evaluation/render work. Root owns that scene work. Dedicated real screenshot derivatives were selected over globally degrading the detailed case studies: the 720px WebP quality 82 set totals 132,410 bytes, below the 150KB geometry texture target. Encoding used the already installed Pillow 11.2.1; no package or generated replacement imagery was introduced. Mutable original URLs retain the bounded cache policy; only the new content-hashed directory is immutable. Root must verify that immersive HTML previews do not also eagerly request the full originals.

The same initial local mobile report attributed LCP to the hero description paragraph, with 23.6ms observed TTFB and 464.8ms observed element render delay. Its 6.665s LCP is a simulated throttled metric. `font-display` passed; CSS-to-font discovery and three render-blocking CSS requests are smaller opportunities than the recorded 16.3s Three.js script evaluation. No cold-load or score improvement is inferred from source changes alone.

## Fresh checks

- `npx eslint next.config.js src/app/sitemap.ts` — PASS, exit 0.
- Executed `next.config.js` and asserted all three exact cache rules; asserted no `/api` cache rule was introduced — PASS.
- Executed the sitemap with the installed TypeScript transpiler and existing routing module; asserted 18 unique URLs, EN/FA/DE/`x-default` alternate keys, canonical HTTPS origin and no fabricated timestamps — PASS.
- Verified all seven derivative content hashes/file sizes, source screenshot existence, combined texture budget below 150,000 bytes, and ordered immutable header override — PASS. Scoped ESLint also includes `src/content/project-textures.ts` — PASS.
- Integrated typecheck/build, rendered metadata/header checks and Lighthouse: owned by the coordinating U04 verification; not claimed by these source checks.

## Official implementation references

No bundled `node_modules/next/docs` directory exists in this checkout. Framework behavior was checked against the official documentation:

- [Next headers and cache control](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers): hashed static assets keep framework-controlled immutable headers; custom response paths can define their own policy.
- [Next sitemap metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap): `lastModified` is optional; language alternates are supported.
- [Next 16 upgrade notes](https://nextjs.org/docs/app/guides/upgrading/version-16): generated image route parameters and IDs are asynchronous, while `generateImageMetadata` parameters remain synchronous.
