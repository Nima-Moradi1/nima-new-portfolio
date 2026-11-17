# Portfolio modernization execution handoff

LATEST: first release candidate failed container smoke before deployment. Root cause isolated and fixed in `deploy/package.sh`: traced public directory already existed, so `cp -a public target/public` nested assets under public/public. Use content-copy `public/.` and `.next/static/.` into explicit destination directories. Production was not changed by failed run 44126431506. Next: commit/push packaging correction to feature and main, await full workflow and verify production.

Updated: 2026-11-17. Requested scope: attached master execution brief and supplied original PDF résumé. Keep this file until implementation, tests, build, deployment and production verification are complete; then commit its removal.

## A. Project overview

- Checkout: `C:\Users\n_moradirad\nima-new-portfolio`, baseline `a09667a`, branch `main`, origin `Nima-Moradi1/nima-new-portfolio`.
- Next.js 16 / React 19 / TypeScript, npm lockfile, next-intl EN/FA (RTL)/DE, Tailwind and scoped CSS artwork. Preserve dark/green identity and existing architecture.
- Content: `src/messages/{en,fa,de}/portfolio.json`, common labels, localized case studies, `src/content/project-evidence.ts`.
- Optional hero workstation: HeroStudio -> dynamic InteractiveStudio -> R3F DeskScene. No homepage loading gate.
- Existing deployment: main push -> GitHub Actions lint/types/unit/build/Linux standalone/container smoke/Liara/exact SHA verification. Liara app `nimamoradirad`; domains nimamoradirad.com and nimamoradirad.liara.run.
- Read README, DESIGN_SYSTEM, PERFORMANCE and deployment workflow. No AGENTS.md found in checkout/parent/user root.
- Pre-existing untracked `.tmp-moradi-gallery/` belongs to user; preserve and exclude from commits.

## B. Requirements and acceptance criteria

- Repair Explore 3D activation/transition, pointer/touch lifecycle, rendering performance, graceful WebGL/reduced-motion behavior; actual interaction validation.
- Original PDF authoritative for roles/dates/employment/education; replace download and preview without regenerating original facts. Brief separately authorizes AI agent, security, real-time, broader systems, Capacitor Android/iOS and performance capability descriptions. No invented metrics or confidential disclosures.
- Modernize homepage/experience/skills/case studies and metadata in EN/FA/DE; clear Senior Software Engineer positioning with frontend specialization and selective emphasis.
- Moradi Gallery and 3D shop: consistent confidential MVP notices. EmeraldCase: temporary processing-server unavailability. Remove all public Tarabari routes/content/assets/references.
- Preserve accessible responsive design, RTL/LTR, navigation, themes and static access.
- Run lint/types/unit/e2e/accessibility/production build and performance audit; distinguish lab/field metrics and document limitations.
- Review and commit categorized milestones with this handoff; push progress to a feature branch. Publish verified result through existing Liara workflow, verify exact production SHA/locales/assets/download/interactions, record final report, then remove handoff.

## C. Implementation status

- Inspection: IN PROGRESS (core architecture inspected; PDF extraction dependency installing).
- 3D repair: NOT STARTED.
- Resume/content/localization: NOT STARTED.
- Project corrections/removal: NOT STARTED.
- Tests/performance/build: NOT STARTED.
- GitHub incremental delivery: NOT STARTED.
- Liara deployment/production verification: NOT STARTED.

## D. Completed work

- Read execution brief, identified original resume path and current checkout/deployment workflow.
- Confirmed clean tracked files; only pre-existing untracked directory above.

## E. Remaining work

1. Extract original PDF and inspect focused content/3D code; establish feature branch and synchronize handoff.
2. Fix and validate optional 3D activation/performance.
3. Update original résumé asset, all professional/localized content and project corrections; update deployment verifier/tests.
4. Run checks, fix issues, audit lab performance and review responsive screenshots.
5. Publish verified release using existing production workflow; smoke-test production; final record and handoff removal.

## F. Current execution state

- Reading full source PDF (PyMuPDF installation pending) and isolating 3D root cause.
- Next: inspect source PDF, content types and DeskScene layout/canvas readiness.
- `gh` unavailable on PATH; Liara CLI 9.7.0 is available. Use Git and GitHub API/installed executable if needed; never print credentials.

## G. Engineering constraints

- Do not overwrite user changes, add unnecessary dependencies, fabricate professional facts, train-model claims, performance metrics or backend ownership.
- Do not change DNS/infrastructure or EmeraldCase processing services. Keep private source confidential.
- Avoid raw HTML for content emphasis; keep all translations structurally consistent.
- Main pushes trigger production: use feature branch for incremental progress until verified.

## H. Build, testing and deployment status

- No tests/build/deployment yet. Python lacked PyMuPDF; installing locally for read-only extraction/rendering.
- Historical verification notes are not evidence for this revision.

## Milestone: source and implementation (2026-11-17)

- Original two-page PDF extracted and visually inspected. Authoritative chronology: Hesabo Aug 2025 onward; Chapter Lead Apr 2026 onward; prior Senior Frontend Developer Aug 2025-Apr 2026; Basilica Mar 2024-Mar 2025; other dates unchanged. Education has no supplied graduation year; English C1 is the only listed language. Removed unsupported graduation/language claims.
- Original 85,714-byte PDF copied unchanged; first-page WebP rendered. Source reports 17% smaller bundle and 9% better initial loading; site attributes these to résumé rather than independent measurement.
- EN/FA/DE positioning, five role entries, seven capability groups and four complete case studies implemented. AI/mobile additions explicitly supplied by brief, not assumed employer achievements. MVP/confidential labels and temporary processing outage implemented.
- Removed project-specific Tarabari route, catalogs, components, public assets, message imports and sitemap entry. Release verifier now checks current routes/status/copy and removal in every locale.
- Root cause reproduced: texture suspension propagated through R3F Canvas; deferred renderer teardown invoked forceContextLoss on the live canvas. Explicit inner Suspense boundary fixes the reproduced failure. Added readiness transition, scoped OrbitControls using existing Drei, native keyboard-operable rotation buttons, mobile access, context-loss fallback and 15Hz editor texture updates. Reduced motion uses demand frames.
- Initial lint: 0 errors, 1 pre-existing OG-image img warning. Initial unit run 37 pass / 2 stale reader expectations; updated expectations. Initial typecheck found stale generated Azita route types, not source errors; production build regenerates types. First production compilation/types/static generation passed; final tracing pending.
- Next: complete browser coverage, inspect screenshots, run all source checks and lab audit; then commit/push meaningful milestones, release and verify production.

## Milestone: regression coverage and performance review

- Content milestone committed and pushed: `09fe980`; initial handoff: `52ca02a`. Feature branch is `feat/portfolio-modernization`; production main remains unchanged until checks finish.
- Unit suite: all 39 pass. Baseline browser suite: all 16 pass on desktop/mobile (EN/FA/DE reflow 320-1440, navigation, static JS-disabled access, both themes and axe accessibility).
- Additional 3D/download/removal browser checks: 8 pass. These verify frozen reduced-motion frames, pointer/keyboard rotation, repeated activation, unsupported WebGL and simulated context loss, original PDF bytes and removed routes. Added actual touch and locale-switching journeys for final run.
- Production build and regenerated typecheck passed. Stale generated Azita types disappeared after build.
- First Lighthouse 13.6 local lab: mobile performance 88, FCP 1.213s, LCP 3.794s, CLS .00135, TBT 85ms, Speed Index 1.553s, server response 6ms; desktop performance 100, FCP .286s, LCP .794s, CLS .0188, TBT 3.9ms, SI .548s, server response 7ms. No field/INP dataset.
- Audit identified missing priority on mobile LCP preview and label/name mismatches in brand and locale controls. Addressed image preload/high priority and matching accessible names; rerun required. Local SEO canonical warning expected because canonical points to production domain.
- Existing production workflow failures traced via GitHub logs: obsolete required `/assets/projects/tarabari-nima/home.webp` returned 404. Updated verifier removes old dependency and asserts absence instead.
- Confirmed authenticated Liara app `nimamoradirad`, docker small-g2, ACTIVE. GitHub access works through existing Git credentials without printing them. Existing release workflow remains the deployment path.

## Final interaction milestone

- All 27 applicable browser tests passed (one desktop skip is a touch-only test). Actual horizontal CDP touch gesture, keyboard and pointer rotation, language switching and route retention verified.
- Mobile LCP remained ~3.96s in isolated simulation after image priority; investigation showed the newly exposed large mobile artwork became LCP. Changed mobile to compact opt-in 3D control: preview and canvas appear on activation, retaining the original initial reading composition without hiding the feature. Desktop priority preload retained. Final measurements pending.
- Refined résumé preview description to match its actual first page and removed unsupported German language knowledge from Person schema. Final test/build after these small changes pending.

## Release candidate validation

- Final mobile compact-view Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 92 (canonical points to production, so local SEO warning is expected). Mobile lab FCP/LCP 1.220s, CLS 0, TBT 91ms, Speed Index 2.032s, server-response diagnostic 103ms. Prior desktop lab: Performance 100, LCP .794s, CLS .0188. Field p75/INP unavailable.
- Original-source and public PDF SHA-256 are identical: D3A8412B034586FC556AAB3D8888C6B7C5C78222B207BE0F58893A91F81E4CDD.
- Latest unit suite 39/39 pass; source and test typecheck passes. New context-loss test required an HTMLCanvasElement type assertion; corrected. Final browser run pending, then release candidate commit/push and production workflow.

## Production deployment in progress

- Final release candidate `b4cf55907557d77e9270e6ebf7c8251bdca80438` built successfully with DEPLOYMENT_SHA set. Local `deploy/verify.mjs` passed all 18 localized routes, removed-route behavior and 26 exact asset hashes.
- Pushed the verified feature history to main without rewriting history. GitHub Actions run: https://github.com/Nima-Moradi1/nima-new-portfolio/actions/runs/44126431506 . Locked npm install, lint, typecheck and unit tests have passed; Linux production build is in progress.
- Final local browser suite 27 passed / one intentional touch-only desktop skip. Decoded Persian mobile and German desktop assets/layouts inspected; no browser page errors.
- Do not advance main while release.mjs is running: it verifies main still matches the release SHA. Keep handoff until exact production SHA, all locales/assets/download and browser checks pass. After completion, documentation-only result/handoff cleanup commits may use [skip ci] to avoid rebuilding unchanged application code; report deployed source SHA separately.
