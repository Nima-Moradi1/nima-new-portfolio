"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "@/components/sections/portfolio-layout.module.css";

export function XoArenaVideo() {
  const t = useTranslations("XoArena");
  const labels = useTranslations("Employer");
  const [failed, setFailed] = useState(false);
  return (
    <figure>
      <video
        style={{
          width: "100%",
          aspectRatio: "1166 / 720",
          borderRadius: "1rem",
          background: "var(--ink-soft)",
        }}
        controls
        playsInline
        preload="none"
        poster="/assets/projects/xo-arena/video-poster.webp"
        aria-label={t("video.ariaLabel")}
        onError={() => setFailed(true)}
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
      <figcaption className={styles.body}>{t("video.ariaLabel")}</figcaption>
      {failed ? (
        <p role="status" className={styles.notice}>
          {labels("videoUnavailable")}
        </p>
      ) : null}
      <a
        className={styles.link}
        href="/assets/projects/xo-arena/xo-arena-preview.mp4"
      >
        {labels("walkthrough")} (MP4)
      </a>
    </figure>
  );
}
