"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { DeskScene } from "./desk-scene";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { useTheme } from "@/components/theme/theme-provider";
import { usePortfolio } from "@/content/use-portfolio";
import { ResumeDialog } from "@/components/ui/resume-dialog";
import styles from "./optional-studio.module.css";

export function InteractiveStudio({
  onReady,
  onUnavailable,
}: {
  onReady: () => void;
  onUnavailable: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref);
  const supported = useWebGLSupport();
  const reducedMotion = useReducedMotion() ?? false;
  const { theme, toggleTheme } = useTheme();
  const portfolio = usePortfolio();
  const t = useTranslations("Employer");
  const studio = useTranslations("Studio");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const openResume = useCallback(() => setResumeOpen(true), []);
  useEffect(() => {
    if (supported === false) onUnavailable();
  }, [supported, onUnavailable]);
  return (
    <div ref={ref} className={styles.interactive}>
      {supported === true ? (
        <DeskScene
          active={active}
          theme={theme}
          reducedMotion={reducedMotion}
          pullLabel={studio("pull")}
          onToggleTheme={toggleTheme}
          onOpenResume={openResume}
          onReady={onReady}
          rotation={rotation}
        />
      ) : supported === false ? (
        <p className={styles.error} role="status">
          {t("sceneUnavailable")}
        </p>
      ) : null}
      {supported ? (
        <div className={styles.rotation}>
          <Button
            size="icon"
            variant="outline"
            aria-label={t("rotateLeft")}
            onClick={() => setRotation((r) => r - 1)}
          >
            ↶
          </Button>
          <Button
            size="icon"
            variant="outline"
            aria-label={t("rotateRight")}
            onClick={() => setRotation((r) => r + 1)}
          >
            ↷
          </Button>
        </div>
      ) : null}
      <ResumeDialog
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeUrl={portfolio.identity.resumeUrl}
      />
    </div>
  );
}
