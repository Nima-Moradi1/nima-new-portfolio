import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { projectsSectionClassNames as styles } from "./projects-section.class-names";
import artwork from "./projects-section.module.css";

export function ProjectsSection() {
  const locale = useLocale();
  const portfolio = usePortfolio();
  const t = useTranslations("Projects");
  const format = useFormatter();
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });
  const InternalArrow = locale === "fa" ? ArrowLeft : ArrowRight;

  return (
    <section
      className={styles.root}
      id="work"
      aria-labelledby="work-title"
      data-depth-section
    >
      <div className={styles.shell} data-depth-plane>
        <Reveal className={cn(styles.headerFrame, artwork.headerFrame)}>
          <SectionHeading
            id="work-title"
            index={formatIndex(3)}
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <div className={styles.grid}>
          {portfolio.projects.map((project, index) => {
            const content = (
              <article
                className={styles.card}
                data-accent={project.accent}
                data-featured={index === 0}
              >
                <div className={styles.visual}>
                  <Image
                    className={styles.image}
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 864px) 100vw, 25vw"
                  />
                  {project.logo ? (
                    <div className={styles.logo}>
                      <Image
                        src={project.logo}
                        alt={project.logoAlt ?? `${project.title} logo`}
                        fill
                        sizes="9rem"
                      />
                    </div>
                  ) : null}
                </div>
                <div className={styles.content}>
                  <div className={styles.kicker}>
                    <span>{project.category}</span>
                    {project.href?.startsWith("/") ? (
                      <InternalArrow aria-hidden="true" size={19} />
                    ) : (
                      <ArrowUpRight aria-hidden="true" size={19} />
                    )}
                  </div>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.summary}>{project.summary}</p>
                  <div className={styles.tags}>
                    {project.technologies.slice(0, 4).map((technology) => (
                      <Badge
                        className={styles.tag}
                        variant="outline"
                        key={technology}
                      >
                        <bdi>{technology}</bdi>
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            );

            return (
              <Reveal key={project.id} delay={index * 0.08}>
                {project.href?.startsWith("/") ? (
                  <Link
                    className={styles.cardLink}
                    href={project.href}
                    aria-label={t("internalLabel", { title: project.title })}
                  >
                    {content}
                  </Link>
                ) : project.href ? (
                  <a
                    className={styles.cardLink}
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={t("externalLabel", { title: project.title })}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
