# Research and Inspiration

Research was reviewed on July 15, 2026. These references informed principles only; no layout, scene, model, visual identity, code, or animation sequence was copied.

## Creative references

### [Bruno Simon — Portfolio](https://bruno-simon.com/)

**Principle learned:** a 3D portfolio becomes memorable when the interaction expresses the creator’s identity, not when WebGL is added as decoration. Signal Atelier uses a distinct signal-system metaphor and keeps navigation conventional.

### [Active Theory](https://activetheory.net/)

**Principle learned:** immersive work feels coherent when story, art, and engineering share one production language. The site therefore reuses orbit, grid, material, color, and motion rules across 2D and 3D.

### [Awwwards WebGL collection](https://www.awwwards.com/websites/webgl/)

**Principle learned:** current WebGL experiences often succeed through a strong opening interaction and clear art direction, but spectacle can overwhelm content. The 3D layer here is concentrated in the hero and critical information stays in HTML.

## Engineering references

### [React Three Fiber — Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

**Principle learned:** broad device support requires adaptive rendering, reuse, and careful render-loop choices. The implementation caps DPR, uses adaptive DPR, instances repeated nodes, and switches to demand rendering for reduced motion.

### [Three.js manual](https://threejs.org/manual/)

**Principle learned:** responsive sizing, object reuse, limited geometry, and explicit resource lifecycle awareness are part of scene design. The scene uses small procedural geometry and relies on React Three Fiber’s disposal lifecycle.

### [Next.js — Lazy loading Client Components and libraries](https://nextjs.org/docs/app/guides/lazy-loading)

**Principle learned:** defer heavy client code that is not required for initial content. The WebGL implementation is dynamically imported behind a visual fallback.

### [web.dev — prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)

**Principle learned:** reduced motion is an alternate, complete design mode—not a broken site with every effect abruptly removed. Signal Atelier keeps hierarchy, color, and static spatial composition while eliminating continuous and large movement.

### [Next.js — Metadata and Open Graph images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

**Principle learned:** metadata, icons, social art, robots, and sitemaps should be first-class route assets. The project uses typed metadata and generated imagery rather than fragile external URLs.

## Resulting constraints

- One creative metaphor, not a gallery of unrelated demos
- Immediate readable content with progressive WebGL enhancement
- No mandatory intro, scroll capture, auto-playing sound, or hidden navigation
- Original procedural visuals with no remote asset dependency
- Explicit reduced-motion and non-WebGL compositions
- Performance rules documented before real résumé assets are introduced
