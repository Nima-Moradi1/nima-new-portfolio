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
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { useCompactViewport } from "@/hooks/use-compact-viewport";
import type { ExperienceItem } from "@/types/portfolio";

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
    <div className="experience-fallback page-shell">
      <div className="experience-fallback__heading">
        <span>
          <bdi>{formatIndex(2)}</bdi> · {t("eyebrow")}
        </span>
        <h2 id="experience-title">{t("fallbackTitle")}</h2>
        <p>{t("fallbackDescription")}</p>
      </div>
      <ol>
        {experiences.map((experience, index) => (
          <li key={experience.id}>
            <article>
              <span>
                <bdi>{formatIndex(index + 1)}</bdi>
              </span>
              <p>
                <bdi>{experience.period}</bdi>
              </p>
              <h3>{experience.role}</h3>
              <strong>{experience.company}</strong>
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
      className="experience-book"
      style={readerStyle}
      onKeyDown={handleKeyDown}
      data-direction={isRtl ? "rtl" : "ltr"}
    >
      <div
        className="experience-book__stage"
        role="region"
        aria-label={t("regionLabel")}
        tabIndex={0}
      >
        <header className="experience-book__heading page-shell">
          <p>
            <span>
              <bdi>{formatIndex(2)}</bdi>
            </span>
            {t("eyebrow")}
          </p>
          <h2 id="experience-title">{t("title")}</h2>
          <p>{t("desktopDescription")}</p>
        </header>

        <div className="experience-book__scene" aria-hidden="true">
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

        <article className="experience-book__page-copy" aria-hidden="true">
          <div className="experience-book__page experience-book__page--left experience-book__page--summary">
            <div className="experience-book__folio">
              <span>
                <bdi>{activeNumber}</bdi>
              </span>
              <span>
                <bdi>{activeExperience.period}</bdi>
              </span>
            </div>
            <p className="experience-book__company">
              {activeExperience.company}
            </p>
            <h3>{activeExperience.role}</h3>
            <p className="experience-book__summary">
              {activeExperience.summary}
            </p>
            <div className="experience-book__tags">
              {activeExperience.technologies.slice(0, 5).map((technology) => (
                <span key={technology}>
                  <bdi>{technology}</bdi>
                </span>
              ))}
            </div>
          </div>
          <div className="experience-book__page experience-book__page--right experience-book__page--highlights">
            <div className="experience-book__chapter-label">
              <span>{t("selectedSignals")}</span>
              <span>{t("chapter", { number: activeNumber })}</span>
            </div>
            <ul>
              {activeExperience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </article>

        <div className="experience-book__navigation page-shell">
          <div className="experience-book__instruction" aria-hidden="true">
            <ArrowDown size={15} />
            {t("scrollToTurn")}
          </div>
          <div className="experience-book__pager">
            <button
              type="button"
              onClick={() => goToPage(activePage - 1)}
              disabled={activePage === 0}
              aria-label={t("previous")}
            >
              <PreviousIcon aria-hidden="true" size={17} />
            </button>
            <p aria-live="polite">
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
              <NextIcon aria-hidden="true" size={17} />
            </button>
          </div>
        </div>

        <ol className="sr-only">
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
