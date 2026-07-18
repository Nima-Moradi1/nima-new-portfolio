"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { ExperienceItem } from "@/types/portfolio";

type MobileExperienceReaderProps = {
  experiences: readonly ExperienceItem[];
};

export function MobileExperienceReader({
  experiences,
}: MobileExperienceReaderProps) {
  const locale = useLocale();
  const isRtl = locale === "fa";
  const t = useTranslations("Experience");
  const format = useFormatter();
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });
  const PreviousIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;
  const [activePage, setActivePage] = useState(0);
  const experience = experiences[activePage];
  const activeNumber = formatIndex(activePage + 1);

  function goToPage(page: number) {
    setActivePage(Math.max(0, Math.min(experiences.length - 1, page)));
  }

  return (
    <div
      className="mobile-experience-reader page-shell"
      data-direction={isRtl ? "rtl" : "ltr"}
    >
      <header className="mobile-experience-reader__heading">
        <p>
          <span>
            <bdi>{formatIndex(2)}</bdi>
          </span>
          {t("eyebrow")}
        </p>
        <h2 id="experience-title">{t("title")}</h2>
        <p>{t("mobileDescription")}</p>
      </header>

      <div className="mobile-experience-reader__book">
        <article aria-live="polite">
          <div className="mobile-experience-reader__page mobile-experience-reader__page--summary">
            <div className="mobile-experience-reader__folio">
              <span>
                <bdi>{activeNumber}</bdi>
              </span>
              <span>
                <bdi>{experience.period}</bdi>
              </span>
            </div>
            <p className="mobile-experience-reader__company">
              {experience.company}
            </p>
            <h3>{experience.role}</h3>
            <p className="mobile-experience-reader__summary">
              {experience.summary}
            </p>
            <div className="mobile-experience-reader__tags">
              {experience.technologies.slice(0, 4).map((technology) => (
                <span key={technology}>
                  <bdi>{technology}</bdi>
                </span>
              ))}
            </div>
          </div>

          <div className="mobile-experience-reader__page mobile-experience-reader__page--highlights">
            <p className="mobile-experience-reader__chapter">
              {t("selectedSignals")} · {t("chapter", { number: activeNumber })}
            </p>
            <ul>
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <nav
        className="mobile-experience-reader__navigation"
        aria-label={t("chaptersLabel")}
      >
        <button
          type="button"
          onClick={() => goToPage(activePage - 1)}
          disabled={activePage === 0}
          aria-label={t("previous")}
        >
          <PreviousIcon aria-hidden="true" size={18} />
        </button>
        <p>
          <span>
            <bdi>{activeNumber}</bdi>
          </span>
          <i aria-hidden="true" />
          <span>
            <bdi>{formatIndex(experiences.length)}</bdi>
          </span>
        </p>
        <button
          type="button"
          onClick={() => goToPage(activePage + 1)}
          disabled={activePage === experiences.length - 1}
          aria-label={t("next")}
        >
          <NextIcon aria-hidden="true" size={18} />
        </button>
      </nav>
    </div>
  );
}
