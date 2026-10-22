# Performance strategy

The employer-focused revision renders professional text, ordinary navigation, projects, chronology, skills, and contact details without waiting for WebGL or video. The old full-page preloader and depth-scroll controller are not mounted.

The hero defaults to an optimized genuine scene capture. The Three.js/React Three Fiber module is imported only after explicit Explore 3D activation; closing it unmounts the scene. The scene retains its offscreen render-loop suspension. Mobile omits the decorative hero media. Optional rendering failure leaves text and the static preview available.

Project images use reserved aspect ratios and Next Image sizing. Below-fold images load lazily. XO Arena video uses a poster, `preload=none`, native controls, and a direct recording link; it does not autoplay or preload the whole recording.

No portfolio service worker is registered. Résumé and preview updates retain stable public URLs; deployments verify the exact PDF bytes. The provider and cache configuration were preserved.

Targets are LCP <=2.5s, INP <=200ms, CLS <=0.1 at the field 75th percentile, separately for mobile and desktop. No field dataset or comparable before/after lab baseline is available for this revision. A browser smoke check or production build is not a field-performance measurement. Actual verification results are recorded in `docs/employer-focused-implementation.md`.
