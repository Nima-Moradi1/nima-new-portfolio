export type KineticProof = {
  id: "frontend" | "backend" | "ai" | "shipping";
  kicker: string;
  title: string;
  description: string;
  technologies: string[];
  evidenceLabel: string;
  evidenceHref: string;
};

export type KineticFaq = {
  id: string;
  question: string;
  answer: string;
  href?: string;
  linkLabel?: string;
};

export type KineticContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    scroll: string;
    availability: string;
  };
  chrome: {
    projects: string;
    experience: string;
    contact: string;
    locale: string;
    skip: string;
    reader: string;
    immersive: string;
  };
  controls: {
    previous: string;
    next: string;
    select: string;
    modeLabel: string;
    itemLabel: string;
    resume: string;
    source: string;
    viewProject: string;
    viewExperience: string;
  };
  loading: {
    preparing: string;
    ready: string;
    enter: string;
    fallback: string;
  };
  detail: { live: string; preview: string; visit: string; back: string; interact: string; scroll: string; tools: string };
  proof: { eyebrow: string; title: string; items: KineticProof[] };
  statement: { eyebrow: string; title: string; description: string };
  recap: { title: string; description: string };
  faq: { eyebrow: string; title: string; items: KineticFaq[] };
  contact: { eyebrow: string; title: string; description: string };
  footer: { note: string; backToTop: string };
};
