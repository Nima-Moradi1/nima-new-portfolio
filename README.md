# Nima Moradirad - engineering portfolio

Employer-focused portfolio for Nima Moradirad, Senior Frontend Engineer. Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, next-intl, and accessible Radix/shadcn primitives. The existing dark/green identity and English, Persian RTL, and German routes are preserved.

## What visitors can inspect

- Role-specific hero with work and résumé links, available without a loading gate.
- Selected work led by Hesabo, XO Arena, and 3D Online Shop, followed by supporting projects.
- All four professional roles in a vertical chronology, four evidence-linked skills groups, About, education, languages, and direct contact links.
- Case studies with personal contribution, implementation decisions, genuine captures, source links, and factual limitations.
- An optional workstation scene. Its default still is a genuine capture of the existing scene; the Three.js code loads only after **Explore 3D**. A conventional header control changes theme independently.
- A selectable-text, one-page résumé generated from the English portfolio content. The original public URL is retained.

## Development

Node.js 20.9+ and npm 10+ are required. Production CI uses pinned Node 22.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The default local address is http://localhost:3000.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Playwright browser checks can use installed Chrome. Set `PLAYWRIGHT_CHROME=1` when Chromium is unavailable. The browser suite starts a production server unless `PLAYWRIGHT_BASE_URL` points to an already running server.

## Content and routes

Edit `src/messages/{en,fa,de}/portfolio.json` for identity, chronology, projects, skills, education, and social profiles. `common.json` holds interface labels. `src/content/project-evidence.ts` contains English engineering notes; other locales explicitly identify those notes as English. Updated Persian/German copy is disclosed as AI-assisted pending owner language review.

Existing case-study routes remain available. New routes are `/projects/hesabo` and `/projects/3d-online-shop`, with the same locale-prefix convention. The latter route has a stable project ID; its correct destination is **https://3d-shop-design.ir/**, confirmed by the owner. Do not substitute the unrelated `sarochi-new` repository. The actual source is `Nima-Moradi1/sarochi-shop-design`.

Live-link visibility is controlled separately by `liveVerified`. Update that flag only after confirming the application, HTTPS, and destination identity; `liveVerifiedAt` records the date. Source inspection does not establish a completed payment or a production performance result.

To update the résumé, run `node scripts/generate-resume.mjs` with Chrome installed. Render the resulting PDF with Poppler, inspect it, and regenerate `public/assets/nima-moradirad-resume-preview.webp` from the first page before publication. Keep historical job titles and factual dates synchronized with the site. Never include private credentials or unsupported metrics.

## Deployment

Pushing `main` runs `.github/workflows/deploy-liara.yml`: lint, types, unit tests, one Linux production build, container smoke checks, deployment, and exact-release verification. Required secret: `LIARA_API_TOKEN`. Configure `NEXT_PUBLIC_SITE_URL=https://nimamoradirad.com` in production. Deployment scripts live under `deploy/`; the Linux standalone runtime is the deployment artifact.

The optional contact API is preserved. Without configured Resend credentials it provides an honest email fallback. Direct email, LinkedIn, GitHub, and the résumé are available without opening a form. No analytics or trackers are installed. No portfolio service worker is registered.

## Evidence and boundaries

See [implementation notes](docs/employer-focused-implementation.md), [design system](DESIGN_SYSTEM.md), [performance](PERFORMANCE.md), and [asset provenance](ASSET_LICENSES.md). Historical verification documents describe their own revisions; they are not current performance measurements. Private employer applications and data are not published. Moradi Gallery and Tarabari Nima are concepts; XO Arena is represented by its local recording and source.
