import { act, cleanup, renderHook } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BOOT_DEADLINE_MS, BootLoader, useBootReadiness } from "@/components/kinetic/boot-loader";

const originalFonts = Object.getOwnPropertyDescriptor(document, "fonts");

function pendingFonts() {
  let settle!: () => void;
  const ready = new Promise<void>(resolve => { settle = resolve; });
  Object.defineProperty(document, "fonts", { configurable: true, value: { ready } });
  return settle;
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  if (originalFonts) Object.defineProperty(document, "fonts", originalFonts);
  else Reflect.deleteProperty(document, "fonts");
});

describe("kinetic boot readiness", () => {
  it("includes the branded gate in server HTML without an entry button", () => {
    const html = renderToStaticMarkup(<BootLoader visible name="Nima Moradirad" status="Preparing the scene" />);
    expect(html).toContain("data-nm-boot-loader");
    expect(html).toContain("Preparing the scene");
    expect(html).not.toContain("<button");
    expect(html).toContain("<noscript>");
    expect(renderToStaticMarkup(<BootLoader visible={false} name="Nima" status="Ready" />)).toBe("");
  });

  it("keeps the sculpture placeholder until fonts and the first scene frame are ready", async () => {
    const settleFonts = pendingFonts();
    const onTimeout = vi.fn();
    const { result, rerender } = renderHook(({ sceneReady }) => useBootReadiness({ sceneReady, staticEdition: false, onTimeout }), { initialProps: { sceneReady: false } });
    expect(result.current).toBe(false);
    await act(async () => { settleFonts(); });
    expect(result.current).toBe(false);
    rerender({ sceneReady: true });
    expect(result.current).toBe(true);
    expect(onTimeout).not.toHaveBeenCalled();
  });

  it("does not impose a delay once the real scene and fonts are ready", async () => {
    vi.useFakeTimers();
    const settleFonts = pendingFonts();
    const onTimeout = vi.fn();
    const { result } = renderHook(() => useBootReadiness({ sceneReady: true, staticEdition: false, onTimeout }));
    await act(async () => { settleFonts(); });
    expect(result.current).toBe(true);
    act(() => { vi.advanceTimersByTime(BOOT_DEADLINE_MS); });
    expect(onTimeout).not.toHaveBeenCalled();
  });

  it("automatically exposes usable fallback if scene or fonts never settle", () => {
    vi.useFakeTimers();
    pendingFonts();
    const onTimeout = vi.fn();
    const { result } = renderHook(() => useBootReadiness({ sceneReady: false, staticEdition: false, onTimeout }));
    act(() => { vi.advanceTimersByTime(BOOT_DEADLINE_MS - 1); });
    expect(result.current).toBe(false);
    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe(true);
    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  it("releases the reading edition without requiring a WebGL frame", async () => {
    const settleFonts = pendingFonts();
    const { result } = renderHook(() => useBootReadiness({ sceneReady: false, staticEdition: true, onTimeout: vi.fn() }));
    await act(async () => { settleFonts(); });
    expect(result.current).toBe(true);
  });
});
