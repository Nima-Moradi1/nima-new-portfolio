"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useRef, type MouseEvent, type PointerEvent } from "react";
import { LampFallback } from "@/components/theme/lamp-fallback";
import { useTheme } from "@/components/theme/theme-provider";
import { WebGLErrorBoundary } from "@/components/three/webgl-error-boundary";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

const LampScene = dynamic(
  () =>
    import("@/components/theme/lamp-scene").then((module) => module.LampScene),
  { ssr: false, loading: () => <LampFallback isDark /> },
);

export function ThemeLamp() {
  const { isDark, toggleTheme } = useTheme();
  const webGLSupported = useWebGLSupport();
  const reducedMotion = useReducedMotion() ?? false;
  const pullAmountRef = useRef(0);
  const pointerStart = useRef(0);
  const isDragging = useRef(false);
  const dragged = useRef(false);
  const suppressClick = useRef(false);

  function setPullVisual(
    button: HTMLButtonElement,
    amount: number,
    dragging: boolean,
  ) {
    pullAmountRef.current = amount;
    button.dataset.dragging = String(dragging);
    button.style.setProperty("--pull-offset", `${amount * 30}px`);
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    pointerStart.current = event.clientY;
    isDragging.current = true;
    dragged.current = false;
    suppressClick.current = false;
    setPullVisual(event.currentTarget, 0, true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!isDragging.current) return;
    const distance = Math.max(0, event.clientY - pointerStart.current);
    const nextPullAmount = Math.min(distance / 48, 1);
    if (distance >= 5) dragged.current = true;
    setPullVisual(event.currentTarget, nextPullAmount, true);
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    const finalDistance = Math.max(0, event.clientY - pointerStart.current);
    const shouldToggle =
      Math.max(pullAmountRef.current, finalDistance / 48) >= 0.35;
    const wasDragged = dragged.current || finalDistance >= 5;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDragging.current = false;
    setPullVisual(event.currentTarget, 0, false);
    suppressClick.current = wasDragged;

    if (shouldToggle) toggleTheme();
  }

  function handlePointerCancel(event: PointerEvent<HTMLButtonElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDragging.current = false;
    setPullVisual(event.currentTarget, 0, false);
    pullAmountRef.current = 0;
    suppressClick.current = false;
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (suppressClick.current && event.detail !== 0) {
      suppressClick.current = false;
      return;
    }
    toggleTheme();
  }

  const actionLabel = isDark
    ? "Turn the reading lamp off and switch to light mode"
    : "Turn the reading lamp on and switch to dark mode";

  return (
    <aside className="theme-lamp" data-lit={isDark} aria-label="Theme lamp">
      <div className="theme-lamp__scene" aria-hidden="true">
        <WebGLErrorBoundary fallback={<LampFallback isDark={isDark} />}>
          {webGLSupported === false || webGLSupported === null ? (
            <LampFallback isDark={isDark} />
          ) : (
            <LampScene isDark={isDark} reducedMotion={reducedMotion} />
          )}
        </WebGLErrorBoundary>
      </div>
      <div className="theme-lamp__caption" aria-hidden="true">
        <span>{isDark ? "Lamp on" : "Lamp off"}</span>
        <small>Pull chain · {isDark ? "Dark room" : "Daylight"}</small>
      </div>
      <button
        className="theme-lamp__pull"
        type="button"
        aria-label={actionLabel}
        aria-pressed={isDark}
        title={`${actionLabel}. Drag or click the chain.`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={handleClick}
      >
        <span aria-hidden="true" />
      </button>
    </aside>
  );
}
