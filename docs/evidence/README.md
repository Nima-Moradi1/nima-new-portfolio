# Execution evidence index — 2026-10-20

Working branch `feat/nm-kinetic-portfolio`, baseline commit `a18911c0f9f493eed70fd8c65f844d6853be1e44`. The requested `updated-portfolio` workspace is an isolated worktree. **Current application implementation is uncommitted and has changed from baseline**; no lockfile, deployment workflow, contact setting or deployed site was changed. Earlier Stage A reports below describe the unchanged source at audit time.

**Current integration:** [Implementation summary](T-implementation-2026-10-20/SUMMARY.md), [desktop/mobile flow](T-implementation-2026-10-20/rendered-flow.json), [corrected proof/idle rendering](T-implementation-2026-10-20/proof-idle.json), [HTML/form](T-implementation-2026-10-20/html-form.json), brand studies, final FA spacing screenshots and explicitly retained first-attempt resize harness output. T05/T07/T17/T19 are accepted within their documented scopes. Broader QA/build/fidelity remains pending.

| Task | Recorded status | Evidence / verification |
|---|---|---|
| T00 | PASS | [Safety snapshot](T00_SAFETY_SNAPSHOT.md): original clean main preserved, 18 ZIP SHA-256 entries verified, isolated feature branch. |
| T01 | **PARTIAL** | [Reference measurements](../REFERENCE_MEASUREMENTS.md): installed Chrome real WebGL, 34 checkpoints and unaltered video per 1440×900/390×844 profile. Detailed individual flavor/frame/easing/camera/input calibration remains required. |
| T02 | PASS, bounded audit | [Portfolio source/reuse map](T02_SOURCE_AUDIT.md), [119 checks / zero failures](T02-source-validation.json), [canonical shop raw smoke](T02-shop/rendered-smoke.json), six shop screenshots and first-attempt harness failure preserved. |
| T03 | PASS, baseline collection | [Measured baseline summary](T03-2026-10-20/SUMMARY.md): one build PASS; production mobile/desktop + local FA Lighthouse raw JSON/HTML; failed local EN report, SSR, axe, frame-cadence/input proxies and 36-file checksum manifest retained. Targets have not passed by recording a baseline. |
| T04 | PASS, review only | [Claims/Sarochi ledger](T04_CLAIMS_AND_SAROCHI.md): Git access resolved, old vs current VTO source separated, bounded runtime flow verified, historic roles preserved; owner facts and advanced claims deferred. |

## Next action without repeating research

Read root `AGENTS.md`, `HANDOFF.md` and the current implementation summary before continuing. Runtime implementation now exists; the task board distinguishes implementation from remaining acceptance. Next reference work uses the saved T01 recordings for T28 comparison; do not restart the runtime or repeat the baseline. The single-object-first NM opening and native seven-item scroll are deliberate proposed adaptations, not a measured source match. Full builds/Lighthouse/broad suites were deferred by the user.

Baseline findings are retained unchanged. Current integration fixes EN loopback routing, removes the old noncritical loader dependencies and verifies meaningful server HTML; historical scores/contrast findings do not certify the new implementation. Source/current production identification remains in T03.

All owned browser contexts and the local server were stopped. `node_modules` is a deliberately reused directory junction to sibling dependencies; replace it before any install/update. No new app package was installed. The original ZIP SHA manifest applies to the untouched sibling extraction, while the worktree handoff/task board evolve. T03 has a separate current evidence checksum manifest.

## Focused utility validation

The standalone `.cjs` audit helpers use Node CommonJS intentionally. Initial scoped ESLint found only `@typescript-eslint/no-require-imports`; a per-file justified exception was added, with no global config changes. Final scoped lint/syntax/integrity results are recorded in root handoff. This is tooling validation, not an executed app unit/E2E suite, complete accessibility audit, field CWV, physical-device test, contact delivery or VTO generation claim.
