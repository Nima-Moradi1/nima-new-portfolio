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

Validation is deferred until the complete implementation has been committed and pushed to the feature branch, as requested. Fresh results will be recorded after that push.

The shop repository was confirmed PRIVATE through GitHub CLI after the connector returned 404. Public source buttons are therefore omitted for that project; its live demo, genuine capture, implementation notes, and status remain available. Repository visibility was not changed.
