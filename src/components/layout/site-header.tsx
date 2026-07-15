"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeLamp } from "@/components/theme/theme-lamp";
import { portfolio } from "@/content/portfolio";

export function SiteHeader() {
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

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled}>
        <a
          className="site-header__brand"
          href="#top"
          aria-label="Go to top"
          onClick={() => setMenuOpen(false)}
        >
          <span className="site-header__mark" aria-hidden="true">
            {portfolio.identity.initials}
          </span>
          <span className="site-header__identity">
            <strong>{portfolio.identity.name}</strong>
            <small>{portfolio.identity.shortRole}</small>
          </span>
        </a>

        <nav
          className="site-header__desktop-nav"
          aria-label="Primary navigation"
        >
          {portfolio.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="site-header__contact" href="#contact">
            Start a conversation
          </a>
          <ThemeLamp />
          <button
            className="site-header__menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        className="mobile-nav"
        id="mobile-navigation"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {portfolio.navigation.map((item, index) => (
            <a
              href={item.href}
              key={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <p>{portfolio.identity.location}</p>
      </div>
    </>
  );
}
