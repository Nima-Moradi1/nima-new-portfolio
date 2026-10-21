# 02 — Visual identity, logo, cinematic loader, typography and responsive UI

## Brand narrative
**NIMA MORADIRAD / NM KINETIC MONOLITH — ENGINEERING IN MOTION.** A precision-built artifact, not an energy drink, not a generic developer laptop, not a random polygon mesh. The monolith communicates a developer who connects frontend, backend, AI workflows, and delivery. Spatial reveals behave like *deploying an engineered system*, while Ciao’s immersive studio rhythm remains obvious.

## Premium original logomark specification

**Shape:** Two interlocking ribbons create a legible `N` from front view and a hidden `M` via negative space when rotated ~20–30 degrees. Each ribbon has 3D depth and chamfered beveled edges; a single narrow light slit divides polished titanium planes. Geometric invariants:
- Front projection must read `NM` at 24 px favicon scale using a distinct **flat SVG adaptation**, not a photoreal thumbnail.
- 3D large mark may appear to be a sculptural N/M ligature; it must stay recognizable during ±18° idle rotation and never resemble `CIAO` lettering.
- No extruded default text effect. Build authored mesh in Blender or mathematically defined extrusion, optimize topology and normals. Front/back symmetry is optional only where it improves silhouette.
- Rounded chamfer radius visually small (~1.5–3% of mark height); use 2–3 material regions (dark titanium body, pale brushed edge, electric aqua slit). Avoid rainbow chrome or excessive bloom.
- SVG master in `/public/brand/nm-symbol.svg`, dark/light/monochrome variants, wordmark `NIMA MORADIRAD` and model `/public/brand/nm-monolith.glb` **only if measured asset budget allows**; procedural geometry acceptable if light enough.
- Protected aspect ratios: symbol 1:1, long lockup approximately 4.5:1; export wordmark in EN/DE with capital NIMA MORADIRAD, FA accompanying accessible text `نیما مرادی‌راد` but do not force complex Persian text into physically engraved mesh.
- Preserve semantic accessible logo name via text outside canvas.

### Distinctive kinetic portfolio object replacing cans
**NM data cartridges**: seven original beveled, tapered, asymmetric vertical slabs arranged in a radial arc. They have faceted trapezoid silhouettes (never cylindrical), dark metal edge frame, translucent smoked core, fine micro-engraved category line and one oversized sculptural icon/glyph specific to the project. Overall aspect ~0.54 width/height, thickness ~0.10 height, front depth parallax. Personal branding connects each through a consistent upper latch/attachment socket; connecting rail/plinth forms a field-instrument rather than a beverage turntable.

- **Projects:** 7 illuminated/smoked slabs. Palette stays 80% black + metal; accent per category is a subtle secondary glow. Central project ID and 1–2-word label can live as accessible HTML overlay rather than texture for translation.
- **Experience:** 4 slabs share mesh family but use matte titanium and embossed chronological markers; slightly wider angular spacing to preserve silhouette/negative space. Company names are DOM, NEVER baked into language-specific 3D texture.
- **Cartridge index labels:** original, ordered, color-stable; do not create seven unrelated 3D objects or a gallery of browser screenshots inside textures.
- **Lighting:** one dominant rectangular area-light approximation + ambient/environment + one restrained rim light; project accents only illuminate nearby region. Use physically coherent highlights/roughness, no fake harsh neon strips.
- **Depth:** selected item 1.0 apparent scale, near neighbors ~0.72–0.80, far neighbors 0.50–0.60; these are tuning starting points to match reference capture, not empirical source measurements.
- **Camera:** prefer perspective 35–45° FOV as starting range; calibrate vs captured screenshot. Hero needs clear foreground silhouette, subject should not obscure important labels.

## Chosen color system (proposed, original)

| Token | Value | Usage |
|---|---|---|
| `--nm-void` | `#05070B` | near-black studio |
| `--nm-space` | `#10141E` | depth/surfaces |
| `--nm-slate` | `#1A2330` | panel metal |
| `--nm-fg` | `#F4F7FC` | primary legible text |
| `--nm-muted` | `#99A5B8` | secondary copy |
| `--nm-line` | `#354153` | outlines/dividers |
| `--nm-ice` | `#8BE9F4` | signature light channel, primary accent |
| `--nm-orbit` | `#B29BFF` | secondary violet highlight |
| `--nm-warm` | `#E5B78E` | tertiary warm specular only |
| `--nm-danger` | `#FF7777` | errors |

Accent per project identity may use a *low-opacity* curated gradient; never recolor the entire page into loud uncoordinated themes. All colors via semantic CSS variables/theme tokens — no random inline hexes.

## Typography specifications
- EN/DE body and UI: existing `Geist`; technical labels existing `Geist Mono`; headings consider `Geist` variable wide/oblique or legally free `Archivo Black Italic` locally if clearly improves reference silhouette. Do not hotlink third-party fonts or assume Franklin Gothic license.
- FA: existing self-hosted `Vazirmatn`/approved IRANYekanX only after license audit; use human-designed optical scale and logical `dir=rtl`. No faux italic on Persian.
- English/German typography hierarchy (proposed desktop): display `clamp(3.25rem, 6.4vw, 6.7rem)`; title `clamp(1.7rem,3vw,3rem)`; body `15–16px`; meta `12–13px`; line-height display 0.92–1.08, body 1.5–1.7.
- Persian headline: `--type-display-fa: clamp(2.2rem, 4vw, 4.6rem)` => roughly 0.60–0.82 of comparable Latin display, optical review required. Persian section titles ~0.73–0.85 ratio. Persian **body minimum 14–16 px**, increased line-height 1.8–2.0. Do not literal 40% shrink for body because 16px→9.6px is inaccessible.
- German wrapping: allow controlled two-line title with balanced text; no forced ellipsis of factual information. Max readable copy width ~60–70 characters for body. Avoid ultra-heavy text except one impact statement.
- All headings are HTML, not baked into canvas, enabling crawl, selection, RTL and screen readers.

## Loader storyboards (original NM brand)

Timeline is **suggested UX design**, not source-site measurement. Must not add fake network progress or impose fixed multi-second minimum on fast connections.

| Gate phase | Visual | Trigger / exit |
|---|---|---|
| `initial` | immediately visible SSR/CSS deep-black stage; 2D static NM fallback, 1 thin illuminated line | HTML arrives; no blank screen |
| `assembly` | 3 metallic N/M fragments fly from depth, cohere; slit light traverses edges; micro dust optional | assets decoding and shader warm-up in background |
| `verification` | logo rotates 15–25° revealing hidden M; 1 luminous scan over small status labels `INITIALIZING / SCENE READY` | truthful first meaningful 3D frame rendered |
| `handoff` | logo expands into silhouette of hero monolith; 3D scene appears underneath, letterforms fade along precise matte | when scene and critical text ready |
| `finished` | release focus/scroll control, remove overlay, restore keyboard focus to purposeful target | after transition end |
| `failed/timeout` | static complete SVG brand and enter-site action; content can be navigated | renderer unsupported, offline, load error, deadline |

**Progress bar:** bind to actual critical promise-settled state; discrete stages rather than invented percent if actual byte-level progress is unknown. Do not start unnecessary preload of 2MB résumé PDF or all seven project media just to keep logo visible. Main route HTML must be ready promptly regardless of overlay; reveal time should generally be 0.7–2 seconds on typical warmed connection, but can be faster. Hard timeout (proposed 6–8s after document interactive) exposes usable fallback. Never animate the loader forever, even after WebGL context loss.

**Mobile:** do not boot full 3D loader before checking GPU capabilities. Use pre-rendered CSS/SVG/very low geometry assembly and short transition. Respect `reduced-motion` by showing static NM mark + direct entry.

## Visual composition, coordinates as starting values
- Desktop header height 64–76px, lateral inset 3–4vw. Name centered, mode switch on top-right cluster (or center bottom under wordmark if collision at 1024px). Contact is a compact outlined or filled pill; locale a compact triplet or accessible popover. No full navigation bar.
- Bottom selector/progress width approx 22–34vw centered, discreet captions. Keep a **single** purpose per control: mode switch top; item selector accessible in carousel. Do not add duplicative navigators.
- Right icon rail at ~94–96vw on wide desktop; inset more on mobile; hide/decorate if it interferes with content.
- Selected object stays centered or right-of-center so text occupies left third in LTR, right third in RTL where permitted without changing 3D handedness; use logical layout + measure with real screenshots.
- FAQ / contact use very light hairline dividers and high contrast dark background; no unrelated glass cards.

## Responsive choreography (not just shrinking the desktop canvas)
- `≥1440px`: full spatial arc; center object 30–40% viewport width; bold-but-controlled heading.
- `1024–1439px`: reduce far objects, keep one prominent focus, rail remains accessible.
- `768–1023px`: compressed arc up to 3 visible objects; content moved lower/upper to avoid subject, no cramped text.
- `430–767px`: one focus object + two partial neighbors; touch/drag/wheel input with native scroll preserved; FAQ/contact full width.
- `≤429px`: one full central prism at ~55–65vw width with extremely restrained side hints, smaller glyph and headings, fixed controls safe-area aware.
- `reduced-motion` / WebGL unavailable: elegant semantic static hero + HTML project/experience carousel list; top mode switch still fully functional; no blocking gate or blank area.
- Tablets landscape, phone portrait/landscape, 200% text zoom and keyboard viewport changes are required test cases.

## Originality + accessibility safeguards
- Do not use Ciao logo/metadata/text/audio/cans/camera textures or copyrighted `.glb` models. Code your own meshes or author in Blender, with a license ledger.
- Pointer `hover` is enhancement; keyboard/focus/touch always equal functionality; current item announced via accessible status **on settled index**, not spammed every frame.
- Contrast ≥ 4.5:1 for body, ≥3:1 large text; focused controls at least 24×24 px WCAG AA, prefer 44×44 touch targets.

## Owner U05 — light studio and theme choreography (2026-10-21)

The owner requested a light edition and animated 3D theme switching. This is an original NM variation; it is not a newly measured Ciao interaction. Preserve the existing spatial narrative and compact Projects/Experience control.

- Light palette: pearl `#edf2f3`, porcelain `#ffffff`, ink `#172b36`, slate copy `#506570`, teal `#086b78`, restrained violet `#69539e`. Dark endpoint values remain intact. Shared `--nm-*` tokens live on the document so portalled menus/dialogs and server-first loaders receive the same palette.
- The 44px orbital instrument flips moon/sun. Supporting browsers reveal the new page from that control over 1000ms with perspective, vertical translation and a circular aperture. Its independent old/new snapshots turn for 450ms + 550ms. Capture endpoint colors without simultaneous descendant color tweens, keeping both palettes legible through the reveal.
- The existing R3F callback owns the small physical rig turn/lift/recede and background, ground light, cartridge and glass-uniform changes. There is no extra canvas, package, continuous ticker or postprocessing. A synchronous advance of that same R3F owner prepares the native snapshot without waiting on a suspended RAF. Rapid requests cancel stale callbacks; the latest requested theme wins.
- Browsers without native view transitions use registered CSS color interpolation and the physical scene transition. Reduced motion switches directly with a static instrument and reading edition. No additional loading gate or artificial delay is introduced.
- Inline NM marks and the dimensional boot/route loader inherit the palette. `nm-symbol-dark.svg` and `nm-wordmark-dark.svg` contain dark ink for light backgrounds; original pale assets remain for dark backgrounds. The selected theme also updates the favicon and browser theme color.
- The small-screen header gives the mode control its own full grid row, preserving an unwrapped contact label and unobstructed theme/language targets in both directions. EN/FA/DE action labels have matching keys.

Bounded evidence and remaining release limits: `docs/evidence/U05-2026-10-21/SUMMARY.md`.

## Owner U08 - minimal outline symbols (2026-10-21)

This owner correction supersedes the earlier U03 solar/planet appearance in the proof chapter. Use four original free-standing outline metal symbols: interface window, hollow systems stack, AI chip/diamond and delivery rocket. The strokes themselves have rounded physical volume; no disc, backing plate, sun, visible orbital rail or emissive icon face. Keep open centers, consistent stroke weights, readable negative space and restrained silver/ink finishes for dark/light themes. One broad white studio key, cool rim and existing environment provide physical reflections. Existing localized typography and page composition remain authoritative. See `evidence/U08-2026-10-21/SUMMARY.md` for adopted concept, comparison repairs and bounded production evidence.
