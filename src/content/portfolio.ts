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
    role: "Senior Frontend Engineer",
    shortRole: "Product engineering · Web + Mobile",
    location: "Tehran, Iran",
    availability: "6+ years across web, mobile, and PWA engineering",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "nimamoradirad@gmail.com",
    resumeUrl: "/nima-moradirad-resume.pdf",
    intro:
      "I engineer secure, high-performance products across web, Android, and PWA surfaces—combining React architecture, real-time systems, resilient delivery, and thoughtful product design.",
    statement:
      "My work connects scalable frontend architecture, mobile and PWA delivery, real-time systems, and AI-accelerated engineering without giving up human oversight.",
  },
  navigation: [
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Work", href: "/#work" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Contact", href: "/#contact" },
  ] satisfies LinkItem[],
  signals: ["Scalability", "Performance", "Creativity", "Product engineering"],
  about: {
    eyebrow: "Product engineering across web and mobile",
    paragraphs: [
      "I work across React, Next.js, Vite, and TypeScript, choosing the right rendering strategy—SSR, CSR, SSG, ISR, or PPR—for each product. My recent work extends that foundation into Capacitor-based Android delivery, custom Java integrations, and resilient service-worker systems.",
      "My experience spans B2B finance, government dashboards, e-commerce, and real-time multiplayer products. I mentor engineers around domain-driven boundaries and use Codex and Claude Max for architecture exploration, refactoring, review, testing, and documentation—accelerating delivery while keeping engineering judgment in the loop.",
    ],
    principles: [
      {
        index: "01",
        title: "Scalability starts with boundaries",
        text: "Clear domains, shared contracts, and modular components let products evolve across teams and surfaces.",
      },
      {
        index: "02",
        title: "Performance is product behavior",
        text: "Rendering, caching, release, and runtime decisions shape how reliable a product feels.",
      },
      {
        index: "03",
        title: "Creativity needs engineering rigor",
        text: "Expressive interfaces become useful products when validation, accessibility, and delivery stay dependable.",
      },
    ],
  },
  experience: [
    {
      period: "Feb 2025 — Present",
      role: "Senior Frontend Developer",
      company: "Hesabo · Tehran, Iran",
      summary:
        "Shaping frontend architecture and delivery for a B2B financial platform spanning Admin, Employer, Employee, and Support experiences.",
      highlights: [
        "Mentor and onboard engineers around business flows, maintainable code, and domain-driven boundaries.",
        "Develop and maintain Android applications with Capacitor, platform integrations, and custom Java plugins.",
        "Own a customized PWA layer with controlled auto-updates, cache versioning, invalidation, and offline fallbacks.",
        "Improve build performance, XSS defenses, validation, authorization, and real-time WebSocket/SignalR features.",
        "Use Codex and Claude Max for architecture, refactoring, review, testing, documentation, and repeatable delivery workflows.",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Capacitor",
        "Android",
        "PWA",
        "WebSockets",
        "AI-assisted delivery",
      ],
    },
    {
      period: "Mar 2024 — Mar 2025",
      role: "Senior Frontend Engineer",
      company: "Basilica Finance · Tehran, Iran",
      summary:
        "Led frontend delivery for a scalable finance PWA designed for protected user journeys and high request volumes.",
      highlights: [
        "Built protected authentication and product flows with Next.js, TypeScript, Zustand, Tailwind CSS, and MUI.",
        "Delivered Lighthouse-focused performance improvements and maintained release quality through GitHub/GitLab review.",
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
        "Built internal government dashboards and panels with server-rendered, REST-connected workflows.",
      highlights: [
        "Delivered Vite and TypeScript applications with SSR, REST APIs, Tailwind CSS, shadcn/ui, and Redux-based state management.",
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
      period: "Dec 2020 — Sep 2022",
      role: "React Developer",
      company: "KZI",
      summary:
        "Delivered e-commerce and content experiences with React, JavaScript, component libraries, and modern state management.",
      highlights: [
        "Maintained Lighthouse performance and dependable PWA/SPA behavior with Material UI and Redux Toolkit.",
        "Worked across Vite, TypeScript, HeroUI, React Hook Form, Yup, and router-driven application architecture.",
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
      title: "XO Arena",
      category: "Real-time multiplayer PWA · Product case study",
      summary:
        "A modular, type-safe Tic-Tac-Toe platform with online matchmaking, live Socket.IO rooms, secure sessions, computer opponents, profiles, and installable mobile support.",
      contribution:
        "Built shared contracts and a server-validated game engine with Next.js, TypeScript, Express, Socket.IO, Prisma, MySQL, Zod, avatar uploads, and httpOnly sessions.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Socket.IO",
        "Prisma",
        "MySQL",
        "PWA",
      ],
      href: "/projects/xo-arena",
      featured: true,
      accent: "lime",
    },
    {
      number: "02",
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
      accent: "violet",
    },
    {
      number: "03",
      title: "Hesabo Platform",
      category: "B2B financial platform · Production",
      summary:
        "Four connected product surfaces for Admin, Employer, Employee, and Support users within a B2B financial platform.",
      contribution:
        "Developed domain-driven interfaces and real-time features across Vite, TypeScript, MobX, React Context, HeroUI, Tailwind CSS, Android delivery, and a controlled PWA cache layer.",
      technologies: [
        "Vite",
        "TypeScript",
        "MobX",
        "React Context",
        "HeroUI",
        "Capacitor",
      ],
      href: "https://hesabo.com/",
      featured: true,
      accent: "coral",
    },
  ] as ProjectItem[],
  capabilities: [
    {
      label: "01 · Web architecture",
      description:
        "Scalable interfaces, rendering strategies, and domain boundaries for production web products.",
      skills: [
        "React",
        "Next.js",
        "Vite",
        "TypeScript",
        "SSR / CSR / SSG",
        "ISR / PPR",
        "DDD",
        "Module Federation",
      ],
    },
    {
      label: "02 · Mobile & PWA delivery",
      description:
        "Android and installable web experiences with deliberate release and cache behavior.",
      skills: [
        "Capacitor",
        "Android",
        "Java plugins",
        "Service Workers",
        "Safe auto-updates",
        "Cache versioning",
        "Offline fallbacks",
        "Release stability",
      ],
    },
    {
      label: "03 · UI, state & quality",
      description:
        "Adaptable design systems, predictable state, validation, observability, and test coverage.",
      skills: [
        "Tailwind CSS",
        "shadcn/ui",
        "MUI / HeroUI",
        "Zustand",
        "Redux Toolkit",
        "MobX",
        "Unit / E2E testing",
        "Sentry",
      ],
    },
    {
      label: "04 · AI, systems & data",
      description:
        "Human-directed AI workflows, real-time integrations, APIs, and supporting backend systems.",
      skills: [
        "Codex",
        "Claude Max",
        "Node.js",
        "LangChain agents",
        "WebSockets / SignalR",
        "REST / GraphQL",
        "Prisma / SQL / MongoDB",
        "Docker",
      ],
    },
  ] satisfies CapabilityGroup[],
  education: {
    title: "B.Sc. Computer Engineering",
    institution: "Tehran Azad University · 2021 — Present",
    note: "Computer engineering study alongside professional product delivery across web and mobile.",
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
