"use client";

import dynamic from "next/dynamic";
import { Move3d } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  type LandingHeroReadiness,
  useReportLandingHeroReady,
} from "@/components/loading/landing-readiness";
import { DeskFallback } from "@/components/three/desk-fallback";
import { WebGLErrorBoundary } from "@/components/three/webgl-error-boundary";
import { useTheme } from "@/components/theme/theme-provider";
import { ResumeDialog } from "@/components/ui/resume-dialog";
import { usePortfolio } from "@/content/use-portfolio";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

const DeskScene = dynamic(
  () =>
    import("@/components/three/desk-scene").then((module) => module.DeskScene),
  { ssr: false, loading: () => <DeskFallback /> },
);

function ReadyDeskFallback({
  onReady,
}: {
  onReady: (readiness: LandingHeroReadiness) => void;
}) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      onReady("static-fallback");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [onReady]);

  return <DeskFallback />;
}

export function HeroStudio() {
  const portfolio = usePortfolio();
  const t = useTranslations("Studio");
  const runtime = useRef<HTMLDivElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const webGLSupported = useWebGLSupport();
  const reducedMotion = useReducedMotion() ?? false;
  const active = useInView(runtime, { margin: "20% 0px" });
  const { theme, toggleTheme } = useTheme();
  const reportHeroReady = useReportLandingHeroReady();
  const readyFallback = <ReadyDeskFallback onReady={reportHeroReady} />;

  return (
    <div
      ref={runtime}
      className="hero-studio"
      role="region"
      aria-label={t("regionLabel")}
    >
      <div className="hero-studio__viewport">
        <WebGLErrorBoundary fallback={readyFallback}>
          {webGLSupported === null ? (
            <DeskFallback />
          ) : webGLSupported === false ? (
            readyFallback
          ) : (
            <DeskScene
              active={active}
              pullLabel={t("pull")}
              reducedMotion={reducedMotion}
              theme={theme}
              onOpenResume={() => setResumeOpen(true)}
              onReady={() => reportHeroReady("webgl-frame")}
              onToggleTheme={toggleTheme}
            />
          )}
        </WebGLErrorBoundary>

        <div className="hero-studio__status" aria-hidden="true">
          <span>app/dashboard.tsx</span>
          <span data-code-loop="active">{t("coding")}</span>
          <span>
            <Move3d aria-hidden="true" size={13} />
            {t("drag")}
          </span>
        </div>
      </div>

      <ResumeDialog
        open={resumeOpen}
        resumeUrl={portfolio.identity.resumeUrl}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
