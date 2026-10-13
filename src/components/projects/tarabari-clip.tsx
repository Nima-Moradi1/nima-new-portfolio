"use client";

import { useEffect, useRef } from "react";
import styles from "./tarabari-showcase.module.css";

export function TarabariClip({ ariaLabel }: { ariaLabel: string }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = video.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !reducedMotion.matches) {
          void node.play().catch(() => undefined);
        } else {
          node.pause();
        }
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={video}
      className={styles.video}
      aria-label={ariaLabel}
      poster="/assets/projects/tarabari-nima/container-pickup.webp"
      controls
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source
        src="/assets/projects/tarabari-nima/freight-loading.webm"
        type="video/webm"
      />
      <source
        src="/assets/projects/tarabari-nima/freight-loading.mp4"
        type="video/mp4"
      />
    </video>
  );
}
