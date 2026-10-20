# T02 — Existing portfolio source audit

Date: 2026-10-20 (Asia/Tehran). Method: local source and filesystem inspection, plus dependency-free JSON/asset validation. No application code changed.

Audited checkout: `C:\Users\n_moradirad\Desktop\updated-portfolio`; branch `feat/nm-kinetic-portfolio`; HEAD `a18911c0f9f493eed70fd8c65f844d6853be1e44` (verified with `git rev-parse HEAD`). The blueprint documentation/assets were untracked at audit start; they are not part of this source commit. The HEAD value is a commit SHA in this checkout, regardless of the initial handoff's uncertainty about the research snapshot.

Scope status: portfolio-source portion complete. Combined **T02 audit complete** with `T04_CLAIMS_AND_SAROCHI.md` and `T02-shop/rendered-smoke.json`: Git access, source/HTTP review and bounded canonical rendered scene/product/gallery/prepared-photo flow verified. Advanced VTO quality, physical devices and exact deployed SHA remain explicitly unverified. This portfolio report itself makes no additional Sarochi feature claims.

## 1. Home composition and reuse map

`src/app/[locale]/page.tsx` validates locale and sets request locale, then renders:

1. `LandingPreloader` around the entire page.
2. `HashScrollManager`, skip link, shared `SiteHeader`.
3. `main#main-content`: `DepthScrollController`, `HeroSection`, `ExperienceSection`, `ProjectsSection`, `CapabilitiesSection`.
4. Shared `SiteFooter`.

There is no FAQ, persistent carousel, proof-chapter rig, Projects/Experience mode switch, or visible contact form in the current home composition.

| Existing implementation | Verified behavior | Treatment for new home |
|---|---|---|
| `src/components/sections/hero-section.tsx`, `.class-names.ts` | `#top`; availability, localized role/headline/intro; work/contact/resume CTAs; interactive workstation; signals. Two-column desktop layout and locale-specific type sizing. | Replace home composition with original NM story; preserve semantic identity, CTA routes, résumé link and readiness hook contract as appropriate. |
| `src/components/experience/experience-book.tsx`, `experience-book-scene.tsx` | Desktop scroll-driven book, active-page changes, keyboard and previous/next buttons; semantic hidden full history. Mobile/intrinsic reader and reduced-motion/no-WebGL list fallback. | Reuse job data, logical direction and accessibility patterns; retire separate book scene from immersive home when shared rig is ready. |
| `src/components/sections/projects-section.tsx` | Six conventional linked project cards. Localized internal `Link` for `/projects/...`; external links use `noreferrer noopener`; screenshots and up to four tech badges. First array item gets featured styling (rather than consulting `ProjectItem.featured`). | Replace home grid with shared carousel; preserve IDs, route destinations, authentic screenshots and semantic discoverability. |
| `src/components/capabilities/capability-timeline.tsx` | Native horizontal timeline with four groups plus education; logical RTL scrolling, keyboard paging, axis-aware pointer drag. | Reuse content and logical-scroll utilities when needed; avoid importing this independent timeline into the new story without a task requirement. |
| `src/components/motion/depth-scroll-controller.tsx` | One scheduled RAF per passive scroll/resize update; measures sections and writes opacity, blur, transforms, portal strength; ResizeObserver and reduced-motion cleanup. | Retire from home when single story controller takes ownership, to avoid competing transitions. Current section fades are not evidence of reference fidelity. |
| `src/components/layout/site-header.tsx`, `site-footer.tsx` | Shared with detail pages; four section navigation items, locale control, theme lamp/menu/contact; footer public channels and résumé. | Restyle/minimize deliberately; shared consumers and their back/anchor behavior must remain usable. |
| `src/components/navigation/hash-scroll-manager.tsx` | Restores decoded section hashes after route mount using two RAFs; listens for `hashchange`. | Preserve or migrate equivalent behavior for existing case-study back links. |

Existing anchors: `#top`, `#main-content`, `#experience`, `#work`, `#capabilities`. Contact links are handled through the dialog provider; there is no corresponding home `id="contact"` section in the inspected composition. A future contact section must account for existing `/#contact` links.

## 2. Content, locale types and factual boundaries

Source of truth: `src/messages/{en,fa,de}/portfolio.json`; shared types in `src/types/portfolio.ts`; materialization in `src/content/portfolio.ts`; hook in `src/content/use-portfolio.ts`. `PortfolioContent` describes identity, navigation, signals, about, experiences, projects, capabilities, education and social links. `ProjectItem` has `contribution`, image/alt, optional logo/alt, technologies, optional href, featured and accent fields. There is no Sarochi record or story/mode-specific content schema yet.

`materializePortfolio` overrides catalog email with `NEXT_PUBLIC_CONTACT_EMAIL` or the existing public email fallback. English export remains a compatibility default for non-localized server code/tests. Do not duplicate content into new component constants.

| Ordered project ID | Current destination |
|---|---|
| `moradi-gallery` | `/projects/moradi-gallery` |
| `xo-arena` | `/projects/xo-arena` |
| `emerald-case` | `/projects/emerald-case` |
| `hesabo-platform` | `https://hesabo.com/` |
| `lingo-learn` | `https://lingo-learn.ir/` |
| `tarabari-nima` | `/projects/tarabari-nima` |

| Job ID | Existing English historic title | Existing English period |
|---|---|---|
| `hesabo` | Senior Frontend Developer | Feb 2025 — Present |
| `basilica` | Senior Frontend Engineer | Mar 2024 — Mar 2025 |
| `barname-negar` | Frontend Developer | Jan 2023 — Mar 2024 |
| `kzi` | React Developer | Dec 2020 — Sep 2022 |

Current global identity is `Product Engineer` in EN, its localized equivalent in DE, and Persian software/product wording. The requested AI Full-Stack Developer position has not been implemented. Historic titles above must remain historic titles.

Validation executed with Node built-ins (`fs`, `path`), parsing all six JSON catalogs in each locale and recursively comparing key/type/array-length shapes against EN: all three locales have equal catalog filenames and matching shapes. Ordered project, experience, capability and navigation IDs match. Counts are 6 projects and 4 experiences per locale. All project image/logo and résumé/preview paths referenced by `portfolio.json` exist in `public`.

Confirmed unresolved content discrepancy: `education.institution` says `2021 — 2026` in EN/DE and `۲۰۲۱ — اکنون` in FA. Content claims in these catalogs are existing authored claims, not a fresh independent verification of each product or employer responsibility. Preserve collaboration language; verify additional backend/AI/proof claims in T04 before publishing.

`src/i18n/routing.ts`: EN/FA/DE, EN default with `localePrefix: "as-needed"`, locale detection enabled; FA maps to RTL. `src/i18n/paths.ts` includes `x-default`. `src/components/i18n/locale-switcher.tsx` preserves pathname plus current query/hash after hydration and uses directional Radix menus and `bdi` marks. `src/app/globals.css` self-hosts three IRANYekanX weights with swap; Latin fonts use `next/font` Geist/Geist Mono in locale layout. Current Persian headline rules are already smaller than Latin in the relevant class maps; actual optical ratios still require browser measurement. Font license provenance was not independently verified.

## 3. Loader: real signals, existing artificial delay

`src/components/loading/landing-preloader.tsx` currently has `loading → exiting → ready`, initial progress 8, `MINIMUM_DISPLAY_MS = 1100`, `MAXIMUM_PREPARATION_MS = 15000`, then a 560ms exit timer. It locks body scrolling and marks the content wrapper `aria-hidden` while loading.

Five equally weighted preparation groups are tracked: window load, font readiness, portrait + résumé-preview image decode, nonempty localized critical copy followed by two paints, and explicit hero readiness. Progress rises by completed task groups toward 96, then becomes 100 even if the safety deadline won. This is task-based progress, not byte progress or proof that every resource succeeded. The 1100ms floor and loading of noncritical résumé preview/window load conflict with the new requirement to avoid artificial/content-unrelated blocking; remove/rework through T08 after baseline capture, rather than treating this implementation as compliant already.

`src/components/loading/landing-readiness.tsx` accepts `webgl-frame` or `static-fallback`. `HeroStudio` reports a fallback after a browser frame or reports the scene's first usable frame. `FirstUsableFrame` in `desk-scene.tsx` reports on the frame after the Fiber frame subscriber runs, avoiding a network-only readiness assumption. Retain the genuine first-frame handshake and abort/timeout cleanup concept in the new loader. Slow network, no-JS, crash, refresh, keyboard and hidden-tab exit behavior were not exercised in this audit.

## 4. Canvas inventory and migration risks

There are **two Canvas declarations**, not one persistent global scene:

| Scene | Loading / activation | Source settings |
|---|---|---|
| `src/components/three/desk-scene.tsx`, loaded by `hero-studio.tsx` | Dynamic import with SSR disabled; static fallback; WebGL support gate and error boundary; `useInView` margin 20% controls active rendering. | DPR `[1,1.5]`; active `always`, otherwise `demand`; no shadows; alpha/antialias/depth; high-performance preference; AdaptiveDpr. |
| `src/components/experience/experience-book-scene.tsx`, loaded by `experience-book.tsx` | Dynamic import with SSR disabled; mounts once near view (75% margin); active margin 15%; compact, reduced-motion or no-WebGL experience uses DOM alternatives. | DPR `[1,1.45]`; active `always`, otherwise `demand`; percentage shadows with 1024 directional map; AdaptiveDpr. |

`src/hooks/use-compact-viewport.ts` selects the intrinsic reader for width ≤72rem, height ≤48rem, or coarse pointer. `useWebGLSupport` creates a transient probe context, caches the result, and attempts to lose that probe context. Actual simultaneous browser context count was not measured; supported large desktop pages can retain both scene components after the book has mounted, even if only one actively renders.

The desk is procedural geometry with a wall painting texture and generated CanvasTextures for code/plaque/keyboard. It supports free horizontal presentation rotation, articulated typing, résumé click, and lamp pull to toggle theme. Explicit texture disposal exists for generated desk textures. `useFrame` transforms/readiness use refs rather than React state on each frame; hover/action state is event-driven. Reduced-motion gates several animations, but desk `frameloop` depends on visibility rather than reduced-motion, so a visible static desk can still request continuous frames.

The book rewrites page vertices and computes normals in frame callbacks; its shadows and extra context should not carry into the new single-scene design by default. `WebGLErrorBoundary` provides static failure UI, but device context-loss/restoration, GPU memory release, background-tab behavior and actual draw-call/FPS budgets remain untested. No GLB/GLTF/HDR asset is present in the current public extension inventory.

## 5. Contact/API and privacy

`src/components/contact/contact-dialog.tsx` provides an accessible Radix dialog with LinkedIn, résumé download, Telegram, email and a hard-coded telephone. GitHub exists in structured social links and Person schema, but is not a channel in this dialog. `src/components/layout/site-footer.tsx` also includes a telephone link. The raw telephone is intentionally omitted from this report. Do not propagate it to new content or public-safe résumé assets without the owner decision documented by the blueprint.

No rendered contact-form component or `fetch('/api/contact')` consumer was found in the current `src` inventory; the shared dialog is a channel chooser. The API is nevertheless present and must be preserved:

- `src/app/api/contact/route.ts`: POST, localized messages from `x-portfolio-locale`, no-store responses; declared content-length >12000 returns 413; in-memory per-IP 5 attempts/10 minutes; JSON parse and Zod validation.
- `src/lib/contact-schema.ts`: trimmed name 2–80, email, trimmed message 20–2000, optional empty `company` honeypot. A populated company fails schema before the route's later `if (company)` success branch, making that branch unreachable for nonempty strings under the current schema.
- Delivery requires `RESEND_API_KEY`, `CONTACT_DESTINATION_EMAIL`, `CONTACT_FROM_EMAIL` on the server. Missing configuration returns 503 with mailto; provider failure/timeout (8s) returns 502 with mailto. Normal success is returned only after an OK Resend HTTP response, representing provider acceptance rather than inbox delivery.
- Rate limiting is process-local; content-length checking trusts the declared header. These are existing source limitations, not newly tested production vulnerabilities. No contact request was sent, and no secret/environment value was read or changed.

`public/nima-moradirad-resume.pdf` exists with the optimized preview. Its content privacy and one-page rendering were not re-extracted/visually checked here; the existing one-page assertion is only an inspected test, not an executed result.

## 6. Routes, SEO and existing tests

Preserve localized detail routes in `src/app/[locale]/projects/{moradi-gallery,xo-arena,emerald-case,tarabari-nima}/page.tsx`, serving the EN unprefixed path plus FA/DE equivalents. Moradi/Emerald/Tarabari use `src/components/projects/compact-case-study.tsx`; XO has its fuller standalone case study and route loading state. Tarabari adds `tarabari-showcase.tsx` and `tarabari-clip.tsx`. All four pages declare localized metadata/canonical/language alternates and OG/Twitter. Case-study back links use `/#work`; XO also has `/#contact` links. Preserve these during home migration.

Other route contracts: localized catch-all and not-found/error/loading; localized/root manifests; `/api/contact`; `/api/health`; sitemap and robots; localized OG image. `src/app/[locale]/layout.tsx` sets `lang`/`dir`, default dark theme initialization, next-intl/theme/contact providers, localized metadata, `Person` JSON-LD with role/email/social links, canonical/hreflang and icons. JSON-LD `<` is escaped. `src/app/sitemap.ts` lists home + four detail routes across all locales (15 entries); `robots.ts` disallows `/api/`. SEO/language semantics are implemented in source; their actual rendered output was not tested here.

Existing test inventory was inspected, not executed:

- `tests/unit/{landing-preloader,portfolio-content,i18n-architecture,optimized-assets,contact-schema,mobile-experience-reader,theme-provider,resume-dialog,section-heading}.test.*`: readiness, content, locale shape/IDs/paths, asset budgets, form schema and reusable component behavior.
- `tests/e2e/portfolio.spec.ts`: loader/navigation, scenes/theme/book/timeline, four case studies/media, mobile interactions, partial axe checks.
- `tests/e2e/internationalization.spec.ts`: localized home/XO/manifests, locale/hash preservation, typography/RTL/overflow, book and timeline behavior.
- `playwright.config.ts` launches a fresh production build and server on 3100 per invocation, with desktop Chromium and Pixel 7 profiles. Avoid invoking repeatedly for small changes; use stable milestone builds and focused flows.

Two audit findings for future test work: the existing E2E `exposes accessible form validation` searches for a `Send the signal` button even though the current home has no form consumer; this is a source-level stale-test risk, not an observed test failure. Existing axe checks disable `color-contrast`, so their coverage does not establish contrast compliance. Many scene/grid/book tests intentionally encode the old composition and must be migrated with the relevant feature, preserving route/content/API assertions.

## 7. Asset and deployment budgets

Filesystem measurement (`Get-ChildItem public -Recurse -File`, byte lengths) found 29 files, **7,794,778 bytes total**. This is all public assets across routes, not initial transfer, JS bundle size or browser GPU memory.

| Asset | Bytes |
|---|---:|
| `public/assets/projects/tarabari-nima/freight-loading.webm` | 2,433,167 |
| `public/nima-moradirad-resume.pdf` | 2,051,762 |
| `public/assets/projects/tarabari-nima/freight-loading.mp4` | 982,689 |
| `public/assets/projects/xo-arena/xo-arena-preview.mp4` | 300,317 |
| `public/assets/projects/xo-arena/xo-arena-preview.webm` | 272,824 |
| `public/assets/nima-moradirad-resume-preview.webp` | 247,618 |
| `public/assets/hero/senior-engineer-systems-painting.webp` | 205,728 |
| Three self-hosted Persian `.woff2` files combined | 83,832 |

`next.config.js` has `images.unoptimized: true`: existing screenshots are served without the Next image optimizer, so source image dimensions and byte budgets remain important. It already splits package imports for Lucide/Drei/Motion, uses standalone output, security headers and exact deployment IDs. Do not replace configuration wholesale.

`tests/unit/optimized-assets.test.ts` encodes XO screenshots/poster <100000 each, XO video variants <500000 each, Lingo preview <100000/logo <25000, desk texture <250000, résumé preview <300000, PDF between 1 and 3MB and one page. These are existing asserted limits, not proof of passing execution this session. Tarabari's larger case-study video is not part of these route-budget assertions. `TarabariClip` uses metadata preload and viewport playback; `XoArenaVideo` explicitly preloads WebM and uses auto preload. Keep detail media out of the initial home story unless deliberately budgeted.

Deployment reuse: `.github/workflows/deploy-liara.yml` runs on main push/manual dispatch with a main-only job, Node 22.23.2, `npm ci`, lint/typecheck/unit tests, one production build, Linux standalone packaging, Docker smoke test and healthcheck, artifact checksums, pinned Liara CLI/release and verification of exact SHA, three languages, routes and asset bytes on Liara + public domain. `deploy/package.sh`, `deploy/release.mjs`, `deploy/verify.mjs`, `deploy/Dockerfile`, `deploy/healthcheck.cjs`, `deploy/.liaraignore`, `liara.json`, `/api/health` are preservation targets. `deploy/verify.mjs` also checks that the removed Azita route remains a real/streamed not-found. No deployment or workflow trigger occurred.

`package.json`/`package-lock.json` remain the npm basis. Existing stack is Next 16.2.10, React 19.2.4, Tailwind 4, next-intl, Three 0.182, R3F/Drei, Motion, Zod, Radix, Vitest/Playwright/axe. GSAP strings inside project-case-study technologies describe those projects; GSAP is not a current portfolio dependency. No package installation or new dependency is needed for this audit.

## 8. Validation record and next exact action

Performed: checkout status/branch/HEAD, targeted file reads and `rg` inventories; dependency-free parse/recursive shape/ordered-ID comparison of 18 locale JSON catalogs; public existence checks for project and résumé references; public asset counts and byte totals; source review of two Canvas declarations and deployment/test configuration.

Resumable validation is persisted in `docs/evidence/validate-source.cjs`. Run from the repository root:

```powershell
node docs/evidence/validate-source.cjs
```

Recorded result on 2026-10-20: **PASS — 119 source checks, 0 failures; 3 locales; 29 public files / 7,794,778 bytes**, exit code 0. Full machine-readable results, source HEAD, runtime version and timestamp are in `docs/evidence/T02-source-validation.json`. The command was run once after saving the script; it uses only Node built-ins and does not install dependencies, import application modules, invoke builds or run the existing test suite. It checks JSON parsing, recursive catalog shape parity, the current `PortfolioContent` field types/required fields/enums, ordered and unique IDs, referenced public assets, source project-route/link/sitemap agreement and route/metadata declaration presence. Its 15 modeled locale URLs are source expectations, not HTTP/browser observations. Update the snapshot schema alongside `src/types/portfolio.ts` when that content contract changes. Each rerun refreshes the named JSON result; retain a dated copy before rerunning when historical evidence is required.

Not run: app changes, npm installation, lint, typecheck, unit/E2E suite, production build, browser visual/keyboard/no-WebGL/mobile flows, PDF rendering/privacy extraction, contact transport, network/link validity checks, runtime context/FPS/heap profiling, Ciao frame measurements, Lighthouse or field metrics. Source inspection does not establish that any of these pass. No performance score is claimed.

Next: combined T02 source/access/rendered audit is recorded in root handoff/task board; use its evidence without repeating the completed smoke. Follow the latest T01 measurements for remaining frame/input calibration before motion/loader implementation. T03 baseline is recorded separately. T04 must resolve degree-date and public-phone publication policy before changing those claims; advanced VTO/device/deployed-SHA limits remain open.
