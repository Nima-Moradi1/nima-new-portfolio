import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Code2,
  ExternalLink,
  Layers3,
  Sparkles,
} from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import styles from "./compact-case-study.module.css";

type Feature = {
  id: string;
  title: string;
  text: string;
};

type EngineeringNote = {
  id: string;
  title: string;
  text: string;
};

type SecondaryLink = {
  href: string;
  label: string;
  kind: "github" | "bot" | "external";
};

type CompactCaseStudyProps = {
  locale: string;
  index: string;
  skip: string;
  back: string;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    availability: string;
  };
  live: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLinks?: SecondaryLink[];
  };
  screenshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
    address: string;
  };
  product: {
    eyebrow: string;
    title: string;
    description: string;
    features: Feature[];
  };
  engineering: {
    eyebrow: string;
    title: string;
    description: string;
    stackLabel: string;
    technologies: readonly string[];
    notes: EngineeringNote[];
  };
};

const secondaryIcons = {
  github: Code2,
  bot: Bot,
  external: ExternalLink,
} as const;

export function CompactCaseStudy({
  locale,
  index,
  skip,
  back,
  hero,
  live,
  screenshot,
  product,
  engineering,
}: CompactCaseStudyProps) {
  const isRtl = locale === "fa";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <>
      <a className={styles.skipLink} href="#case-study-main">
        {skip}
      </a>
      <SiteHeader />

      <main className={styles.root} id="case-study-main">
        <section className={styles.hero} id="top">
          <div className={styles.gridVeil} aria-hidden="true" />
          <div className={styles.shell}>
            <Link className={styles.back} href="/#work">
              <BackIcon aria-hidden="true" size={16} />
              {back}
            </Link>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>
                  <span className={styles.index}>{index}</span>
                  {hero.eyebrow}
                </p>
                <h1 className={styles.title}>{hero.title}</h1>
                <p className={styles.intro}>{hero.intro}</p>
                <p className={styles.availability}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {hero.availability}
                </p>
              </div>

              <aside className={styles.livePanel} aria-labelledby="live-title">
                <div className={styles.liveTopline}>
                  <span className={styles.livePulse} aria-hidden="true" />
                  <span>{live.eyebrow}</span>
                </div>
                <h2 className={styles.liveTitle} id="live-title">
                  {live.title}
                </h2>
                <p className={styles.liveDescription}>{live.description}</p>
                <div className={styles.liveActions}>
                  <Button asChild className={styles.primaryAction}>
                    <a
                      href={live.primaryHref}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {live.primaryLabel}
                      <ExternalLink aria-hidden="true" size={17} />
                    </a>
                  </Button>
                  {live.secondaryLinks?.map((item) => {
                    const Icon = secondaryIcons[item.kind];
                    return (
                      <Button
                        asChild
                        className={styles.secondaryAction}
                        key={item.href}
                        variant="outline"
                      >
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {item.label}
                          <Icon aria-hidden="true" size={17} />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </aside>
            </div>

            <figure className={styles.preview}>
              <div className={styles.browserBar} aria-hidden="true">
                <span className={styles.browserDots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.address} dir="ltr">
                  {screenshot.address}
                </span>
              </div>
              <Image
                className={styles.previewImage}
                src={screenshot.src}
                alt={screenshot.alt}
                width={screenshot.width}
                height={screenshot.height}
                sizes="(max-width: 864px) 100vw, 1200px"
                priority
              />
            </figure>
          </div>
        </section>

        <section className={styles.details} aria-labelledby="product-title">
          <div className={cn(styles.shell, styles.detailsGrid)}>
            <div className={styles.productColumn}>
              <div className={styles.sectionHeading}>
                <p className={styles.sectionEyebrow}>{product.eyebrow}</p>
                <h2 className={styles.sectionTitle} id="product-title">
                  {product.title}
                </h2>
                <p className={styles.sectionDescription}>
                  {product.description}
                </p>
              </div>

              <div className={styles.featureGrid}>
                {product.features.map((feature, featureIndex) => (
                  <article className={styles.featureCard} key={feature.id}>
                    <span className={styles.featureIndex}>
                      {String(featureIndex + 1).padStart(2, "0")}
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className={styles.engineering} aria-labelledby="stack-title">
              <p className={styles.sectionEyebrow}>{engineering.eyebrow}</p>
              <div className={styles.engineeringTitleRow}>
                <Layers3 aria-hidden="true" size={22} />
                <h2 id="stack-title">{engineering.title}</h2>
              </div>
              <p className={styles.engineeringDescription}>
                {engineering.description}
              </p>
              <div
                className={styles.technologyList}
                aria-label={engineering.stackLabel}
              >
                {engineering.technologies.map((technology) => (
                  <Badge
                    className={styles.technologyBadge}
                    key={technology}
                    variant="outline"
                  >
                    <bdi dir="ltr">{technology}</bdi>
                  </Badge>
                ))}
              </div>

              <div className={styles.noteList}>
                {engineering.notes.map((note) => (
                  <article className={styles.note} key={note.id}>
                    <Sparkles aria-hidden="true" size={16} />
                    <div>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
