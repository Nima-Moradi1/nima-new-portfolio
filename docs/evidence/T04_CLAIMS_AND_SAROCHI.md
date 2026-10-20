# T04 — Content claims and Sarochi access evidence

Date: 2026-10-20 (Asia/Tehran). Scope: read-only content/source review, public HTTP GETs and the bounded canonical rendered smoke added below. No product code, contact settings, remote repository, deployment or Sarochi working-tree changes. No inference request, upload, contact submission, installation, full test suite or build was run.

## Evidence boundaries

- **User-authorized positioning:** the supplied permanent instructions specify `Nima Moradirad` and `AI Full-Stack Developer`. This authorizes the new global positioning; it does not establish new historical job responsibilities.
- **Source-confirmed:** a field, implementation or asset manifest was read in the named local checkout at the recorded HEAD. This establishes implementation presence, not current production execution or quality.
- **Live HTTP-confirmed:** a public origin returned the recorded status/body during this review. API flags are declarations, not proof that generation, WebGL, gestures or fit work.
- **Rendered smoke-confirmed:** only the desktop and resized mobile-viewport flow recorded below; this is narrower than all-product, physical-device, visual-quality or performance acceptance.
- **Unverified:** owner decisions, external project internals, interactions outside that flow, physical devices and current deployment/source parity that were not inspected here.

## Portfolio locale and identity review

Checkout: `C:\Users\n_moradirad\Desktop\updated-portfolio`, branch `feat/nm-kinetic-portfolio`, HEAD `a18911c0f9f493eed70fd8c65f844d6853be1e44`. The blueprint guidance/docs were untracked when inspected; this report does not treat them as application changes.

Read: `src/messages/{en,fa,de}/portfolio.json`, `src/types/portfolio.ts`, `src/content/portfolio.ts`, `src/i18n/routing.ts`, locale layout, contact dialog/API, existing content/privacy documentation.

An in-memory Node JSON inspection found:

- All three catalogs parse and have identical leaf-key paths (no missing or additional paths).
- Six project IDs, in the same order: `moradi-gallery`, `xo-arena`, `emerald-case`, `hesabo-platform`, `lingo-learn`, `tarabari-nima`.
- Project link targets and technology arrays match across all three locales. Existing internal routes remain `/projects/moradi-gallery`, `/projects/xo-arena`, `/projects/emerald-case`, `/projects/tarabari-nima`; the other two use their existing external domains.
- Four job IDs, in the same order: `hesabo`, `basilica`, `barname-negar`, `kzi`. Their translated date ranges are semantically consistent.
- `sarochi-3d-shop` is absent from all three application catalogs; it remains a proposed seventh record.
- Locale routing remains EN unprefixed, FA `/fa`, DE `/de`; the declared directions are LTR/RTL/LTR. These are source facts, not rendered bidi acceptance.

| Claim/field | Observed evidence | Publication rule / remaining action |
|---|---|---|
| Name | EN/DE `Nima Moradirad`; FA localized accessible name | Preserve the Latin brand and the existing Persian name. |
| New global role | Authorized in permanent instructions; application catalogs still say `Product Engineer`, `مهندس نرم‌افزار`, `Produktentwickler` | Update globally at the scoped implementation task, including metadata and schema consumers. Do not report the change as already implemented. |
| Historic Hesabo title | EN/DE `Senior Frontend Developer`; matching Persian title | Preserve; do not substitute full-stack/AI job titles. |
| Historic Basilica title | `Senior Frontend Engineer`; matching Persian title | Preserve. |
| Historic BarnameNegar title | `Frontend Developer`; matching Persian title | Preserve. |
| Historic KZI title | `React Developer`; matching Persian title | Preserve. |
| Employment dates | Hesabo Feb 2025–present; Basilica Mar 2024–Mar 2025; BarnameNegar Jan 2023–Mar 2024; KZI Dec 2020–Sep 2022 | Preserve the supplied dates. No independent employer verification was performed. |
| Education | EN/DE institution text says `2021 — 2026`; FA says `۲۰۲۱ — اکنون` | Graduation/current-study status remains unresolved. Avoid a new definitive graduation claim until the owner confirms. This does not block scene/layout work. |
| Backend proof | Existing XO Arena contribution names Express, Socket.IO, Prisma, MySQL, Zod and httpOnly sessions; Emerald Case names Prisma, MongoDB, Stripe and Resend | Retain these as existing project descriptions. Their repositories, deployed payment flow and personal ownership boundaries were not independently audited in this task. Do not convert catalog text into new implementation/certification claims. |
| AI proof | Existing Hesabo highlights explicitly describe supervised use of Codex/Claude for architecture, refactoring, review, tests, documentation and repeatable delivery | Safe category: AI-assisted engineering workflow. No evidence here establishes a shipped autonomous agent, model training, RAG backend or AI ownership at every job. |
| Team/company responsibility | Existing content describes frontend architecture, mentorship and delivery | Keep individual contribution language scoped to the supplied record; do not claim sole authorship of a company platform. |

## Public contact policy review

- `src/components/contact/contact-dialog.tsx` currently contains a phone channel and a `tel:` link. **The value was deliberately not copied into this report or evidence output.** Existing public UI presence is not a new consent decision for the redesign.
- `docs/CONTENT_CHECKLIST.md` says the private phone is omitted from the site; that sentence conflicts with the current contact implementation. Treat it as stale documentation, not proof that the UI has no telephone channel.
- `README.md` describes the downloadable résumé as public-safe with the private phone removed. `public/nima-moradirad-resume.pdf` exists. The PDF was not newly extracted or rendered during this task, so this report preserves the documented policy without certifying its bytes.
- `src/content/portfolio.ts` permits `NEXT_PUBLIC_CONTACT_EMAIL` to override the catalog email. The active production value and contact forwarding configuration were not inspected or changed.
- The API has explicit unconfigured/provider-failure paths and Resend integration in source. No email was sent and delivery was not verified.

Owner input is only needed before publishing a newly chosen telephone policy or a definitive graduation status. Existing route/API/PDF preservation and implementation can continue while those fields remain unchanged or deferred.

## Sarochi repository access — previous general blocker resolved

Exact checkout: `C:\Users\n_moradirad\Desktop\sarochi-shop-design` (a separate application from `sarochi-new`). Read its `AGENTS.md`, current `HANDOFF.md` sections, `README.md`, `docs/VTO_TASKS.md`, `docs/VTO_PHOTO_MVP.md` and the relevant implementation paths.

| Check | Result |
|---|---|
| Local branch | `master` |
| Local HEAD | `ac39e2a0dc6161847d211a6fa419303d97f2ff60` |
| Working tree | Clean before and after inspection (`git status --short` produced no entries). |
| Origin fetch/push | `https://github.com/Nima-Moradi1/sarochi-shop-design.git` |
| Noninteractive remote check | `GIT_TERMINAL_PROMPT=0`, `git -c credential.interactive=never ls-remote https://github.com/Nima-Moradi1/sarochi-shop-design.git HEAD` exited 0. |
| Remote HEAD | `ac39e2a0dc6161847d211a6fa419303d97f2ff60`, matching local HEAD. |

The previously reported connector 404 does **not** establish that the repository is absent. Git access is available in this session. Connector-specific access/visibility was not separately changed or verified; a public portfolio repository link may still require viewer access. No credential material or account tokens were printed.

### Source-confirmed stack and features

`package.json` pins Next.js **16.4.0**, React/React DOM **19.3.0**, `@react-three/fiber` **9.8.1**, Three.js **0.186.1**, Zustand **5.0.15**, Sharp **0.35.5** and TypeScript **5.9.3**. These are this shop's declared versions, not the portfolio's versions.

| Candidate portfolio claim | Source evidence | Permitted wording / boundary |
|---|---|---|
| Navigable 3D apparel boutique | `ShopExperience.tsx`, `BoutiqueCanvas.tsx`, `GestureRouter.tsx`, `CameraController.tsx`, `scene/zones.ts`, shop/view state | Interactive 3D apparel-showroom implementation with five selectable zones and rack/product navigation. The bounded canonical desktop rack/product flow below rendered successfully; all-zone/all-device coverage remains open. |
| Authentic product source and galleries | Catalog manifests/seed/schema/adapter, `ProductInfoPanel.tsx` | Source-backed apparel catalog and product galleries. Genuine rear views are distinguished from reconstructed display surfaces; do not imply that every product has authentic rear photography. |
| Server-side catalog adapter | `src/app/api/catalog/route.ts`, `catalog/adapter.ts`, `catalog/schema.ts` | On-demand allowlisted read adapter with timeouts, bounded responses and process-local caching. Fresh price/stock facts expire after 120 seconds. Do not imply ownership of the upstream commerce backend. |
| Checkout / payments | `ProductInfoPanel.tsx` links `product.canonicalUrl` to the official source store; route inventory has catalog, health and VTO handlers | Purchasing continues at the official product page. This project does not substantiate a native cart, checkout, payment integration, customer-account system, admin CMS or MySQL backend. Those features must not be imported from the separate `sarochi-new` application. |
| Fallback and responsive controls | `SceneFallback.tsx`, WebGL/context-loss path in `ShopExperience.tsx`, keyboard/gesture controls | Source includes non-WebGL product links, retry, keyboard and touch controls. The bounded smoke confirms keyboard rack entry and a 390×844 viewport layout; fallback, full accessibility, touch gestures, reduced-motion and physical-device performance acceptance remain open. |
| Active fitting room | `VirtualTryOnDialog.tsx` imports `PhotoStage` and `usePhotoTryOn`; `page.tsx` gates entry with `VTO_ENABLED` | Current source uses an **owner-photo appearance-preview MVP**. Older mannequin-only records are historical and must not override the active import path. |
| Prepared apparel previews | `photo-catalog.json`, `photoCatalog.ts`; JSON inspection counts **37 apparel entries** (24 tops, 13 outerwear) excluding `__baseline` | Prepared photographic appearance previews keyed to exact source/owner checksums. This is not arbitrary reliable real-human try-on, identity certification or measured fit. Selection of a prepared item does not request new inference. |
| Tie preview | `photoTie.ts`, `tieCompatibility.ts`, calibrated photo data and accessory presentation source at current HEAD | Source-patterned ties over compatible collared prepared photographs; T-shirt rejection/removal paths exist. These are local overlays, not proof of generated accessory fit. Current release parity and rendered tie quality were not checked here. |
| Live generation / AI integration | `photoProvider.ts`, `freePhotoProvider.ts`, `usePhotoTryOn.ts`, `/api/vto/photo` | Source provides explicit optional fresh generation through the free FASHN VTON 1.5 Space; public service quotas, queue, failure and timeout paths remain. No generation was invoked during this review. No claim of guaranteed availability, exact garment reconstruction, 3D body recovery, physical cloth simulation or sizing accuracy. |

`docs/VTO_PHOTO_MVP.md` and the newest tie implementation coexist with older mannequin/release sections. The active source is authoritative for implementation presence. Existing historical QA/release assertions were not rerun and must retain their original date/version boundary.

### Current canonical live HTTP evidence

Read-only requests to `https://3d-shop-design.ir` at **2026-10-20 11:10:40–11:10:42 UTC / 14:40:40–14:40:42 Asia/Tehran**:

| Request | Observed result | What this establishes |
|---|---|---|
| `GET /` | 200, `text/html`; title `فروشگاه پوشاک \| بوتیک تعاملی`; VTO entry markup present | Root document is served with fitting-room entry markup. No server-rendered canvas is expected from the client-only scene. |
| `GET /api/health` | 200, `{"status":"ready","scope":"server","catalog":"on-demand"}` | Server health only. |
| `GET /api/vto/availability` | 200, `enabled:true`, `mode:"owner-photo"`, `liveGeneration:true`, `supportedProductCount:49`, one male front-view model | Feature/configuration status. The 49 count includes catalog products/accessories and does not mean 49 prepared apparel images or 49 verified generated results. |

At the initial 11:10 UTC inspection, the internet extraction tool could not access the root URL. Direct HTTPS GETs succeeded. `cua.createBrowserTab("iab", ...)` returned **Browser is not available: iab**; `cua.getState()` returned `apps:[]`, `browsers:[]`. **No rendered shop flow was captured at that initial stage.** The later isolated Chrome smoke below resolves that narrow capture gap. HTTP responses alone do not prove shader startup, fitting-room image quality, device FPS, Lighthouse results or deployed source SHA parity.

### Bounded canonical rendered smoke — added 2026-10-20

After the other audit browser closed, an existing installed Playwright **1.62.0** package and installed Chrome **155.0.8059.85** were used in one isolated headless context. No package installation, app/server start, source change or deployment was needed. Chrome reported hardware **Intel UHD Graphics 630 / ANGLE D3D11**. This is a local desktop GPU observation, not a physical-mobile benchmark.

- Reproduction: `node docs/evidence/T02-shop/rendered-smoke.cjs` from this portfolio checkout; it requires the already-present `../nima-new-portfolio/node_modules/@playwright/test` package.
- Safety boundary: all non-GET/HEAD/OPTIONS requests and known inference-provider hosts were intercepted and would be aborted. No generation, contact, checkout, upload or provider action was clicked. The completed report records **zero blocked attempts**, not merely a successful block after an attempted inference.
- Complete run: **11:25:19–11:25:34 UTC / 14:55:19–14:55:34 Asia/Tehran**, **15.282 seconds** total, normal browser motion preference, desktop viewport **1280×900**, DPR 1; then the same page resized to **390×844**. The latter is viewport coverage, not a phone, separate mobile UA or touch-gesture test.
- Raw report: [T02-shop/rendered-smoke.json](T02-shop/rendered-smoke.json). Reproduction script: [T02-shop/rendered-smoke.cjs](T02-shop/rendered-smoke.cjs).

| Phase | Observed result | Evidence |
|---|---|---|
| Canonical scene readiness | Root 200; loader `data-ready=true`, main `aria-busy=false`, 1280×900 WebGL canvas and all five keyboard zone labels. Phase took 7.918s including capture overhead; this is **not LCP, a loader benchmark or a Lighthouse score**. | [01-desktop-overview.png](T02-shop/01-desktop-overview.png) |
| Rack and product browsing | Keyboard focused the shirt-rack control and Enter entered it; one browse action changed the product and index to `2 / 12`. | [02-desktop-rack-browse.png](T02-shop/02-desktop-rack-browse.png) |
| Product information and gallery | Product detail displayed four source gallery controls; gallery index 1 became selected; the purchase link targets the official Sarochi product. Current price/stock was explicitly unavailable during the flow, so live pricing correctness was **not established**. | [03-desktop-product-info-gallery.png](T02-shop/03-desktop-product-info-gallery.png) |
| Prepared photographic preview | Product entry displayed a nonempty **576×864** prepared canvas. Changing black pants to cream changed sampled canvas hash `96563818 → 3303401589`. Next garment advanced `۲ / ۱۲ → ۳ / ۱۲`, changed the prepared canvas hash to `742836840`, and retained cream. The generation action was not visible for this prepared selection. | [04-desktop-prepared-fitting-room.png](T02-shop/04-desktop-prepared-fitting-room.png), raw `preparedPhotoCheckpoints` |
| Resized mobile viewport and return | At 390×844, document width stayed 390, the loaded preview and cream selection remained, and closing returned to the original shop product with its information control available. The viewport screenshot was visually inspected. | [05-mobile-prepared-fitting-room.png](T02-shop/05-mobile-prepared-fitting-room.png), [06-mobile-product-return.png](T02-shop/06-mobile-product-return.png) |

Completed-flow diagnostics: **0 page errors, 0 failed requests, 0 HTTP responses ≥400, 0 unsafe/provider attempts**. One exact warning was recorded: `THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.` The raw report retains its source chunk, location and timestamp. This narrow success does not certify every SKU, generated-image fidelity, physical fit, all keyboard/focus cases, real touch input, fresh generation, physical-device FPS, Lighthouse or current deployed SHA.

An initial **27.225s** attempt is retained under [T02-shop/first-run/rendered-smoke.json](T02-shop/first-run/rendered-smoke.json), with its screenshots. It reached the prepared preview and pants-color change, then the harness timed out waiting for a product-title change: consecutive catalog entries share the same displayed title, while the screenshot had already advanced to `3 / 12`. The harness assertion was corrected to compare the counter; one bounded repeat completed the remaining flow. No shop bug was inferred from that assertion timeout, and prior evidence was preserved.

### Safe provisional Sarochi copy

- **EN:** “An interactive 3D apparel-showroom concept with spatial product browsing, source-backed galleries and an experimental photographic appearance-preview fitting room. Purchases continue at the official product store.”
- **FA:** «مفهومی از نمایشگاه تعاملی سه‌بعدی پوشاک با مرور فضایی محصولات، گالری‌های متکی بر منبع و اتاق پرو آزمایشی برای پیش‌نمایش تصویری ظاهر لباس؛ خرید در فروشگاه رسمی محصول ادامه پیدا می‌کند.»
- **DE:** „Ein interaktives 3D-Showroom-Konzept für Bekleidung mit räumlicher Produkterkundung, quellengestützten Galerien und einer experimentellen fotografischen Vorschau. Der Kauf erfolgt im offiziellen Produktshop.“

These are reviewable candidates, not catalog edits or owner approval of final publication copy. Avoid a case-study claim that reliable photoreal human VTO is complete. The historical `FIX-R02` exact real-person dressing requirement is not completed by these observations.

## Remaining checks and exact next actions

1. The narrow canonical rack/product/prepared-photo/return smoke is now recorded above. Remaining browser acceptance is scoped to untested racks/SKUs, real touch/focus/reduced-motion/fallback cases and physical devices; do not repeat the completed smoke without a relevant change or failure. Fresh generation is not needed for navigation proof.
2. Verify the current deployed source/release against `ac39e2a` before presenting the newest tie/mirror changes as shipped on the canonical domain. Existing handoff sections still contain pending-publication statements and older release SHAs.
3. Before any new exact-human VTO quality claim, obtain a scoped visual evaluation with agreed owner/product fidelity criteria. Source/API readiness is insufficient. Preserve exact fit, arbitrary-body and device/performance limitations.
4. At the content implementation task, add the same stable seventh ID in EN/FA/DE and rerun the existing locale-content check after actual edits. Keep job titles/dates and detailed project paths intact. Use only the scope established above.
5. Resolve education completion date and telephone visibility only when those public fields are about to change; preserve the public-safe résumé policy and existing contact delivery configuration meanwhile.

Verification record: read-only Git status/branch/HEAD/remotes and remote HEAD; JSON parsing/key/ID/link/technology inspection; bounded source reads; three public GETs; interactive-browser availability probe; one bounded isolated-Chrome smoke plus one corrected harness repeat, raw timings/errors and screenshots. **Not run:** full unit/E2E suites, lint/typecheck/build, Lighthouse, live generation, contact delivery, PDF render, physical-device tests or deployment.
