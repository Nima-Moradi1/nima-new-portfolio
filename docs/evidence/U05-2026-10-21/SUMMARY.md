# U05 — animated light/dark theme (2026-10-21)

Owner scope: add a light edition, animated 3D switching, matching NM branding/loading, EN/FA/DE labels, then commit and push. Baseline: clean `master` at `e2e399dd2d7a6e4ebe1baa0302006ae010626176`, remote `Nima-Moradi1/nima-new-portfolio`. GitHub public metadata and the existing `main`/`master` refs were freshly checked. This is a theme task, not full reference or release acceptance.

## Implementation and decisions

- Shared document-level registered NM colors replace the immersive root's hardcoded dark override. The new pearl/ink/teal/violet light palette reaches FAQ/footer, reader fallback, preview chrome, Radix language portal, contact portal, loading and inline marks. Existing semantic light tokens also use this family on secondary routes.
- The compact 44px sun/moon instrument has translated action labels and pressed state. Native view transitions reveal the target palette from the instrument with a 1000ms circular aperture, perspective and vertical translation. Independent instrument snapshots turn out for 450ms and in for 550ms. Descendant color transitions are disabled only while capturing these endpoint views; unsupported browsers retain CSS interpolation.
- The existing R3F callback updates studio background/fog, hemisphere ground color, shell/smoke colors and glass-theme uniform, with a finite physical turn/lift/recede. No additional canvas, package, postprocessing, continuous ticker or loading delay. A synchronous advance of that same scene owner synchronizes native capture; no RAF is awaited inside the browser callback. Reduced motion switches directly.
- Theme preference survives reload/hydration, syncs across tabs, works without storage, updates browser color/favicon, and rejects stale callbacks during rapid switching. The light-background symbol was aligned with the palette; matching wordmark and light favicon added. Route loading reuses the dimensional NM loader.
- Mobile chrome gives the mode switch its own grid row; the contact label remains on one line. Existing case-study routes, project imagery, job records, contact links, package lockfiles and deployment workflow are preserved.

## Fresh verification

| Check | Result |
|---|---|
| `npm run lint` | PASS, exit 0 |
| `npm run typecheck` | PASS, exit 0; final build repeats TypeScript successfully |
| `npm run test` | PASS, 11 files / 57 tests |
| `npm run build` | PASS; final optimized build has 24 generated pages and preserved routes |
| Built CSS/source match | PASS for final aperture easing and independent orb keyframes |
| Theme key parity / UTF-8 | PASS, EN/FA/DE matching keys; Persian has real characters |
| `git diff --check` | PASS |

Browser method: existing Playwright with installed Chrome, because Browser plugin/skill is not available. Production served by the repository's `npm run start -- --hostname 127.0.0.1 --port 3100`. Next emits its existing standalone-mode startup advisory; the local production routes render and the runner exercises them. No deployment was performed.

The runner and raw screenshots live outside the checkout at `%TEMP%/nm-theme-qa.cjs` and `%TEMP%/nm-theme-20261021-verified/`. `validation.json` and `screenshots.json` here retain bounded results, original capture times and SHA-256 values. Viewports: EN/DE desktop 1440×900, FA 390×844, DE 430×932, EN 360×640, plus EN reduced motion at 360×640. The native-API-disabled fallback is exercised at 390×844. The script covers mouse/touch-sized control activation, Enter/Space, four rapid switches, reload persistence, the second project preview, Experience/FAQ, and genuine critical-image gate/release. No external demo completion or contact transmission is claimed.

## Visual comparison ledger

User-approved direction is the retained NM composition with a new light edition. Existing reference calibration remains partial; these checks do not claim new Ciao timing measurements. Production screenshots were opened with `view_image` at their captured viewport dimensions.

| Comparison point | Evidence / finding |
|---|---|
| Hero layout and typography | Dark/light desktop retain the original hierarchy, spatial NM sculpture and body copy; no new visible hero copy or category |
| Endpoint palette | Light background `rgb(237,242,243)`, primary `rgb(23,43,54)`, muted `rgb(80,101,112)`; dark endpoint retained |
| Transition readability | Initial color blend produced a grey midpoint; replaced with crisp old/new native snapshots and an independent orb turn |
| Branding and loading | Light hero glass, ink inline marks, light favicon and dimensional metallic loader observed; gate releases on actual requested-image settlement |
| Contact/preview surfaces | Contact portal has light surfaces and all five existing links; preview chrome and tool chips have ink/teal colors |
| Mobile/RTL chrome | FA direction and Persian copy preserved; all measured header controls stay inside viewport; small EN contact label no longer wraps |
| Reduced motion / fallback | Static reader edition and zero instrument transition duration; unsupported native API still changes the real theme |

Calculated endpoint contrast against the page background: light primary 12.96:1, muted 5.41:1, accent 5.49:1; dark primary 18.77:1, muted 9.43:1, accent 14.46:1. These are token-pair calculations, not a whole-site accessibility audit.

## Diagnostics and limits

- Live QA exposed an initial hydration effect resetting persisted light mode. Fixed by reflecting the live document snapshot; a server-markup hydration regression test and fresh reload flow pass.
- Early harness runs used an incorrect detail selector and then hit the unchanged first-item detail anchor at the assembly/carousel boundary (`y=2040`, section height `8091`). The second-item preview was exercised successfully. The first-item anchor equations were not changed in this theme task; their boundary remains a separate follow-up, and first-item preview acceptance is not claimed here.
- An imperative timing probe caught a native capture stall: waiting on RAF inside the view-transition callback prevented its snapshots from becoming ready. Replaced that wait with a synchronous React commit and one synchronous advance of the existing R3F owner, using the direct theme event across the Canvas context bridge. In the final production probe the callback completed in 2.9ms, ready resolved 23.9ms after callback entry, real aperture/orb pseudo-element animations were running at the 91/263/551/901ms samples, and all were gone at 1601ms. Native finish resolved 1035.1ms after callback entry. `motion.json` preserves the raw single-run values; these are not universal device timings. Final rapid-switch checks await actual native completion with a bounded timeout. Earlier fixed-delay assertions and stalled captures are not passing evidence.
- Shader compiler precision warnings were observed in early runs, with no recorded application/page errors in the passing flows.
- Physical-device GPU/FPS/memory, Safari/Firefox rendering, Lighthouse/field metrics, all external demos, full reference fidelity and existing release gates remain unverified. Native reveal support is feature-detected; fallback and reduced motion are tested.

Publication authorization covers the existing GitHub `master` branch. `main` is the repository's default/deploy branch and is not a publication target for this task. No production settings or workflow changes are authorized or included.
