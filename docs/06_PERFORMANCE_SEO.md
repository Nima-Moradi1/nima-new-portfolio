# 06 — Performance, SEO, asset engineering, observability & correctness

## Prioritize actual UX over fake scores
User asks best possible FCP, LCP, `TTL`, SEO. Clarify terminology: **TTL = time-to-live** for caches, **not** Core Web Vital; likely related targets are **TTFB**, **TBT**, **INP**, LCP, CLS and FCP. Audit and report each separately. TTI is legacy lab metric; not a current CWV target. CWV thresholds target **75th percentile field data** on eligible URLs, not guaranteed scores.

## Performance target budget (aspirational / acceptance with measured evidence)

| Metric | Target | Method / nuance |
|---|---|---|
| LCP | ≤2.5s, stretch <2.0s mobile | field p75; LCP element must NOT be trapped behind artificial loader |
| INP | ≤200ms | field p75; measure clicks, locale switch, carousel control, FAQ |
| CLS | ≤0.1 | field p75; font/images/canvas stable viewport |
| FCP | ≤1.8s mobile, stretch ~1.3s | Lighthouse/Lab; server-rendered header/text first |
| TTFB | ≤800ms mobile ideally | realistic network conditions, CDN/deploy |
| TBT | <200ms lab target | Lighthouse slow mobile; use code-splitting |
| LCP image transfer | ≤150KB if applicable | hero should be CSS/SVG text-first, not 3MB JPEG |
| initial JS transfer | aim <170KB gzip app shell excluding lazy WebGL; measure actual | bundler source split; fix regressions |
| logo SVG/2D fallback | <25KB | single mark + CSS animation |
| initial 3D geometry | ideally ≤150KB compressed custom GLB or procedural scene | optimized mesh, allow exception justified by profiler |
| textures | prefer no hero textures; if used 1–2 tiny AVIF/KTX2 textures total <250KB | never ship 7 separate 4K textures |
| hero WebGL decode/start | budget ≤1s on typical desktop; measure | SSR remains interactive when GPU slow |
| Lighthouse | **Performance mobile ≥90 stretch, desktop ≥95**; A11y/SEO/Best Practices ≥95 desirable | cannot promise score across all hardware/networks; record actual results |

These are engineering targets, **not current measurements**. If a target conflicts with visual fidelity, profile variants and document the deliberate tradeoff. Never report `100/100` without actual calibrated run.

## Loading pipeline

1. **SSR first:** send semantic name/title/mode labels/project/job names and metadata. Native browser must paint meaningful content prior to WebGL initialization. Avoid client-only entire app shell.
2. Load CSS and self-hosted font subsets only as needed. Font-display: swap; prevent layout jump with measured fallbacks/size-adjust if available.
3. `dynamic()` import WebGL after shell/preloader first paint; only fetch essential geometry/materials; register true scene-ready signal after one painted frame (not just GLB network completion).
4. 3D loader runs in parallel with assets, but **must not cover server-painted meaningful content indefinitely**. Show static initial mark instantly, optimistic reveal when ready, and hard fallback by ~6–8 seconds on bad connection; do not block awaiting all fonts, résumé PDF, gallery screenshots or offscreen video.
5. Route deeper images with `next/image`, sizes/intrinsics and on-view decode. Videos `preload=none` or metadata with poster except deliberate active case-study media. Data loading never gates 3D hero unnecessarily.
6. Cache immutable hashed assets long, version public static files carefully. Invalidate on release; `Cache-Control` TTL appropriate, SW versioned updates and cleanup if existing PWA behavior is retained.

## WebGL/material budgets
- Prefer procedural instanced geometry or single optimized glTF repeated with transform; merged vertices and compressed mesh if real model.
- Avoid environmental HDR files unless compressed/needed; use low-resolution environment or authored studio lights. No multiple layered full-screen transparent canvases.
- Shader/material compilation warmup needs measurement. Use simple PBR materials, moderate metalness/roughness and single controlled rim light; avoid costly transmission/high blur, screen-space refraction and real-time soft shadows on low tier.
- Context memory check: scene texture/renderTarget geometries disposed on unmount, observers disconnected, no 3D media retained after navigating out. R3F frameloop `demand` during idle and when occluded, continuous only during active story motion.
- Adaptive quality selects tier using observed frame timing (with hysteresis) and reduced-motion preference; don't rely solely on hardware concurrency/browser user agent.
- Mobile stability: no 200ms input delays while scrolling, no audio auto-play, no forced screen wake, no unbounded rendering in inactive tabs. Detect WebGL loss and restore or fallback.

## Asset workflow

```text
master Blender model / procedural mesh
 → clean topology, normals, UV only if truly needed
 → glTF/GLB with reusable materials
 → gltf-transform inspect/dedup/prune/meshopt (or Draco if supported/justified)
 → measure compressed wire size + decoded GPU memory
 → web CI asset-budget test with documented exception policy
```

Images: AVIF/WebP responsive, strip EXIF, preserve true screenshots, don't overcompress text in the case study to unreadability. Fonts: subset by script/weight where licensing permits. Icons: tree-shake Lucide. No broad dynamic import of all project case-study pages into initial hero. Route-based splitting.

## SEO semantics and discoverability
- Preserve Next App Router localized server metadata and sitemap/robots/JSON-LD. Update all `homeTitle`, descriptions and OG labels from `Senior Frontend Engineer` to **AI Full-Stack Developer** accurately. Localize human-facing copy only; consistent canonical personal brand spelling.
- `hreflang` EN `/`, FA `/fa`, DE `/de`, `x-default` and appropriate locale-specific canonical paths, ensure no duplicate canonical for variants.
- Home server HTML: `<h1>` accessible name and role, meaningful introductory paragraph, semantic `<section>` for Projects, Experience, Proof, FAQ, Contact, nested heading hierarchy. Canvas `aria-hidden` and text accessible without JS.
- Include all featured project names and work history in HTML even if visual viewport shows just one; avoid accidental SEO cloaking: hidden pages in offscreen semantic region must stay logically visible to assistive tech or discoverable through accessible selector, no offscreen keyword dumps.
- Correct JSON-LD `Person` with name, `jobTitle`, URL, `sameAs` verified profiles, works/knowsAbout only when accurate. Optional `CreativeWork` project metadata. No exaggerated qualifications or structured fake `Review`/FAQ rich result expectations.
- OpenGraph/Twitter originals using new NM visual identity; localized title/description; no third-party screenshots in OG without rights. Social link checks and sitemap route tests.
- Preserve custom 404/error/contact API security headers where present; audit CSP if adding 3D/textures, no client-exposed API secrets, sanitized form, rate limits.

## Accessibility: not negotiable
- WCAG 2.2 AA oriented: visible focus, understandable tab structure, no focus trap in canvas, skip link, keyboard navigation, 4.5:1 normal text contrast, 3:1 large, target sizing, good headings.
- Reduced-motion stops excessive movements and loader animations; accessible static fallback shows **all seven projects/four experiences** in semantic blocks or tabs.
- Canvas is not sole way to operate the site, no disabled pointer text labels for keyboard users, no invisible controls under canvas overlay.
- FAQ button `aria-expanded`, region association, animated height with reduced-motion alternative. Contact dialog focus management and `aria-live` successful/error state.
- Persian mixed-direction control messages and company names use bdi; RTL navigation arrows reflect logical order.

## Security, deployment, legal safety
- Avoid GitHub secret leakage in screenshots, logs, `.env`, client variables. Render contact email intentionally; confirm public phone number choice with owner.
- Existing Liara deploy pipeline is precious. Don't overwrite deployment token, refactor workflow blindly or trigger production without approval. Use local/preview branch deploy first and compare health checks.
- Honor origin site's creative rights: reproduce interaction patterns, not code, models, logos, images, copy or sounds.
- Add `ASSET_LICENSES.md` provenance for own logo meshes, legally licensed fonts, any icon/audio/stock use.

## Verification cadence / token control
- **T00** baseline current Lighthouse once, separate mobile and desktop; retain raw JSON not just screenshot.
- During scoped content tasks: typecheck/schema or targeted test only.
- For scene tasks: one targeted interaction + memory/FPS microprofile, not full E2E suite after every file.
- After milestone Motion Alpha: one `lint`, `typecheck`, unit tests, production build, focused E2E and screenshot diff.
- After Optimization Beta: measure Lighthouse using **production server**, stable network profile and cached/uncached, repeat relevant run for confidence; note variability and collect p75 real RUM if possible. Build once per revision of compiled bundle, not endlessly.
- Always record command, environment, commit/hash, measured numbers and raw output path in `HANDOFF.md`; a test not run is `NOT RUN`, never `PASS`.
