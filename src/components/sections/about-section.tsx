import { useLocale, useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import styles from "./portfolio-layout.module.css";
export function AboutSection() {
  const portfolio = usePortfolio();
  const locale = useLocale();
  const t = useTranslations("Employer");
  return (
    <section
      className={styles.section}
      id="about"
      aria-labelledby="about-title"
    >
      <div className={`${styles.shell} ${styles.about}`}>
        <div>
          <h2 className={styles.heading} id="about-title">
            {t("about")}
          </h2>
          {portfolio.about.paragraphs.map((p) => (
            <p className={styles.description} key={p}>
              {p}
            </p>
          ))}
          <p className={styles.body}>{portfolio.identity.availability}</p>
        </div>
        <div className={styles.aboutDetails}>
          <div>
            <h3>{t("education")}</h3>
            <p className={styles.body}>{portfolio.education.title}</p>
            <p className={styles.body}>
              <bdi>{portfolio.education.institution}</bdi>
            </p>
            <p className={styles.body}>{portfolio.education.note}</p>
          </div>
          <div>
            <h3>{t("languages")}</h3>
            {portfolio.education.languages.map((language) => (
              <p className={styles.body} key={language}>
                {language}
              </p>
            ))}
          </div>
          {locale !== "en" ? (
            <p className={styles.notice}>{t("translationNotice")}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
