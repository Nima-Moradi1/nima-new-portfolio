"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { cn } from "@/lib/cn";
import { xoArenaVideoClassNames as styles } from "./xo-arena-video.class-names";
import artwork from "./xo-arena-video.module.css";

export function XoArenaVideo() {
  const t = useTranslations("XoArena");

  preload("/assets/projects/xo-arena/xo-arena-preview.webm", {
    as: "fetch",
    crossOrigin: "anonymous",
    type: "video/webm",
  });

  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    node.load();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !reducedMotion.matches) {
          void node.play().catch(() => undefined);
        } else {
          node.pause();
        }
      },
      { threshold: 0.55 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  function updateBuffered() {
    const node = video.current;
    if (!node || node.duration <= 0 || node.buffered.length === 0) return;
    const bufferedEnd = node.buffered.end(node.buffered.length - 1);
    setBuffered(Math.min(100, Math.round((bufferedEnd / node.duration) * 100)));
  }

  return (
    <div className={cn(styles.root, artwork.frame)} data-ready={ready}>
      <video
        className={styles.video}
        ref={video}
        controls
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        poster="/assets/projects/xo-arena/video-poster.webp"
        aria-label={t("video.ariaLabel")}
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
        onProgress={updateBuffered}
      >
        <source
          src="/assets/projects/xo-arena/xo-arena-preview.webm"
          type="video/webm"
        />
        <source
          src="/assets/projects/xo-arena/xo-arena-preview.mp4"
          type="video/mp4"
        />
      </video>

      <div
        className={cn(styles.loading, artwork.loadingSurface)}
        aria-hidden="true"
      >
        <span className={styles.spinner} />
        <p className={styles.loadingLabel}>{t("video.buffering")}</p>
        <div className={styles.progressTrack}>
          <i
            className={styles.progressIndicator}
            style={{ width: `${buffered}%` }}
          />
        </div>
      </div>

      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.chromeBadge}>{t("video.capture")}</span>
        <span className={cn(styles.chromeBadge, styles.chromeDimensions)}>
          <bdi dir="ltr">{t("video.dimensions")}</bdi>
        </span>
      </div>
    </div>
  );
}
