"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "./theme-provider";
import styles from "./kinetic-theme-toggle.module.css";

/** A tiny orbital instrument: native button semantics, CSS depth, no ticker. */
export function KineticThemeToggle() {
  const t = useTranslations("Theme");
  const { isDark, toggleTheme } = useTheme();
  const label = t(isDark ? "switchToLight" : "switchToDark");
  return (
    <button type="button" className={styles.toggle} onClick={event => {
      const box = event.currentTarget.getBoundingClientRect();
      document.documentElement.style.setProperty("--nm-theme-x", `${box.x + box.width / 2}px`);
      document.documentElement.style.setProperty("--nm-theme-y", `${box.y + box.height / 2}px`);
      toggleTheme();
    }}
      aria-label={label} title={label} aria-pressed={!isDark} data-nm-theme-toggle>
      <span className={styles.instrument} aria-hidden="true">
        <span className={styles.orbit} />
        <span className={styles.sphere}>
          <span className={styles.day} />
          <span className={styles.night}><i /><i /><i /></span>
        </span>
        <span className={styles.satellite} />
      </span>
    </button>
  );
}
