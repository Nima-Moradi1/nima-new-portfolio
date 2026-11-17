# Portfolio modernization — November 2026

Completed and production-verified: Liara **v67**, application source **07b48ad64d7e35effe761ef7f774316ff78b682e**. English, Persian and German are live on both public domains. Final documentation commits do not change the deployed application.

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

## Production performance

Lighthouse 13.6 navigation audits of https://nimamoradirad.com after v67 activation. Default simulated mobile throttling and desktop preset, collected separately after browser tests. Full compact results: [lab record](performance/modernization-lab-2026-11-17.json).

| Lab metric                           | Production mobile | Production desktop |
| ------------------------------------ | ----------------: | -----------------: |
| Performance                          |                98 |                100 |
| Accessibility / Best Practices / SEO |   100 / 100 / 100 |    100 / 100 / 100 |
| FCP                                  |            1.236s |             0.543s |
| LCP                                  |            1.236s |             0.623s |
| CLS                                  |                 0 |                  0 |
| TBT                                  |             148ms |                4ms |
| Speed Index                          |            1.893s |             0.807s |
| Server-response diagnostic           |             133ms |              488ms |

Both lab LCP/CLS results meet the specified good thresholds. Field p75, INP and real-user TTFB remain unmeasured. No Lighthouse runtime warnings. Remaining diagnostics concern stylesheet/font dependency chains; mobile estimated render-blocking savings were 140ms. No application rewrite was justified by those findings.

## Delivery and production verification

- Repository: [Nima-Moradi1/nima-new-portfolio](https://github.com/Nima-Moradi1/nima-new-portfolio), branch `main`; categorized `feat`, `fix` and `docs` commits, also synchronized to `feat/portfolio-modernization`.
- Owner follow-up commits: `27c8c4a` (experience-first order and Hesabo responsibilities), `0f89add` (shared warning notices), `07b48ad` (Germany builder).
- [GitHub run 44129831375](https://github.com/Nima-Moradi1/nima-new-portfolio/actions/runs/44129831375) passed the locked npm install, lint, typecheck, 39 unit tests, Linux build, standalone packaging and production-container smoke checks. Its Liara upload stalled after archive creation for over eight minutes; it was canceled before a new release existed. This workflow is not reported as a successful automated deployment.
- Downloaded its tested Linux runtime artifact `14348054243`, verified the original manifest SHA-256 `b9b725d43166a840e04d79e58025c4e9c1d01d56ef98863d33597c75b0f8e6bb`, and deployed that unchanged bundle with the authenticated local Liara CLI 9.7 and Germany builder. No dependency reinstall, Windows build substitution, plan change, DNS change or domain change.
- Liara application `nimamoradirad`: release **v67**, current and **READY**. CLI completion corroborated through Liara release metadata and exact live SHA **07b48ad64d7e35effe761ef7f774316ff78b682e** on [production](https://nimamoradirad.com) and [Liara domain](https://nimamoradirad.liara.run) after routing propagation.
- On each public domain: all **18 localized routes** and **26 exact asset hashes** verified against the CI runtime's extracted public/static files, including the original PDF and preview; removed routes verified as noindex/404.
- Full live Playwright suite against `https://nimamoradirad.com`: **27 passed**, one intentional desktop skip for the mobile-only touch case, 1.5 minutes. This includes section order, all locales/reflow, language switching, both-theme accessibility, original PDF bytes, routes, pointer/keyboard/touch 3D rotation, reopening and failure/reduced-motion fallbacks.
- Application source is fully committed and pushed. Final result/handoff cleanup uses documentation-only `[skip ci]` commits, preserving the verified deployed application; temporary handoff is retained in Git history.

## Boundaries

Browser mobile checks emulate Chromium devices; physical Android/iPhone validation and field performance are not established. German/Persian copy is complete but still benefits from owner language review. GitHub-runner upload transport remains unreliable; the successful release used the exact CI-tested artifact through the local authenticated CLI. This external transport limitation is not presented as a repaired automated CI deployment. The portfolio does not deploy or restart Emerald Case processing infrastructure. Existing untracked user work is preserved.

## Owner follow-up

Homepage and navigation order is Professional Experience → Skills → Projects. Hesabo copy and a dedicated skills group now explicitly describe real-time financial charts, detailed finance panels, payment-service-provider integrations, a dedicated WebSocket support chat and custom in-house tools, supplied directly by the owner. These additions are synchronized across all three locales. Shared amber notices clearly distinguish public MVP/confidential scope and temporary processing outages from project descriptions, with icon, border, tinted background and semibold label in both themes.

The follow-up passed the 39-unit and 27-browser-test suites, typecheck, lint and production build. A WebKit 26.5 mobile smoke additionally reached a ready 3D frame on the Persian page, with no page errors or horizontal overflow; this does not establish physical iPhone validation.

The corrected standalone bundle passed all Linux container checks in run 44127066081. Liara's Iran builder then rejected the pinned public base-image pull with registry RBAC access denied. Deployment now selects the supported Germany build location while retaining the exact base image, tested runtime, existing application, hosting and domains. Production verification completed as recorded above.
