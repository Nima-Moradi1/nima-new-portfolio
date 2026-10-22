"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
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
  const t = useTranslations("Employer");
  const studio = useTranslations("Studio");
  return (
    <div className={styles.root}>
      <div className={styles.viewport}>
        <Image
          src="/assets/hero/desk-still.webp"
          alt={studio("fallbackAlt")}
          fill
          loading="eager"
          sizes="(max-width: 960px) 40vw, 440px"
          className={styles.still}
        />
        {exploring ? (
          <WebGLErrorBoundary
            fallback={
              <p className={styles.error} role="status">
                {t("sceneUnavailable")}
              </p>
            }
          >
            <InteractiveStudio />
          </WebGLErrorBoundary>
        ) : null}
      </div>
      <Button
        variant="outline"
        className={styles.control}
        onClick={() => setExploring(!exploring)}
        aria-pressed={exploring}
      >
        {t(exploring ? "close3d" : "explore")}
      </Button>
    </div>
  );
}
