# Performance Strategy

## Goal

The creative identity should survive real constraints. The design uses three focused procedural scenes while keeping the semantic portfolio useful before any of them load and pausing large scenes when they leave the viewport.

## Budgets

| Area                  | Working budget                                                  |
| --------------------- | --------------------------------------------------------------- |
| Initial semantic page | Server-rendered HTML and CSS first                              |
| WebGL                 | Lazy hero, book, and lamp chunks; large scenes pause off-screen |
| Renderer DPR          | 1.0–1.5, adaptive reduction                                     |
| Geometry              | Procedural primitives; no model downloads                       |
| Textures              | None                                                            |
| Shadows               | Book only; one-frame contact shadow in the lamp                 |
| Postprocessing        | None                                                            |
| Repeated geometry     | One instanced node mesh                                         |
| Fonts                 | Two locally self-hosted build outputs via `next/font`           |
| Images                | One 400×400 portrait below the fold, rendered with `next/image` |

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

Reduced-motion mode replaces the scroll reader with a complete chapter list and uses demand rendering elsewhere. Viewport observation switches the hero and book to demand mode off-screen; the lamp remains small and interactive.

## JavaScript boundaries

Most sections remain server-rendered. JavaScript is reserved for:

- Mobile menu state
- Viewport reveals and magnetic pointer response
- Scroll-derived book progress and chapter controls
- Persistent theme state and pull-chain input
- Contact validation and submission
- WebGL capability detection and rendering

The project avoids a global client state library because there is no shared state problem that justifies it.

## CSS strategy

Visual richness is produced with gradients, borders, transforms, and opacity. Registered color properties interpolate the full room theme over 650 milliseconds. The book reads native document scroll progress; it does not cancel wheel/touch events or hijack scrolling.

## Asset strategy

There are no external media requests or stock assets. The single local portrait uses intrinsic dimensions and responsive `sizes`. When adding project imagery:

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

- The three WebGL chunks add weight after hydration, but none block the server-rendered narrative and large render loops pause off-screen.
- The long experience section intentionally trades document length for a physical page-turning interaction; buttons and keyboard controls provide direct navigation.
- Procedural scenes are less photorealistic than downloaded models, but load faster, remain original, and need no asset licensing.
- The contact route uses a lightweight per-instance limiter. A distributed limiter is a deployment decision, not bundled overhead for a static portfolio.
