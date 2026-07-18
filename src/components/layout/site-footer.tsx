import { useFormatter, useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import { siteFooterClassNames as styles } from "./site-footer.class-names";

export function SiteFooter() {
  const portfolio = usePortfolio();
  const t = useTranslations("Footer");
  const format = useFormatter();
  const year = format.number(new Date().getFullYear(), { useGrouping: false });

  return (
    <footer className={styles.root}>
      <a href="#top" className={styles.mark} aria-label={t("backToTop")}>
        {portfolio.identity.initials}
      </a>
      <p className={styles.copy}>
        {t("statement")}
        <br />
        {t("copyright", { year, name: portfolio.identity.name })}
      </p>
      <div className={styles.links}>
        {portfolio.socialLinks.map((link) => (
          <a
            href={link.href}
            className={styles.link}
            key={link.label}
            target="_blank"
            rel="noreferrer noopener"
          >
            {link.label}
          </a>
        ))}
        <a href={portfolio.identity.resumeUrl} className={styles.link} download>
          {t("resume")}
        </a>
        <a href="#top" className={styles.link}>
          {t("top")}
        </a>
      </div>
    </footer>
  );
}
