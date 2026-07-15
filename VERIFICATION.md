# Verification Record

Date: July 15, 2026

This record describes the checks completed against the current Signal Atelier source. Results are reported only where the corresponding command or browser flow was executed successfully.

## Automated verification

| Check                       | Result                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Prettier                    | Passed with no formatting differences                                                                        |
| ESLint                      | Passed with zero warnings or errors                                                                          |
| Strict TypeScript           | Passed with no type errors                                                                                   |
| Vitest                      | 3 files passed; 5 tests passed                                                                               |
| Next.js production build    | Passed; all listed static routes and the contact API compiled successfully                                   |
| Playwright                  | 14 tests passed across desktop Chromium and Pixel 7 mobile emulation                                         |
| Accessibility scan          | No automatically detectable critical or serious axe violations                                               |
| Three.js console regression | No `THREE.Clock` or `PCFSoftShadowMap` deprecation warnings                                                  |
| WebGL lifecycle regression  | No context-loss or active-context-limit warnings during repeated theme changes                               |
| Responsive composition      | Desktop and mobile bounding-box checks confirmed that the book, headings, page copy, and lamp do not overlap |

The end-to-end suite runs against a fresh production build on an isolated local port. WebGL-heavy browser cases run serially so parallel pages do not compete for the test machine's limited GPU contexts.

## Interaction coverage

The browser suite verifies the following user-facing behavior:

- A short lamp-cord pull returns to rest without changing the theme.
- A complete pull changes the theme once, animates the cord, and persists the choice after reload.
- Repeated lamp toggles do not blank a canvas or lose a WebGL context.
- The lamp remains a connected visual assembly and its accessible control stays aligned with the visible cord.
- The experience book stays beside the heading on desktop and below it on mobile.
- Experience page copy remains clear of the fixed lamp control.
- Experience navigation, portfolio navigation, contact validation, and reduced rendering fallbacks remain available.

## Supporting delivery checks

The production routes expose the home page, not-found state, contact endpoint, icon, manifest, Open Graph image, robots file, and sitemap. The public résumé and portrait return their expected document and image content types. The unconfigured contact endpoint returns an explicit not-sent response with a mail fallback, and the public résumé was reviewed for unintended phone-number exposure.

## Commands

Run the same verification sequence from the repository root:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Playwright builds and starts the optimized application automatically on `127.0.0.1:3100`; it does not reuse an unrelated development server.

## Review boundary

Desktop and mobile Chromium behavior is verified. Firefox, WebKit, physical-device rendering, and Lighthouse scores were not measured in this pass, so cross-engine visual parity and performance-score claims are intentionally excluded.

For the release screenshot matrix and visual approval criteria, see [`docs/previews/README.md`](docs/previews/README.md).
