# 01 — Ciao Energy forensic design & interaction specification

> Accuracy classification: `[OBSERVED]` direct textual page, `[CORROBORATED]` independent design studies, `[RECONSTRUCTION]` third-party recreation, `[PROPOSED]` implementation target to calibrate, `[UNVERIFIED]` browser measurement unavailable. Never mislabel proposed timing as source fact.

**Execution update 2026-10-20:** live installed-Chrome captures and actual section/scroll measurements now exist in `REFERENCE_MEASUREMENTS.md`. Reuse the saved desktop/mobile recordings; do not repeat the full capture checklist blindly. T01 remains PARTIAL for individual selection replay and calibrated frame/easing/camera/input checks. The measured source begins with a ring/lineup; the single-object-first storyboard below is still a proposed portfolio adaptation.

## Findings with sources

- `[OBSERVED]` Ciao has six named product variants, a scroll invitation, four technical/product transformation chapters, FAQ (10 visible questions), a signup/contact-style section and footer: https://www.ciaoenergy.com/ .
- `[CORROBORATED]` Overall look: near-black photo-studio environment, centered floating models, heavy italic typography, top-centered brand, four crop marks, rainbow-ish progress/select control, compact edge data, right-side active-icon rail, enormous visual whitespace: https://katapick.com/sites/ciao-energy .
- `[CORROBORATED]` Multiple cans suspended between upper/lower rotating discs; scrolling rotates a single turntable-like rig and brings the selected can to center: https://riccardomarconato.com/blog/ciao-energy-range-on-a-turntable .
- `[RECONSTRUCTION]` A public reverse-engineered study reports Webflow + Three.js + GSAP/ScrollTrigger/SplitText + fixed canvas + optional sound; hero → six variants in arc → four transformation chapters → FAQ → signup → footer: https://github.com/KuldeepMahto07/ciao/blob/main/reference-analysis.md . This is **not** the original source; animations are reported approximate.
- `[CORROBORATED]` Creator Skaald describes design/3D/site project: https://www.skaald.com/ and https://www.linkedin.com/company/skaald/ .

## Reference scene anatomy (map visual identity, NOT exact legal identity)

| Source visual | Destination | Retain | Change |
|---|---|---|---|
| Black void with controlled glow | Midnight studio | low-contrast spatial horizon, moving spotlights | colors + authored lighting |
| CIAO top wordmark | Original NM wordmark | centered persistent logo and clean negative space | unique NM ligature and type |
| Metallic floating beverage can | Premium beveled 3D **career/data monolith** | near camera hero, shadows/reflections, slanted poses, arc tracking | new silhouette entirely; NOT a can |
| Six-can turntable | 7-project monolith ring / 4-job monolith ring | full 3D arc, adjacent dimmed objects, selected object bright | number varies by mode, geometry and content |
| Product variant selection | Project/job selection | scrub movement, centered label, nearby titles, progress | semantic content and accessible clicks |
| Four ingredient fact chapters | Four engineering disciplines | one large object with changing pose and clear explainer copy | real engineering proofs and tools |
| FAQ | Work & technology questions | restrained accordion geometry and thin separators | truthful resume/project answers |
| Newsletter | Contact | elegant CTA region paced like original ending | real social links/contact, no fake subscription |

## Global fixed chrome
- Tiny top progress hairline, display entirely controlled by normalized scroll percent.
- Top center compact `NM / NIMA MORADIRAD` mark; top left understated capability/sound indicator *only if functioning*; top right two-tab switch plus language + contact (no hamburger mega-menu).
- Four sub-pixel-feeling crop brackets in CSS/SVG (respect visual device pixel ratios) and vertical `NIMA MORADIRAD / AI FULL-STACK` ambient text at low alpha.
- Hero glyph and copy must never collide with system safe areas (iOS notches), tabs, or footer.
- High-contrast active selection: lit model, text, and indicator; nonactive objects stay legible silhouettes.

## Section order and scroll grammar

| Chapter | Desired visual behavior | Interaction equivalence |
|---|---|---|
| Loader L0 | Black field, 3D NM parts align, narrow progress rail, short wordmark reveal | source branded loader experience |
| Hero H0 | One polished NM monolith front-facing, subdued glyph behind, soft orbital precession | one-can first presentation |
| Selection S1 | Core splits into a ring of project/job monoliths with disc/rail choreography; one item floats forward | reference multi-can carousel |
| Detail S2..Sn | Active model travels through 3D pose, previous/next sweeps in/out, title and summary crossfade | each flavor’s dedicated pose/copy |
| Proof P1..P4 | Camera pushes toward hero monolith; each scroll subchapter changes etched glyph, lighting and technical claim | four reference ingredient transformations |
| Statement V | One meaningful brand declaration behind centrally lit object | final statement/showpiece |
| Recap R | All items form a deliberate shallow arc and travel away | lineup frame |
| FAQ Q | Canvas recedes, top arc/fade transition to accordion, no abrupt jump | Ciao FAQ transition |
| Contact C | Minimal expressive footer-stage/contact channels | replaces newsletter |
| Footer F | compressed social/legal/end | same compact end-rhythm |

**Mode switching:** project vs experience is a *top-level state of the same story*. Switching mid-story returns safely to carousel selection anchor or maps to an appropriate valid index; do not keep obsolete index or break scrub animations. The main content must not double in DOM-visible 3D canvases. Back button and URL state (`?view=projects|experience`) must match current mode without reload. Keep scroll position/restore semantics predictable.

## Mandatory browser capture before implementation (T01)
The original reference site has not been operated frame-by-frame in this handoff. Codex with browser access MUST:

1. Record viewport 1440×900 desktop and 390×844 mobile, DPR; if possible 1024×768 tablet and 1920×1080 desktop. Save unaltered screen recordings of first load, full forward scroll, full backward scroll, modal/menu, FAQ, hover, resize and touch.
2. Use browser devtools to note canvas size, DOM overlay stacking, page scroll height, sticky element positions, response timings; do **not** exfiltrate source files or proprietary models.
3. At normalized document scroll checkpoints `0, .025, .05, .10, .15, .20, .30, .40, .50, .60, .70, .80, .90, 1`, capture screenshots. Around each transition add `before`, `peak`, `settle` frames at 24/30/60 fps or 16–33 ms steps from controlled scroll replay. **Normalized checkpoints are measurement scaffolding, not assumed section boundaries.**
4. Measure section `scrollHeight`, pin start/end, dwell distance, center alignment, projected model bounding box, active object's yaw/pitch/roll, focal length approximation, luminance/color, title box position, accordion expansion velocity, masking/clip direction. Measure easing by fitting first-order damp or GSAP easing to actual captures; distinguish scroll scrub vs time-based.
5. Test wheel at different delta values, trackpad, keyboard scrolling, scrollbar dragging, touch swipe/inertia, reverse scroll, page reload at anchor, zoom 200%, device orientation change and `prefers-reduced-motion` behavior. Record differences; no custom scroll interception unless observed and demonstrably safe.
6. Store measurement assets under `docs/reference-captures/` only if licensed/acceptable as internal evidence and not deployed to `public/`. Create `REFERENCE_MEASUREMENTS.md` with exact observations and uncertainty range, initial and final screenshots with timestamps. Never commit downloaded Ciao media as app assets.
7. If blocked by site/browser access, clearly mark UNSUPPORTED and use agreed visual reconstruction plus design studies; do not claim one-to-one frame timing.

## Proposed capture log schema

```text
referenceBuildDate=2026-10-20; viewport=1440x900; dpr=1
chapter=Selection; scrollPx=...; scrollProgress=...; timestamp=...
modelBounds={x,y,w,h}; modelEulerApprox={x,y,z}; activeIndex=...
overlay={left,top,width,height,opacity}; backgroundColor=...
clipMask=...; sourceScreenshot=...; implementationScreenshot=...
measuredDeviationPx=...; nextTuning=...
```

## Fidelity acceptance method
- Geometric alignment: compare 3D silhouette position/scale, rule-of-thirds/negative space, text boxes, accent intensity, edge chrome at same **narrative step**, not mechanically equal total scroll length if 7 vs 6 items.
- Functional fidelity: reverse scrub, index handoff, active state, navigation affordance, lighting passage, no skipped states at high wheel velocity.
- Site-specific originality: **Ciao's visual objects/copy/typography assets must be replaced**, but overall rhythm remains identifiable.
- Produce a deviation ledger with `severity`, `reference timestamp`, `our timestamp`, `rationale`, `fix`. Only intentional differences: identity, content, number of items, languages, accessible/mobile fallbacks, performance necessities.

## Known risks
1. A recreation repository is NOT an authoritative exact timing measurement.
2. A six-item product rig doesn't trivially transfer to four job entries; adapt angular spacing while preserving arc silhouette and camera moves.
3. Huge translated German text and RTL Persian can break reference geometry; adapt line breaks and text stages, not height/position silently.
4. Browsers and GPU classes change perceived smoothness. Test on real mobile or emulated throttling plus representative hardware, never only on a powerful desktop.
