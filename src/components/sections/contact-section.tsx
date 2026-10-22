import { useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import styles from "./portfolio-layout.module.css";
export function ContactSection() {
  const portfolio = usePortfolio();
  const t = useTranslations("Employer");
  return (
    <section
      className={`${styles.section} ${styles.contact}`}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className={styles.shell}>
        <h2 className={styles.heading} id="contact-title">
          {t("contact")}
        </h2>
        <p className={styles.description}>{t("contactCopy")}</p>
        <div className={styles.contactLinks}>
          <div className={styles.contactItem}>
            <span>{t("email")}</span>
            <a
              className={styles.link}
              href={`mailto:${portfolio.identity.email}`}
            >
              <bdi dir="ltr">{portfolio.identity.email}</bdi>
            </a>
          </div>
          {portfolio.socialLinks.map((link) => (
            <div className={styles.contactItem} key={link.id}>
              <span>{link.label}</span>
              <a
                className={styles.link}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </div>
          ))}
          <div className={styles.contactItem}>
            <span>{t("resume")}</span>
            <a
              className={styles.link}
              href={portfolio.identity.resumeUrl}
              download="Nima-Moradirad-Resume.pdf"
            >
              {t("resume")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
