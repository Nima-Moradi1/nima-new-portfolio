"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { DeskScene } from "./desk-scene";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { useTheme } from "@/components/theme/theme-provider";
import { usePortfolio } from "@/content/use-portfolio";
import { ResumeDialog } from "@/components/ui/resume-dialog";
import styles from "./optional-studio.module.css";

export function InteractiveStudio() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref);
  const supported = useWebGLSupport();
  const reducedMotion = useReducedMotion() ?? false;
  const { theme, toggleTheme } = useTheme();
  const portfolio = usePortfolio();
  const t = useTranslations("Employer");
  const studio = useTranslations("Studio");
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <div ref={ref} className={styles.interactive}>
      {supported === true ? (
        <DeskScene
          active={active}
          theme={theme}
          reducedMotion={reducedMotion}
          pullLabel={studio("pull")}
          onToggleTheme={toggleTheme}
          onOpenResume={() => setResumeOpen(true)}
          onReady={() => undefined}
        />
      ) : supported === false ? (
        <p className={styles.error} role="status">
          {t("sceneUnavailable")}
        </p>
      ) : null}
      <ResumeDialog
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resumeUrl={portfolio.identity.resumeUrl}
      />
    </div>
  );
}
