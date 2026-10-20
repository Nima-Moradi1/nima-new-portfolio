export type PortfolioMode = "projects" | "experience";
export type ScenePhase = "hero" | "assembly" | "carousel" | "proof" | "statement" | "recap" | "faq" | "contact";
export type KineticSceneState = {
  mode: PortfolioMode; phase: ScenePhase; progress: number; chapterProgress: number;
  itemProgress: number; activeIndex: number; proofIndex: number; proofProgress: number;
  count: number; pointerX: number; pointerY: number; reducedMotion: boolean;
  isRtl: boolean; visible: boolean; modeRevision: number; ready: boolean;
  detailIndex: number; detailProgress: number;
};
export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const smoothstep = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
export const PROJECT_ACCENTS = ["#c7d6b5", "#b5e0eb", "#c6bbef", "#aac5b4", "#b9d9ee", "#e3bfaa", "#c7c9ee"] as const;
export const EXPERIENCE_ACCENTS = ["#badce6", "#c8bde4", "#d8c7af", "#b7cdc4"] as const;
export function createSceneState(mode: PortfolioMode, count: number, isRtl: boolean): KineticSceneState {
  return { mode, phase: "hero", progress: 0, chapterProgress: 0, itemProgress: 0, activeIndex: 0, proofIndex: 0, proofProgress: 0, count, pointerX: 0, pointerY: 0, reducedMotion: false, isRtl, visible: true, modeRevision: 0, ready: false, detailIndex: -1, detailProgress: 0 };
}
/** Native scroll distance reserved for opening, reading and returning a project. */
export const DETAIL_VIEWPORTS = 2.8;
export const itemPosition = (index: number, count: number) => .105 + .895 * index / Math.max(1, count - 1);
export function notifyScene() { window.dispatchEvent(new Event("nm:scene-update")); }
