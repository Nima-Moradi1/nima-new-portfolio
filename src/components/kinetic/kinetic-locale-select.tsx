"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { Select } from "radix-ui";
import { useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import styles from "./kinetic-locale-select.module.css";

type Props = { locale: AppLocale; label: string; href: string };

const labels: Record<AppLocale, string> = {
  en: "English",
  fa: "فارسی",
  de: "Deutsch",
};

export function KineticLocaleSelect({ locale, label, href }: Props) {
  const router = useRouter();

  return (
    <Select.Root
      value={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      onValueChange={(value) => {
        if (routing.locales.includes(value as AppLocale)) {
          router.push(href, { locale: value as AppLocale, scroll: false });
        }
      }}
    >
      <Select.Trigger className={styles.trigger} aria-label={label}>
        <Globe size={14} aria-hidden="true" />
        <Select.Value>{locale === "fa" ? "فا" : locale.toUpperCase()}</Select.Value>
        <Select.Icon className={styles.chevron}><ChevronDown size={12} /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={styles.menu} position="popper" sideOffset={10} align="end" collisionPadding={16}>
          <Select.Viewport className={styles.viewport}>
            {routing.locales.map((candidate) => (
              <Select.Item key={candidate} value={candidate} className={styles.item}>
                <span className={styles.code} aria-hidden="true">{candidate.toUpperCase()}</span>
                <Select.ItemText><span lang={candidate} dir={candidate === "fa" ? "rtl" : "ltr"}>{labels[candidate]}</span></Select.ItemText>
                <Select.ItemIndicator className={styles.check}><Check size={14} /></Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
