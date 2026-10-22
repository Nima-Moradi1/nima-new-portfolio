# Employer-focused portfolio implementation - 22 October 2026

## Contract and owner corrections

Implemented the supplied employer-focused brief in the existing repository, preserving routes, locale conventions, contact API, and deployment tooling. Owner corrections during implementation override the reference brief:

- Hesabo remains the current role.
- Basilica ended two months before the February 2025 Hesabo start: December 2024. Historical titles remain unchanged.
- Institution: Tehran Azad University. Graduation year: 2026, as supplied in the brief.
- The shop destination is **https://3d-shop-design.ir/**, a personal project built alongside professional work. The stable case-study route is `/projects/3d-online-shop`.
- The owner confirms Emerald Case is their full-stack project; its public repository establishes tools. No unverified tutorial attribution is asserted.

## Evidence inspected

- Public Emerald Case `main` README and `prisma/schema.prisma`: PostgreSQL (schema blob `f77613b902f9bdb132af27639ea687ce534828c2`). Its package lists Next.js, TypeScript, next-intl, Kinde, UploadThing, Prisma, Stripe, Resend, and React Query. It does not list Zustand. Corrected portfolio data, retained message catalogs, résumé, and current case study accordingly.
- Fresh Chrome HTTPS visits returned the actual Hesabo company site, Emerald Case entry page, Moradi Gallery concept, and 3D boutique. The shop rendered garment racks and Persian controls. Screenshot captured directly from the deployed app. Domain/source mapping also appears in the local shop's Liara configuration and publication records.
- `hesabo.com` is the public company/product marketing site; `hesabo.app` is an application host referenced in local platform code. Only the company destination is linked, labeled Company website.
- Existing XO Arena recording/screenshots preserved. Local source inspection confirms hashed session-token lookup, access-controlled room joins, server move validation, and NOT_YOUR_TURN rejection. No fresh two-client runtime failure/reconnect test is claimed.
- The workstation still is captured from the existing deployed scene, with decorative HTML labels hidden before capture. No invented application media was generated.

## Delivery choices

Core content is semantic HTML without the landing preloader, depth-scroll effects, experience book, or horizontal skills reader. Those retired modules remain in the source tree for compatibility but are not mounted on the homepage. Optional 3D is a client island behind explicit activation, with still/error fallback and offscreen suspension. Mobile omits the decorative scene to prioritize work. Video uses controls, a poster, `preload=none`, no autoplay, a direct recording link, and an equivalent textual description.

New detailed engineering notes are written in English and carry `lang=en`, `dir=ltr` on translated routes. Persian/German homepage updates retain routing and RTL typography and visibly disclose AI assistance pending language review. Existing translated Tarabari content is retained.

## Boundaries and follow-up

- Emerald payment completion, email delivery, and configured production database are unverified. PostgreSQL is a statement about the inspected public branch.
- Shop photo previews are appearance aids, not measured fitting or animated 3D garments. No owned checkout, payments, sales, or client relationship is claimed. External generation can fail; prepared imagery exists independently.
- Hesabo contribution is team-based; private screens/source and customer data remain private. No numerical business impact is claimed.
- The external Moradi Gallery README describes an earlier static-only implementation; update that separate repository to match its live interactive stage. No external project repository was modified in this task.
- Public web-fetch infrastructure could not retrieve several domains; local Chrome verified the destinations. An independent second connection did not establish availability everywhere.
- Field Core Web Vitals and a comparable pre-change performance baseline are unavailable. No performance improvement or WCAG conformance certification is claimed.

Validation began after the complete implementation was committed and pushed to the feature branch, as requested.

The shop repository was confirmed PRIVATE through GitHub CLI after the connector returned 404. Public source buttons are therefore omitted for that project; its live demo, genuine capture, implementation notes, and status remain available. Repository visibility was not changed.

## Final verification

- `npm run lint`, `npm run typecheck`, and all 38 unit tests passed on the final implementation.
- `DEPLOYMENT_SHA=$(git rev-parse HEAD) npm run build` passed for implementation commit `ceb81c5`; all three homepages and project routes are prerendered HTML after removal of the route loading shells.
- The actual standalone runtime was started with production binding `HOSTNAME=0.0.0.0`, port 3100, and copied public/static assets. All 16 Playwright checks passed in desktop and mobile Chrome: locale/direction, 320/390/768/1024/1440px reflow, case-study routes, ordinary navigation, persistent theme, useful content with JavaScript disabled, and axe checks in both settled themes.
- Browser plugin was unavailable; the repository's Playwright tooling used installed Chrome. The bundled Playwright Chromium executable was absent. No browser dependency was installed.
- Manual browser evidence: keyboard skip link focuses `main-content`; optional scene starts with zero canvases, creates one after Explore 3D, and returns to zero on close; unavailable WebGL keeps the still and core text; no application console errors in the normal standalone flow; PDF serves as `application/pdf`; share image serves as `image/png` from genuine JPEG imagery.
- At 200% text sizing, navigation collapses based on available width and all header controls remain in the viewport. 320px reflow covers the CSS-width equivalent of 400% zoom on a 1280px display. This is not a physical browser zoom or device certification.
- PDF verified as one tagged page with selectable text, corrected chronology, PostgreSQL, completed 2026 education, and professional English proficiency. The final rendered page was inspected visually. No private phone number is included.
- Desktop/mobile hero, selected work, experience, new case study, light theme, share image, and enlarged-text captures were inspected. Local evidence is saved under `/tmp/employer-*.png`, outside committed source.
- Initial browser failures exposed mobile media overflow, remaining route loading shells, and unsupported WebP share rendering; these were corrected and rechecked. Theme audits wait for the controls' brief feedback transitions to finish.
- Binding Next.js to the loopback IP triggered a known Next 16 rewrite/redirect issue during local checks. The production-style 0.0.0.0 binding serves English correctly. The original locale middleware was preserved; no experimental workaround or dependency upgrade shipped.

Remaining limits: Persian/German updates await owner language review; new engineering notes explicitly remain English. No dedicated VoiceOver/NVDA session, physical-device matrix, field Web Vitals, comparable pre-change benchmark, live XO multiplayer failure/reconnect test, Emerald transaction/email completion, or globally independent demo availability result is claimed. The accessibility tree was spot-checked; automated axe results are not a complete WCAG certification. External project READMEs were not modified.
