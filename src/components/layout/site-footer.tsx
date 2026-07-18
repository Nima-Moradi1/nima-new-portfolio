import { FileText, Mail, Phone, Send } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { LinkedinIcon } from "@/components/contact/linkedin-icon";
import { usePortfolio } from "@/content/use-portfolio";
import { siteFooterClassNames as styles } from "./site-footer.class-names";

export function SiteFooter() {
  const portfolio = usePortfolio();
  const t = useTranslations("Footer");
  const format = useFormatter();
  const year = format.number(new Date().getFullYear(), { useGrouping: false });
  const linkedin = portfolio.socialLinks.find((link) => link.id === "linkedin");
  const contactLinks = [
    {
      label: "LinkedIn",
      href: linkedin?.href ?? "https://www.linkedin.com/",
      icon: LinkedinIcon,
      external: true,
      download: false,
    },
    {
      label: t("resume"),
      href: portfolio.identity.resumeUrl,
      icon: FileText,
      external: false,
      download: true,
    },
    {
      label: "Telegram",
      href: "https://t.me/Nimamoradirad",
      icon: Send,
      external: true,
      download: false,
    },
    {
      label: "Gmail",
      href: `mailto:${portfolio.identity.email}`,
      icon: Mail,
      external: false,
      download: false,
    },
    {
      label: t("phone"),
      href: "tel:+989036837788",
      icon: Phone,
      external: false,
      download: false,
    },
  ];

  return (
    <footer className={styles.root}>
      <a href="#top" className={styles.mark} aria-label={t("backToTop")}>
        <Image
          className={styles.markImage}
          src="/assets/nima-moradirad.jpg"
          alt=""
          width={48}
          height={48}
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
