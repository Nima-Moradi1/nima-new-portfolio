export type EvidenceSection = {
  title: string;
  paragraphs: string[];
  codeUrl?: string;
  codeLabel?: string;
};
export type ProjectEvidence = {
  title: string;
  summary: string;
  status: string;
  caption: string;
  liveUrl?: string;
  companyUrl?: string;
  sourceUrl?: string;
  sections: EvidenceSection[];
};

export const projectEvidence: Record<string, ProjectEvidence> = {
  hesabo: {
    title: "Frontend delivery for a financial platform",
    summary:
      "Professional frontend work across Admin, Employer, Employee, and Support applications at Hesabo.",
    status:
      "Professional work. Current role, confirmed October 2026. Built with an engineering team.",
    caption:
      "Hesabo’s public company website. This marketing page is not a capture of the private application interfaces.",
    companyUrl: "https://hesabo.com/",
    sections: [
      {
        title: "My contribution",
        paragraphs: [
          "I work on frontend architecture and delivery across four application areas: Admin, Employer, Employee, and Support. My responsibilities include PWA update behavior, Capacitor-based Android delivery, real-time interfaces, and mentoring engineers.",
          "This is a team-built financial platform. My contribution concerns the frontend and web-to-Android delivery surfaces; I do not claim sole authorship of the platform, its backend, or its business outcomes.",
        ],
      },
      {
        title: "Problem and constraints",
        paragraphs: [
          "A financial application needs to remain understandable across different user roles and delivery environments. Browser clients and installed Android applications share product flows, while platform-specific integrations and release behavior still need explicit handling.",
          "Cached applications create another constraint: an already-open client can retain older assets after a deployment. An offline fallback also needs to explain unavailable functionality without suggesting that a financial operation succeeded.",
        ],
      },
      {
        title: "Engineering decisions",
        paragraphs: [
          "I contribute to shared frontend boundaries across the four application areas rather than treating each screen as an isolated implementation. Reusable interfaces and domain boundaries help the team maintain related flows without making every change a copy-and-paste exercise.",
          "The PWA layer uses cache versioning, invalidation, and controlled update behavior. Keeping those decisions explicit is preferable to assuming that every cached client immediately follows a server release. Capacitor supports Android delivery from the web application, with custom Java plugins for integrations that need native platform behavior.",
          "Live interfaces use WebSockets/SignalR alongside ordinary API integration. Client validation and role-aware UI improve the interaction, while authorization remains a server responsibility.",
        ],
      },
      {
        title: "Evidence and outcome",
        paragraphs: [
          "The public company website identifies Hesabo and its salary-access product. The portfolio chronology and contribution description reflect my current role. Private application screens, customer records, internal source, and credentials are not published here.",
          "This case study describes delivery responsibilities and implementation approaches. It does not report measured revenue, adoption, latency improvements, or reliability figures. Those outcomes cannot be established from a public portfolio capture.",
        ],
      },
      {
        title: "Limitations and next improvement",
        paragraphs: [
          "Public evidence is limited by the confidentiality of employer work. A future approved, anonymized walkthrough could make the update and offline flows easier to inspect. Any such example would need to show its exact test conditions and separate shared team work from my personal contribution.",
        ],
      },
    ],
  },
  "3d-online-shop": {
    title: "Interactive product presentation in a 3D boutique",
    summary:
      "A personal project built alongside my professional work, published at 3d-shop-design.ir.",
    status: "Independent project. Live boutique verified on 22 October 2026.",
    caption:
      "The actual deployed SAROCHI boutique, captured on 22 October 2026: garment racks, accessory display, Persian controls, and the fitting-room entry.",
    liveUrl: "https://3d-shop-design.ir/",
    sourceUrl: "https://github.com/Nima-Moradi1/sarochi-shop-design",
    sections: [
      {
        title: "My contribution",
        paragraphs: [
          "I built this personal project alongside my professional work. The implementation brings together the interactive boutique environment, garment browsing, product information, catalog integration, and photographic outfit previews. The source repository and deployment configuration identify the same 3d-shop-design.ir destination.",
          "The project is an independent exploration of product presentation. It is not presented as a client commission, a payment-enabled store, or evidence of retail sales.",
        ],
      },
      {
        title: "Problem and constraints",
        paragraphs: [
          "The boutique must make real garments discoverable inside a spatial interface without making the canvas the only way to navigate. Product information and photographs must remain distinguishable from reconstructed display surfaces.",
          "Large garment images can delay the first usable frame. Catalog price and stock information can also become stale or unavailable. A pleasant 3D scene does not remove either delivery constraint.",
        ],
      },
      {
        title: "Engineering decisions",
        paragraphs: [
          "Next.js and TypeScript provide the application shell; Three.js and React Three Fiber render the environment. Explicit selection zones and ordinary HTML controls support browsing, with keyboard handling, reduced-motion behavior, and no-WebGL/context-loss fallbacks.",
          "Compact garment previews load before focused, higher-resolution assets. This avoids treating every full-size product image as a prerequisite for entering the boutique. Catalog requests use bounded upstream access and caching; price and stock facts clear when unavailable or expired instead of presenting seed data as current inventory.",
          "The fitting room uses prepared photographic previews, with cosmetic transitions and trouser recoloring. These images do not establish measured fit, accurate body reconstruction, or animated 3D garments. Fresh generation depends on an external service, so prepared previews are useful when that service is slow or unavailable.",
        ],
      },
      {
        title: "Verification and outcome",
        paragraphs: [
          "An HTTPS browser visit on 22 October 2026 returned the boutique and rendered the garment environment and Persian controls. The screenshot on this page is from that visit. Source inspection confirmed the application stack and domain mapping.",
          "This check establishes the visible deployed entry experience. It does not establish physical-device performance, universal generation availability, completed purchases, or commercial outcomes. Purchasing is delegated to the official product destination; this project does not implement its own checkout or payment flow.",
        ],
      },
      {
        title: "Limitations and next improvement",
        paragraphs: [
          "Missing authentic rear photographs must remain identified as display reconstruction, and outfit previews are appearance aids rather than fit measurements. The next useful improvement is broader device and assistive-technology evaluation of product discovery and recovery when optional rendering or generation fails.",
        ],
      },
    ],
  },
  "emerald-case": {
    title: "Custom phone cases from image to configuration",
    summary:
      "An independent e-commerce application exploring image-led phone-case customization.",
    status:
      "Independent project. Public source and hosted storefront available. Payment completion was not exercised.",
    caption:
      "The actual Emerald Case homepage, introducing the image-based phone-case configuration flow.",
    liveUrl: "https://emerald-case.vercel.app/en/",
    sourceUrl: "https://github.com/Nima-Moradi1/emeraldCase",
    sections: [
      {
        title: "My contribution",
        paragraphs: [
          "I built Emerald Case as a full-stack project. The implementation connects localized Next.js interfaces, image upload and case configuration, authentication, persisted order data, and commerce integrations. The repository is available to inspect the frontend and supporting server code.",
          "The public package manifest identifies Next.js, TypeScript, next-intl, Kinde authentication, UploadThing, Prisma, Stripe, Resend, and React Query. The database schema establishes PostgreSQL as the persistence layer. These are source-backed implementation choices; a dependency alone is not evidence that an external service is configured in production.",
        ],
      },
      {
        title: "Problem and constraints",
        paragraphs: [
          "An uploaded image needs to remain associated with the phone model, material, finish, and color selected by the customer. Account and order data introduce persistence boundaries beyond the interactive preview.",
          "A hosted homepage demonstrates the entry experience, while payment completion and transactional email require separately configured services. Those capabilities should not be inferred from a screenshot or a dependency name.",
        ],
      },
      {
        title: "Engineering decisions",
        paragraphs: [
          "Next.js and TypeScript join the UI and server-side application. Prisma models the saved configuration, user, order, and address relationships. The public main-branch datasource explicitly uses PostgreSQL; earlier MongoDB wording in this portfolio and résumé was inaccurate.",
          "A saved configuration keeps the uploaded image and selected case options together rather than relying only on transient preview state. The schema models order payment state separately from configuration creation, so making a preview is not the same as proving a completed purchase.",
          "Stripe and email integration belong to the wider commerce implementation. Their production configuration and successful delivery were not verified in this portfolio review, and no transaction was submitted.",
        ],
        codeUrl:
          "https://github.com/Nima-Moradi1/emeraldCase/blob/main/prisma/schema.prisma",
        codeLabel: "Inspect the PostgreSQL schema",
      },
      {
        title: "Verification and outcome",
        paragraphs: [
          "The hosted English storefront returned its actual phone-case landing page during a browser visit on 22 October 2026. The public main-branch schema and README both identify PostgreSQL. This establishes source consistency and a working entry page, not an end-to-end payment result.",
          "The screenshot and source links make the implementation inspectable without asking a reviewer to use private credentials. No sales figures, conversion rates, or measured performance improvement are claimed.",
        ],
      },
      {
        title: "Limitations and next improvement",
        paragraphs: [
          "A useful next step is a documented sandbox walkthrough that demonstrates upload recovery, configuration persistence, and payment cancellation without charging a real customer. Successful transactional email and payment completion still need separate verification.",
        ],
      },
    ],
  },
  "moradi-gallery": {
    title: "A bilingual watch-gallery concept",
    summary:
      "An independent visual concept combining a persistent 3D scene, localized content, and responsive interaction.",
    status:
      "Concept. Public source and working visual demo; not an operating watch retailer.",
    caption:
      "The real Persian Moradi Gallery concept homepage. The watch is an original concept asset, not verified retail inventory.",
    liveUrl: "https://moradi-gallery.vercel.app/fa",
    sourceUrl: "https://github.com/Nima-Moradi1/moradi-gallery",
    sections: [
      {
        title: "My contribution",
        paragraphs: [
          "I built the gallery’s visual and technical system, joining the localized Next.js application with an original watch concept, a persistent WebGL scene, and responsive storytelling. The project explores presentation and interaction; it does not represent an established watch business or confirmed stock.",
          "The source repository and live demo are both available so the scene organization, route structure, and fallback approach can be inspected directly.",
        ],
      },
      {
        title: "Problem and constraints",
        paragraphs: [
          "A Persian and English gallery needs more than translated strings. Direction, text shaping, navigation, layout, and camera-related reading order must make sense in both RTL and LTR contexts.",
          "The visual sequence also has to cope with small screens, reduced motion, and devices that cannot render the intended WebGL experience. Product copy and navigation need to remain meaningful outside the canvas.",
        ],
      },
      {
        title: "Engineering decisions",
        paragraphs: [
          "The localized page provides the semantic content while a client boundary contains the interactive scene. Keeping one persistent scene makes the watch and camera transitions continuous instead of repeatedly mounting unrelated canvases as the visitor scrolls.",
          "React Three Fiber manages the scene; GSAP owns scroll choreography and normalized progress. Ref-driven transforms keep per-frame updates out of ordinary React state. Motion is reserved for isolated interface transitions, giving each animation system an explicit responsibility.",
          "Responsive quality tiers, reduced-motion behavior, and static fallbacks support a wider range of devices. The fallback communicates the concept while leaving the page’s text and links available.",
        ],
      },
      {
        title: "Verification and outcome",
        paragraphs: [
          "A browser visit on 22 October 2026 returned the Persian concept page with its actual localized navigation and watch presentation. The public source exposes the implementation for a deeper engineering review.",
          "Older repository documentation describes an earlier static-only stage. The current case study reflects the later interactive implementation rather than treating that historical README as evidence that WebGL is absent. This review does not establish field Core Web Vitals, sales, or a completed commerce flow.",
        ],
      },
      {
        title: "Limitations and next improvement",
        paragraphs: [
          "The project remains a concept with original assets and no confirmed business inventory. Its external README should be refreshed to match the current implementation stage. Further device and assistive-technology evaluation would provide stronger evidence for the scene’s adaptive behavior.",
        ],
      },
    ],
  },
};
