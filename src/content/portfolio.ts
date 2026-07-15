import type {
  CapabilityGroup,
  ExperienceItem,
  LinkItem,
  ProjectItem,
} from "@/types/portfolio";

/**
 * Verified portfolio content adapted from Nima Moradirad's résumé.
 * Keep claims factual and review this file first when updating the site.
 */
export const portfolio = {
  identity: {
    name: "Nima Moradirad",
    initials: "NM",
    role: "Senior Front-End Engineer",
    shortRole: "Senior frontend engineer",
    location: "Tehran, Iran",
    availability: "5+ years in production frontend engineering",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "nimamoradirad@gmail.com",
    resumeUrl: "/nima-moradirad-resume.pdf",
    intro:
      "I build production React and Next.js applications with strong architecture, reliable validation, and performance-aware rendering—from PWA dashboards to role-based B2B platforms.",
    statement:
      "My work connects frontend architecture, rendering strategy, validation, and product performance across complex web applications.",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Contact", href: "#contact" },
  ] satisfies LinkItem[],
  signals: ["React systems", "Rendering", "Performance", "Architecture"],
  about: {
    eyebrow: "Frontend engineering from system to interface",
    paragraphs: [
      "I work across React, Next.js, Vite, and TypeScript, choosing the right rendering strategy—SSR, CSR, SSG, ISR, or PPR—for each product. I care about official guidance, measurable performance, and code that stays understandable as the team and application grow.",
      "My experience spans a B2B earned-wage platform, finance products, government dashboards, e-commerce, and publishing. Alongside delivery, I mentor junior developers, onboard teammates into business flows and DDD architecture, and build real-time experiences with WebSockets and SignalR.",
    ],
    principles: [
      {
        index: "01",
        title: "Architecture before abstraction",
        text: "Clear domain boundaries and modular components make complex products easier to evolve.",
      },
      {
        index: "02",
        title: "Performance is product behavior",
        text: "Rendering, bundles, and runtime decisions shape how reliable the product feels.",
      },
      {
        index: "03",
        title: "Validate every boundary",
        text: "Typed data and consistent client/server validation keep workflows predictable.",
      },
    ],
  },
  experience: [
    {
      period: "Mar 2025 — Present",
      role: "Senior React Developer",
      company: "Hesabo · Tehran, Iran",
      summary:
        "Engineering role on a B2B earned-wage access product serving employers and employees through role-based operational panels.",
      highlights: [
        "Optimized the Webpack build, strengthened XSS prevention, and developed admin, employer, user, and support panels.",
        "Mentored junior developers and onboarded new teammates into the business flow and domain-driven architecture.",
        "Developed real-time chatbot experiences using WebSockets and SignalR.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "MobX",
        "WebSocket",
        "SignalR",
        "DDD",
      ],
    },
    {
      period: "Mar 2024 — Mar 2025",
      role: "Senior Frontend Engineer",
      company: "Basilica Finance · Tehran, Iran",
      summary:
        "Led frontend development for a scalable finance PWA designed to support high request volumes and protected user journeys.",
      highlights: [
        "Built with Next.js, TypeScript, Zustand, Tailwind CSS, Material UI, and protected authentication flows.",
        "Improved product performance through Lighthouse-led optimization and rendering decisions.",
        "Reviewed GitHub and GitLab merge requests, resolved conflicts, and supported release quality.",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Zustand",
        "Tailwind CSS",
        "Material UI",
        "PWA",
      ],
    },
    {
      period: "Jan 2023 — Mar 2024",
      role: "Frontend Developer",
      company: "BarnameNegar · Tehran, Iran",
      summary:
        "Developed internal government websites and operational panels with dynamic dashboards and REST-connected workflows.",
      highlights: [
        "Built TypeScript applications with Vite, server-rendering and build strategies, and reusable dashboard interfaces.",
        "Delivered responsive UI with Tailwind CSS and shadcn/ui, with Redux for application state.",
      ],
      technologies: [
        "Vite",
        "TypeScript",
        "SSR",
        "REST API",
        "Tailwind CSS",
        "shadcn/ui",
        "Redux",
      ],
    },
    {
      period: "Dec 2021 — Sep 2022",
      role: "React Developer",
      company: "KZI",
      summary:
        "Developed e-commerce and blog applications with React, JavaScript, component libraries, and modern state management.",
      highlights: [
        "Worked on Lighthouse performance, progressive web app behavior, and single-page application delivery.",
        "Used React Hook Form and Yup for validation alongside Vite, TypeScript, HeroUI, SSR, and React Router.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Material UI",
        "Redux Toolkit",
        "PWA",
        "React Hook Form",
        "Yup",
      ],
    },
  ] satisfies ExperienceItem[],
  projects: [
    {
      number: "01",
      title: "Emerald Case",
      category: "Full-stack e-commerce · Oct–Nov 2023",
      summary:
        "A multilingual custom phone-case storefront with image upload, authentication, checkout, responsive theming, and transactional email.",
      contribution:
        "Built the product with Next.js and TypeScript, using Prisma and MongoDB for data, Stripe for payments, Resend for email, and Zustand plus Context for client state.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Prisma",
        "MongoDB",
        "Stripe",
        "i18n",
      ],
      href: "https://emerald-case.vercel.app/en/",
      featured: true,
      accent: "lime",
    },
    {
      number: "02",
      title: "Full-Stack Blog Application",
      category: "Publishing platform · Apr–Sep 2022 · Archived",
      summary:
        "A full-stack publishing application with protected routes, administrative panels, and server-rendered and statically generated pages.",
      contribution:
        "Implemented the application with Next.js, TypeScript, Express.js, SQLite, Tailwind CSS, and shadcn/ui. The résumé-listed domain is no longer active.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Express.js",
        "SQLite",
        "SSR",
        "SSG",
      ],
      featured: true,
      accent: "violet",
    },
    {
      number: "03",
      title: "Hesabo Role-Based Platform",
      category: "B2B product platform · Production",
      summary:
        "Four connected experiences for administrators, employers, users, and support teams within an earned-wage access product.",
      contribution:
        "Developed role-based interfaces using Vite, TypeScript, MobX, React Context, HeroUI, Tailwind CSS, shared validation, and domain-driven architecture.",
      technologies: [
        "Vite",
        "TypeScript",
        "MobX",
        "React Context",
        "HeroUI",
        "DDD",
      ],
      href: "https://hesabo.com/",
      featured: true,
      accent: "coral",
    },
  ] as ProjectItem[],
  capabilities: [
    {
      label: "01 · Frontend systems",
      description:
        "Production interfaces built with modern React tooling and adaptable component systems.",
      skills: [
        "React",
        "Next.js",
        "Vite",
        "TypeScript",
        "Tailwind CSS",
        "Material UI",
        "shadcn/ui",
        "Framer Motion",
      ],
    },
    {
      label: "02 · Architecture & state",
      description:
        "Rendering, state, and modular boundaries selected for the shape of the product.",
      skills: [
        "SSR / CSR / SSG",
        "ISR / PPR",
        "Redux Toolkit",
        "Zustand",
        "MobX",
        "RTK Query",
        "Module Federation",
        "Micro-Frontends",
      ],
    },
    {
      label: "03 · Quality & integration",
      description:
        "Reliable data flows, real-time features, validation, observability, and test coverage.",
      skills: [
        "REST / GraphQL",
        "WebSocket / SignalR",
        "React Hook Form",
        "Yup / Zod",
        "Unit / E2E testing",
        "Sentry",
        "PWA / Service Worker",
        "Internationalization",
      ],
    },
  ] satisfies CapabilityGroup[],
  education: {
    title: "B.S. in Computer Engineering",
    institution: "Tehran Azad University · Sep 2021 — Jul 15, 2026",
    note: "Formal computer engineering study alongside professional frontend product work.",
    languages: [
      "Persian · Native/Bilingual",
      "English · Native/Bilingual",
      "German · Elementary",
    ],
  },
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nima-moradi-rad-1380s",
    },
    { label: "GitHub", href: "https://github.com/Nima-Moradi1" },
  ] satisfies LinkItem[],
} as const;

export type PortfolioContent = typeof portfolio;
