"use client";

import { Menu, X } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { ThemeLamp } from "@/components/theme/theme-lamp";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePortfolio } from "@/content/use-portfolio";
import { Link } from "@/i18n/navigation";
import { siteHeaderClassNames as styles } from "./site-header.class-names";

export function SiteHeader() {
  const portfolio = usePortfolio();
  const t = useTranslations("Navigation");
  const format = useFormatter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 72rem)");
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setMenuOpen(false);
    };
    mobileViewport.addEventListener("change", handleViewportChange);
    return () =>
      mobileViewport.removeEventListener("change", handleViewportChange);
  }, []);

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen} modal={menuOpen}>
      <header className={styles.root} data-scrolled={scrolled}>
        <Link
          className={styles.brand}
          href="/"
          aria-label={t("goTop")}
          onClick={() => setMenuOpen(false)}
        >
          <span className={styles.mark} aria-hidden="true">
            {portfolio.identity.initials}
          </span>
          <span className={styles.identity}>
            <strong className={styles.identityName}>
              {portfolio.identity.name}
            </strong>
            <small className={styles.identityRole}>
              {portfolio.identity.shortRole}
            </small>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label={t("primaryLabel")}>
          {portfolio.navigation.map((item) => (
            <Link
              className={styles.desktopNavLink}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link className={styles.contact} href="/#contact">
            {t("contactCta")}
          </Link>
          <LocaleSwitcher />
          <ThemeLamp />
          <SheetTrigger asChild>
            <button
              className={styles.menuButton}
              type="button"
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? t("close") : t("open")}
            >
              {menuOpen ? (
                <X className={styles.menuIcon} aria-hidden="true" />
              ) : (
                <Menu className={styles.menuIcon} aria-hidden="true" />
              )}
            </button>
          </SheetTrigger>
        </div>
      </header>

      <SheetContent
        className={styles.mobileNav}
        id="mobile-navigation"
        side="top"
        forceMount
        showCloseButton={false}
        closeLabel={t("close")}
        overlayClassName={styles.mobileOverlay}
        data-open={menuOpen}
      >
        <SheetTitle className={styles.mobileTitle}>
          {t("mobileLabel")}
        </SheetTitle>
        <nav className={styles.mobileNavList} aria-label={t("mobileLabel")}>
          {portfolio.navigation.map((item, index) => (
            <SheetClose asChild key={item.href}>
              <Link className={styles.mobileNavLink} href={item.href}>
                <bdi className={styles.mobileNavIndex}>
                  {format.number(index + 1, {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}
                </bdi>
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <p className={styles.mobileLocation}>{portfolio.identity.location}</p>
      </SheetContent>
    </Sheet>
  );
}
