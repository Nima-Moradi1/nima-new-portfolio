# T01 — Ciao reference measurements

Date: 2026-10-20, Asia/Tehran. **Status: PARTIAL — live reference captured; full motion calibration is still required.** These are new measurements, not claims carried over from the original ZIP. No reference code/models/textures were extracted or added to application assets.

## Reproducible evidence

Command executed once for the full capture:

```powershell
node docs/evidence/capture-ciao.cjs --output docs/reference-captures/2026-10-20-full
```

Chrome **155.0.8059.85**, headless, fresh isolated contexts, DPR 1, live `https://www.ciaoenergy.com/`. Desktop 1440×900; mobile viewport emulation 390×844 with touch capability. Both actually rendered WebGL 2 on **Intel UHD Graphics 630 / ANGLE D3D11**. The mobile run uses this desktop GPU; it is not a physical-phone result. No artificial CPU/network throttling was applied.

| Capture | Start UTC / Tehran | Settled first → final checkpoint UTC | Result |
|---|---|---|---|
| Desktop | 11:17:41.237 / 14:47:41.237 | 11:17:57.027 → 11:18:34.708 | HTTP 200, 34 recorded checkpoints, no pageerror/requestfailed |
| Mobile emulation | 11:18:35.237 / 14:48:35.237 | 11:18:49.595 → 11:19:21.867 | HTTP 200, 34 recorded checkpoints, no pageerror/requestfailed |

- [Desktop raw metadata, timestamps and scroll samples](reference-captures/2026-10-20-full/desktop/measurements.json), [event log](reference-captures/2026-10-20-full/desktop/events.jsonl), [unaltered recording](reference-captures/2026-10-20-full/desktop/page@cee91e3bf2b8b2b223e5966d9f7a2b01.webm).
- [Mobile raw metadata, timestamps and scroll samples](reference-captures/2026-10-20-full/mobile/measurements.json), [event log](reference-captures/2026-10-20-full/mobile/events.jsonl), [unaltered recording](reference-captures/2026-10-20-full/mobile/page@fc879b1b181f867d41f14be0ae156b86.webm).
- [Environment manifest](reference-captures/2026-10-20-full/environment.json). All captures remain internal under `docs/`, outside `public/`.

The runtime records DOM geometry, own and ancestor opacity, fixed/canvas bounds, CSS transforms/clipping, requested and actual scroll progress, `performance.now()`, wall-clock completion times, and source section positions. It does not inspect proprietary scene objects, camera internals or JS bundles. Screenshots have capture latency; their metadata timestamps are not a frame-exact video synchronization guarantee.

## Measured page geometry

The canvas is **one fixed viewport canvas**, CSS and buffer both equal to the initial viewport at DPR 1 in these runs. Initial document height: desktop **12,807px** (maximum scroll 11,907px); mobile **12,077px** (maximum scroll 11,233px).

DOM section positions measured at settled page top:

| Source section | Desktop top / height px | Mobile top / height px |
|---|---:|---:|
| `is-gamme` | 0 / 1125 | 0 / 1055 |
| `is-profile` | 1125 / 1125 | 1055 / 1055 |
| `is-benefits` 1 | 2250 / 1125 | 2110 / 1055 |
| `is-benefits` 2 | 3375 / 1125 | 3165 / 1055 |
| `is-benefits` 3 | 4500 / 1125 | 4220 / 1055 |
| `is-benefits` 4 | 5625 / 1125 | 5275 / 1055 |
| `is-argument` | 6750 / 1125 | 6330 / 1055 |
| `is-full-gamme` | 7875 / 1125 | 7385 / 1055 |
| `is-faq` | 9000 / 1557.421875 | 8440 / 1526.5625 |
| `is-last-copy` | 10557.421875 / 1125 | 9966.5625 / 1055 |
| `is-last` | 11682.421875 / 1125 | 11021.5625 / 1055 |

The repeated narrative sections are **1.25 viewport heights in these two captures**. DOM section geometry is measured; exact animation pin thresholds/dwell/easing remain uncalibrated. Do not equate these DOM section boundaries with hidden source timeline boundaries.

## Checkpoint coverage and observations

Forward requested fractions: `0, .025, .05, .10, .15, .20, .30, .40, .50, .60, .70, .80, .90, 1`; reverse: `1, .8, .6, .4, .2, 0`. Native wheel deltas `120, 600, -300`, keyboard End/Home, dynamic reduced-motion media change, one FAQ open/close, menu open/Escape, and viewport resize were exercised. The scripts captured their outcomes; this is not a claim that each behavior is accessible or matches the desired portfolio.

| Narrative checkpoint | Desktop evidence | Mobile evidence |
|---|---|---|
| First settled composition | [hero/ring](reference-captures/2026-10-20-full/desktop/settled-hero.png) | [hero/ring](reference-captures/2026-10-20-full/mobile/settled-hero.png) |
| Profile transition | [requested .10](reference-captures/2026-10-20-full/desktop/forward-0_1.png) | [requested .10](reference-captures/2026-10-20-full/mobile/forward-0_1.png) |
| Proof region | [requested .30](reference-captures/2026-10-20-full/desktop/forward-0_3.png) | [requested .30](reference-captures/2026-10-20-full/mobile/forward-0_3.png) |
| Statement vicinity | [requested .60](reference-captures/2026-10-20-full/desktop/forward-0_6.png) | [requested .60](reference-captures/2026-10-20-full/mobile/forward-0_6.png) |
| FAQ/contact vicinity | [requested .80](reference-captures/2026-10-20-full/desktop/forward-0_8.png) | [requested .80](reference-captures/2026-10-20-full/mobile/forward-0_8.png) |
| Return to top | [reverse 0](reference-captures/2026-10-20-full/desktop/reverse-0.png) | [reverse 0](reference-captures/2026-10-20-full/mobile/reverse-0.png) |
| Resized final frame | [1024×768](reference-captures/2026-10-20-full/desktop/resized.png) | [844×390](reference-captures/2026-10-20-full/mobile/resized.png) |

**Observed corrections to the proposed storyboard:** the first settled reference view already presents the wide ring/lineup, with the selected object prominent between upper and lower mechanisms. A single enlarged selected object appears in the following profile view. The ZIP's single-object-first sequence is a proposed adaptation, not verified source ordering. Only one `is-profile` DOM section is present; individual flavor-selection input has not yet been isolated. Do not implement seven independent scroll chapters on the unsupported assumption that the original has six such DOM chapters.

**Observed scroll settling:** desktop requests `.025`, `.05`, `.10` settled at y **1**, **1113**, **1115** respectively, rather than their requested positions. Mobile programmatic requests settled near the requested fractions; its wheel replay still showed large source-driven movement. Desktop `wheel +120` from the returned top reached y **1050** after the scripted wait, then `+600` reached **1115**, and `-300` reached **65**. Mobile equivalents were **984**, **1045**, **61**. This is evidence of input-dependent behavior near the first transition; it is not a fitted snap/ease implementation. End/Home samples both ended at y0 in these flows. Native keyboard semantics require dedicated follow-up before copying any source behavior.

**FAQ measured endpoints:** desktop page height 12807 → 12943 → 12807 on opening/closing the first question (**+136px**); mobile 12077 → 12252 → 12077 (**+175px**). Intermediate snapshots measured 12903 / 12178px. Their screenshot/command overhead means these do **not** establish a precise expansion duration or easing curve.

Scroll samples were taken at a requested minimum spacing of 30ms. Desktop contains **1503** samples, mobile **1354**; median actual sample interval **33.4ms**, p95 **33.6ms / 33.5ms**. These are observer sample intervals, **not render FPS, recorded video frame rate or a 30fps quality assertion**. Video frame cadence has not been decoded/validated.

## Tool attempts and limitations

1. Interactive `cua.getState()` returned no browsers; creating `iab` failed with `Browser is not available: iab`.
2. First bundled-Chromium probe produced only [a loader screenshot](reference-captures/2026-10-20/desktop/first-dom.png), then was stopped with Ctrl+C (exit 1). It supplied no valid motion measurements. The screenshot is retained as failed-attempt evidence.
3. A bounded isolated **installed Chrome** probe succeeded, then the complete two-profile capture above succeeded. [Successful probe metadata](reference-captures/2026-10-20-chrome/desktop/probe.json). No TLS bypass, security disabling or source substitution was used.
4. No camera focal length, model Euler angles, exact projected silhouette boxes, luminance curve or easing fit is asserted. Static screenshot similarity is insufficient for those measurements.
5. The mobile profile is emulation with synthetic wheel tests; physical touch/inertia, trackpad, scrollbar dragging, 200% zoom, initial reduced-motion reload and anchor reload remain untested. Orientation resizing was captured but not accepted as a full responsive-quality test. Menu Escape and dynamic reduced motion were captured, not fully assessed.

## Required continuation / T01 acceptance gates

Use the saved recordings and metadata first; **do not rerun all baseline captures**.

1. Inspect initial ring selection controls, then record a bounded replay of all six flavor transitions and reversals. Correlate control action timestamps with before/peak/settled frames. Establish how horizontal selection and vertical profile/proof scrolling interact.
2. Decode/verify recording cadence or collect calibrated 24/30/60fps clips of missing transitions. Fit actual motion/easing and uncertainty, including loader → ring, ring → profile, four proof changes, statement/recap → FAQ and FAQ expansion. Current screenshots plus 33.4ms scroll samples do not close this gate.
3. Annotate model silhouette bounds, center alignment, title/copy bounds, apparent orientation, light progression and camera projection estimates at matching narrative phases. Preserve fact vs fitted approximation labels.
4. Complete missing keyboard/scrollbar/touch/zoom/reload checks on suitable surfaces; mark real-device coverage separately from emulation.
5. Record a compact measured-vs-proposed decision entry before T05–T30 implementation. The reference's observed ring-first composition and separate flavor selection must be resolved against the proposed single-object-first/seven-scroll-chapter adaptation.

T01 remains unchecked until these gates are satisfied. No portfolio fidelity comparison or new-site Lighthouse score exists yet.
