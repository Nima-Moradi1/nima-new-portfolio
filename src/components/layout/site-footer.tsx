import { Code2, FileText, Mail, Send } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { LinkedinIcon } from "@/components/contact/linkedin-icon";
import { NMBrandMark } from "@/components/branding/nm-brand-mark";
import { usePortfolio } from "@/content/use-portfolio";
import { siteFooterClassNames as styles } from "./site-footer.class-names";

export function SiteFooter() {
  const portfolio = usePortfolio();
  const t = useTranslations("Footer");
  const format = useFormatter();
  const contact = useTranslations("ContactDialog");
  const year = format.number(new Date().getFullYear(), { useGrouping: false });
  const contactLinks = [
    ...portfolio.socialLinks.map(link => ({
      label: link.label,
      href: link.href,
      icon: link.id === "linkedin" ? LinkedinIcon : Code2,
      external: true,
      download: false,
    })),
    {
      label: t("resume"),
      href: portfolio.identity.resumeUrl,
      icon: FileText,
      external: false,
      download: true,
    },
    {
      label: contact("telegram"),
      href: "https://t.me/Nimamoradirad",
      icon: Send,
      external: true,
      download: false,
    },
    {
      label: contact("gmail"),
      href: `mailto:${portfolio.identity.email}`,
      icon: Mail,
      external: false,
      download: false,
    },
  ];

  return (
    <footer className={styles.root}>
      <a href="#top" className={styles.mark} aria-label={t("backToTop")}>
        <NMBrandMark
          className={styles.markImage}
        />
      </a>
      <p className={styles.copy}>
        {t("copyright", { year, name: portfolio.identity.name })}
      </p>
      <div className={styles.links}>
        {contactLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              href={link.href}
              className={styles.link}
              key={link.label}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              download={link.download || undefined}
              aria-label={link.label}
              title={link.label}
            >
              <Icon className={styles.linkIcon} aria-hidden="true" />
            </a>
          );
        })}
        <a href="#top" className={styles.link}>
          {t("top")}
        </a>
      </div>
    </footer>
  );
}
