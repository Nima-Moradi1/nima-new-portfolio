"use client";

import Image from "next/image";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [compact, setCompact] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const nav = inner.querySelector("nav");
    const brand = inner.firstElementChild;
    const actions = inner.lastElementChild;
    if (!nav || !brand || !actions) return;
    const observer = new ResizeObserver(() => {
      const gap = parseFloat(getComputedStyle(inner).columnGap) || 0;
      const required =
        brand.scrollWidth + nav.scrollWidth + actions.scrollWidth + gap * 2;
      setCompact(
        nav.getBoundingClientRect().width > 0 && required > inner.clientWidth,
      );
    });
    [inner, nav, brand, actions].forEach((element) =>
      observer.observe(element),
    );
    return () => observer.disconnect();
  }, []);
  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <header className={styles.header} data-compact={compact}>
        <div className={styles.inner} ref={innerRef}>
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
              aria-label={t("resume")}
              href={portfolio.identity.resumeUrl}
              download="Nima-Moradirad-Resume.pdf"
            >
              <span className={styles.resumeFull}>{t("resume")}</span>
              <span className={styles.resumeShort}>{t("resumeShort")}</span>
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
