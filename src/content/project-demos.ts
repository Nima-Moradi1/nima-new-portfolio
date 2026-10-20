export type ProjectDemo = {
  href?: string;
  video?: string;
  poster?: string;
  embeddable?: boolean;
};

/**
 * Canonical links from the existing project routes and portfolio records.
 * Frame eligibility reflects the public response headers checked 2026-10-20;
 * an eligible remote site may still fail or become unavailable at runtime.
 */
export const PROJECT_DEMOS: Record<string, ProjectDemo> = {
  "sarochi-3d-shop": {
    href: "https://3d-shop-design.ir/",
    poster: "/assets/projects/sarochi-3d-shop/showroom.webp",
    // The deployed shop explicitly restricts framing to its own origin.
    embeddable: false,
  },
  "moradi-gallery": {
    href: "https://moradi-gallery.vercel.app/fa",
    poster: "/assets/projects/moradi-gallery/homepage-fa.png",
    embeddable: true,
  },
  "xo-arena": {
    video: "/assets/projects/xo-arena/xo-arena-preview.mp4",
    poster: "/assets/projects/xo-arena/video-poster.webp",
  },
  "emerald-case": {
    href: "https://emerald-case.vercel.app/en/",
    poster: "/assets/projects/emerald-case/homepage.jpg",
    embeddable: true,
  },
  "hesabo-platform": {
    href: "https://hesabo.com/",
    poster: "/assets/projects/hesabo/homepage.jpg",
    embeddable: true,
  },
  "tarabari-nima": {
    href: "https://tarabari-nima.vercel.app/",
    video: "/assets/projects/tarabari-nima/freight-loading.mp4",
    poster: "/assets/projects/tarabari-nima/loaded-truck.webp",
    embeddable: true,
  },
  "lingo-learn": {
    href: "https://lingo-learn.ir/",
    poster: "/assets/projects/lingo-learn/homepage.jpg",
    embeddable: true,
  },
};
