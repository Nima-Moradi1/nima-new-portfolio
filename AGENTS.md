# Codex Permanent Instructions — NM Kinetic Portfolio

## START HERE — every session (mandatory; token-efficient)
1. Read `HANDOFF.md` (state, last completed task, blockers, next task). Read `docs/07_TASK_BOARD.md` only around next task ID. Read the task-relevant spec, NOT every file on every session.
2. Run `git status --short`, note branch + HEAD; never assume the checked-out repository equals the snapshot in these docs.
3. Read existing implementations before creating new files or installing packages. Search by symbol/path; avoid repo-wide rereads unless architecture changed.
4. Work on **one explicitly scoped task**. If the next task is blocked, document evidence and move to next unblocked prerequisite, not a speculative rewrite.
5. After each completed task: scoped verification → update `HANDOFF.md` + checkbox in task board + compact entry in `HANDOFF.md` changes/evidence; commit only if user/working arrangement permits.

## Non-negotiable design
- Reference: https://www.ciaoenergy.com/ — preserve spatial composition, 3D scroll storytelling, carousel handoffs, camera/light rhythms, loader quality, narrow top chrome, FAQ/contact close; replace every energy-drink object and all Ciao branding with original NM design.
- Switch **Projects / Experience** in compact top control; NO third portfolio category tab or busy nav. Language control EN/FA/DE and contact remain minimal. Avoid cards/grids on the immersive home. Project detail pages can stay as semantic secondary routes.
- Brand identity: `Nima Moradirad`, positioning **AI Full-Stack Developer** (frontend, backend, AI-enabled work, deployment/DevOps). Never retroactively rename historic job titles or imply ownership of systems that were only collaboratively delivered.
- Featured new project `3D Interactive Shop / Sarochi` at https://3d-shop-design.ir/; code repo https://github.com/Nima-Moradi1/sarochi-shop-design . Verify repo access and live features before stating shipped implementation details. Do NOT claim VTO photo-real human try-on works unless verified.
- EN, FA (RTL), DE, schema parity and correct bidi. For Persian DISPLAY headlines target **0.60–0.82** of matched Latin visual size (up to 40% smaller); do NOT shrink legible body, labels or focus targets below accessible minimums.
- Follow `docs/02_ART_DIRECTION.md`, `docs/03_TECH_ARCHITECTURE.md`, `docs/05_MOTION_SPEC.md`, `docs/06_PERFORMANCE_SEO.md`.

## Forbidden shortcuts
- No replacing the reference carousel with a conventional project grid, generic neon dashboard, random blobs, stock illustrations, oversize headings, busy hero or multiple unnecessary sections.
- No copying Ciao source/assets, logo, cans, fonts without license, sounds, licensed models or protected brand graphics. Reproduce observable interaction pattern, not third-party artwork.
- No mock testimonials, made-up KPIs, fabricated team responsibilities, invented phone/email, or invented back-end/AI claims.
- No fake loading numbers. Never hold users behind an infinite loader or artificially delay LCP/FCP just to display animation.
- No new framework, package, CMS, state library, animation library or global CSS rewrite without evidence of need and explicit decision-log entry; use existing React 19 / Next 16 / Tailwind 4 / next-intl / R3F tools.
- No render-loop React `setState`, redundant RAF/tickers, wheel `preventDefault` hijacking, continuous shadows, unbounded DPR or heavy postprocessing on mobile.
- No repeated full builds on each tiny task. No test runs with no impacted files. No deleting existing SEO, contact API, deployment workflows, content, resume PDF, or detailed case-study routes.
- No deployment, rewriting `main`, changing Liara secrets/environment, contact forwarding configuration, auto-push, automatic publishing, or deleting branches without express user approval.
- No assumptions that a 404 GitHub repo is nonexistent: treat as access blocker and re-check with intended account.

## Tests with discipline
- Pure type/content changes: focused file diff, JSON/schema check, targeted test; skip full build.
- Motion or canvas changes: relevant unit test + one representative browser flow; mobile safety check.
- Content/localization: locale parity, `dir` and bidi, path preservation, metadata check.
- When milestone complete: lint + typecheck + tests + production build once. E2E/Lighthouse on stable milestone builds, not every file edit.
- Compare output to reference at matching scroll checkpoints; log source timestamps, screenshots, deviations, and measurements. Only call a task DONE with recorded evidence.

## Persistent handoff protocol
At the END OF EVERY TASK (before context ends):
- Update `HANDOFF.md`: current state, what changed (paths), decisions, discoveries, remaining work, blockers, next exact action, key files, validation command/result, new risks.
- Mark the task in `docs/07_TASK_BOARD.md` complete ONLY if acceptance criteria have passed; otherwise keep open and explain partial progress.
- Never erase prior evidence or report verification not run; append one short dated session log entry.
- If near token/context limit: stop coding early enough to save state, next runnable command, next file to read.

## Verification / honesty
Project presently has 6 existing projects + 4 jobs from structured three-language files; shop project is new and provisionally 7th. Reference minute-level animation timings remain **to be measured**. Read `docs/09_SOURCE_LEDGER.md` for fact vs inference. No Lighthouse scores have been measured in this handoff.
