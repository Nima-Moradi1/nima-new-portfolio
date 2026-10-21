"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "nima-portfolio-theme";
export const THEME_EVENT = "nima-theme-change";
const ThemeContext = createContext<ThemeContextValue | null>(null);
let activeTransition: ViewTransition | undefined;
let intendedTheme: Theme | undefined;
let themeRevision = 0;

function subscribe(callback: () => void) {
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    themeRevision++;
    intendedTheme = undefined;
    activeTransition?.skipTransition();
    applyTheme(event.newValue === "light" ? "light" : "dark", false);
  };
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", syncStorage);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function reflectTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#edf2f3" : "#05070b");
  document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]').forEach(link => {
    link.href = theme === "light" ? "/brand/nm-favicon-light.svg" : "/brand/nm-favicon.svg";
  });
}

function applyTheme(theme: Theme, persist = true) {
  reflectTheme(theme);
  try {
    if (persist) window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // The theme still works when storage is unavailable or disabled.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

function transitionTheme(theme: Theme) {
  const revision = ++themeRevision;
  intendedTheme = theme;
  activeTransition?.skipTransition();
  if (!document.startViewTransition || document.hidden || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    intendedTheme = undefined;
    applyTheme(theme);
    return;
  }
  const root = document.documentElement;
  root.dataset.themeReveal = "true";
  try {
    const transition = document.startViewTransition(() => {
      if (revision !== themeRevision) return;
      // View transitions suppress rendering during this callback. Waiting for
      // RAF here would stall capture. React and the existing scene owner commit
      // the target palette synchronously before the browser takes its snapshot.
      flushSync(() => applyTheme(theme));
    });
    activeTransition = transition;
    void transition.ready.catch(() => {});
    void transition.finished.catch(() => {}).finally(() => {
      if (activeTransition !== transition) return;
      activeTransition = undefined;
      intendedTheme = undefined;
      delete root.dataset.themeReveal;
    });
  } catch {
    activeTransition = undefined;
    intendedTheme = undefined;
    delete root.dataset.themeReveal;
    applyTheme(theme);
  }
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const setTheme = useCallback((nextTheme: Theme) => {
    transitionTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    transitionTheme((intendedTheme ?? getThemeSnapshot()) === "dark" ? "light" : "dark");
  }, []);

  // Hydration initially renders the server's dark snapshot. Read the document
  // here so that effect cannot overwrite the pre-paint persisted light theme.
  useEffect(() => { reflectTheme(getThemeSnapshot()); }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
