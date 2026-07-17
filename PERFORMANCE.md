# Performance Strategy

## Goal

The creative identity should survive real constraints. The design uses three focused procedural scenes while keeping the semantic portfolio useful before any of them load and pausing large scenes when they leave the viewport.

## Budgets

| Area              | Working budget                                                            |
| ----------------- | ------------------------------------------------------------------------- |
| Initial landing   | Server-rendered shell behind a versioned first-visit readiness gate       |
| WebGL             | Prewarmed desktop chunks; mobile uses a native experience reader          |
| Renderer DPR      | 1.0–1.5, adaptive reduction                                               |
| Geometry          | Procedural primitives; no model downloads                                 |
| Textures          | None                                                                      |
| Shadows           | Book only; one-frame contact shadow in the lamp                           |
| Postprocessing    | None                                                                      |
| Repeated geometry | One instanced node mesh                                                   |
| Fonts             | Two locally self-hosted build outputs via `next/font`                     |
| Project images    | 32–58 KB source WebPs, intrinsic sizes, `next/image`, lazy below the fold |
| Project video     | 23 s at 30 fps; ~293 KB H.264 and ~266 KB VP9 with a 14 KB poster         |

## Rendering strategy

The page is a Server Component. Each canvas is behind a narrow client component and loaded with `next/dynamic` using `ssr: false`. Loading and failure states use matching CSS compositions, preventing empty regions.

The scenes use:

- A bounded camera and compact scene
- Low-detail primitives and a small subdivided page mesh
- Lightweight standard/basic materials and no downloaded models
- Instancing for repeated nodes
- A small single-draw sparkle field
- Adaptive DPR with a hard 1.5 ceiling
- A single shadow-casting book light and a cached lamp contact shadow
- No external HDRIs, textures, or postprocessing

Reduced-motion mode replaces the scroll reader with a complete chapter list and uses demand rendering elsewhere. Compact/coarse-pointer devices use a touch-optimized CSS experience reader instead of the continuous book canvas. Viewport observation switches the desktop hero and book to demand mode off-screen; the lamp remains small and interactive.

On a first landing visit, the readiness gate waits for fonts, the local portrait and résumé preview, required scene chunks, and the initial WebGL frame before revealing the page. A versioned local-storage marker skips the gate on later visits. Mobile skips the book-scene preload because that device class never renders it.

## JavaScript boundaries

Most sections remain server-rendered. JavaScript is reserved for:

- Mobile menu state
- Viewport reveals and magnetic pointer response
- Scroll-derived book progress and chapter controls
- Persistent theme state and pull-chain input
- Contact validation and submission
- WebGL capability detection and rendering
- First-visit readiness and progress state
- XO video visibility playback and media loading masks

The project avoids a global client state library because there is no shared state problem that justifies it.

## CSS strategy

Visual richness is produced with gradients, borders, transforms, and opacity. Registered color properties interpolate the full room theme over 650 milliseconds. The book reads native document scroll progress; it does not cancel wheel/touch events or hijack scrolling.

## Asset strategy

There are no external media requests or stock assets. The local portrait and XO screenshots use intrinsic dimensions and responsive `sizes`.

XO Arena media is prepared as follows:

1. Screenshots are converted from 1474–1486 px PNG sources to 32–58 KB WebP files.
2. The original 75 fps recording is normalized to 30 fps with fast-start H.264 and a VP9 alternative.
3. The route preloads the primary VP9 resource as a cacheable fetch and the video element uses `preload="auto"` immediately on mount.
4. Product captures keep `loading="lazy"` and show a design-system skeleton until decoded.

When adding more project imagery:

1. Export AVIF and WebP variants.
2. Declare intrinsic dimensions.
3. Use responsive `sizes` and lazy loading below the fold.
4. Keep the hero free of blocking project media.
5. Run the bundle and Lighthouse checks again.

GLB additions should be compressed, lazy loaded only near their section, and given a semantic 2D alternative.

## Measurement workflow

```bash
npm run build
npm run start
npm run analyze
```

Run Lighthouse against the production server in an incognito browser without extensions. Record desktop and mobile separately. Validate LCP, CLS, and INP with field data after deployment because lab scores cannot predict every device.

## Tradeoffs

- The first-visit gate deliberately delays interaction until the landing frame is ready; returning visitors bypass it, and a complete semantic page remains server-rendered behind the gate.
- The desktop experience section trades document length for a physical page-turning interaction. Mobile avoids the pinned WebGL cost and uses direct native buttons.
- Procedural scenes are less photorealistic than downloaded models, but load faster, remain original, and need no asset licensing.
- The contact route uses a lightweight per-instance limiter. A distributed limiter is a deployment decision, not bundled overhead for a static portfolio.
