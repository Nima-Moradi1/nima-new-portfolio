import type { Theme } from "@/components/theme/theme-provider";

export const THEME_TRANSITION_SECONDS = 1;
export const KINETIC_THEMES = {
  dark: { background: "#05070b", shell: "#727f8d", smoke: "#111923", edge: "#b8c4ce", ice: "#8be9f4", ground: "#11151d" },
  light: { background: "#edf2f3", shell: "#8babb5", smoke: "#abc2cc", edge: "#e0ebef", ice: "#086b78", ground: "#b0c3ca" },
} satisfies Record<Theme, Record<string, string>>;

/** Finite, reversible envelope; a new intent starts from the rendered value. */
export function themeProgress(elapsed: number) {
  const t = Math.max(0, Math.min(1, elapsed / THEME_TRANSITION_SECONDS));
  return t * t * (3 - 2 * t);
}
