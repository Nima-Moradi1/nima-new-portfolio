import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarDays,
  ExternalLink,
  LayoutDashboard,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { xoArenaPageClassNames as styles } from "../xo-arena/page.class-names";
import artwork from "../xo-arena/page.module.css";
import localArtwork from "./page.module.css";

type AzitaMohajerPageProps = {
  params: Promise<{ locale: string }>;
};

const signalIcons = {
  journey: MessagesSquare,
  calendar: CalendarDays,
  bot: Bot,
  admin: LayoutDashboard,
} as const;

type LocalizedSignal = {
  id: keyof typeof signalIcons;
  title: string;
  text: string;
};

const technologies = [
  "Next.js",
  "TypeScript",
  "Drizzle ORM",
  "SQL",
  "RTL",
  "Telegram Bot",
] as const;

const ogLocales: Record<AppLocale, string> = {
  en: "en_US",
  fa: "fa_IR",
  de: "de_DE",
};

function localizedProjectPath(locale: AppLocale) {
  const pathname = "/projects/azita-mohajer";
  return locale === routing.defaultLocale ? pathname : `/${locale}${pathname}`;
}

export async function generateMetadata({
  params,
}: AzitaMohajerPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const [metadata, project] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "AzitaMohajer" }),
  ]);
  const canonical = localizedProjectPath(locale);
  const languages = {
    en: localizedProjectPath("en"),
    fa: localizedProjectPath("fa"),
    de: localizedProjectPath("de"),
    "x-default": localizedProjectPath(routing.defaultLocale),
  };

  return {
    title: project("metadata.title"),
    description: project("metadata.description"),
    alternates: { canonical, languages },
    openGraph: {
      type: "article",
      url: canonical,
      title: project("metadata.title"),
      description: project("metadata.description"),
      siteName: metadata("siteName"),
      locale: ogLocales[locale],
      alternateLocale: routing.locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => ogLocales[candidate]),
    },
    twitter: {
      card: "summary",
      title: project("metadata.title"),
      description: project("metadata.description"),
    },
  };
}

export default async function AzitaMohajerPage({
  params,
}: AzitaMohajerPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const [t, format] = await Promise.all([
    getTranslations({ locale, namespace: "AzitaMohajer" }),
    getFormatter({ locale }),
  ]);
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });
  const engineeringSignals = t.raw("signals") as LocalizedSignal[];
  const isRtl = locale === "fa";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <>
      <a className={styles.skipLink} href="#azita-main">
        {t("skip")}
      </a>
      <SiteHeader />

      <main className={styles.root} id="azita-main">
        <section className={cn(styles.hero, artwork.hero)} id="top">
          <div
            className={cn(styles.heroGrid, artwork.heroGrid)}
            aria-hidden="true"
          />
          <div className={styles.heroShell}>
            <Link className={styles.back} href="/#work">
              <BackIcon aria-hidden="true" size={16} />
              {t("back")}
            </Link>

            <section
              className="my-8 rounded-2xl border border-line-strong bg-background-soft p-5 sm:p-6"
              aria-labelledby="azita-links-title"
            >
              <div className="flex flex-col gap-3">
                <p className={styles.sectionEyebrow}>{t("links.eyebrow")}</p>
                <h2
                  className="text-xl font-medium sm:text-2xl"
                  id="azita-links-title"
                >
                  {t("links.title")}
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className={cn(styles.nextLink, styles.nextPrimaryLink)}
                  >
                    <a
                      href="https://azitamohajer.com"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {t("links.website")}
                      <ExternalLink aria-hidden="true" size={17} />
                    </a>
                  </Button>
                  <Button asChild className={styles.nextLink} variant="outline">
                    <a
                      href="https://t.me/azita_apply_bot"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {t("links.bot")}
                      <Bot aria-hidden="true" size={17} />
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            <div className={styles.heroCopy}>
              <div className={styles.heroCopyCell}>
                <p className={styles.eyebrow}>
                  <span className={styles.eyebrowIndex}>
                    <bdi>{formatIndex(5)}</bdi>
                  </span>
                  {t("hero.eyebrow")}
                </p>
                <h1 className={cn(styles.heroTitle, localArtwork.heroTitle)}>
                  {t("hero.title")}
                </h1>
              </div>
              <div className={styles.intro}>
                <p className={styles.introCopy}>{t("hero.intro")}</p>
                <div className={styles.availability}>
                  <span className={styles.availabilityDot} aria-hidden="true" />
                  {t("hero.availability")}
                </div>
              </div>
            </div>

            <div className="relative mt-[clamp(3rem,6vw,6rem)] overflow-hidden rounded-[1.4rem] border border-line-strong bg-background-soft shadow-[0_2rem_5rem_color-mix(in_srgb,var(--background)_55%,transparent)]">
              <Image
                src="/assets/projects/azita-mohajer/desktop-site.png"
                alt={t("hero.imageAlt")}
                width={1440}
                height={960}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </section>

        <section className={styles.system} aria-labelledby="azita-system-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{t("system.eyebrow")}</p>
              <div className={styles.sectionCopy}>
                <h2
                  className={cn(styles.sectionTitle, localArtwork.sectionTitle)}
                  id="azita-system-title"
                >
                  {t("system.title")}
                </h2>
                <p className={styles.sectionDescription}>
                  {t("system.description")}
                </p>
              </div>
            </div>

            <div className={styles.systemGrid}>
              {engineeringSignals.map(({ id, title, text }, index) => {
                const Icon = signalIcons[id];
                return (
                  <article className={styles.signalCard} key={id}>
                    <div className={styles.signalHeader}>
                      <Icon aria-hidden="true" size={21} />
                      <span className={styles.signalIndex}>
                        <bdi>{formatIndex(index + 1)}</bdi>
                      </span>
                    </div>
                    <h3 className={styles.signalTitle}>{title}</h3>
                    <p className={styles.signalText}>{text}</p>
                  </article>
                );
              })}
            </div>

            <div
              className={styles.technologyList}
              aria-label={t("system.stackLabel")}
            >
              {technologies.map((technology) => (
                <Badge
                  className={styles.technologyBadge}
                  key={technology}
                  variant="outline"
                >
                  <bdi className={styles.latinToken} dir="ltr">
                    {technology}
                  </bdi>
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section
          className={cn(styles.deployment, artwork.deployment)}
          aria-labelledby="azita-architecture-title"
        >
          <div className={styles.deploymentLayout}>
            <div className={styles.deploymentHeading}>
              <p className={styles.sectionEyebrow}>
                {t("architecture.eyebrow")}
              </p>
              <h2
                className={cn(
                  styles.deploymentTitle,
                  localArtwork.architectureTitle,
                )}
                id="azita-architecture-title"
              >
                {t("architecture.title")}
              </h2>
            </div>
            <div className={styles.deploymentCopy}>
              <p className={styles.deploymentParagraph}>
                {t("architecture.paragraph1")}
              </p>
              <div className="mt-8 flex items-center gap-3 text-primary">
                <ShieldCheck aria-hidden="true" size={21} />
                <span className="font-mono text-[0.62rem] tracking-[0.08em] uppercase">
                  {t("architecture.securityLabel")}
                </span>
              </div>
              <p
                className={cn(
                  styles.deploymentParagraph,
                  styles.deploymentParagraphMuted,
                )}
              >
                {t("architecture.paragraph2")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
