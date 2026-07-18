import { act, cleanup, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LandingPreloader } from "@/components/loading/landing-preloader";
import {
  type LandingHeroReadiness,
  useReportLandingHeroReady,
} from "@/components/loading/landing-readiness";
import { renderWithIntl } from "../helpers/render-with-intl";

const LEGACY_CACHE_KEY = "nima-portfolio-ready-v5";

class ReadyImage {
  complete = false;
  onerror: (() => void) | null = null;
  onload: (() => void) | null = null;

  decode() {
    return Promise.resolve();
  }

  set src(_source: string) {
    this.complete = true;
  }
}

function ReadinessProbe() {
  const reportHeroReady = useReportLandingHeroReady();

  const report = (readiness: LandingHeroReadiness) => {
    reportHeroReady(readiness);
  };

  return (
    <main>
      <div data-landing-critical-copy>Localized portfolio content</div>
      <button type="button" onClick={() => report("webgl-frame")}>
        Render WebGL frame
      </button>
      <button type="button" onClick={() => report("static-fallback")}>
        Render static fallback
      </button>
    </main>
  );
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("Image", ReadyImage);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(performance.now()), 16),
  );
  vi.stubGlobal("cancelAnimationFrame", (frame: number) =>
    window.clearTimeout(frame),
  );
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: { ready: Promise.resolve() },
  });
});

afterEach(() => {
  cleanup();
  window.localStorage.removeItem(LEGACY_CACHE_KEY);
  delete document.documentElement.dataset.portfolioCached;
  document.body.style.overflow = "";
  Reflect.deleteProperty(document, "fonts");
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("LandingPreloader", () => {
  it("waits for the first usable WebGL frame even after every other resource is ready", async () => {
    window.localStorage.setItem(LEGACY_CACHE_KEY, "ready");
    document.documentElement.dataset.portfolioCached = "true";

    renderWithIntl(
      <LandingPreloader>
        <ReadinessProbe />
      </LandingPreloader>,
    );

    const shell = screen
      .getByText("Localized portfolio content")
      .closest(".landing-shell");
    expect(shell).toHaveAttribute("data-boot-state", "loading");
    expect(shell).toHaveAttribute("data-hero-readiness", "pending");
    expect(screen.getByRole("status")).toBeVisible();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5_000);
    });
    expect(shell).toHaveAttribute("data-boot-state", "loading");

    await act(async () => {
      fireEvent.click(screen.getByText("Render WebGL frame"));
      await vi.advanceTimersByTimeAsync(32);
    });
    expect(shell).toHaveAttribute("data-hero-readiness", "webgl-frame");
    expect(shell).toHaveAttribute("data-boot-state", "exiting");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(560);
    });
    expect(shell).toHaveAttribute("data-boot-state", "ready");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("accepts a confirmed static fallback as a usable first hero frame", async () => {
    renderWithIntl(
      <LandingPreloader>
        <ReadinessProbe />
      </LandingPreloader>,
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Render static fallback"));
      await vi.advanceTimersByTimeAsync(1_100);
    });

    const shell = screen
      .getByText("Localized portfolio content")
      .closest(".landing-shell");
    expect(shell).toHaveAttribute("data-hero-readiness", "static-fallback");
    expect(shell).toHaveAttribute("data-boot-state", "exiting");
  });

  it("keeps localized content covered until its active fonts are ready", async () => {
    let resolveFonts: (() => void) | undefined;
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: {
        ready: new Promise<void>((resolve) => {
          resolveFonts = resolve;
        }),
      },
    });

    renderWithIntl(
      <LandingPreloader>
        <ReadinessProbe />
      </LandingPreloader>,
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Render static fallback"));
      await vi.advanceTimersByTimeAsync(5_000);
    });

    const shell = screen
      .getByText("Localized portfolio content")
      .closest(".landing-shell");
    expect(shell).toHaveAttribute("data-hero-readiness", "static-fallback");
    expect(shell).toHaveAttribute("data-boot-state", "loading");
    expect(screen.getByRole("status")).toBeVisible();

    await act(async () => {
      resolveFonts?.();
      await Promise.resolve();
    });
    expect(shell).toHaveAttribute("data-boot-state", "exiting");
  });

  it("uses the failure-only deadline when a critical dependency never settles", async () => {
    renderWithIntl(
      <LandingPreloader>
        <main>Portfolio content without a readiness signal</main>
      </LandingPreloader>,
    );

    const shell = screen
      .getByText("Portfolio content without a readiness signal")
      .closest(".landing-shell");
    expect(shell).toHaveAttribute("data-boot-state", "loading");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(14_999);
    });
    expect(shell).toHaveAttribute("data-boot-state", "loading");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    expect(shell).toHaveAttribute("data-boot-state", "exiting");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(560);
    });
    expect(shell).toHaveAttribute("data-boot-state", "ready");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(
      screen.getByText("Portfolio content without a readiness signal")
        .parentElement,
    ).not.toHaveAttribute("aria-hidden");
  });
});
