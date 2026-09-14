import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CompactCaseStudy } from "@/components/projects/compact-case-study";
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

const slug = "emerald-case";
const technologies = [
  "Next.js",
  "TypeScript",
  "Prisma",
  "MongoDB",
  "Stripe",
  "Resend",
  "Zustand",
  "React Context",
  "i18n",
] as const;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [metadata, project] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "EmeraldCase" }),
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
    },
    twitter: {
      card: "summary_large_image",
      title: project("metadata.title"),
      description: project("metadata.description"),
    },
  };
}

export default async function EmeraldCasePage({ params }: ProjectPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "EmeraldCase" });

  return (
    <CompactCaseStudy
      locale={locale}
      index="03"
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
        primaryHref: "https://emerald-case.vercel.app/en/",
      }}
      screenshot={{
        src: "/assets/projects/emerald-case/homepage.jpg",
        alt: t("screenshot.alt"),
        width: 1440,
        height: 1000,
        address: "emerald-case.vercel.app/en",
      }}
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
