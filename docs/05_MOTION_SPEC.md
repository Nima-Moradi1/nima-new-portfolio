# 05 — Cinematic motion choreography, scroll engine & interaction state machine

## Guiding rule
Ciao's recognizable visual rhythm must survive: **one persistent stage, long smooth scrub, changing central 3D object pose, neighboring objects in a radial rig, crossfading scene copy, one-by-one engineering transformation beats, art-directed exit to FAQ/contact**. Avoid repeated decorative generic `fade-in` components as a replacement for real choreography.

All pixel/time/angle values here are **initial engineering ranges** to recalibrate from real reference recordings under T01. See `01_REFERENCE_RESEARCH.md` for capture instructions.

## Scene graph

```text
KineticStage (position: fixed, full viewport; canvas pointer-events: none except intentional 3D controls)
└─ Canvas + SceneController
   ├─ CameraRig (perspective, target interpolation)
   ├─ StudioEnvironment (void + simple fog / gradient underlay)
   ├─ LightRig (key/rim/ambient, mode accent interpolation)
   ├─ IdentityCore (NM logo: single author geometry)
   ├─ CarouselPivot (one parent rotation drives all)
   │  └─ CartridgeInstance × 7 or 4; dynamic visible instances
   ├─ PlatformRail (upper/lower arc; original engineered form)
   └─ Optional highlight pass (desktop only if frame budget)
Overlay HTML (z-index above canvas):
   GlobalChrome / ModeSwitch / AccessibleItemText / NarrativeChapters
   ItemProgress / IconRail / FAQ / Contact
```

## Normalized narrative phases

| Phase | Example relative distance | Primary state | Copy transition | Interaction |
|---|---|---|---|---|
| L0 loader | not document-scroll controlled | logo assembly → true readiness | tagline → main hero | skip immediately on WebGL failure |
| H0 hero | ~1 viewport | single NM monolith float/slow yaw | name, AI Full-Stack, concise premise | scroll invitation; optional pointer parallax |
| A0 assembly | ~0.6–1 viewport | hero transforms into ring, camera retreats, rail sweeps in | mode/item selector appears | switch remains top |
| P0..Pn projects | **one chapter each (~0.8–1.2vh units)** | ring turns by 2π/n item segments; chosen item enters key light; active slab leans/yaws | text outgoing opacity 1→0; incoming 0→1 using ordered masks | scroll/wheel/touch; clickable index |
| E0..En experience | same reusable carousel grammar, n=4 | matte job slab with shared material and relative arc | employer, title, dates, verified role details | mode switch; index control |
| B1..B4 proof | ~1 viewport per proof | ring recedes, one large NM slab toward camera, light scans tech signatures | old/constraint kicker → engineering headline → short substantiated paragraph | right proof rail |
| V statement | 0.7–1 viewport | pose straighten, halo narrowing, typographic watermark | single concise statement | native scroll |
| R recap | 0.5–1 viewport | items fan out and disappear upward | minimal caption/counter | native scroll |
| Q FAQ | content height | 3D retreats/pauses completely; HTML list settles | accordion labels reveal; never text clip | click/Enter/Space, focus |
| C contact | content height | NM logo as static/paused mark | channels and optional contact form | direct links/form |

`vh units` here mean multiples of viewport height; actual `ScrollTrigger` lengths require measured matching references and enough room for the seventh item. The 4-job track should visually occupy comparable overall story duration using per-item longer dwell, while not forcing empty synthetic pages.

## Per-item carousel keyframe plan

| normalized item beat t | Mesh / rig | Information overlay |
|---|---|---|
| `0.00` | previous active departs center, rig starts angular interpolation, neighboring slabs visible | previous header 100% visible |
| `0.15–0.30` | current object begins exit with controlled z-depth | previous opacity 1→0, y +8–18px, mask closes |
| `0.30–0.58` | upcoming prism enters center; light temperature/accent transitions | no mixed overlapping legible paragraphs; number/indicator updates near middle |
| `0.58–0.80` | new prism reaches hero pose, settling damp/overshoot max ~2° if measured | new title appears via short reveal/mask, summary slightly delayed |
| `0.80–1.00` | active holds stable/light focuses | content holds; all links interactive and keyboard-focusable |

**This beat curve is proposed** and should be replaced with screenshot-matched tracks once reference capture is performed. Reverse scrolling must reverse all transformations with no hysteresis, unless source explicitly has asymmetric behavior.

## Transitions that must be specifically tuned

1. **Loader→Hero:** geometric silhouette continuity instead of a black-screen cut. Hero first interactive frame shown only once actual canvas is ready; CSS fallback if not.
2. **Hero→Ring:** logo/monolith breaks from single hero view into seven/four siblings via pivot radial arrangement; neighbors materialize from depth, NOT a sudden React re-mount.
3. **Item→Item:** rig rotates continuously to next, text left/right (RTL mirrored), accent/specular light changes; orientation and camera depth consistent, no popping.
4. **Projects↔Experience top switch:** 2-step morph — collect slabs toward identity core, swap data/4-vs-7 instance configuration at visually occluded phase, fan out, settle camera; duration starting at 650–1000ms desktop, 200–350ms reduced mobile. Mode change should not cause page layout jump; ensure focus/URL consistency.
5. **Ring→Proof:** camera pushes toward central NM carved prism, side slabs dim out; first engineering proof fades in one intended beat.
6. **Proof→Proof:** same solid object changes small engraved symbolic accent and yaw/position; one problem/result comparison headline at a time. Avoid producing four different unrelated meshes.
7. **Proof→Statement→Recap:** constrained typography behind lit monolith, then fan-out, dark fade to semantic FAQ.
8. **FAQ expand/collapse:** measured easing/height, no `display:none` abruptness while animating; match reduced motion by instant state change; maintain ARIA.
9. **Contact:** focus CTA in source, don't reproduce third-party newsletter API; show actual channels and form fallback.

## Input and control matrix

| Input | Carousel behavior | Accessibility condition |
|---|---|---|
| Mouse wheel / trackpad | Native page scroll mapped to chapter timeline; do not indiscriminately `preventDefault` | user may reach FAQ/footer and back |
| Scrollbar drag | scrub consistent with scroll progress | no canceled native movement |
| Touch swipe | normal vertical scroll; horizontal item swipe only in explicit target region if conflict-free | no touch traps; 44px targets |
| Drag on 3D hero | limited pointer pose/rotation only when page not scrolling | input responds with damping and release; doesn't steal tap/scroll |
| Tab | focus mode, locale, item selector, CTA, accordion, contact | obvious focus outline; no canvas focus dead end |
| Arrow keys | when selector focused, previous/next logical item; in FA reverse physical arrows as appropriate | prevent default only for focused widget, not whole page |
| Home/End | when item selector focused, first/last | matches ARIA tabs/slider semantics |
| Click visible neighbor | set stable `itemId`, scroll to item segment, then focus correct label | settled state announcement only |
| Browser back | restore `view` and scroll anchor, URL locale | no ghost state or content desync |
| `prefers-reduced-motion` | no continuous rotation/parallax, native simple swap | all content readable |

## State machine safety

```ts
type UiPhase = 'loading'|'hero'|'assembly'|'carousel'|'proof'|'statement'|'recap'|'faq'|'contact';
type MotionIntent =
  | {type:'SCROLL'; progress:number}
  | {type:'MODE'; mode:'projects'|'experience'}
  | {type:'SELECT'; itemId:string}
  | {type:'RESIZE'}
  | {type:'LOCALE'}
  | {type:'REDUCED_MOTION'}
  | {type:'VISIBILITY'; hidden:boolean};
```

- `MODE` cancels active selection tween and validates index for new track; no stale closure or phantom item ID.
- `SCROLL` is derived from document position and owned single source; scene transform is a pure interpolation from normalized progress.
- `RESIZE` recalculates camera framing, item visibility and ScrollTrigger bounds without re-fetching assets or resetting initial loader.
- `VISIBILITY:hidden` stops expensive WebGL frame creation and sound; resume on visibility change and invalidate one frame.
- On lost WebGL context render readable fallback; release scroll lock; disconnect observers/listeners upon unmount.
- On rapid repeated mode toggles last intent wins; transition cancellation leaves scene in a valid stable state.

## Ticker implementation skeleton (concept, not copy-paste production code)

```ts
// Only if reference audit justifies GSAP + Lenis:
// const lenis = new Lenis({ ... });
// const update = (t: number) => lenis.raf(t * 1000);
// gsap.ticker.add(update);
// lenis.on('scroll', ScrollTrigger.update);
// GSAP ScrollTrigger updates a MUTABLE scene store, not React setState per frame.
// useFrame reads store and writes group/camera/light refs with delta-based damping.
// Unmount: gsap.ticker.remove(update), lenis.off(...), lenis.destroy(), ctx.revert().
```

Use official GSAP/Lenis API guides and install versions compatible with Next 16. Pin versions in lockfile after legal/security check. CSS transforms for HTML overlay, R3F object transforms for meshes; do not write both on same physical element.

## FPS / GPU integrity
- Performance 60 fps desired on desktop, 30–60 on normal mobile depending device — do not claim perfect 60 fps all hardware. Frame budgets: 16.7ms at 60, 33.3ms at 30 including script/layout/paint/GPU.
- Adapt DPR gradually, baseline capped 1.5 desktop and 1.0–1.25 mobile; use qualityTier from measurements, not fixed iPhone/Android UA guesses.
- Pause when overlay FAQ/contact covers canvas; render demand frame on mode change/interaction. No unnecessary continuous bloom/dynamic shadow maps on mobile.
- Visually compare project/item poses at scroll checkpoints; record active index/scene orientation and text overlay shift. Normalized phase snapshots matter more than synthetic 'ease: power3' labels.

## Motion tuning report template

```md
| Chapter | Viewport | Reference screenshot/time | Target screenshot/time | Scale delta | X/Y delta | Rotation delta | Opacity/blur delta | Verdict |
|---|---|---|---|---|---|---|---|---|
| carousel/03 | 1440x900 | ref-c03.png/00:18.53 | nm-c03.png/00:18.50 | +3% | x +11px | yaw -4deg | glow +8% | TUNE |
```

The values above are illustrative **only**. Never put fake results in actual QA evidence.

## Owner U08 - outline symbol handoff (2026-10-21)

The proof chapter now turns four open engineering symbols through the existing reversible quarter-turn schedule. Keep its HTML copy timing and native scrolling. Separate side/rear station heights, enlarge the foreground symbol, and expose rounded stroke volume through bounded yaw/pitch instead of billboarding. Real area-light intensity settles with the existing illumination envelope; no visible beam cone. The same demand-render owner sleeps after interaction; no perpetual idle spin or additional ticker. Mobile retains these meshes above semantic copy; reduced motion retains the reading edition. Bounded forward/reverse and responsive evidence: `evidence/U08-2026-10-21/SUMMARY.md`.
