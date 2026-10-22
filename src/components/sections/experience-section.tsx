import { useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import styles from "./portfolio-layout.module.css";
export function ExperienceSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Employer");
  return (
    <section
      className={styles.section}
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className={styles.shell}>
        <h2 className={styles.heading} id="experience-title">
          {t("experience")}
        </h2>
        <div className={styles.experience}>
          {portfolio.experience.map((role) => (
            <article
              className={styles.role}
              key={role.id}
              id={`experience-${role.id}`}
            >
              <div>
                <h3>{role.company}</h3>
                <p className={styles.roleTitle}>{role.role}</p>
                <p className={styles.period}>{role.period}</p>
              </div>
              <ul className={`${styles.bullets} ${styles.body}`}>
                {role.highlights.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
