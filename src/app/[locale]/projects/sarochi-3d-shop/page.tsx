import Image from "next/image";
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
import styles from "./sarochi-shop.module.css";

type ProjectPageProps = { params: Promise<{ locale: string }> };
type ContentCard = { id: string; title: string; text: string };
type GalleryItem = { id: string; title: string; alt: string };

const slug = "sarochi-3d-shop";
const assetPath = "/assets/projects/sarochi-3d-shop";
const technologies = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Three.js",
  "React Three Fiber",
  "Zustand",
  "Sharp",
] as const;
const galleryAssets: Record<string, string> = {
  product: `${assetPath}/product-gallery.webp`,
  preview: `${assetPath}/appearance-preview.webp`,
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const [metadata, t] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "SarochiShop" }),
  ]);
  const canonical = localizedProjectPath(locale, slug);
  const image = `${assetPath}/showroom.webp`;

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    alternates: { canonical, languages: projectLanguages(slug) },
    openGraph: {
      type: "article",
      url: canonical,
      title: t("metadata.title"),
      description: t("metadata.description"),
      siteName: metadata("siteName"),
      locale: projectOgLocales[locale],
      alternateLocale: routing.locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => projectOgLocales[candidate]),
      images: [{ url: image, width: 1280, height: 900, alt: t("screenshot.alt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.title"),
      description: t("metadata.description"),
      images: [image],
    },
  };
}

export default async function SarochiShopPage({ params }: ProjectPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "SarochiShop" });
  const gallery = t.raw("showcase.gallery") as GalleryItem[];

  return (
    <CompactCaseStudy
      locale={locale}
      index="07"
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
        primaryHref: "https://3d-shop-design.ir/",
      }}
      screenshot={{
        src: `${assetPath}/showroom.webp`,
        alt: t("screenshot.alt"),
        width: 1280,
        height: 900,
        address: "3d-shop-design.ir",
      }}
      showcase={
        <section className={styles.showcase} aria-labelledby="sarochi-showcase-title">
          <div className={styles.heading}>
            <p className={styles.eyebrow}>{t("showcase.eyebrow")}</p>
            <h2 id="sarochi-showcase-title">{t("showcase.title")}</h2>
            <p>{t("showcase.description")}</p>
          </div>
          <div className={styles.gallery}>
            {gallery.map((item) => (
              <figure key={item.id}>
                <Image
                  src={galleryAssets[item.id]}
                  alt={item.alt}
                  width={1280}
                  height={900}
                  sizes="(max-width: 760px) 100vw, 600px"
                />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
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
