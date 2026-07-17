"use client";

import { useEffect, useState, type ReactNode } from "react";

const CACHE_KEY = "nima-portfolio-ready-v5";
const MINIMUM_DISPLAY_MS = 1100;

type LandingPreloaderProps = {
  children: ReactNode;
};

type BootState = "loading" | "exiting" | "ready";

function preloadImage(source: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = source;
  });
}

function waitForWindowLoad() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForLandingCanvas() {
  return new Promise<void>((resolve) => {
    const compact = window.matchMedia(
      "(max-width: 54rem), (pointer: coarse)",
    ).matches;
    const expectedCanvasCount = compact ? 1 : 2;
    const timeoutAt = performance.now() + 1800;

    function inspect() {
      const canvasCount = document.querySelectorAll(
        ".hero-studio canvas, .experience-book canvas",
      ).length;
      if (canvasCount >= expectedCanvasCount || performance.now() > timeoutAt) {
        window.requestAnimationFrame(() =>
          window.requestAnimationFrame(() => resolve()),
        );
        return;
      }
      window.requestAnimationFrame(inspect);
    }

    inspect();
  });
}

export function LandingPreloader({ children }: LandingPreloaderProps) {
  const [bootState, setBootState] = useState<BootState>("loading");
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(CACHE_KEY) === "ready") {
        document.documentElement.dataset.portfolioCached = "true";
        const readyTimer = window.setTimeout(() => {
          setProgress(100);
          setBootState("ready");
        }, 0);
        return () => window.clearTimeout(readyTimer);
      }
    } catch {
      // A private browsing policy may disable storage; loading still completes.
    }

    let active = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    async function prepareLanding() {
      const compact = window.matchMedia(
        "(max-width: 54rem), (pointer: coarse)",
      ).matches;
      const tasks: Promise<unknown>[] = [
        waitForWindowLoad(),
        document.fonts.ready,
        Promise.all([
          preloadImage("/assets/nima-moradirad.jpg"),
          preloadImage("/assets/nima-moradirad-resume-preview.webp"),
        ]),
        import("@/components/three/desk-scene"),
        waitForLandingCanvas(),
      ];

      if (!compact) {
        tasks.push(import("@/components/experience/experience-book-scene"));
      }

      let completed = 0;
      const trackedTasks = tasks.map((task) =>
        task.finally(() => {
          completed += 1;
          if (active) {
            setProgress(Math.round(8 + (completed / tasks.length) * 88));
          }
        }),
      );
      const minimumDisplay = new Promise<void>((resolve) => {
        window.setTimeout(resolve, MINIMUM_DISPLAY_MS);
      });

      await Promise.all([Promise.allSettled(trackedTasks), minimumDisplay]);
      if (!active) return;

      setProgress(100);
      try {
        window.localStorage.setItem(CACHE_KEY, "ready");
        document.documentElement.dataset.portfolioCached = "true";
      } catch {
        // The transition can finish without persistence.
      }
      setBootState("exiting");
      window.setTimeout(() => {
        if (active) setBootState("ready");
      }, 560);
    }

    void prepareLanding();

    return () => {
      active = false;
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (bootState === "ready") document.body.style.overflow = "";
  }, [bootState]);

  return (
    <div className="landing-shell" data-boot-state={bootState}>
      {bootState !== "ready" ? (
        <div
          className="landing-preloader"
          role="status"
          aria-live="polite"
          aria-label={`Preparing portfolio: ${progress}%`}
        >
          <div className="landing-preloader__field" aria-hidden="true">
            <span />
            <span />
            <span />
            <i />
          </div>
          <div className="landing-preloader__copy">
            <p>Signal atelier · Initializing</p>
            <h1>Building the first frame.</h1>
            <div className="landing-preloader__meter" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="landing-preloader__status">
              <span>{String(progress).padStart(3, "0")}%</span>
              <span>
                {progress < 42
                  ? "Loading assets"
                  : progress < 88
                    ? "Warming the studio"
                    : "Rendering the room"}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className="landing-content"
        aria-hidden={bootState === "loading" ? true : undefined}
      >
        {children}
      </div>
    </div>
  );
}
