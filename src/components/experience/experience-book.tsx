"use client";

import dynamic from "next/dynamic";
import {
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/theme-provider";
import { BookFallback } from "@/components/experience/book-fallback";
import { MobileExperienceReader } from "@/components/experience/mobile-experience-reader";
import { WebGLErrorBoundary } from "@/components/three/webgl-error-boundary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { useCompactViewport } from "@/hooks/use-compact-viewport";
import { cn } from "@/lib/cn";
import type { ExperienceItem } from "@/types/portfolio";
import { experienceBookClassNames as styles } from "./experience-book.class-names";
import artwork from "./experience-book.module.css";

const ExperienceBookScene = dynamic(
  () =>
    import("@/components/experience/experience-book-scene").then(
      (module) => module.ExperienceBookScene,
    ),
  { ssr: false, loading: () => <BookFallback /> },
);

type ExperienceBookProps = {
  experiences: readonly ExperienceItem[];
};

function ExperienceListFallback({ experiences }: ExperienceBookProps) {
  const t = useTranslations("Experience");
  const format = useFormatter();
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <div className={styles.fallbackRoot}>
      <div className={styles.fallbackHeading}>
        <span className={styles.fallbackEyebrow}>
          <bdi>{formatIndex(2)}</bdi> · {t("eyebrow")}
        </span>
        <h2 className={styles.fallbackTitle} id="experience-title">
          {t("fallbackTitle")}
        </h2>
        <p className={styles.fallbackDescription}>{t("fallbackDescription")}</p>
      </div>
      <ol className={styles.fallbackList}>
        {experiences.map((experience, index) => (
          <li className={styles.fallbackItem} key={experience.id}>
            <article className={styles.fallbackArticle}>
              <span className={styles.fallbackIndex}>
                <bdi>{formatIndex(index + 1)}</bdi>
              </span>
              <p className={styles.fallbackPeriod}>
                <bdi>{experience.period}</bdi>
              </p>
              <h3 className={styles.fallbackRole}>{experience.role}</h3>
              <strong className={styles.fallbackCompany}>
                {experience.company}
              </strong>
              <p className={styles.fallbackSummary}>{experience.summary}</p>
              <ul className={styles.fallbackHighlights}>
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ExperienceBook({ experiences }: ExperienceBookProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const compactViewport = useCompactViewport();
  const webGLSupported = useWebGLSupport();

  if (compactViewport) {
    return <MobileExperienceReader experiences={experiences} />;
  }

  if (webGLSupported === false || reducedMotion) {
    return <ExperienceListFallback experiences={experiences} />;
  }

  return (
    <DesktopExperienceBook
      experiences={experiences}
      reducedMotion={reducedMotion}
      webGLSupported={webGLSupported}
    />
  );
}

type DesktopExperienceBookProps = ExperienceBookProps & {
  reducedMotion: boolean;
  webGLSupported: boolean | null;
};

function DesktopExperienceBook({
  experiences,
  reducedMotion,
  webGLSupported,
}: DesktopExperienceBookProps) {
  const locale = useLocale();
  const isRtl = locale === "fa";
  const t = useTranslations("Experience");
  const format = useFormatter();
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });
  const PreviousIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;
  const root = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [activePage, setActivePage] = useState(0);
  const shouldMountScene = useInView(root, {
    margin: "75% 0px",
    once: true,
  });
  const isInView = useInView(root, { margin: "15% 0px" });
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    progressRef.current = progress;
    const page = Math.min(
      experiences.length - 1,
      Math.round(progress * Math.max(experiences.length - 1, 1)),
    );
    setActivePage((currentPage) => (currentPage === page ? currentPage : page));
  });

  function goToPage(page: number) {
    const node = root.current;
    if (!node) return;
    const nextPage = Math.max(0, Math.min(experiences.length - 1, page));
    const rootTop = window.scrollY + node.getBoundingClientRect().top;
    const travel = Math.max(node.offsetHeight - window.innerHeight, 0);
    const progress = nextPage / Math.max(experiences.length - 1, 1);
    window.scrollTo({
      top: rootTop + travel * progress,
      behavior: "auto",
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const isNextKey =
      event.key === "ArrowDown" ||
      (isRtl ? event.key === "ArrowLeft" : event.key === "ArrowRight");
    const isPreviousKey =
      event.key === "ArrowUp" ||
      (isRtl ? event.key === "ArrowRight" : event.key === "ArrowLeft");

    if (isNextKey) {
      event.preventDefault();
      goToPage(activePage + 1);
    }
    if (isPreviousKey) {
      event.preventDefault();
      goToPage(activePage - 1);
    }
  }

  const activeExperience = experiences[activePage];
  const readerStyle = {
    "--book-scroll-height": `${experiences.length * 85}svh`,
  } as CSSProperties;
  const activeNumber = formatIndex(activePage + 1);

  return (
    <div
      ref={root}
      className={styles.root}
      style={readerStyle}
      onKeyDown={handleKeyDown}
      data-direction={isRtl ? "rtl" : "ltr"}
    >
      <div
        className={cn(styles.stage, artwork.stage)}
        role="region"
        aria-label={t("regionLabel")}
        tabIndex={0}
      >
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
          <p className={styles.headingDescription}>{t("desktopDescription")}</p>
        </header>

        <div className={cn(styles.scene, artwork.scene)} aria-hidden="true">
          <WebGLErrorBoundary fallback={<BookFallback />}>
            {webGLSupported === null || !shouldMountScene ? (
              <BookFallback />
            ) : (
              <ExperienceBookScene
                active={isInView}
                isRtl={isRtl}
                pageCount={experiences.length}
                progressRef={progressRef}
                reducedMotion={reducedMotion}
                theme={theme}
              />
            )}
          </WebGLErrorBoundary>
        </div>

        <article
          className={cn(styles.pageCopy, artwork.pageCopy)}
          aria-hidden="true"
        >
          <div className={cn(styles.page, styles.summaryPage)}>
            <div className={styles.folio}>
              <span className={styles.folioToken}>
                <bdi>{activeNumber}</bdi>
              </span>
              <span className={styles.folioPeriod}>
                <bdi>{activeExperience.period}</bdi>
              </span>
            </div>
            <p className={styles.company}>{activeExperience.company}</p>
            <h3 className={styles.pageTitle}>{activeExperience.role}</h3>
            <p className={styles.summary}>{activeExperience.summary}</p>
            <div className={styles.tags}>
              {activeExperience.technologies.slice(0, 5).map((technology) => (
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
          <div className={cn(styles.page, styles.highlightsPage)}>
            <div className={styles.chapterLabel}>
              <span className={styles.chapterTitle}>
                {t("selectedSignals")}
              </span>
              <span className={styles.chapterNumber}>
                {t("chapter", { number: activeNumber })}
              </span>
            </div>
            <ul className={cn(styles.highlights, artwork.highlights)}>
              {activeExperience.highlights.map((highlight) => (
                <li className={styles.highlight} key={highlight}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className={styles.navigation}>
          <div className={styles.instruction} aria-hidden="true">
            <ArrowDown size={15} />
            {t("scrollToTurn")}
          </div>
          <div className={styles.pager}>
            <Button
              className={styles.pagerButton}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => goToPage(activePage - 1)}
              disabled={activePage === 0}
              aria-label={t("previous")}
            >
              <PreviousIcon aria-hidden="true" size={17} />
            </Button>
            <p className={styles.pagerCounter} aria-live="polite">
              <span className={styles.pagerActive}>
                <bdi>{activeNumber}</bdi>
              </span>
              <i className={styles.pagerRule} aria-hidden="true" />
              <span>
                <bdi>{formatIndex(experiences.length)}</bdi>
              </span>
            </p>
            <Button
              className={styles.pagerButton}
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => goToPage(activePage + 1)}
              disabled={activePage === experiences.length - 1}
              aria-label={t("next")}
            >
              <NextIcon aria-hidden="true" size={17} />
            </Button>
          </div>
        </div>

        <ol className={styles.visuallyHidden}>
          {experiences.map((experience) => (
            <li key={experience.id}>
              <article>
                <p>{experience.period}</p>
                <h3>{experience.role}</h3>
                <p>{experience.company}</p>
                <p>{experience.summary}</p>
                <ul>
                  {experience.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
