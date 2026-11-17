# Portfolio modernization execution handoff

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
