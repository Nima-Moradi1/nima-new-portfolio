"use client";
/* eslint-disable react-hooks/immutability -- This imperative controller owns DOM styles and the shared mutable R3F scene ref; neither is React render state. */
import { useEffect, type RefObject } from "react";
import { clamp, DETAIL_VIEWPORTS, itemPosition, notifyScene, type KineticSceneState, type ScenePhase } from "@/lib/kinetic-model";

type Options = { root: RefObject<HTMLDivElement | null>; scene: RefObject<KineticSceneState>; count: number; detailIndex: number; enabled: boolean; onDetail: (visible: boolean) => void; onSelection: (index: number) => void; onPhase: (phase: ScenePhase) => void };

/** One passive native-scroll controller; only settled selection changes enter React state. */
export function useScrollDirector({ root, scene, count, detailIndex, enabled, onDetail, onSelection, onPhase }: Options) {
  useEffect(() => {
    const node = root.current;
    if (!node || !enabled) return;
    let bounds: { id: string; top: number; height: number }[] = [];
    let frame = 0;
    let disposed = false;
    let lastIndex = -1;
    let lastPhase: ScenePhase | null = null;
    let lastDetail = false;
    const measure = () => {
      bounds = ["top", "work", "proof", "statement", "recap", "faq", "contact"].flatMap(id => {
        const element = node.querySelector<HTMLElement>(`[data-chapter="${id}"]`);
        if (!element) return [];
        const rect = element.getBoundingClientRect();
        return [{ id, top: rect.top + window.scrollY, height: rect.height }];
      });
    };
    const update = () => {
      frame = 0;
      if (disposed) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const s = scene.current;
      s.progress = clamp(y / Math.max(1, document.documentElement.scrollHeight - vh));
      node.style.setProperty("--story-progress", String(s.progress));
      let phase: ScenePhase = "hero";
      let p = 0;
      s.detailProgress = 0;
      for (const b of bounds) {
        if (y + vh * .28 < b.top) break;
        let distance = y - b.top;
        let range = Math.max(1, b.height - vh);
        if (b.id === "work" && detailIndex >= 0) {
          const span = vh * DETAIL_VIEWPORTS;
          range = Math.max(1, range - span);
          const start = itemPosition(detailIndex, count) * range;
          s.detailProgress = clamp((distance - start) / span);
          distance -= clamp(distance - start, 0, span);
        }
        p = clamp(distance / range);
        if (b.id === "top") phase = "hero";
        else if (b.id === "work") { phase = p < .105 ? "assembly" : "carousel"; s.itemProgress = clamp((p - .105) / .895) * (count - 1); }
        else phase = b.id as ScenePhase;
      }
      s.phase = phase; s.chapterProgress = phase === "assembly" ? clamp(p / .105) : p;
      const detailProgress = phase === "carousel" ? s.detailProgress : 0;
      const opening = clamp(Math.min(detailProgress / .18, (1 - detailProgress) / .18));
      const detailVisible = detailIndex >= 0 && detailProgress > .18 && detailProgress < .82 && phase === "carousel";
      node.dataset.detail = String(opening > .01 && detailIndex >= 0);
      node.style.setProperty("--detail-open", String(detailIndex >= 0 ? opening : 0));
      node.style.setProperty("--detail-read", String(clamp((detailProgress - .32) / .25)));
      if (lastDetail !== detailVisible) { lastDetail = detailVisible; onDetail(detailVisible); }
      s.activeIndex = Math.min(count - 1, Math.round(s.itemProgress));
      if (phase === "proof") { const proof = p * 3.999; s.proofIndex = Math.floor(proof); s.proofProgress = proof - s.proofIndex; }
      node.querySelectorAll<HTMLElement>("[data-track-copy]").forEach((article, index) => {
        const active = index === s.activeIndex && opening < .05;
        article.style.setProperty("--copy-opacity", String(clamp(1 - Math.abs(s.itemProgress - index) * 2.5) * (1 - opening)));
        article.style.setProperty("--copy-shift", `${(index - s.itemProgress) * 32}px`);
        article.dataset.active = String(active); article.inert = !active;
      });
      node.querySelectorAll<HTMLElement>("[data-proof-copy]").forEach((article, index) => { const active = index === s.proofIndex; article.dataset.active = String(active); article.inert = !active; });
      node.querySelectorAll<HTMLElement>("[data-proof-index]").forEach((link, index) => {
        if (index === s.proofIndex) link.setAttribute("aria-current", "step");
        else link.removeAttribute("aria-current");
      });
      if (lastIndex !== s.activeIndex) { lastIndex = s.activeIndex; onSelection(lastIndex); }
      if (lastPhase !== phase) { lastPhase = phase; node.dataset.phase = phase; onPhase(phase); }
      notifyScene();
    };
    const schedule = () => { if (!frame && !disposed) frame = requestAnimationFrame(update); };
    const resize = () => { if (!disposed) { measure(); schedule(); } };
    const resizeViewport = () => {
      if (disposed) return;
      const model = scene.current;
      const chapter = model.phase === "assembly" || model.phase === "carousel" ? "work" : model.phase;
      // Preserve the selected narrative position across orientation/viewport changes.
      const progress = model.phase === "assembly" ? model.chapterProgress * .105 : model.chapterProgress;
      measure();
      const next = bounds.find(bound => bound.id === chapter);
      if (next && (chapter === "work" || chapter === "proof")) {
        const position = model.phase === "carousel"
          ? .105 + .895 * model.itemProgress / Math.max(1, count - 1)
          : progress;
        const span = chapter === "work" && detailIndex >= 0 ? window.innerHeight * DETAIL_VIEWPORTS : 0;
        const range = Math.max(1, next.height - window.innerHeight - span);
        const detailStart = itemPosition(detailIndex, count) * range;
        const detailOffset = span && position * range >= detailStart - 1 ? span * model.detailProgress : 0;
        window.scrollTo({ top: next.top + position * range + detailOffset, behavior: "instant" });
      }
      schedule();
    };
    const visibility = () => { scene.current.visible = !document.hidden; notifyScene(); };
    measure(); update();
    const observer = new ResizeObserver(resize); observer.observe(node);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resizeViewport, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    document.fonts?.ready.then(resize);
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", resizeViewport); document.removeEventListener("visibilitychange", visibility);
      node.querySelectorAll<HTMLElement>("[data-track-copy], [data-proof-copy]").forEach(article => {
        article.inert = false;
        article.style.removeProperty("--copy-opacity"); article.style.removeProperty("--copy-shift");
      });
    };
  }, [root, scene, count, detailIndex, enabled, onDetail, onSelection, onPhase]);
}
