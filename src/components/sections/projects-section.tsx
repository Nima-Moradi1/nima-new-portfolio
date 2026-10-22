import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import type { ProjectItem } from "@/types/portfolio";
import styles from "./portfolio-layout.module.css";

function ProjectPreview({
  project,
  supporting = false,
}: {
  project: ProjectItem;
  supporting?: boolean;
}) {
  const t = useTranslations("Employer");
  return (
    <article className={supporting ? undefined : styles.project}>
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={
            supporting
              ? "(max-width: 768px) 90vw, 540px"
              : "(max-width: 768px) 90vw, 580px"
          }
        />
      </div>
      <div className={styles.projectCopy}>
        <p className={styles.kind}>{project.category}</p>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.body}>{project.summary}</p>
        <p className={styles.contribution}>{project.contribution}</p>
        {project.status ? (
          <p className={styles.period}>{project.status}</p>
        ) : null}
        <div className={styles.tags}>
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge variant="outline" key={tech}>
              <bdi dir="ltr">{tech}</bdi>
            </Badge>
          ))}
        </div>
        <div className={styles.links}>
          {project.href?.startsWith("/") ? (
            <Link
              className={styles.link}
              href={project.href}
              aria-label={`${t("caseStudy")}: ${project.title}`}
            >
              {t("caseStudy")}
            </Link>
          ) : project.href ? (
            <a
              className={styles.link}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("live")}
            </a>
          ) : null}
          {project.liveVerified && project.requestedDestination ? (
            <a
              className={styles.link}
              href={project.requestedDestination}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("live")}
            </a>
          ) : null}
          {project.sourceUrl ? (
            <a
              className={styles.link}
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("source")}: ${project.title}`}
            >
              {t("source")}
            </a>
          ) : null}
          {project.walkthroughUrl ? (
            <a
              className={styles.link}
              href={project.walkthroughUrl}
              aria-label={`${t("walkthrough")}: ${project.title}`}
            >
              {t("walkthrough")}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
export function ProjectsSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Employer");
  return (
    <section className={styles.section} id="work" aria-labelledby="work-title">
      <div className={styles.shell}>
        <h2 className={styles.heading} id="work-title">
          {t("work")}
        </h2>
        <p className={styles.description}>{t("workIntro")}</p>
        <div className={styles.projects}>
          {portfolio.projects
            .filter((p) => p.featured)
            .map((project) => (
              <ProjectPreview project={project} key={project.id} />
            ))}
        </div>
        <h2 className={styles.supportingTitle}>{t("supporting")}</h2>
        <div className={styles.supporting}>
          {portfolio.projects
            .filter((p) => !p.featured)
            .map((project) => (
              <ProjectPreview project={project} key={project.id} supporting />
            ))}
        </div>
      </div>
    </section>
  );
}
