export type PortfolioMode = "projects" | "experience";
export type ScenePhase = "hero" | "assembly" | "carousel" | "proof" | "faq" | "contact";
export type KineticSceneState = {
  mode: PortfolioMode; phase: ScenePhase; progress: number; chapterProgress: number;
  itemProgress: number; activeIndex: number; proofIndex: number; proofProgress: number;
  count: number; pointerX: number; pointerY: number; reducedMotion: boolean;
  isRtl: boolean; visible: boolean; modeRevision: number; ready: boolean;
  detailIndex: number; detailProgress: number;
  proofEntrance: number; proofExit: number;
};
export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const smoothstep = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
export const PROJECT_ACCENTS = ["#c7d6b5", "#b5e0eb", "#c6bbef", "#aac5b4", "#b9d9ee", "#e3bfaa", "#c7c9ee"] as const;
export const EXPERIENCE_ACCENTS = ["#badce6", "#c8bde4", "#d8c7af", "#b7cdc4"] as const;
export function createSceneState(mode: PortfolioMode, count: number, isRtl: boolean): KineticSceneState {
  return { mode, phase: "hero", progress: 0, chapterProgress: 0, itemProgress: 0, activeIndex: 0, proofIndex: 0, proofProgress: 0, count, pointerX: 0, pointerY: 0, reducedMotion: false, isRtl, visible: true, modeRevision: 0, ready: false, detailIndex: -1, detailProgress: 0, proofEntrance: 0, proofExit: 0 };
}
/** Native scroll distance reserved for opening, reading and returning a project. */
export const DETAIL_VIEWPORTS = 2.8;
export const itemPosition = (index: number, count: number) => .105 + .895 * index / Math.max(1, count - 1);
/** Copy is withheld until the physical assembly has become the carousel. */
export function carouselCopyOpacity(phase: ScenePhase, itemProgress: number, index: number, opening = 0) {
  return phase === "carousel" ? clamp(1 - Math.abs(itemProgress - index) * 2.5) * (1 - opening) : 0;
}
/** One reversible sunlight schedule shared by the solar scene and semantic copy. */
export function proofIllumination(progress: number) {
  const end = 1 - smoothstep((progress - .9) / .1);
  return {
    orbit: smoothstep(progress / .26),
    beam: smoothstep((progress - .16) / .2) * end,
    copy: smoothstep((progress - .25) / .16) * end,
  };
}
export function proofFrame(progress: number) {
  const position = clamp(progress) * 3.999;
  const index = Math.floor(position);
  // Sticky chapters include a final viewport tail. Keep the last statement
  // illuminated throughout that hold instead of ending on an empty stage.
  return { index, progress: index === 3 ? Math.min(position - index, .82) : position - index };
}
/** Physical scroll windows overlap both scenes; phase labels never cut a mesh. */
export function proofSceneBlend(entrance: number, exit: number) {
  const entered = smoothstep(entrance);
  return { rack: 1 - entered, solar: entered * (1 - smoothstep(exit)) };
}
export function notifyScene() { window.dispatchEvent(new Event("nm:scene-update")); }
