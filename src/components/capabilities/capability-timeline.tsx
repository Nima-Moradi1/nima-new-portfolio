"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import type { CapabilityGroup } from "@/types/portfolio";
import {
  getLogicalScrollLeft,
  scrollToLogicalLeft,
} from "@/lib/logical-scroll";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { capabilityTimelineClassNames as styles } from "./capability-timeline.class-names";
import artwork from "./capability-timeline.module.css";

type Education = {
  title: string;
  institution: string;
  note: string;
  languages: readonly string[];
};

type CapabilityTimelineProps = {
  groups: readonly CapabilityGroup[];
  education: Education;
};

export function CapabilityTimeline({
  groups,
  education,
}: CapabilityTimelineProps) {
  const locale = useLocale();
  const isRtl = locale === "fa";
  const t = useTranslations("Capabilities");
  const format = useFormatter();
  const formatIndex = (value: number) =>
    format.number(value, { minimumIntegerDigits: 2, useGrouping: false });
  const PreviousIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;
  const stage = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const horizontalDrag = useRef<{
    axis: "horizontal" | "vertical" | null;
    pointerId: number;
    startLogicalScrollLeft: number;
    startX: number;
    startY: number;
  } | null>(null);
  const suppressClick = useRef(false);
  const itemCount = groups.length + 1;

  useEffect(() => {
    const stageNode = stage.current;
    const viewportNode = viewport.current;
    if (!stageNode || !viewportNode) return;
    const activeStage = stageNode;
    const activeViewport = viewportNode;
    activeStage.dataset.horizontalDragReady = "true";

    function handlePointerDown(event: globalThis.PointerEvent) {
      if (!event.isPrimary || event.button !== 0) return;
      activeStage.dataset.horizontalDragState = "tracking";
      horizontalDrag.current = {
        axis: null,
        pointerId: event.pointerId,
        startLogicalScrollLeft: getLogicalScrollLeft(activeViewport, isRtl),
        startX: event.clientX,
        startY: event.clientY,
      };
      suppressClick.current = false;
    }

    function handlePointerMove(event: globalThis.PointerEvent) {
      const drag = horizontalDrag.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (drag.axis === null && Math.hypot(deltaX, deltaY) >= 8) {
        drag.axis =
          Math.abs(deltaX) > Math.abs(deltaY) * 1.08
            ? "horizontal"
            : "vertical";
      }
      if (drag.axis !== "horizontal") return;

      event.preventDefault();
      activeStage.dataset.horizontalDragState = "dragging";
      suppressClick.current = true;
      if (!activeStage.hasPointerCapture(event.pointerId)) {
        activeStage.setPointerCapture(event.pointerId);
      }
      scrollToLogicalLeft(
        activeViewport,
        drag.startLogicalScrollLeft + (isRtl ? deltaX : -deltaX),
      );
    }

    function finishPointerDrag(event: globalThis.PointerEvent) {
      const drag = horizontalDrag.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      if (activeStage.hasPointerCapture(event.pointerId)) {
        activeStage.releasePointerCapture(event.pointerId);
      }
      horizontalDrag.current = null;
      activeStage.dataset.horizontalDragState = "idle";
    }

    stageNode.addEventListener("pointerdown", handlePointerDown, true);
    stageNode.addEventListener("pointermove", handlePointerMove, {
      capture: true,
      passive: false,
    });
    stageNode.addEventListener("pointerup", finishPointerDrag, true);
    stageNode.addEventListener("pointercancel", finishPointerDrag, true);
    return () => {
      delete activeStage.dataset.horizontalDragReady;
      delete activeStage.dataset.horizontalDragState;
      stageNode.removeEventListener("pointerdown", handlePointerDown, true);
      stageNode.removeEventListener("pointermove", handlePointerMove, true);
      stageNode.removeEventListener("pointerup", finishPointerDrag, true);
      stageNode.removeEventListener("pointercancel", finishPointerDrag, true);
    };
  }, [isRtl]);

  function goTo(index: number) {
    const nextIndex = Math.max(0, Math.min(itemCount - 1, index));
    const progress = nextIndex / Math.max(itemCount - 1, 1);
    const viewportNode = viewport.current;

    if (viewportNode) {
      const maximum = Math.max(
        viewportNode.scrollWidth - viewportNode.clientWidth,
        0,
      );
      scrollToLogicalLeft(viewportNode, progress * maximum);
    }
    setActiveIndex(nextIndex);
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
      goTo(activeIndex + 1);
    }
    if (isPreviousKey) {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(itemCount - 1);
    }
  }

  function handleNativeScroll(event: UIEvent<HTMLDivElement>) {
    const maximum = Math.max(
      event.currentTarget.scrollWidth - event.currentTarget.clientWidth,
      0,
    );
    if (maximum <= 0) return;
    const progress = getLogicalScrollLeft(event.currentTarget, isRtl) / maximum;
    const index = Math.min(
      itemCount - 1,
      Math.round(progress * (itemCount - 1)),
    );
    setActiveIndex((current) => (current === index ? current : index));
  }

  return (
    <div
      className={styles.root}
      data-motion="native"
      data-direction={isRtl ? "rtl" : "ltr"}
      data-active-index={activeIndex}
    >
      <div
        ref={stage}
        className={cn(styles.stage, artwork.stage)}
        role="region"
        aria-label={t("regionLabel")}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClick.current = false;
        }}
        data-depth-plane
      >
        <header className={styles.chrome}>
          <div>
            <span className={styles.chromeLabel}>{t("chromeTitle")}</span>
            <p className={styles.chromeDescription}>{t("chromeDescription")}</p>
          </div>
          <div className={styles.controls}>
            <Button
              className={styles.controlButton}
              size="icon"
              variant="outline"
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label={t("previous")}
            >
              <PreviousIcon aria-hidden="true" size={17} />
            </Button>
            <p className={styles.counter} aria-live="polite">
              <span className={styles.activeCount}>
                <bdi>{formatIndex(activeIndex + 1)}</bdi>
              </span>
              <i className={styles.counterRule} aria-hidden="true" />
              <span>
                <bdi>{formatIndex(itemCount)}</bdi>
              </span>
            </p>
            <Button
              className={styles.controlButton}
              size="icon"
              variant="outline"
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === itemCount - 1}
              aria-label={t("next")}
            >
              <NextIcon aria-hidden="true" size={17} />
            </Button>
          </div>
        </header>

        <div
          ref={viewport}
          className={cn(styles.viewport, artwork.viewport)}
          tabIndex={0}
          aria-label={t("scrollableLabel")}
          onScroll={handleNativeScroll}
        >
          <ol className={styles.track}>
            {groups.map((group, index) => (
              <li key={group.id} className={styles.item}>
                <article className={cn(styles.card, artwork.card)}>
                  <div className={styles.node} aria-hidden="true">
                    <span>
                      <bdi>{formatIndex(index + 1)}</bdi>
                    </span>
                  </div>
                  <div className="capability-timeline__copy">
                    <span className={styles.copyLabel}>{group.label}</span>
                    <h3 className={styles.copyTitle}>{group.title}</h3>
                    <p className={styles.copyDescription}>
                      {group.description}
                    </p>
                  </div>
                  <ul className={styles.skills}>
                    {group.skills.map((skill) => (
                      <li className={styles.skill} key={skill}>
                        <bdi>{skill}</bdi>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}

            <li className={styles.item}>
              <aside className={cn(styles.education, artwork.education)}>
                <div className={styles.educationSignal} aria-hidden="true">
                  <span className={cn(styles.signalCore, artwork.signalCore)} />
                  <span className={styles.signalMiddle} />
                  <span className={styles.signalOuter} />
                </div>
                <div>
                  <span className={styles.educationLabel}>
                    {t("educationTitle")}
                  </span>
                  <h3 className={styles.educationTitle}>{education.title}</h3>
                  <p className={styles.educationInstitution}>
                    {education.institution}
                  </p>
                </div>
                <div className={styles.educationDetails}>
                  <p className={styles.educationNote}>{education.note}</p>
                  <ul
                    className={styles.languages}
                    aria-label={t("languagesLabel")}
                  >
                    {education.languages.map((language) => (
                      <li className={styles.language} key={language}>
                        {language}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </li>
          </ol>
        </div>

        <nav className={styles.steps} aria-label={t("stepsLabel")}>
          {Array.from({ length: itemCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={
                index === itemCount - 1
                  ? t("showEducation")
                  : t("showGroup", { number: formatIndex(index + 1) })
              }
              aria-current={index === activeIndex ? "step" : undefined}
              onClick={() => goTo(index)}
            >
              <span />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
