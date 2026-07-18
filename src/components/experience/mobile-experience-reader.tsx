"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { ExperienceItem } from "@/types/portfolio";
import { mobileExperienceReaderClassNames as styles } from "./mobile-experience-reader.class-names";
import artwork from "./mobile-experience-reader.module.css";

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
    <div className={styles.root} data-direction={isRtl ? "rtl" : "ltr"}>
      <header className={styles.heading}>
        <p className={styles.headingEyebrow}>
          <span className={styles.headingIndex}>
            <bdi>{formatIndex(2)}</bdi>
          </span>
          {t("eyebrow")}
        </p>
        <h2 className={styles.headingTitle} id="experience-title">
          {t("title")}
        </h2>
        <p className={styles.headingDescription}>{t("mobileDescription")}</p>
      </header>

      <div className={cn(styles.book, artwork.book)}>
        <article className={cn(styles.paper, artwork.paper)} aria-live="polite">
          <div className={cn(styles.page, styles.summaryPage)}>
            <div className={styles.folio}>
              <span className={styles.folioNumber}>
                <bdi>{activeNumber}</bdi>
              </span>
              <span className={styles.folioPeriod}>
                <bdi>{experience.period}</bdi>
              </span>
            </div>
            <p className={styles.company}>{experience.company}</p>
            <h3 className={styles.pageTitle}>{experience.role}</h3>
            <p className={styles.summary}>{experience.summary}</p>
            <div className={styles.tags}>
              {experience.technologies.slice(0, 4).map((technology) => (
                <Badge
                  className={styles.tag}
                  key={technology}
                  variant="outline"
                >
                  <bdi>{technology}</bdi>
                </Badge>
              ))}
            </div>
          </div>

          <div
            className={cn(
              styles.page,
              styles.highlightsPage,
              artwork.highlightsPage,
            )}
          >
            <p className={styles.chapter}>
              {t("selectedSignals")} · {t("chapter", { number: activeNumber })}
            </p>
            <ul className={cn(styles.highlights, artwork.highlights)}>
              {experience.highlights.map((highlight) => (
                <li className={styles.highlight} key={highlight}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <nav className={styles.navigation} aria-label={t("chaptersLabel")}>
        <Button
          className={styles.navigationButton}
          type="button"
          variant="outline"
          size="icon"
          onClick={() => goToPage(activePage - 1)}
          disabled={activePage === 0}
          aria-label={t("previous")}
        >
          <PreviousIcon aria-hidden="true" size={18} />
        </Button>
        <p className={styles.counter}>
          <span className={styles.activeCount}>
            <bdi>{activeNumber}</bdi>
          </span>
          <i className={styles.counterRule} aria-hidden="true" />
          <span>
            <bdi>{formatIndex(experiences.length)}</bdi>
          </span>
        </p>
        <Button
          className={styles.navigationButton}
          type="button"
          variant="outline"
          size="icon"
          onClick={() => goToPage(activePage + 1)}
          disabled={activePage === experiences.length - 1}
          aria-label={t("next")}
        >
          <NextIcon aria-hidden="true" size={18} />
        </Button>
      </nav>
    </div>
  );
}
