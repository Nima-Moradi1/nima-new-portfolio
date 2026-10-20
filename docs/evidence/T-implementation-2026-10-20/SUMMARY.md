# Implementation integration — 2026-10-20

Branch `feat/nm-kinetic-portfolio`, baseline HEAD `a18911c`. The application changes are **uncommitted**. This session found implementation already present despite a stale audit-only handoff, preserved it, and completed integration defects. No install, build, deployment, commit or push ran.

## Implemented behavior

- One persistent R3F stage: original NM identity unfolds into a seven-cartridge radial mechanism with a common pivot. The same objects continue through four proof signatures, statement, recap and FAQ exit. Four matte experience cartridges use the existing job records and titles.
- Native passive scroll director, reversible chapter transforms, actual-frame readiness, bounded 6.5s fallback and renderer/context-loss handling. Fixed an unconditional failure effect inside the native canvas fallback: React mounts that content even when WebGL works.
- Compact Projects/Experience controls, selector keyboard arrows/Home/End, query/history restoration, item/proof deep links and locale-specific scene lifetime. Instant restoration avoids inherited smooth-scroll animations overwriting a selected deep link.
- Reader/reduced-motion edition and short-viewport/landscape fallback; full employment highlights remain available in semantic layout. Orientation changes preserve selected IDs. Mobile camera/copy spacing separates the central cartridge from body copy; safe-area offsets protect fixed controls.
- EN/FA/DE content, verified seventh Sarochi project with three real captures and a localized detail route, nine native FAQ disclosures, contact form/direct channels and localized NM metadata remain integrated. Existing routes, résumé and deployment workflow remain preserved.
- Next 16 `skipProxyUrlNormalize` fixes the EN loopback redirect. Replaced an unsupported Lucide `Github` import with the existing supported `Code2` source symbol.
- Idle rendering now has a 1.5s input-driven settling tail. Pointer/scroll/director/resize events wake it; transitions finish before sleeping. DPR remains bounded; no animation library/package was added.
- `assets/NM_BRAND_PROTOTYPES.svg` contains three original geometric studies with true 24px previews. A retains the production paths for clearer separated N/M planes, 3/80 gap and ≥8/80 stems; planar extrusion/shallow bevels preserve the light slit. B/C record shared-spine/folded alternatives and their joint/occlusion constraints. SVG parsing/path identity and root visual review passed; `brand-prototypes.png` and desktop/mobile hero captures supply T05 evidence.

## Fresh checks

| Check | Result and boundary |
|---|---|
| `npm run typecheck` | PASS. Last run includes integration, complete job highlights and `useWatch`; subsequent contact change only moves submission factory into its event handler. |
| Scoped ESLint | PASS for kinetic/branding/content/types/home/new Sarochi route/content test, plus worker-owned header/footer/SEO/contact/config files. Initial effect/ref/compiler failures were corrected. `ContactStage` final event-handler check PASS separately. No global lint-rule change; director has a documented local exemption for imperative DOM/shared-ref mutation. |
| `npm test -- tests/unit/portfolio-content.test.ts` | PASS 4/4. Stale role/six-project assertions updated to current identity and stable IDs; historic-role assertions retained. No broad suite. |
| Locale/content inspection | Worker in-memory check PASS 1,923 checks: schema/string parity, IDs, routes/assets, technologies and unchanged historical experience objects across three locales. Three Sarochi WEBPs 1280×900, total 188,066 bytes. An optional Sharp probe was unavailable; the existing WebP header parser supplied dimensions without an install. |
| Routing seam | Eight NextRequest/next-intl cases PASS; installed Next config loader confirms the current `skipProxyUrlNormalize` enables the intended runtime flag. EN live dev HTTP 200 now verified. |
| [Rendered flow](rendered-flow.json) | Installed Chrome 155.0.8059.85, dev server `http://127.0.0.1:3100`, 1440×900 EN and 390×844 FA, DPR 1, explicit no-reduced-motion. Hero → assembly → projects → proof → recap → FAQ → reverse; selector End, two-mode switch/back, reader toggle, native FAQ Enter open/close, synthetic context loss. One canvas in immersive mode, zero in reader/failure mode, zero page/console errors and no horizontal document overflow in sampled states. |
| [Resize probe, first attempt](resize-probe-first-attempt.json) | First five checks PASS: experience `item=kzi`, desktop→mobile selected-ID preservation, short-landscape semantic fallback, portrait restoration and FA selected project screenshot. Final assertion used a nonexistent `proof-delivery` ID; actual stable ID is `shipping`. This was a harness error, not accepted proof evidence. |
| [Corrected proof + idle probe](proof-idle.json) | PASS: `#proof-shipping` takes priority over item scroll. Instrumented WebGL draw count unchanged 13,563→13,563 after a 400ms idle sample; pointer wakes rendering, then count settles 22,487→22,487 over another 300ms. This proves bounded idle rendering in this run, not FPS/device/memory performance. |
| [HTML and form](html-form.json) | EN/FA/DE HTTP 200, project/history text, canonical and language alternates in server HTML. Empty contact submission shows client field errors; **zero contact POSTs**. No real email or provider call was made. |
| [Final mobile optical spacing](mobile-final.json) | FA carousel/proof at 390×844: no horizontal overflow, 22.4px display title / 14px body. Metadata moves above the 3D silhouette; the secondary proof heading remains semantic on mobile. Final `mobile-fa-work.png` / `mobile-fa-proof.png` reflect this spacing and idle-tail revision. |

Browser plugin/skill is not available in this session; installed Chrome through the existing Playwright dependency was used. Temporary scripts live in the OS temp directory. Screenshots are retained here under the repository's mandatory evidence protocol. First failed smoke attempts exposed the canvas fallback bug; they must not be interpreted as WebGL acceptance. Screenshots capture core geometry before the final idle-tail tuning; final idle behavior is independently recorded in `proof-idle.json`.

## Visual decisions and remaining acceptance

| Reference evidence | NM implementation | Status |
|---|---|---|
| `docs/REFERENCE_MEASUREMENTS.md`: source settled view is already a ring; individual flavor control/easing fit remains unmeasured. | A single NM identity unfolds into the ring, following the proposed original adaptation in docs/05. Seven projects use native document scroll. | Intentional adaptation, **not a measured fidelity pass**. T01/T28 remain open. |
| Source uses one fixed canvas, radial neighbors and upper/lower mechanism. | One persistent stage/common pivot, original faceted cartridges/rails. Desktop and FA mobile screenshots retained. | Functional composition demonstrated; exact silhouette/camera/easing tolerances pending. |
| Source desktop wheel has input-dependent movement near the opening. | Native scroll remains usable; no wheel interception, new smooth-scroll package or copied snap behavior. | Accessibility/implementation decision; no claim of source input equivalence. |

T05, T07, T17 and T19 acceptance is supported within their stated scope. Other runtime features have implementation, but their broader acceptance gates stay unchecked. Remaining: full reference fit, all locale/360/430/tablet/zoom/physical-device coverage, denied-WebGL/slow-network cases, contact provider/error regression, full route/security checks, transfer/decode and memory profiling, stable milestone build/QA. Full build/Lighthouse/broad suites were deliberately deferred at the user's request. No new performance score, production release or exact-human-VTO claim exists.

At closure the dev server remains available on `http://127.0.0.1:3100` (PID 15744); owned browser contexts were closed. This is a local preview, not deployment.

## Key changed surfaces

`src/components/kinetic/{kinetic-experience,kinetic-stage,monolith-scene,nm-geometry,contact-stage,use-scroll-director}.*`, `src/lib/kinetic-model.ts`, `src/app/[locale]/page.tsx`, `next.config.js`, `src/components/layout/site-footer.tsx`, `tests/unit/portfolio-content.test.ts`, plus preserved earlier locale/brand/Sarochi/SEO/contact implementation. No dependency or deployment-workflow change.
