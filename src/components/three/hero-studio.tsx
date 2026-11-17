"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { WebGLErrorBoundary } from "@/components/three/webgl-error-boundary";
import styles from "./optional-studio.module.css";

const InteractiveStudio = dynamic(
  () => import("./interactive-studio").then((m) => m.InteractiveStudio),
  { ssr: false },
);

export function HeroStudio() {
  const [exploring, setExploring] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => setFailed(true), []);
  const t = useTranslations("Employer");
  const studio = useTranslations("Studio");
  return (
    <div className={styles.root}>
      <link
        rel="preload"
        as="image"
        href="/assets/hero/desk-still.webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <div
        className={styles.viewport}
        id="hero-workstation"
        data-exploring={exploring}
        aria-busy={exploring && !ready && !failed}
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={
              exploring
                ? "/assets/hero/desk-still.webp"
                : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
            }
          />
          <Image
            src="/assets/hero/desk-still.webp"
            alt={studio("fallbackAlt")}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 768px) 90vw, (max-width: 960px) 40vw, 480px"
            className={`${styles.still} ${ready && !failed ? styles.hidden : ""}`}
          />
        </picture>
        {exploring ? (
          <WebGLErrorBoundary
            onError={onUnavailable}
            fallback={
              <p className={styles.error} role="status">
                {t("sceneUnavailable")}
              </p>
            }
          >
            <InteractiveStudio
              onReady={onReady}
              onUnavailable={onUnavailable}
            />
          </WebGLErrorBoundary>
        ) : null}
        {exploring && !ready && !failed ? (
          <p className={styles.loading} role="status">
            {t("sceneLoading")}
          </p>
        ) : null}
      </div>
      <Button
        variant="outline"
        className={styles.control}
        onClick={() => {
          setReady(false);
          setFailed(false);
          setExploring(!exploring);
        }}
        aria-pressed={exploring}
        aria-controls="hero-workstation"
      >
        {t(exploring ? "close3d" : "explore")}
      </Button>
      {exploring && ready && !failed ? (
        <p className={styles.instructions}>{studio("drag")}</p>
      ) : null}
    </div>
  );
}
