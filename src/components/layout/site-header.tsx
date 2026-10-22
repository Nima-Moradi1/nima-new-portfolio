"use client";

import Image from "next/image";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { useTheme } from "@/components/theme/theme-provider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePortfolio } from "@/content/use-portfolio";
import { Link } from "@/i18n/navigation";
import styles from "./site-header.module.css";

export function SiteHeader() {
  const portfolio = usePortfolio();
  const t = useTranslations("Employer");
  const navigation = useTranslations("Navigation");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link
            href="/#top"
            className={styles.brand}
            aria-label={navigation("goTop")}
          >
            <Image
              src="/assets/nima-moradirad.jpg"
              alt=""
              width={42}
              height={42}
              className={styles.portrait}
            />
            <span>
              <strong>{portfolio.identity.name}</strong>
              <small>{portfolio.identity.shortRole}</small>
            </span>
          </Link>
          <nav
            className={styles.desktop}
            aria-label={navigation("primaryLabel")}
          >
            {portfolio.navigation.map((item) => (
              <Link key={item.id} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.actions}>
            <a
              className={styles.resume}
              href={portfolio.identity.resumeUrl}
              download="Nima-Moradirad-Resume.pdf"
            >
              {t("resume")}
            </a>
            <button
              type="button"
              className={styles.theme}
              onClick={toggleTheme}
              aria-label={t(theme === "dark" ? "themeLight" : "themeDark")}
            >
              <ThemeIcon aria-hidden="true" size={20} />
            </button>
            <LocaleSwitcher />
            <SheetTrigger asChild>
              <button
                className={styles.menu}
                type="button"
                aria-label={t("menu")}
              >
                <Menu aria-hidden="true" size={20} />
                <span>{t("menu")}</span>
              </button>
            </SheetTrigger>
          </div>
        </div>
      </header>
      <SheetContent
        className={styles.mobile}
        side="top"
        closeLabel={navigation("close")}
        aria-describedby={undefined}
      >
        <SheetTitle>{navigation("primaryLabel")}</SheetTitle>
        <nav aria-label={navigation("primaryLabel")}>
          {portfolio.navigation.map((item) => (
            <SheetClose asChild key={item.id}>
              <Link href={item.href}>{item.label}</Link>
            </SheetClose>
          ))}
        </nav>
        <SheetClose asChild>
          <a
            href={portfolio.identity.resumeUrl}
            download="Nima-Moradirad-Resume.pdf"
          >
            {t("resume")}
          </a>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
