import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "@/components/theme/theme-provider";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";

function ThemeControl() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = "dark";
    window.localStorage.clear();
    document.head.innerHTML = '<meta name="theme-color" content="#05070b"><link rel="icon" href="/brand/nm-favicon.svg">';
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); Reflect.deleteProperty(document, "startViewTransition"); });

  it("synchronizes the selected theme with the document and storage", () => {
    render(
      <ThemeProvider>
        <ThemeControl />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "dark" }));

    expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem("nima-portfolio-theme")).toBe("light");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute("content", "#edf2f3");
    expect(document.querySelector('link[rel="icon"]')).toHaveAttribute("href", "/brand/nm-favicon-light.svg");
  });

  it("hydrates the pre-paint persisted selection without resetting it", () => {
    document.documentElement.dataset.theme = "light";
    window.localStorage.setItem("nima-portfolio-theme", "light");
    render(<ThemeProvider><ThemeControl /></ThemeProvider>);
    expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("preserves the light document while hydrating dark server markup", async () => {
    const app = <ThemeProvider><ThemeControl /></ThemeProvider>;
    const container = document.createElement("div");
    container.innerHTML = renderToString(app);
    document.body.append(container);
    document.documentElement.dataset.theme = "light";
    const recover = vi.fn();
    let root!: ReturnType<typeof hydrateRoot>;
    await act(async () => { root = hydrateRoot(container, app, { onRecoverableError: recover }); });
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(container.textContent).toBe("light");
    expect(recover).not.toHaveBeenCalled();
    await act(async () => { root.unmount(); });
    container.remove();
  });

  it("honors rapid repeated intents even before React renders again", () => {
    function RapidControl() {
      const { toggleTheme } = useTheme();
      return <button onClick={() => { toggleTheme(); toggleTheme(); }}>rapid</button>;
    }
    render(<ThemeProvider><RapidControl /></ThemeProvider>);
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("nima-portfolio-theme")).toBe("dark");
  });

  it("syncs another tab without writing its storage event back", () => {
    render(<ThemeProvider><ThemeControl /></ThemeProvider>);
    const write = vi.spyOn(Storage.prototype, "setItem");
    act(() => { window.dispatchEvent(new StorageEvent("storage", { key: "nima-portfolio-theme", newValue: "light" })); });
    expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();
    expect(write).not.toHaveBeenCalled();
  });

  it("still switches when browser storage is denied", () => {
    render(<ThemeProvider><ThemeControl /></ThemeProvider>);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage disabled"); });
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();
  });

  it("cancels stale native snapshot callbacks on rapid switches", async () => {
    const callbacks: (() => Promise<void>)[] = [];
    const finish: (() => void)[] = [];
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: (callback: () => Promise<void>) => {
      callbacks.push(callback);
      return { ready: Promise.resolve(), finished: new Promise<void>(resolve => finish.push(resolve)), skipTransition: vi.fn() };
    } });
    render(<ThemeProvider><ThemeControl /></ThemeProvider>);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    await act(async () => { await callbacks[0](); await callbacks[1](); finish.forEach(resolve => resolve()); });
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("nima-portfolio-theme")).toBe("dark");
    expect(document.documentElement).not.toHaveAttribute("data-theme-reveal");
  });
});
