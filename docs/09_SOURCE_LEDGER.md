# 09 — Source ledger, evidence confidence & limitations

**Research date:** 2026-10-20. The provided bundle is instructions and specifications, not modified product code.

## Execution update — 2026-10-20 (supersedes initial limitations below)

- Portfolio local commit verified as `a18911c0f9f493eed70fd8c65f844d6853be1e44`; it is a real commit SHA. Work proceeds in isolated `feat/nm-kinetic-portfolio` worktree `updated-portfolio`; original clean `main` preserved. See `evidence/T00_SAFETY_SNAPSHOT.md`.
- Ciao live WebGL rendered in installed Chrome; desktop 1440×900 and mobile emulation 390×844 each have 34 timestamped checkpoints and an unaltered recording. DOM section geometry and input-dependent scroll settling are measured. **Detailed frame/easing/camera calibration and individual flavor controls remain open.** The observed first settled composition is a ring, followed by a single enlarged profile; do not treat the proposed single-object-first sequence as measured source behavior. See `REFERENCE_MEASUREMENTS.md` and raw `reference-captures/2026-10-20-full/`.
- Sarochi noninteractive Git access succeeded and remote/local HEAD match `ac39e2a0dc6161847d211a6fa419303d97f2ff60`. The old connector 404 is tool-specific historical evidence, not a current general access blocker. Current source/API evidence and a bounded canonical rendered product/gallery/prepared-photo flow are in `evidence/T04_CLAIMS_AND_SAROCHI.md` and `evidence/T02-shop/`. No fresh generation, upload or checkout was invoked. Exact-person garment reconstruction, physical fit, advanced tie quality and deployed SHA parity are not established.
- Actual baseline Lighthouse reports now exist: production EN mobile Performance 67 / desktop 70; one local production build passed; valid local FA mobile Performance 54 plus a failed local EN self-redirect report retained. Single-run/environment/locale caveats, raw JSON/HTML, SSR/a11y and lab cadence/input proxies are in `evidence/T03-2026-10-20/SUMMARY.md`. No field p75 or redesigned-site score is claimed.
- Stage A audits left source unchanged. The later implementation session integrated the original kinetic scene and three-locale Sarochi content, preserving historical employment objects; code is now changed/uncommitted. Current evidence: `evidence/T-implementation-2026-10-20/SUMMARY.md`. One canvas desktop/mobile flow, reduced-motion/context-loss fallback, corrected EN route, meaningful server HTML and bounded idle rendering are demonstrated. Exact source fidelity, physical-device performance and real transport remain unverified. Lockfiles, forwarding settings, workflow and production deployment were not changed; no new build/Lighthouse was run.

The remaining sections preserve what the original package author had and had not verified at packaging time.

## Live design reference
1. https://www.ciaoenergy.com/ — directly extracted structure: 6 flavors, 4 proof-like chapters, FAQ, signup, footer. This is an HTML/text extraction, **not** full captured canvas interaction.
2. https://katapick.com/sites/ciao-energy — independent design analysis including screenshot/typography/colors, section order, canvas and scroll observations. Design analysis labels exact implementation details as inferred; treat appropriately.
3. https://riccardomarconato.com/blog/ciao-energy-range-on-a-turntable — observational breakdown of suspended rotating multi-can rig.
4. https://github.com/KuldeepMahto07/ciao/blob/main/reference-analysis.md — public replica engineering notes captured 2026-08-29; contains reported Three.js, GSAP, Webflow, reference choreography and rough dimensions. **Not official Ciao source, timings not exact.** Don't reuse their copied original assets/source.
5. https://www.skaald.com/ and https://www.linkedin.com/company/skaald/ — creator context. Not a licensing grant.

## User data sources — confirmed through GitHub connector
1. https://github.com/Nima-Moradi1/nima-new-portfolio — accessible public main branch. Tree SHA observed: `a18911c0f9f493eed70fd8c65f844d6853be1e44` (tree, not commit ID). Existing Next 16/React19 design and tests.
2. `src/messages/{en,fa,de}/portfolio.json` — 6 current project records, 4 job records, education, social links, 3-locale portfolio copy. Do not manually copy/translate old data; integrate originals by import.
3. `src/messages/{en,fa,de}/common.json` — local metadata, loader, form/contact/status copy, etc.
4. `src/content/portfolio.ts` — localized data adapter and `NEXT_PUBLIC_CONTACT_EMAIL` override.
5. `src/components/contact/contact-dialog.tsx` — LinkedIn, public-facing Telegram handle, Gmail, résumé and `tel:` channel.
6. `src/i18n/routing.ts`, `docs/INTERNATIONALIZATION.md` — `en` default, `fa` RTL, `de`, prefixed routing, locale switch contract.
7. `package.json`, `PERFORMANCE.md`, `DESIGN_SYSTEM.md`, `README.md`, `.github/workflows/deploy-liara.yml`, `src/components/loading/landing-preloader.tsx`, `src/components/three/hero-studio.tsx`, `src/components/sections/projects-section.tsx` — current stack, architecture, loader and deploy constraints.
8. https://nimamoradirad.com/ — directly extracted home content about roles/project listings, but current browser runtime interaction was not captured.

## New shop project limitation
- URL supplied by user: https://3d-shop-design.ir/ . Search HTML contained title `فروشگاه پوشاک | بوتیک تعاملی`, little searchable app content; **not evidence** of completed features or exact stack.
- GitHub supplied: https://github.com/Nima-Moradi1/sarochi-shop-design — current connector get_repo and fetch returned `404 NOT_FOUND` on 2026-10-20. Potentially private, renamed, or missing app permission. Treat as **ACCESS BLOCKER**, not proof that repo does not exist.
- Feature draft in `docs/04_CONTENT_I18N.md` describes the user's intended 3D apparel concept only; production readiness and virtual try-on capabilities are unverified. Codex must access repo with permissions to confirm before public claims.

## Performance baseline caveat
No programmatic real-browser reference capture, Lighthouse run, dynamic interaction timings, CPU/GPU traces, TTFB/FCP/LCP/CLS/INP measurement or visual screenshot diff was executed by author of this bundle. All performance numerical values in `docs/06_PERFORMANCE_SEO.md` are targets, not measured results. All animation time/angle ranges in docs are tentative until captured.

## Rights & scope
This brief asks to emulate observable **UX/animation system** while requiring original logos/models/assets/copy and legal font licensing. Source and related public reconstructions are *research references*, not assets to download and ship verbatim. For all external dependencies, check current licenses and versions at implementation time.
