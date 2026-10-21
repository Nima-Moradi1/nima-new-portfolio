# U03 — Owner visual/mobile corrections — 2026-10-20

Local implementation on `master`, starting at clean `9c56bcf`. No commit, push, deployment, package install, environment/forwarding change or production build. Earlier T01/T20/T21/T25/T28/T29 acceptance limits remain open.

## Delivered against the ten requests

| Request | Result and evidence |
|---|---|
| 1 — Layout / reading rhythm | Explicit locale direction, consistent copy columns, balanced headings, full-width centered FAQ container. Desktop prose is justified; narrow prose uses natural alignment to avoid stretched word gaps. FA optical headline scale and 14px mobile prose retained. `fa-faq.png`, `fa-rack.png`, mobile captures. |
| 2 — Telephone | Contact dialog adds `tel:+989036837788` with explicit LTR number isolation and EN/FA/DE labels. Five existing/owner-authorized channels; no real call was placed. `mobile-contact.png`, `validation.json`, `touch-fallback.json`. |
| 3 — Four-stage solar scene | Old proof cartridge/marks replaced with a warm procedural sun, tilted physical orbits, four sphere/emblem planets, selected-planet approach/scale, tapered sunlight and actual spotlight. One reversible schedule coordinates orbit, beam and readable HTML; final statement stays lit through the sticky tail. `fa-solar.png`, `mobile-solar.png`; choreography unit tests. This replaces the four engineering stages shown in the supplied screenshot, preserving historic job records. |
| 4 — Initial readiness / CTA removal | Boot overlay exists in server HTML. Real font settlement, seven already-requested project capture settlements and a rendered frame precede entry. No Enter/View Project button in loader or hero. Auto semantic fallback at 6.5s for an unusable scene. `validation.json`: delayed critical asset holds gate; release follows readiness. |
| 5 — Loader design | Larger original NM extrusion with metallic face, three animated orbital planes, glints and grounded light. CSS/SVG only, one portfolio WebGL canvas. No percentages, artificial minimum delay or extra renderer. `loader.png`. |
| 6 — Rack / copy synchronization | Assembly copy is withheld. The rendered rail deployment writes `--rig-reveal`; copy cannot lead the actual damped rack arrival. Unit test covers assembly suppression and preview handoff. |
| 7 — Physical rack / direct manipulation | Cartridges widened 22%; deeper bevelled shells, layered backplates, smoked bezels, physical latches/collars and twin bridged rails. Removed screenshot-overlay bars, arrow controls and selector dots. Native scroll and horizontal mouse/touch drag control selection; drag does not open a project. `fa-rack.png`, `mobile-rack.png`, interaction results. |
| 8 — Number rail removal | Removed the vertical proof-number navigation and old item selector controls. Keyboard arrows/Home/End remain available through the scene's accessible slider. |
| 9 — Mobile identity | Mobile hero renders the real glass NM geometry; fallback is hidden only after scene readiness. `mobile-hero.png`. |
| 10 — Mobile choreography | Removed viewport-size-triggered reading mode. Portrait and short landscape retain the single 3D scene. Mobile project section shrinks from the former 9.15 viewport CSS distance to about 3.54; proof from 5 to 2.6. Horizontal touch can browse without traveling those vertical distances. Short landscape copy and stage headings have separate space. `profiles.json`, `touch-fallback.json`. |

## Fresh verification

- `npm run typecheck` — PASS.
- Scoped ESLint for all changed TypeScript/TSX and two focused tests — PASS. Final layout/home recheck — PASS.
- `npx vitest run tests/unit/kinetic-choreography.test.ts tests/unit/kinetic-boot-loader.test.tsx` — 2 files, 10 tests PASS.
- `git diff --check` — PASS.
- Browser plugin/skill unavailable; existing Playwright with installed Chrome used at `http://127.0.0.1:3100/`, `/fa`, `/de`. Existing dev server reused, no dependency installation.
- Seven locale/viewport profiles: EN/FA/DE 1440×900; FA 390×844; EN 360×640; DE 430×932; DE 844×390. Meaningful pages/localized titles, one canvas, interactive edition, no horizontal overflow, no framework overlay and no page errors. Bounds/section distances: `profiles.json`.
- Flow: hero → rack → mouse drag → project preview → close → drag to next → keyboard End → proof keyboard advance → contact/phone → FAQ disclosure. Critical-asset delay → truthful loading gate → successful release. Reduced motion and no-JavaScript fallback. Results: `validation.json`; `errors=[]`.
- Actual emulated touch events via Chrome CDP: horizontal drag selected another project, vertical touch scrolled natively, four-job switch kept one canvas, phone direction/href passed. Denied WebGL exited to reading edition. Results: `touch-fallback.json`.

## Corrections found during verification

- Retained project preview intervals initially made horizontal drag jump backward; drag now removes/reinserts the interval when translating native scroll coordinates.
- Last proof copy initially faded before the sticky section ended; last-stage illumination now holds until exit.
- Reduced-motion preference initially changed the first client tree before hydration; it now takes effect after the shared client snapshot, eliminating the mismatch.
- No-JavaScript streaming initially left the semantic page inside React's hidden segment. A narrow `noscript` base-layer rule exposes the kinetic home segment and hides its loaders. Base-layer placement is required because Tailwind's important hidden rule outranks unlayered important styles.
- Early temporary harness attempts used a smooth jump without waiting for its destination, assumed Tarabari was the final project (actual final record: Lingo Learn), and delayed a noncritical optimized image. Corrected runners use instant measurement anchors, the real ordered content and the exact critical capture URL. Those harness assumptions are not product failures.

## Visual comparison boundary

Reference: owner's supplied screenshots 1–7 in the 2026-10-20 request (no recording timestamps provided). New proof solar choreography, wider physical rack, removed controls and shorter mobile sequence intentionally supersede the corresponding old storyboard. Matching local checkpoints are work progress `.26`, proof `.375`/`.625`, hero and FAQ; retained images show those states. This is not a new Ciao frame/easing calibration or a measured performance certification.

Physical iOS/Android hardware, device GPU/FPS/memory, production build, Lighthouse, broad E2E/security/contact transport and all external embedded demos were not retested. No changed shop/hosting policy, backend claims, resume PDF or deployment workflow.

Temporary runnable browser scripts: `%TEMP%/nm-u03-flow.cjs`, `nm-u03-profiles.cjs`, `nm-u03-touch.cjs`. Additional checkpoints and diagnostic captures: `%TEMP%/nm-u03-review/`. Owned browser contexts closed; pre-existing dev server left running.
