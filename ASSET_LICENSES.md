# Asset Licenses and Provenance

## Original project assets

- `src/components/kinetic/nm-geometry.tsx`, `monolith-scene.tsx` and `public/brand/nm-*.svg` — original NM ligature, mathematically authored bevelled cartridge geometry, engineered rail assembly and studio composition created for Nima Moradirad on October 20, 2026. Geometry, materials and environment light panels are generated locally in source. No Ciao model, logo, font, texture, audio, source code or other third-party brand artwork is included. The reference informs the observable spatial interaction pattern only.
- `public/assets/projects/sarochi-3d-shop/*.webp` — optimized captures of the owner's canonical Sarochi scene, product and prepared-photo appearance preview from the bounded read-only audit in `docs/evidence/T02-shop/`. These document observed UI, not newly generated garments, physical fit or completion of arbitrary human dressing. Three images total 188,066 bytes at 1280×900 each.
- `assets/NM_BRAND_PROTOTYPES.svg` — three original vector studies, label geometry and 24px previews authored for this project on October 20, 2026. Candidate A reuses the project's own production-symbol paths exactly; B/C are original comparison sketches. No external font, image or model is embedded.

The signal sculpture, interface composition, gradients, icon, and Open Graph artwork are generated from source code and CSS in this repository. The 3D workstation uses procedural geometry and the original generated painting documented below; it does not embed third-party models, video, or audio.

## Generated assets

- `public/assets/hero/senior-engineer-systems-painting.webp` — original mixed-media systems-architecture artwork generated for this portfolio with OpenAI's built-in image-generation tool on July 19, 2026. It was prompted without third-party logos, readable text, or stock imagery, then locally resized and encoded as WebP. The exact “Senior Software Engineer” title is rendered separately by the application for clarity.

## Fonts

- **Geist Sans** and **Geist Mono** are loaded through `next/font` and bundled into the production build. Geist is published by Vercel under the SIL Open Font License 1.1. See the [Geist repository](https://github.com/vercel/geist-font).
- **Vazirmatn** is loaded through `next/font` for Persian UI and the repository includes `src/assets/fonts/Vazirmatn-Regular.ttf` for localized Open Graph rendering. Vazirmatn is published under the SIL Open Font License 1.1. See the [Vazirmatn repository](https://github.com/rastikerdar/vazirmatn).

## Icons

- Interface icons come from [Lucide](https://lucide.dev/), distributed under the ISC License.

## Runtime libraries

Third-party source dependencies retain their respective licenses. The principal libraries are Next.js, React, Three.js, React Three Fiber, Drei, Motion, React Hook Form, Zod, and clsx. See their package metadata and lockfile for exact versions and license declarations.

## User-provided assets

- `public/assets/nima-moradirad.jpg` — portrait extracted from the résumé supplied by Nima Moradirad; used as personal portfolio content.
- `public/nima-moradirad-resume.pdf` and its optimized WebP preview — the one-page professional résumé supplied by Nima Moradirad for public portfolio use.
- `public/assets/projects/xo-arena/*` — WebP captures and optimized H.264/VP9 derivatives of the XO Arena screenshots and recording supplied by Nima Moradirad.
- `public/assets/projects/emerald-case/homepage.jpg` — portfolio capture of Nima Moradirad's Emerald Case project from its public project URL.
- `public/assets/projects/hesabo/homepage.jpg` — portfolio capture of the public Hesabo product site representing Nima Moradirad's production work.
- `public/assets/projects/lingo-learn/homepage.jpg` and `logo.png` — homepage capture and logo from the public Lingo Learn site, added at the user's direction to document portfolio work.
- `public/assets/projects/tarabari-nima/*` — optimized screenshots and a 14.5-second WebM/MP4 recording captured from Nima Moradirad's Tarabari Nima project and its live site for this case study. The underlying scene artwork and generated plates are documented in that project's `docs/ASSET_REGISTER.md`.

No third-party stock imagery is included. Personal résumé, portrait, and XO Arena media rights remain with Nima Moradirad.
