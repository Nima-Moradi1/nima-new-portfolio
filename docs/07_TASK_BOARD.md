# 07 — Execution board — update immediately after each task

**Status legend:** `[ ]` pending, `[x]` fully verified; mark complete only with evidence recorded in `HANDOFF.md`. P0 = highest. Avoid parallel conflicting edits to `src/messages/*` or same canvas component. Keep one task atomic and commit where appropriate. Dates/time estimates are NOT commitments.

## Owner revision — 2026-10-20 (supersedes the affected original storyboard)

- [x] **U03 — Ten owner visual/mobile corrections, bounded local acceptance:** Corrected locale copy/FAQ layout; added approved phone; procedural four-stage solar scene with coordinated sunbeam/copy; server-first truthful larger NM loader; removed loader/hero project CTA, arrow/dot controls and numbered proof rail; synchronized rack/copy; widened/deepened physical cartridges and rails; mouse/touch/keyboard manipulation; restored mobile glass hero and 3D short-viewports with shorter scroll spans. Typecheck/scoped lint, 10 unit tests, seven Chrome locale/viewport profiles, mouse/keyboard/actual emulated touch, delayed asset, reduced-motion/no-JS/denied-WebGL fallback PASS. Evidence: `docs/evidence/U03-2026-10-20/SUMMARY.md`. No build, publication or deployment. Original broader fidelity/device/performance acceptance stays open.
- [x] **U01 — Requested home/SPA revision, bounded verification:** Real animated project-capture faces and company plates; native-scroll project extraction/unfold/retraction with concise inline preview/live demo, tools and live URL; wrapped selectors; no home navigation to old case-study layouts; rounded language select; four-channel glass contact modal; removed giant statement, home contact section and résumé links; animated glass hero; removed Sarochi source action. Typecheck/scoped lint/locale parity and representative Chrome desktop/FA-mobile flow PASS; details and verification boundaries are in the latest `HANDOFF.md` section. No broad tests/build/deployment. This does not close the original visual-fidelity/performance/device milestones.
- [ ] **U01-LIVE — Sarochi inline live-site embedding:** BLOCKED by its deployed SAMEORIGIN + frame-ancestors self headers. Animated authentic screenshot and canonical demo link work; changing shop headers or repository visibility is outside this local portfolio edit. No settings were changed.

Original T13 home route-link behavior, T16 giant statement, and T18 home form/résumé design are superseded by U01 at the owner's explicit request. Semantic routes/contact API/PDF remain preserved. Historical evidence below remains intact.

**Implementation update — 2026-10-20:** The prior audit-only status was stale. Immersive runtime, original brand/geometry, 7-project/4-job switching, proof/statement/recap, FAQ/contact, tri-language Sarochi route, fallback and metadata are implemented locally. The user requested implementation first and deferred unnecessary broad tests/builds. Unchecked items below include acceptance work, not necessarily missing code. Evidence: `docs/evidence/T-implementation-2026-10-20/SUMMARY.md`.

| Tasks | Current implementation / outstanding acceptance |
|---|---|
| T05–T06 | Original SVG/procedural identity, three brand studies/24px previews and scoped palette/type tokens implemented; complete EN/FA/DE typography review pending. |
| T07–T09 | Single stage integrated; real-frame loader, timeout, context fallback and compact chrome implemented. Slow-network/abort/denied-WebGL and full locale-control acceptance remain. |
| T10–T16 | Hero unfolding, shared carousel pivot, passive native scrub, project/job controls, four proof marks, statement and fan-out implemented; full reference/easing comparison and rapid-switch coverage pending. |
| T17–T20 | Nine native FAQ disclosures, real contact form, seventh Sarochi route and locale parity implemented. Actual transport and complete route/locale screenshot coverage remain. |
| T21–T23 | Mobile framing, safe-area controls, short-viewport reader, reduced motion/context loss and route preservation implemented. Broader viewport/zoom/device/route checks pending. |
| T24–T27 | Procedural shared geometry, deferred canvas, bounded DPR/idle rendering, original asset ledger, localized SEO and contact bounds implemented. Transfer/decode/memory, provider and security acceptance remain. |
| T28–T30 | Visual comparison, stable production milestone QA and final release approval remain; no build/deploy/push performed. |

## Stage A — truth, baseline and reference (do first)

- [x] **T00 [P0] Safety snapshot:** `git status --short`, branch, commit SHA, package manager/lockfile identity, deploy pipeline, route inventory, public-private contact policy; create safe feature branch after owner approval. **Accept:** no user changes overwritten; concise ledger in handoff. Verification: `git status`, git diff. Evidence: `docs/evidence/T00_SAFETY_SNAPSHOT.md` (2026-10-20; isolated worktree, no publication).
- [ ] **T01 [P0] Live reference capture:** follow `01_REFERENCE_RESEARCH.md`, capture loader/hero/item transitions/proof/statement/FAQ/contact desktop/mobile/reverse and measure scroll checkpoints. **Accept:** timestamps/screenshots + `REFERENCE_MEASUREMENTS.md` with unknowns, not just subjective notes. **PARTIAL 2026-10-20:** installed Chrome rendered real WebGL; 34 checkpoints + unaltered recording per desktop/mobile profile, section geometry and scroll behavior recorded in `docs/REFERENCE_MEASUREMENTS.md`. Individual flavor control replay, calibrated frame/easing/pose analysis and remaining input/device checks are still mandatory. Do not repeat the full saved captures.
- [x] **T02 [P0] Existing repo/source audit:** inspect current page, locale catalogs/types, preloader, 3D scenes, contact/API, case-study routes/tests/SEO, asset/deploy budgets; check shop repo permissions and actual shop features. **Accept:** verified feature/reuse/deprecation map; no code modified unless necessary to read. Evidence: `docs/evidence/T02_SOURCE_AUDIT.md`, `T02-source-validation.json` (119 checks), `T04_CLAIMS_AND_SAROCHI.md` and `T02-shop/` canonical rendered smoke. Git/source/HTTP and bounded scene/product/gallery/prepared-photo flow verified. Deployed SHA parity, fresh-generation/fit quality and physical-device QA remain unverified and are not claimed.
- [x] **T03 [P0] Baseline metrics:** current production and local preview (if possible): FCP/LCP/CLS/TBT/INP proxy, FPS, payload, HTML presence, SEO metadata and a11y quick audit. **Accept:** raw report saved and limitations stated. One initial production build max when needed. Evidence: `docs/evidence/T03-2026-10-20/SUMMARY.md`, raw JSON/HTML/SSR/axe/cadence/Event Timing and checksum manifest. Baseline collection DONE; performance targets are not passed. Local EN self-redirect, contrast failures and run-specific limitations retained; one successful local build, no repeated full suite.
- [x] **T04 [P0] Content/claim review:** compare EN/FA/DE project and job IDs, education date discrepancy, phone public status, back-end/AI evidence, Sarochi current shipped state. **Accept:** a short approved-vs-unverified ledger, owner questions only when truly blocking public claims. Evidence: `docs/evidence/T04_CLAIMS_AND_SAROCHI.md` (2026-10-20). Review complete; publication of new phone/graduation/exact-human-VTO claims remains gated, no catalog change made.

## Stage B — art direction and shared foundation

- [x] **T05 [P1] Brand prototypes:** three sketches of original NM ligature; choose strongest after testing 24px favicon silhouette and mobile hero; 3D physical constraints, original license log. **Accept:** 2D SVG + a lightweight original 3D hero concept + two screenshots; no copied can silhouette. Evidence: `assets/NM_BRAND_PROTOTYPES.svg` (A split-plane selected, B shared-spine, C folded-ribbon), 24px previews and `brand-prototypes.png`; procedural hero + desktop/mobile hero screenshots in implementation evidence. Exact A paths match production SVG; gap/stem/extrusion/bevel constraints documented. Broader optical/fidelity review remains T06/T10/T28.
- [ ] **T06 [P0] Reusable tokens:** fixed palette, typography, spacing, motion tokens, components reused from current `src/components/ui`; Persian optical scale and no tiny body text. **Accept:** style tokens, EN/FA/DE typography snapshots, no duplicate uncontrolled style definitions.
- [x] **T07 [P0] Scene/controller prototype:** one persistent R3F scene, original monolith geometry, shared store and camera controls, minimal SSR fallback. **Accept:** renders without React 60fps state writes, no WebGL crash, verified context count. Evidence: `T-implementation-2026-10-20/rendered-flow.json` + source review: one persistent canvas, no runtime errors in EN desktop/FA mobile, per-frame transforms use refs; fallback removes the canvas. This does not close T25 profiling or T28 fidelity.
- [ ] **T08 [P1] NM loader:** state-driven 3D assemble → hero handoff, actual readiness handshake, fallback/timeout/reduced motion; preserve SSR. **Accept:** slow 3G / no WebGL / refresh / abort / keyboard all exit; no fake progress.
- [ ] **T09 [P0] Shared top chrome:** NM mark, two-way Projects/Experience toggle, language switch, contact CTA, crop marks/progress hairline only. **Accept:** no extra nav; route/query/focus behavior, keyboard, mobile layout.

## Stage C — reference-faithful motion experience

- [ ] **T10 [P1] Hero pose:** screenshot-calibrate size/camera/surface glint/wordmark; asset loader handoff. **Accept:** comparison images for desktop/mobile and successful first content paint.
- [ ] **T11 [P1] Arc rig:** position 7 original project slabs, selected bright + neighbors receding, original upper/lower mechanism. **Accept:** scene graph single pivot, selected ID stable, no visual overlap on key viewports.
- [ ] **T12 [P1] Scrub engine:** normalized scroll chapter mapping and reverse animation, use GSAP/Lenis only if justified. **Accept:** wheel/trackpad/scrollbar/reverse consistent; tests; no leaked tickers.
- [ ] **T13 [P1] Project transitions:** item 1–7 pose and copy masks, right rail/counter, selected links to real case studies. **Accept:** reference checkpoint screenshot comparison, text links functional, repeatable reverse/no jump.
- [ ] **T14 [P0] Experience mode:** 4 job slabs, exact titles/dates/company context, top switch morph, query/back/deep link. **Accept:** repeated rapid toggles stable, 4 entries, no lingering old IDs; 3 locales.
- [ ] **T15 [P1] Proof chapters:** four engineering beats/metadata/scene close-up with truthful evidence links; keep same 3D object. **Accept:** proof content real; 4 reversible transitions matching reference cadence.
- [ ] **T16 [P1] Statement and recap:** single dramatic statement, arc fan-out then smooth FAQ arrival. **Accept:** geometry/overlays no popping, route flow no accidental blank viewport.
- [x] **T17 [P0] FAQ:** up to 10 substantiated Q&A, accessible slim accordion, optional related case-study link, three languages. **Accept:** no fabricated tools/success claims, focus/ARIA/reduced motion tests. Evidence: nine substantiated Q&A with matching stable IDs/schema across EN/FA/DE; native `details/summary` semantics, focused Enter open/close passed desktop/mobile; static reduced-motion layout preserves native disclosure. See implementation summary; comprehensive a11y audit remains T22/T29.
- [ ] **T18 [P0] Contact/footer:** public channels + contact form/transport confirmation + resume + quiet footer. **Accept:** links verified, server says sent only on actual acceptance, no private data leak.

## Stage D — robust tri-lingual & device variants

- [x] **T19 [P0] Content addition:** integrate verified `sarochi-3d-shop` into three locales, source-controlled and schema-tested. **Accept:** 7 projects, no place-holder media broken, real features separated from planned VTO. Evidence: locale/content inspection (1,923 checks), 4 focused content tests PASS, three 1280×900 real WEBPs, localized DE route HTTP 200 with three images; appearance-preview limits retained. Source files are local/uncommitted; no publication implied. See implementation summary.
- [ ] **T20 [P0] Locale parity:** all navigation/stages/FAQ/loading/contact localized, metadata/hreflang, label direction, no missing keys. **Accept:** JSON/schema comparison, full route checks, EN/FA/DE screenshot suite.
- [ ] **T21 [P0] Mobile adaptive scene:** one focused object, native scroll touch, safe-area, tiny GPU budget, fallback tier. **Accept:** 360/390/430px and low-power test, no scroll trapping or CPU spikes.
- [ ] **T22 [P0] Motion/a11y fallback:** reduced motion, keyboard-only, 200% zoom, screen-reader names, WebGL denied/lost. **Accept:** all content accessible and usable without 3D.
- [ ] **T23 [P1] Secondary route preservation:** existing project case studies and resume still work, reflect global new brand and i18n. **Accept:** route link smoke test + no rewrite/destruction.

## Stage E — performance, security, SEO, final polish

- [ ] **T24 [P0] Asset audit:** compress/prune meshes/images/video, minimize fonts, prevent eager media loads, record asset-license file. **Accept:** actual transfer and decode-size table, budget deviations justified.
- [ ] **T25 [P0] WebGL performance:** adaptive DPR, mobile tier, frameloop pause, dispose resources; fps/jank/memory on representative device. **Accept:** no steady memory growth after 10 mode cycles, no duplicate RAF listeners, performance logs.
- [ ] **T26 [P0] SEO & server HTML:** localized updated AI Full-Stack titles/canonicals/OG/JSON-LD, sitemap and robots. **Accept:** SEO source inspection, no-JS semantic text, canonical/hreflang parity.
- [ ] **T27 [P0] Security/contact regression:** contact validation + rate limiting, env exposure, links, CSP/headers, file privacy. **Accept:** tested valid/error paths with no simulated success.
- [ ] **T28 [P1] Visual fidelity pass:** reference-vs-output video/frame overlay matching all 9 phases, on 1440 desktop + 390 mobile + FA/DE. **Accept:** issue list for all P0/P1 differences resolved or owner-approved exceptions.
- [ ] **T29 [P0] Milestone QA:** one stable production build, lint+types+unit+selected e2e/axe + Lighthouse mobile/desktop cold/warm, contact health and bundle inspect. **Accept:** raw results and commands recorded; no fake 100/100; all P0 accepted.
- [ ] **T30 [P0] Delivery & safe deployment handoff:** docs/decisions/assets/README/HANDOFF complete, exact next steps and rollback plan; preview approval then deploy only with owner approval. **Accept:** understandable clean diff, no accidental main deployment or secrets.

## Efficient validation policy

| Change type | Fast check | Milestone check |
|---|---|---|
| copy/locale | JSON parity targeted Vitest | three-locale screenshot/e2e |
| token/button | eslint relevant files, keyboard smoke | axe screenshot regression |
| geometry/material | dev screenshot, scene FPS, focused browser | full browser motion compare + WebGL memory |
| timeline | scroll forward/back mobile smoke | replay captures vs reference |
| SEO/metadata | generated HTML inspection + typecheck | production sitemap/robots/SEO audit |
| contact | schema unit + mocked response tests | one safe integration test (not actual unsolicited email) |
| deploy | inspect existing workflow/dry-run | production only after explicit approval |

## Task closure stub
Use `templates/TASK_UPDATE.md`. One task done ≠ every related integration done. Add evidence reference, exact modified paths, tests (PASS/FAIL/NOT RUN), discovered follow-up and next task ID. If task cannot complete, record reason and stop claiming success.


## Owner publication request - 2026-10-20

- [x] **U02 - Categorized GitHub publication and master merge:** Preserve all current work in at least 50 meaningful categorized commits, push the feature branch, merge it into `master` and push `master`. 66 scoped nonempty commits pushed on `feat/nm-kinetic-portfolio`; merged with `--no-ff` into new `master` and pushed. Remote SHA and ancestry verification passed; main baseline preserved. Final publication documentation is an additional master commit. Existing app acceptance gates remain unchanged. No tests/builds requested for this Git-only task.

## Owner publication request - 2026-10-21

- [x] **Categorized GitHub publication:** Existing loader/contact commits plus scoped media, geometry, solar/carousel choreography, locale payload, SEO/cache and evidence documentation published on `master` to verified public `Nima-Moradi1/nima-new-portfolio`. Application push through `5ba6e64` confirmed by remote SHA; final documentation commit follows. Fresh diff/media integrity/JSON checks PASS. No new runtime tests, build or deployment; U04 integrated performance acceptance and prior release gates remain open.

## Owner theme request - 2026-10-21

- [x] **U05 - Animated light/dark studio:** Add a polished light edition, compact 3D theme instrument, timed transitions/translations, corresponding NM logos/loaders and EN/FA/DE labels. Bounded acceptance PASS: shared palette reaches scene/portals/fallback/loading; preference and hydration persist; native reveal and fallback/reduced motion exercised; mobile controls fit. Full lint/typecheck, 57 tests and final production build PASS. Seven recorded production profiles plus API-disabled fallback; live native motion telemetry and screenshot hashes retained in `docs/evidence/U05-2026-10-21/`. Scoped theme/scene/evidence commits published to GitHub `master` through `0e2976c`, remote SHA verified; final publication record follows. Existing first-item detail-anchor boundary and wider release/device/reference gates remain outside this task; no deployment.

## Owner U06 performance request - 2026-10-21

- [ ] **U06 - Measured performance optimization:** In progress. Local production Lighthouse/browser loop; prioritize CLS/LCP, FCP, TTFB, TBT, synthetic INP and diagnostic TTI. See latest HANDOFF checkpoint. Owner separately requested publication of the current checkpoint; three implementation commits preserve it with fresh typecheck, scoped lint and six focused tests passing. Final performance/browser/milestone acceptance remains pending; field p75 is not established.

## Owner Git publication request - 2026-10-21

- [x] **U07 - Commit current checkpoint with meaningful messages:** Grouped asset delivery, home/scene startup, contact effects and handoff/task-board documentation. Source snapshot preserved; GitHub target is `origin/master`. Normal push and exact SHA/clean-worktree verification are the closure step. No deployment or changes to `main`.

## Owner outline redesign request - 2026-10-21

- [x] **U08 - Minimal conceptual 3D outline icons:** Replaced the proof sun/discs with original open interface/systems/AI/delivery metal symbols, raised orderly stations, reversible quarter-turns and physical softbox/rim/environment lighting. Existing text, locales, theme and scroll contracts preserved. Full lint/typecheck, 63 tests, one production build and six production viewport/locale profiles PASS; native forward/reverse, both theme endpoints, modal/mode and reduced motion pass with errors=[]. Concept/render comparison, repairs, limits, hashes and raw artifact locations: `docs/evidence/U08-2026-10-21/SUMMARY.md`. Owner authorized scoped commits and normal `master` push; exact remote SHA verification follows. U06 and wider release gates remain open; no deployment.
