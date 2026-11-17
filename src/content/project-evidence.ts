import english from "@/messages/en/portfolio.json";

// Keep only public destinations here; never expose private employer/shop source.
const destinations: Record<
  string,
  { liveUrl?: string; sourceUrl?: string; companyUrl?: string }
> = {
  hesabo: { companyUrl: "https://hesabo.com/" },
  "3d-online-shop": { liveUrl: "https://3d-shop-design.ir/" },
  "emerald-case": {
    liveUrl: "https://emerald-case.vercel.app/en/",
    sourceUrl: "https://github.com/Nima-Moradi1/emeraldCase",
  },
  "moradi-gallery": {
    liveUrl: "https://moradi-gallery.vercel.app/fa",
    sourceUrl: "https://github.com/Nima-Moradi1/moradi-gallery",
  },
};
export const projectEvidence = Object.fromEntries(
  Object.entries(destinations).map(([slug, links]) => {
    const project = english.projects.find(
      (p) => p.href === `/projects/${slug}`,
    )!;
    return [
      slug,
      { ...links, title: project.caseStudy!.title, summary: project.summary },
    ];
  }),
);
