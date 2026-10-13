import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CompactCaseStudy } from "@/components/projects/compact-case-study";
import { TarabariShowcase } from "@/components/projects/tarabari-showcase";
import { routing } from "@/i18n/routing";
import {
  localizedProjectPath,
  projectLanguages,
  projectOgLocales,
} from "@/lib/project-paths";

type ProjectPageProps = {
  params: Promise<{ locale: string }>;
};

type ContentCard = { id: string; title: string; text: string };
type GalleryItem = { id: string; title: string; alt: string };

const slug = "tarabari-nima";
const technologies = [
  "Next.js 15",
  "React 19",
  "TypeScript",
  "GSAP ScrollTrigger",
  "Three.js",
  "React Three Fiber",
  "Tailwind CSS 4",
  "CSS Modules",
] as const;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [metadata, project] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "TarabariNima" }),
  ]);
  const canonical = localizedProjectPath(locale, slug);

  return {
    title: project("metadata.title"),
    description: project("metadata.description"),
    alternates: { canonical, languages: projectLanguages(slug) },
    openGraph: {
      type: "article",
      url: canonical,
      title: project("metadata.title"),
      description: project("metadata.description"),
      siteName: metadata("siteName"),
      locale: projectOgLocales[locale],
      alternateLocale: routing.locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => projectOgLocales[candidate]),
      images: ["/assets/projects/tarabari-nima/loaded-truck.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: project("metadata.title"),
      description: project("metadata.description"),
      images: ["/assets/projects/tarabari-nima/loaded-truck.webp"],
    },
  };
}

export default async function TarabariNimaPage({ params }: ProjectPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "TarabariNima" });

  return (
    <CompactCaseStudy
      locale={locale}
      index="06"
      skip={t("skip")}
      back={t("back")}
      hero={{
        eyebrow: t("hero.eyebrow"),
        title: t("hero.title"),
        intro: t("hero.intro"),
        availability: t("hero.availability"),
      }}
      live={{
        eyebrow: t("live.eyebrow"),
        title: t("live.title"),
        description: t("live.description"),
        primaryLabel: t("live.primaryLabel"),
        primaryHref: "https://tarabari-nima.vercel.app/",
        secondaryLinks: [
          {
            href: "https://github.com/Nima-Moradi1/tarabari-nima",
            label: t("live.sourceLabel"),
            kind: "github",
          },
        ],
      }}
      screenshot={{
        src: "/assets/projects/tarabari-nima/home.webp",
        alt: t("screenshot.alt"),
        width: 1440,
        height: 900,
        address: "tarabari-nima.vercel.app",
      }}
      showcase={
        <TarabariShowcase
          eyebrow={t("showcase.eyebrow")}
          title={t("showcase.title")}
          description={t("showcase.description")}
          videoTitle={t("showcase.videoTitle")}
          videoDescription={t("showcase.videoDescription")}
          videoAria={t("showcase.videoAria")}
          galleryTitle={t("showcase.galleryTitle")}
          galleryDescription={t("showcase.galleryDescription")}
          gallery={t.raw("showcase.gallery") as GalleryItem[]}
        />
      }
      product={{
        eyebrow: t("product.eyebrow"),
        title: t("product.title"),
        description: t("product.description"),
        features: t.raw("product.features") as ContentCard[],
      }}
      engineering={{
        eyebrow: t("engineering.eyebrow"),
        title: t("engineering.title"),
        description: t("engineering.description"),
        stackLabel: t("engineering.stackLabel"),
        technologies,
        notes: t.raw("engineering.notes") as ContentCard[],
      }}
    />
  );
}
