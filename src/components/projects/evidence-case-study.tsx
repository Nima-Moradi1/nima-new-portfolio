import Image from "next/image";
import { getMessages, getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Link } from "@/i18n/navigation";
import { projectEvidence } from "@/content/project-evidence";
import { materializePortfolio } from "@/content/portfolio";
import type { PortfolioContent } from "@/types/portfolio";
import styles from "./evidence-case-study.module.css";

export async function EvidenceCaseStudy({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const evidence = projectEvidence[slug];
  const [messages, t, routes] = await Promise.all([
    getMessages({ locale: locale as "en" | "fa" | "de" }),
    getTranslations("Employer"),
    getTranslations("Routes"),
  ]);
  const portfolio = materializePortfolio(
    messages.Portfolio as PortfolioContent,
  );
  const project = portfolio.projects.find(
    (p) => p.href === `/projects/${slug}`,
  )!;
  return (
    <>
      <a href="#case-study-main" className="skip-link">
        {routes("skipMain")}
      </a>
      <SiteHeader />
      <main className={styles.root} id="case-study-main" tabIndex={-1}>
        <div className={styles.shell}>
          <Link className={styles.back} href="/#work">
            {t("back")}
          </Link>
          <p className={styles.kind}>{project.category}</p>
          <h1 className={styles.title} lang="en" dir="ltr">
            {evidence.title}
          </h1>
          <p className={styles.intro}>{project.summary}</p>
          <p className={styles.status} lang="en" dir="ltr">
            {evidence.status}
          </p>
          <div className={styles.links}>
            {evidence.liveUrl ? (
              <a
                href={evidence.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("live")}
              </a>
            ) : null}
            {evidence.companyUrl ? (
              <a
                href={evidence.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("company")}
              </a>
            ) : null}
            {evidence.sourceUrl ? (
              <a
                href={evidence.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("source")}
              </a>
            ) : null}
          </div>
          <figure className={styles.figure}>
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1440}
              height={1000}
              sizes="(max-width: 768px) 90vw, 1100px"
              className={styles.image}
              priority
            />
            <figcaption lang="en" dir="ltr">
              {evidence.caption}
            </figcaption>
          </figure>
          {locale !== "en" ? (
            <p className={styles.notice}>{t("englishNotice")}</p>
          ) : null}
          <div className={styles.prose} lang="en" dir="ltr">
            {evidence.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.codeUrl ? (
                  <a
                    href={section.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {section.codeLabel}
                  </a>
                ) : null}
              </section>
            ))}
          </div>
          <Link className={styles.back} href="/#contact">
            {t("contact")}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
