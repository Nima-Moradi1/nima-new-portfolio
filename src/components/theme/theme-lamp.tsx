"use client";

import { useRef, type MouseEvent, type PointerEvent } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/cn";
import { themeLampClassNames as styles } from "./theme-lamp.class-names";
import artwork from "./theme-lamp.module.css";

export function ThemeLamp() {
  const t = useTranslations("Theme");
  const { isDark, toggleTheme } = useTheme();
  const pullAmountRef = useRef(0);
  const pointerStart = useRef(0);
  const isDragging = useRef(false);

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
    if (event.button !== 0) return;
    pointerStart.current = event.clientY;
    isDragging.current = true;
    setPullVisual(event.currentTarget, 0, true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!isDragging.current) return;
    const distance = Math.max(0, event.clientY - pointerStart.current);
    const nextPullAmount = Math.min(distance / 42, 1);
    setPullVisual(event.currentTarget, nextPullAmount, true);
  }

  function handlePointerUp(event: PointerEvent<HTMLButtonElement>) {
    if (!isDragging.current) return;
    const finalDistance = Math.max(0, event.clientY - pointerStart.current);
    const shouldToggle =
      Math.max(pullAmountRef.current, finalDistance / 42) >= 0.42;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDragging.current = false;
    setPullVisual(event.currentTarget, 0, false);

    if (shouldToggle) toggleTheme();
  }

  function handlePointerCancel(event: PointerEvent<HTMLButtonElement>) {
    if (!isDragging.current) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDragging.current = false;
    setPullVisual(event.currentTarget, 0, false);
    pullAmountRef.current = 0;
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // Pointer users pull the cord. Keyboard activation remains an accessible
    // equivalent for people who cannot perform a drag gesture.
    if (event.detail === 0) toggleTheme();
  }

  const actionLabel = isDark ? t("toLight") : t("toDark");

  return (
    <div className={styles.root} data-lit={isDark}>
      <div className={cn(styles.fixture, artwork.fixture)} aria-hidden="true">
        <span className={cn(styles.glow, artwork.glow)} />
        <span className={cn(styles.shade, artwork.shade)} />
        <span className={cn(styles.bulb, artwork.bulb)} />
      </div>
      <button
        className={styles.pull}
        type="button"
        aria-label={actionLabel}
        aria-pressed={isDark}
        title={t("instruction", { action: actionLabel })}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={handleClick}
      >
        <span
          className={cn(styles.pendulum, artwork.pendulum)}
          aria-hidden="true"
        >
          <span className={cn(styles.cord, artwork.cord)} />
          <span className={cn(styles.handle, artwork.handle)} />
        </span>
      </button>
    </div>
  );
}
