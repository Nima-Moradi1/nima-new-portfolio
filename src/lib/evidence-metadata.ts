import type { Metadata } from "next";
import en from "@/messages/en/portfolio.json";
import fa from "@/messages/fa/portfolio.json";
import de from "@/messages/de/portfolio.json";
import {
  localizedProjectPath,
  projectLanguages,
  projectOgLocales,
} from "@/lib/project-paths";
import type { AppLocale } from "@/i18n/routing";
export function evidenceMetadata(slug: string, locale: AppLocale): Metadata {
  const project = { en, fa, de }[locale].projects.find(
    (p) => p.href === `/projects/${slug}`,
  )!;
  const title = project.caseStudy?.title ?? project.title;
  const canonical = localizedProjectPath(locale, slug);
  const images =
    slug === "3d-online-shop"
      ? [
          {
            url: "/assets/projects/3d-online-shop/boutique.webp",
            alt: "Actual deployed 3D boutique",
          },
        ]
      : slug === "hesabo"
        ? [
            {
              url: "/assets/projects/hesabo/homepage.jpg",
              alt: "Hesabo public company website",
            },
          ]
        : slug === "moradi-gallery"
          ? [
              {
                url: "/assets/projects/moradi-gallery/homepage-fa.png",
                alt: "Moradi Gallery concept",
              },
            ]
          : [
              {
                url: "/assets/projects/emerald-case/homepage.jpg",
                alt: "Emerald Case storefront",
              },
            ];
  return {
    title,
    description: project.summary,
    alternates: { canonical, languages: projectLanguages(slug) },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: canonical,
      locale: projectOgLocales[locale],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images,
    },
  };
}
