# 03 — Technical architecture & strict engineering boundaries

## Start from the verified existing repo — no rewrite from scratch
Reviewed `package.json` (2026-10-20): Next `16.2.10`, React `19.2.4`, `three` `0.182.0`, `@react-three/fiber` `^9.6.1`, `@react-three/drei` `^10.7.7`, `motion` `^12.42.2`, `next-intl` `^4.13.2`, Tailwind v4, Zod, React Hook Form, Radix, Vitest, Playwright, axe. Current page uses server-rendered content + 3D desk scene/book/lamp, custom loader, three locales, contact modal, `/api/contact`, detailed case-study routes, Liara Docker deploy. Preserve verified infrastructure and prioritize reuse.

**Stack decisions**
- **Keep** Next 16 App Router, React 19, TypeScript, Tailwind v4, next-intl, Three.js + R3F/Drei, Zod, Vitest/Playwright/axe. Prefer `next/font` + existing font files if legal.
- **Add only if justified by reference capture:** `gsap` + `ScrollTrigger` for section timelines and reversible scrub, `lenis` for smoother wheel/touch if native scrollbar cannot match verified source without harming accessibility. Install ONLY after measuring baseline and documenting why existing `motion`/native scroll isn't sufficient.
- **GSAP licensing:** ScrollTrigger is free under GSAP terms; check current license for any optional plugins and avoid relying on commercial-only features. SplitText is not required; implement original text splitting only if accessible and tested.
- `motion` remains for independent button/dialog/DOM micro-interactions, NOT a second high-frequency page scroll engine. No framer-motion + GSAP double-writing `transform` on same element.
- **Backend:** this portfolio is mostly static content. Keep existing contact route if tested; no database, headless CMS, auth or unnecessary API. Full-stack title is demonstrated by case studies and architecture, not by artificially adding a portfolio backend.

## Logical architecture

```text
Next Server Components (SEO + localized semantic content)
         |                  |                          |
    Content catalogs   Contact/FAQ HTML         Metadata/canonicals
         |                  |
         +------- Shared Interaction Shell (minimal client) ------+
                         |                  |                     |
                 mode + index store    timeline controller     contact dialog
                         |                  |
                   3D scene store  <---- normalized progress
                         |
                ONE persistent R3F Canvas
                         |
              monolith ring + key light + camera
                         |
                 WebGL fallback 2D content
```

**Critical invariant:** R3F render loop directly reads mutable external scene state / GSAP timeline or refs and interpolates transforms (e.g. `useFrame`). Do not call React state setters on every wheel tick, frame or pointermove. React re-renders only when active settled item, mode or accessible UI state changes. Scroll position source is authoritative once, consumed by 3D and overlays.

## Proposed target folder map (adapt existing instead of destructive reorg)

```text
src/
  app/
    [locale]/layout.tsx                    # existing metadata/lang/dir
    [locale]/page.tsx                      # semantic one-page narrative
    [locale]/projects/[slug]/...          # preserve existing case-study routes
    api/contact/route.ts                   # preserve tested submission
    globals.css                            # only global resets/tokens/fonts
  components/
    kinetic/
      KineticExperience.tsx                # composition / orchestration only
      KineticStage.tsx                     # fixed single scene boundary
      MonolithScene.tsx                    # canvas scene
      MonolithGeometry.tsx                 # original reusable mesh/instances
      MonolithMaterial.tsx                 # material presets
      MonolithLighting.tsx                 # lighting by stage
      CameraRig.tsx                        # camera targets and follow
      CanvasFallback.tsx                   # full semantic fallback
      useSceneQuality.ts                   # capability / adaptive DPR
    motion/
      useScrollDirector.ts                 # one controller with teardown
      motionTimelines.ts                   # chapter transforms + constants
      useNormalizedSceneState.ts           # no per-frame React updates
    navigation/
      PortfolioModeSwitch.tsx              # ONLY projects / experience
      TrackSelector.tsx                    # item indicator, keyboard/touch
      LocaleSwitcher.tsx                   # reuse existing where possible
    branding/
      NMBrandMark.tsx                      # semantic SVG
      NMPreloader.tsx                      # readiness-aware transitions
    content/
      ItemNarrative.tsx                    # semantic index copy
      ProofChapters.tsx
      FAQAccordion.tsx
      ContactStage.tsx
    ui/                                    # pre-existing primitives, styled via tokens
  content/
    portfolio.ts                           # use existing localized source
    kinetic-content.ts                     # minimal ID/ref adapters, not copy
    faqs.ts                                # localized FAQ data keyed by ID
  messages/{en,fa,de}/                     # existing JSON catalogs + new keys
  i18n/                                    # existing next-intl config
  lib/scene-tokens.ts; lib/motion-tokens.ts; lib/scene-state.ts
public/brand/                               # original SVG / optional GLB
public/assets/projects/                    # reuse optimized real captures
```

Do not add all these files reflexively; add only after matching existing folder conventions and verifying each separation saves duplication. Prefer thin functions to giant components or dozens of no-op wrappers.

## Cross-track state contract

```ts
type PortfolioMode = 'projects' | 'experience';
type Chapter = 'loading' | 'hero' | 'carousel' | 'proof' | 'statement' | 'lineup' | 'faq' | 'contact';
type SceneModel = {
  mode: PortfolioMode;
  itemId: string; // stable source content ID
  chapter: Chapter;
  chapterProgress: number; // 0..1 normalized scrub, not React setState
  activeIndex: number;
  rotationY: number;
  groupRotationY: number;
  cameraDistance: number;
  qualityTier: 'high' | 'medium' | 'low' | 'fallback';
};
```

- `itemsForMode(mode)` draws from source `portfolio.projects`/`portfolio.experience` with IDs; default `projects`, 7 entries including shop after validation; 4 experiences.
- One mode store, one item selection/store, one scroll director, one scene. Use `URLSearchParams` for `view`, handle `popstate` and direct link SSR defaults without hydration mismatch.
- Define `changeMode(newMode)` as an atomic operation: freeze old timeline snapshot → choose ID/index for target track → set URL → tween visual cluster transition → resume scroll director at valid anchor → focus correct heading once settled. Cancel ongoing tween to avoid stale references. Fallback path uses simple CSS crossfade.
- Device resize: `ScrollTrigger.refresh()` after layout/fonts/media settle with debounced scheduling, not on every render; recompute scroll chapter metrics and keep logical active item.
- Localization changes: preserve content stable IDs, project selection and mode where possible. Do not rely on array title text to match records.

## Animation pipeline
- Recommended if installed: `Lenis.raf(time)` driven by **GSAP ticker once**, and `ScrollTrigger.update` in registered integration. On cleanup, remove ticker callback, listeners, triggers and Lenis instance. Respect `prefers-reduced-motion`: disable Lenis and scrub transforms, expose native navigation.
- One `requestAnimationFrame` ownership and ideally one persistent Canvas. If R3F owns render RAF and GSAP has ticker, synchronize using shared ref inputs, no extra animation RAF; on idle/demand mode stop heavy render and only invalidate on updates.
- All GSAP timelines created in scoped context with cleanup (`ctx.revert()`), no orphan ScrollTriggers across locale switches or React Strict Mode double mount.
- Use same normalized scene-state contract for wheel, touch, keyboard and progress selectors; no competing per-input position engines.

## Design system and CSS governance
- Source of truth: `src/app/globals.css` for color/type primitive tokens only + `src/lib/scene-tokens.ts` + component-local scoped classes (Tailwind + `cva` when variant logic genuinely needed).
- Reusable `Surface`, `Text`, `Container`, `Divider`, `IconButton`, `FocusRing`, `PortalDialog`, `LocaleToggle`, `MotionReveal`. Start by checking existing `src/components/ui` before adding.
- Do not blindly duplicate arbitrary `className` strings; extract a reusable primitive when ≥3 instances have identical behavior and style. Don't abstract every one-off decorative scene part.
- Avoid both giant global CSS and dozens of overlapping `.module.css` files. Scoped CSS only for advanced 3D mask/tricky keyframes; Tailwind semantic utilities for layout.
- All properties support logical flow (`inline-start`, `inline-end`), locale and dark theme. Preserve current `getLocaleDirection` and `src/lib/logical-scroll.ts` where relevant.
- Tokens for typography and viewport breakpoints from `docs/02_ART_DIRECTION.md`; implement and check in three locale screenshots.

## Data quality and content separation
- `src/messages/<locale>/portfolio.json` is **primary record**; `src/types/portfolio.ts` defines schema. Existing English file is fallback / baseline, not duplication target.
- Add `sarochi-3d-shop` with same ID in all three locales, consistent links, `technologies` only after source verification; update `number` sequentially and sort by editorial priority in one reviewed decision.
- Build `projectDetails[stableId]`/`experienceDetails[stableId]` with optional verified `companyPurpose`, `yourRole`, `deliverables`, `keyChallenges`, `technicalApproach`, `security`, `performance`, `caseStudyHref`. Do not mix 3D rendering metadata with human copy.
- FAQ schema `{id, question, answer, relatedProjectIds?}` with paragraphs/links; no auto-generated unverified performance statistics.

## Preserve existing route contracts and deployment
- Existing routes like `/projects/xo-arena`, `/projects/emerald-case`, `/projects/moradi-gallery`, `/projects/tarabari-nima` must not disappear; keep EN unprefixed, FA `/fa`, DE `/de`, localized `hreflang` and metadata.
- Current `.github/workflows/deploy-liara.yml` packages standalone Node/Docker to Liara; do not change deploy mode/branch automatic triggers absent owner approval. Prefer feature branch and preview verification.
- Existing `RESEND_API_KEY`, `CONTACT_DESTINATION_EMAIL`, `CONTACT_FROM_EMAIL` remain server-side only. Enforce schema and throttling; if mail provider unavailable, show honest mailto link rather than fake success.
- Keep resume PDF and public-safe private-phone treatment; don't expose any truly private contact numbers beyond already intended public contact section without confirmation.

## Engineering acceptance examples
- One `WebGLRenderingContext` for main interactive narrative, plus optional separate scenes *only* on existing case-study routes loaded lazily.
- Interacting with one 3D item doesn't remount 7 canvas elements or download 7 huge GLBs.
- Client rendering is only for interaction; `curl`/HTML source and no-JS page expose all job/project/company/FAQ/contact text.
- React devtools Profiler shows no component rerender every frame; performance browser profile confirms no stale RAF/renderer or WebGL context leak after repeated switches/unmount.
- Every mode/locale transition teardown clean, focused keyboard element sensible, no scroll lock left behind.
