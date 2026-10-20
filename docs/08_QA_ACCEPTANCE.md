# 08 — QA & final acceptance protocol

## Device & viewport matrix

| Profile | Dimensions | Interaction emphasis |
|---|---|---|
| Compact Android | 360×800, DPR 2–3 | touch scrolling, loader/fallback, slow CPU |
| iPhone class | 390×844, DPR 3 | Safari viewport/safe-area, tab focus, touch swipes |
| Large phone | 430×932 | dynamic viewport, font and modal fit |
| Tablet portrait | 768×1024 | compressed arc and longer German copy |
| Tablet landscape | 1024×768 | horizontal layout and expanded controls |
| Laptop | 1366×768 | key reference composition and frame budget |
| Standard desktop | 1440×900 | primary side-by-side visual diff |
| Large desktop | 1920×1080 | arc spacing, upper/lower rail framing |
| Accessibility zoom | browser 200% text | no text clipping, native reading order |

Test Chromium and WebKit/Safari; at least Chromium mobile emulation + real iPhone/Android where obtainable. Include low WebGL support mode or forced loss.

## Mandatory scenario suite

### Loading
- Fast Wi-Fi first visit: immediate branded fallback/SSR headline; loader reveals hero only after real scene first frame, no 0→100 fake jump.
- Slow network/CPU: no indefinite lock; fallback by deadline, contact and projects clickable.
- WebGL disabled/scene import rejected/context lost: rich accessible fallback, no blank black scene, restore scroll/focus.
- After reload and internal locale change: no unnecessary full multi-second blocker; meaningful content always server-rendered.
- `prefers-reduced-motion`: static NM logo; no loop, scroll hijack or continuous spin.

### Motion + switching
- Scroll full forward/back repeatedly; all 7 projects and 4 experiences become reachable with matching IDs.
- Switch modes while a mid-transition project is active; rapidly toggle 10 times; no stale title, stray mesh, stuck scroll or RAF leak.
- Drag object then wheel/trackpad, touch then vertical scrolling; no jitter at boundary; no horizontal swipe stealing vertical navigation.
- Direct link `/?view=experience` and `/fa?view=experience`, browser back/forward, navigate into a case study then return; state should be coherent and not trap viewport.
- Set viewport 390→1024 while active; recompute scene and preserve selection. Orientation change and iOS address bar show/hide stable.
- Scroll beyond canvas to FAQ and footer, verify GPU quiet, click FAQ and return upward smoothly.

### Content & locale
- Labels, 7 project names, dates, 4 job descriptions, logo, proof, 8–10 FAQ, contact in EN/FA/DE.
- Persian smaller display scale **but readable** paragraph, correct direction, no joined-letter corruption or RTL reversal of URL/screenshots/code.
- German multi-line long title with no clipped desc, links. Consistent stable IDs/order, no untranslated hidden text in tab state.
- Project-specific technologies/skills never fabricated; Sarochi VTO state marked correctly after source audit.
- Education date discrepancy resolved or flagged; phone listing consent confirmed.

### Contact/SEO/a11y
- Mailto, Telegram, LinkedIn, GitHub links valid; external rel attributes and accessible names.
- Contact form valid / invalid / provider-unconfigured returns truthful messages; no success toast for unsent email.
- Open dialog via keyboard, ESC close, focus restore; FAQ `aria-expanded`; skip navigation; tab order.
- `view-source` shows primary content without enabling JS/canvas; SEO localized title/meta/robots/sitemap, canonical+hreflang pages valid.
- No raw third-party images/models/audio/fonts; original brand asset license log exists.

## Compare visual fidelity with source

For EACH major chapter L0/H0/A0/selected projects/proof beats/V/R/Q/C collect source screenshots/times and build screenshots/times at matching viewport. Use perceptual diff on **layout regions**, not raw pixels because models differ intentionally. Review:

1. Relative bounding boxes of focus 3D object, the arc and rail; camera projection, perspective and void balance.
2. Stroke/contrast/fade/clip timing on large headings and side copy; no momentary illegible overlap.
3. Progress indicator movement and active cursor state; top switch remains in fixed position as source-inspired chrome.
4. Lighting temperature, edge specular highlight, ambient vignette; avoid glowing toy effect.
5. Reversal continuity at item halfway and each chapter boundary.
6. FAQ modal/accordion and footer transitions: no jump out of scene or invisible content under canvas.

`Pass` means either measured close match within reviewed tolerance OR documented intentional deviation for project content, proprietary object difference, accessibility, or mobile performance. Raw pixel-perfect rendering is neither realistic nor requested for the legally distinct new logo/object.

## Performance validation
- Produce Lighthouse HTML/JSON or equivalent **on production build**, record version, viewport, network throttling profile, cold/warm cache, CPU slowdown and full timestamp.
- Profile 10 carousel selections, 10 mode switches, fast scrolling and after 1 minute idle. Inspect page JS heap, WebGL textures/geometry counts, context count, `long tasks`, dropped frames and battery-sensitive continuous rendering.
- Test SSR against blocked JS, reduced motion and WebGL not supported. Source capture results may vary by external site/CDN.
- Report CWV actual p75 only when enough field samples; otherwise lab measurements explicitly labeled lab. Do not confuse TTL cache behavior with FCP/LCP.

## Final deliverables Codex should actually produce
- Production code on feature branch + PR/diff, or safe local patch with explicit owner authorization for writes.
- Original logo sources (SVG + 3D geometry/model with license notes), first-frame fallback, full loader and consistent CSS palette.
- Reusable WebGL storyboard with tracked components, localized content/FAQ, new shop card and original contact behavior.
- Reference capture/deviation report (or documented access restriction), desktop+mobile recordings, tri-locale screenshots and test reports.
- Updated `HANDOFF.md`, task board, README, decision/asset ledger; deploy instructions + rollback plan without unapproved production action.

## Failure states that block completion
- A loader can hang indefinitely; WebGL required to read experience text; missing FA/DE labels; broken top mode switch/back button; duplicated scroll drivers; heavy mobile GPU rendering offscreen; broken original case-study routes/contact; fabricated job/project claims; SEO content painted only into canvas; unmeasured performance score assertions; unauthorized deployment.
