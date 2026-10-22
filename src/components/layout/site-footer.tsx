import { useTranslations } from "next-intl";
import { usePortfolio } from "@/content/use-portfolio";
import styles from "@/components/sections/portfolio-layout.module.css";
export function SiteFooter() {
  const portfolio = usePortfolio();
  const t = useTranslations("Footer");
  return (
    <footer className={`${styles.shell} ${styles.footer}`}>
      <p>
        © {new Date().getFullYear()} {portfolio.identity.name}
      </p>
      <div className={styles.links}>
        {portfolio.socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
        <a href="#top">{t("top")}</a>
      </div>
    </footer>
  );
}
