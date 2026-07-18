"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useFormatter, useTranslations } from "next-intl";
import {
  LandingReadinessContext,
  type LandingHeroReadiness,
} from "@/components/loading/landing-readiness";
import { usePortfolio } from "@/content/use-portfolio";

const MINIMUM_DISPLAY_MS = 1100;
const MAXIMUM_PREPARATION_MS = 15_000;

type LandingPreloaderProps = {
  children: ReactNode;
};

type BootState = "loading" | "exiting" | "ready";

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
};

function createDeferred<T>(): Deferred<T> {
  let resolvePromise: ((value: T) => void) | undefined;
  const promise = new Promise<T>((resolve) => {
    resolvePromise = resolve;
  });

  return {
    promise,
    resolve: (value) => resolvePromise?.(value),
  };
}

function preloadImage(source: string, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      image.onload = null;
      image.onerror = null;
      signal.removeEventListener("abort", finish);
      resolve();
    };

    image.onload = () => {
      if (typeof image.decode === "function") {
        void image.decode().then(finish, finish);
      } else {
        finish();
      }
    };
    image.onerror = finish;
    signal.addEventListener("abort", finish, { once: true });
    image.src = source;

    if (image.complete) image.onload?.(new Event("load"));
  });
}

function waitForWindowLoad(signal: AbortSignal) {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise<void>((resolve) => {
    const finish = () => {
      window.removeEventListener("load", finish);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    window.addEventListener("load", finish, { once: true });
    signal.addEventListener("abort", finish, { once: true });
  });
}

function waitForFonts() {
  if (!("fonts" in document)) return Promise.resolve();
  return document.fonts.ready.then(
    () => undefined,
    () => undefined,
  );
}

function afterNextPaint(signal: AbortSignal) {
  if (signal.aborted) return Promise.resolve();
  return new Promise<void>((resolve) => {
    let firstFrame = 0;
    let secondFrame = 0;
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      if (firstFrame) window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      signal.removeEventListener("abort", finish);
      resolve();
    };

    signal.addEventListener("abort", finish, { once: true });
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(finish);
    });
  });
}

function waitForLocalizedContent(content: HTMLElement, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const observer = new MutationObserver(check);

    function finish() {
      if (settled) return;
      settled = true;
      observer.disconnect();
      signal.removeEventListener("abort", finish);
      void afterNextPaint(signal).then(resolve);
    }

    function check() {
      const criticalCopy = content.querySelector<HTMLElement>(
        "[data-landing-critical-copy]",
      );
      if (criticalCopy?.textContent?.trim()) finish();
    }

    signal.addEventListener("abort", finish, { once: true });
    observer.observe(content, { childList: true, subtree: true });
    check();
  });
}

function waitForMountedContent() {
  return new Promise<void>(() => {
    // The failure-only deadline owns recovery if the landing subtree is absent.
  });
}

export function LandingPreloader({ children }: LandingPreloaderProps) {
  const portfolio = usePortfolio();
  const t = useTranslations("Preloader");
  const format = useFormatter();
  const [bootState, setBootState] = useState<BootState>("loading");
  const [progress, setProgress] = useState(8);
  const [heroReadiness, setHeroReadiness] =
    useState<LandingHeroReadiness | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [heroReady] = useState(() => createDeferred<LandingHeroReadiness>());

  const reportHeroReady = useCallback(
    (readiness: LandingHeroReadiness) => {
      setHeroReadiness((current) => current ?? readiness);
      heroReady.resolve(readiness);
    },
    [heroReady],
  );
  const readinessContext = useMemo(
    () => ({ reportHeroReady }),
    [reportHeroReady],
  );

  useEffect(() => {
    let active = true;
    let released = false;
    let exitTimer = 0;
    let minimumTimer = 0;
    let deadlineTimer = 0;
    const abortController = new AbortController();
    const { signal } = abortController;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    async function prepareLanding() {
      const content = contentRef.current;
      const tasks: Promise<unknown>[] = [
        waitForWindowLoad(signal),
        waitForFonts(),
        Promise.all([
          preloadImage("/assets/nima-moradirad.jpg", signal),
          preloadImage(portfolio.identity.resumePreview, signal),
        ]),
        content
          ? waitForLocalizedContent(content, signal)
          : waitForMountedContent(),
        heroReady.promise,
      ];

      let completed = 0;
      const trackedTasks = tasks.map((task) =>
        task.finally(() => {
          completed += 1;
          if (active && !released) {
            setProgress(Math.round(8 + (completed / tasks.length) * 88));
          }
        }),
      );
      const minimumDisplay = new Promise<void>((resolve) => {
        minimumTimer = window.setTimeout(resolve, MINIMUM_DISPLAY_MS);
      });
      const hardDeadline = new Promise<void>((resolve) => {
        deadlineTimer = window.setTimeout(resolve, MAXIMUM_PREPARATION_MS);
      });

      await Promise.all([
        Promise.race([Promise.allSettled(trackedTasks), hardDeadline]),
        minimumDisplay,
      ]);
      if (!active) return;

      released = true;
      abortController.abort();
      window.clearTimeout(deadlineTimer);
      setProgress(100);
      setBootState("exiting");
      exitTimer = window.setTimeout(() => {
        if (!active) return;
        document.body.style.overflow = previousOverflow;
        setBootState("ready");
      }, 560);
    }

    void prepareLanding();

    return () => {
      active = false;
      released = true;
      abortController.abort();
      window.clearTimeout(exitTimer);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(deadlineTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [heroReady, portfolio.identity.resumePreview]);

  return (
    <LandingReadinessContext.Provider value={readinessContext}>
      <div
        className="landing-shell"
        data-boot-state={bootState}
        data-hero-readiness={heroReadiness ?? "pending"}
      >
        {bootState !== "ready" ? (
          <div
            className="landing-preloader"
            role="status"
            aria-live="polite"
            aria-label={t("ariaLabel", {
              progress: format.number(progress, { useGrouping: false }),
            })}
          >
            <div className="landing-preloader__field" aria-hidden="true">
              <span />
              <span />
              <span />
              <i />
            </div>
            <div className="landing-preloader__copy">
              <p>{t("eyebrow")}</p>
              <h1>{t("title")}</h1>
              <div className="landing-preloader__meter" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="landing-preloader__status">
                <span>
                  <bdi>
                    {format.number(progress, {
                      minimumIntegerDigits: 3,
                      useGrouping: false,
                    })}
                    %
                  </bdi>
                </span>
                <span>
                  {progress < 42
                    ? t("stages.assets")
                    : progress < 88
                      ? t("stages.studio")
                      : t("stages.room")}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div
          ref={contentRef}
          className="landing-content"
          aria-hidden={bootState === "loading" ? true : undefined}
        >
          {children}
        </div>
      </div>
    </LandingReadinessContext.Provider>
  );
}
