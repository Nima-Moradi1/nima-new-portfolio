"use client";

import { ArrowUpRight, Code2, Mail, Phone, Send, X, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dialog } from "radix-ui";
import { useLayoutEffect, useRef } from "react";
import { LinkedinIcon } from "@/components/contact/linkedin-icon";
import type { AppLocale } from "@/i18n/routing";
import type { PortfolioContent } from "@/types/portfolio";
import styles from "./kinetic-contact-dialog.module.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: AppLocale;
  content: PortfolioContent;
};

type Channel = { id: string; label: string; value: string; href: string; icon: LucideIcon; external: boolean };

export function KineticContactDialog({ open, onOpenChange, locale, content }: Props) {
  const t = useTranslations("ContactDialog");
  const opener = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    if (open && document.activeElement instanceof HTMLElement) {
      opener.current = document.activeElement;
    }
  }, [open]);
  const github = content.socialLinks.find((link) => link.id === "github");
  const linkedin = content.socialLinks.find((link) => link.id === "linkedin");
  const channels: Channel[] = [
    { id: "phone", label: locale === "fa" ? "تماس تلفنی" : locale === "de" ? "Anrufen" : "Call", value: "+98 903 683 7788", href: "tel:+989036837788", icon: Phone, external: false },
    { id: "email", label: locale === "fa" ? "ایمیل" : locale === "de" ? "E-Mail" : "Email", value: content.identity.email, href: `mailto:${content.identity.email}`, icon: Mail, external: false },
    { id: "telegram", label: t("telegram"), value: "@Nimamoradirad", href: "https://t.me/Nimamoradirad", icon: Send, external: true },
    ...(github ? [{ id: "github", label: "GitHub", value: "Nima-Moradi1", href: github.href, icon: Code2, external: true }] : []),
    ...(linkedin ? [{ id: "linkedin", label: t("linkedin"), value: content.identity.name, href: linkedin.href, icon: LinkedinIcon, external: true }] : []),
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.panel}
          dir={locale === "fa" ? "rtl" : "ltr"}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus({ preventScroll: true });
          }}
        >
          <div className={styles.reflection} aria-hidden="true" />
          <header className={styles.heading}>
            <Dialog.Description className={styles.eyebrow}>{t("eyebrow")}</Dialog.Description>
            <Dialog.Title className={styles.title}>{t("title")}</Dialog.Title>
          </header>
          <div className={styles.channels}>
            {channels.map(({ id, label, value, href, icon: Icon, external }) => (
              <a className={styles.channel} key={id} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                <span className={styles.icon}><Icon size={19} aria-hidden="true" /></span>
                <span className={styles.channelText}>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.value}><bdi dir={id === "phone" ? "ltr" : undefined}>{value}</bdi></span>
                </span>
                <ArrowUpRight className={styles.arrow} size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
          <Dialog.Close className={styles.close} aria-label={t("close")}><X size={18} aria-hidden="true" /></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
