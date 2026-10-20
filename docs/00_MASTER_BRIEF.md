# 00 — Master execution brief for Codex

**Mission:** Refactor and redesign existing `Nima-Moradi1/nima-new-portfolio` into a technically excellent, tri-lingual, accessible and cinematic portfolio whose **interaction grammar matches Ciao Energy as closely as permitted by new content and original assets**. Deliver functioning code, original logo/3D identity/loader, responsive 3D scroll narrative, verified content, and high real-world performance.

## Exact source set
- Primary motion/design reference: https://www.ciaoenergy.com/
- Existing live portfolio: https://nimamoradirad.com/
- Existing code: https://github.com/Nima-Moradi1/nima-new-portfolio (`main` in reviewed snapshot)
- New 3D shop: https://3d-shop-design.ir/
- Shop repository: https://github.com/Nima-Moradi1/sarochi-shop-design (returned 404 for current connector; permission/access needs confirmation)

## Expected result — high-level sequence
1. Branded NM kinetic monogram loader: gorgeous, short, meaningful and truthful state.
2. Minimal black/dark spatial hero; single centerpiece monolith with original NM wordmark, crop marks, subtle progress beam, disciplined typography.
3. A top **two-way Projects / Experience switch**, not a normal multi-route nav. Project track default, experience track selectable while preserving scroll/transition continuity. Single shared 3D carousel renderer; index-controlled scene/copy changes. Existing 6 projects + Sarochi = 7; jobs = 4.
4. Pinned, reversible, scroll-scrubbed arc carousel analogous to Ciao's six-can turntable: 3D plinth/rail, neighbor previews, one clearly lit focused item, side information, restrained rail navigation.
5. 4 proof-of-engineering chapters modelled on reference's four ingredient transformation steps: Frontend Architecture; Backend & Real-time; AI-enabled Product Engineering; Deployment, Quality & Performance. Claims must be evidenced from project content rather than unsupported mastery labels.
6. Signature statement, carousel closing pose, FAQ accordion based on projects/jobs, focused contact and quiet footer. No newsletter imitation; contact replaces newsletter structurally.
7. EN/FA/DE complete, same composition and equivalent density; RTL reverses input logic where necessary, not 3D photos or text textures.
8. Detailed case-study routes should remain accessible as secondary semantic pages; home must keep original reference rhythm without generic extra sections.

## Priorities, in order (P0 = never trade away)
P0 truthful résumé/contacts; stable working production routes; correct localization; no dead/infinite loading; mobile fallback; accessibility.
P1 reference-faithful scroll/camera/lighting choreography; original premium NM identity/logo/loader; scene continuity; meaningful interactions.
P2 real-world Web Vitals, GPU/CPU memory profile, SEO/indexing; robust design system and maintainability.
P3 enhancements such as subtle optional sound, additional lighting flourishes, secondary case-study artwork — only after P0-P2 accepted.

## What is / isn't verified at handoff
**Verified:** reference content/major flows via direct site extraction + specialist study/recreation report; source portfolio `package.json`, multi-locale JSON contracts, 4 jobs and 6 projects; contact component contains publicly configured linked channels; current homepage with portfolio content. 
**NOT verified:** frame-accurate scroll offsets, camera poses, easing or durations on original live browser; original site's source ownership/licensing; mobile WebGL behavior in real time; real 3D shop implementation details; measured performance baseline. This requires Codex live browser/repository access. Never claim these measurements happened in this ZIP.

## Non-negotiable task execution contract
- Do NOT code from this document alone: perform browser reference capture/task T01, inspect current source/task T02, and establish baselines before UI changes.
- Do NOT recreate reference assets from third-party source. Work from screenshots, observations, and original custom mesh/textures. No source-code lifting.
- Prefer adapting existing structure to avoid losing deployment, i18n, contact and content logic.
- Every animation has an exact purpose, owned state, reduced-motion path, pause rules and tests.
- No massive monolithic page or cross-project shared global `useState` for high-frequency movement.
- Add no dependencies unless necessary; if GSAP ScrollTrigger+Lenis selected, justify and use ONE scroll pipeline. Existing `motion` stays for UI-only animations.
- Before calling DONE: check three locale routes, real mobile and desktop UX, scroll backwards, WebGL failure, throttled connection, tab hidden, keyboard/touch, headings and SEO, and task-specific metrics.
- Don't run all checks repeatedly: use staged verification and a final milestone gate.

## Final success proof
A reviewer should see (a) strong recognizable *reference fidelity in camera/motion and section progression*, (b) unmistakably original Nima identity rather than beverage branding, (c) all current career/project facts preserved and new shop included honestly, (d) high-quality bilingual/RTL and German behavior, (e) no stutters or runaway memory on midrange phones, (f) semantic SEO even without canvas, (g) concise modular code that can be continued from handoff.

## Begin here
1. `git status --short && git rev-parse --short HEAD`.
2. `docs/07_TASK_BOARD.md` tasks T00→T02, stopping before implementation for any unresolved source-access dependency.
3. Read `docs/01_REFERENCE_RESEARCH.md` and `docs/05_MOTION_SPEC.md` during reference capture.
4. Update `HANDOFF.md` after completing each task; use `templates/TASK_UPDATE.md`.
