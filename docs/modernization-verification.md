# Portfolio modernization — November 2026

## Scope and source

The owner-supplied two-page `Nima-Moradirad-2027-update.pdf` is authoritative for employment and education. The execution brief separately supplies the AI-agent, mobile and broader engineering capability descriptions. No confidential implementation details are published.

- Senior Software Engineer positioning retains deep frontend specialization and identifies Frontend Chapter Lead responsibilities.
- Hesabo: joined August 2025, Senior Frontend Developer until April 2026, then Frontend Chapter Lead. Basilica: March 2024–March 2025. Other employment dates preserved from the source.
- Five role entries, eight capability groups, localized metadata and four complete case studies in English, Persian and German. Only résumé-supported English C1 proficiency is listed; no graduation year is invented.
- The 17% bundle reduction and 9% initial-load improvement are explicitly attributed to the supplied résumé, not independently measured employer results.
- The public PDF is byte-for-byte identical to the supplied source, SHA-256 `D3A8412B034586FC556AAB3D8888C6B7C5C78222B207BE0F58893A91F81E4CDD`. The preview is its first page. The replacement script copies the original without rewriting it.
- Moradi Gallery and 3D Online Shop consistently identify their public MVP scope and confidential larger platforms. Emerald Case identifies temporarily unavailable processing servers. The removed project has no remaining public route, catalog, card, asset or sitemap entry.

## Engineering changes

Texture loading could suspend the R3F canvas, followed by deferred cleanup that destroyed its WebGL context. An explicit Suspense boundary inside the canvas keeps asynchronous artwork loading within the scene. The still remains visible until a composed frame exists and returns after a rendering failure.

Existing Drei OrbitControls scope pointer/touch rotation to the canvas. Semantic rotation buttons support keyboard access. Closing the experience unmounts its renderer; reopening, unsupported WebGL and context loss have regression coverage. Reduced motion uses demand rendering. Camera fitting uses panel aspect ratio and editor texture painting is capped at 15 Hz. Mobile offers a compact opt-in control and loads the decorative preview/scene on activation. Desktop preloads the small still with high priority.

Accessible names now include visible brand/language labels. Persian case-study typography keeps appropriate spacing and leading. Existing identity, themes, routing and ordinary static reading access are preserved. No new application dependencies were introduced.

The deployment verifier checks all current case-study routes and locales, current text/status, exact SHA, JS/CSS and PDF/preview bytes, plus removed-route noindex/404 behavior. This also fixes the previous production workflow's obsolete missing-asset requirement.

The first candidate's Linux container check exposed a packaging bug: Next.js tracing already created `standalone/public`, so copying the directory nested assets under `public/public`. Packaging now explicitly copies directory contents into existing destinations for both public assets and static chunks. The failed candidate was stopped before deployment.

## Local verification

- `npm test`: **39 passed**, nine files.
- `npm run typecheck`: **passed**, including new browser-test types.
- `npm run lint`: **passed**, zero errors; one existing `no-img-element` warning in the server-generated Open Graph image. That rendering uses ImageResponse rather than an ordinary webpage image.
- `npm run build`: **passed**, 24 generated pages, standalone output.
- `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3100 npx playwright test --reporter=line`: **27 passed**, one intentional desktop skip for the mobile-only touch test.
- Browser checks cover EN/FA/DE, RTL/LTR, 320–1440px reflow, language switching and retained routes, navigation, mobile menu, persistent themes, both-theme axe checks, JS-disabled access, case studies/media, original PDF bytes, removed routes, pointer/keyboard/touch 3D rotation, reopening, frozen reduced-motion frames, unsupported WebGL and simulated context loss.

Local dependencies were already installed with pnpm; the production workflow installs the committed npm lockfile on Linux before testing and building. Its result is recorded separately below.

## Performance evidence

Lighthouse 13.6, local production server, Chromium, default simulated mobile throttling and desktop preset. These are lab snapshots, not a statistical comparison or field p75 data. Initial mobile artwork rendering produced LCP ~3.79–3.96s; a compact mobile opt-in and deferred artwork restored a content-first first viewport.

| Lab metric                 | Mobile, compact opt-in | Desktop, initial audit |
| -------------------------- | ---------------------: | ---------------------: |
| Performance score          |                    100 |                    100 |
| FCP                        |                 1.220s |                 0.286s |
| LCP                        |                 1.220s |                 0.794s |
| CLS                        |                      0 |                 0.0188 |
| TBT                        |                   91ms |                  3.9ms |
| Speed Index                |                 2.032s |                 0.548s |
| Server-response diagnostic |                  103ms |                    7ms |

Local Accessibility and Best Practices scored 100. Local SEO scored 92 because the canonical URL correctly points to the production domain. INP, real-user TTFB and field p75 Core Web Vitals are unavailable: navigation Lighthouse audits do not establish them. TBT is not a substitute for INP. Remaining framework JavaScript and CSS diagnostics were reviewed; optional Three.js stays outside initial page loading.

## Delivery and production verification

Pending at this checkpoint. Release through the existing GitHub Actions → Liara `nimamoradirad` workflow. Verify the exact deployed SHA on both domains, original résumé bytes, all locales and browser smoke tests before removing the temporary handoff.

## Boundaries

Browser mobile checks emulate Chromium devices; physical Android/iPhone validation and field performance are not established. German/Persian copy is complete but still benefits from owner language review. The portfolio does not deploy or restart Emerald Case processing infrastructure. Existing untracked user work is preserved.

## Owner follow-up

Homepage and navigation order is Professional Experience → Skills → Projects. Hesabo copy and a dedicated skills group now explicitly describe real-time financial charts, detailed finance panels, payment-service-provider integrations, a dedicated WebSocket support chat and custom in-house tools, supplied directly by the owner. These additions are synchronized across all three locales. Shared amber notices clearly distinguish public MVP/confidential scope and temporary processing outages from project descriptions, with icon, border, tinted background and semibold label in both themes.

The follow-up passed the 39-unit and 27-browser-test suites, typecheck, lint and production build. A WebKit 26.5 mobile smoke additionally reached a ready 3D frame on the Persian page, with no page errors or horizontal overflow; this does not establish physical iPhone validation.

The corrected standalone bundle passed all Linux container checks in run 44127066081. Liara's Iran builder then rejected the pinned public base-image pull with registry RBAC access denied. Deployment now selects the supported Germany build location while retaining the exact base image, tested runtime, existing application, hosting and domains. New production verification is pending.
