"use client";

import dynamic from "next/dynamic";
import { Move3d } from "lucide-react";
import { useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { DeskFallback } from "@/components/three/desk-fallback";
import { WebGLErrorBoundary } from "@/components/three/webgl-error-boundary";
import { useTheme } from "@/components/theme/theme-provider";
import { ResumeDialog } from "@/components/ui/resume-dialog";
import { portfolio } from "@/content/portfolio";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

const DeskScene = dynamic(
  () =>
    import("@/components/three/desk-scene").then((module) => module.DeskScene),
  { ssr: false, loading: () => <DeskFallback /> },
);

export function HeroStudio() {
  const runtime = useRef<HTMLDivElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const webGLSupported = useWebGLSupport();
  const reducedMotion = useReducedMotion() ?? false;
  const active = useInView(runtime, { margin: "20% 0px" });
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      ref={runtime}
      className="hero-studio"
      role="region"
      aria-label="Interactive 3D developer workstation"
    >
      <div className="hero-studio__viewport">
        <WebGLErrorBoundary fallback={<DeskFallback />}>
          {webGLSupported === false || webGLSupported === null ? (
            <DeskFallback />
          ) : (
            <DeskScene
              active={active}
              reducedMotion={reducedMotion}
              theme={theme}
              onOpenResume={() => setResumeOpen(true)}
              onToggleTheme={toggleTheme}
            />
          )}
        </WebGLErrorBoundary>

        <div className="hero-studio__status" aria-hidden="true">
          <span>app/dashboard.tsx</span>
          <span data-code-loop="active">React Coding</span>
          <span>
            <Move3d aria-hidden="true" size={13} />
            Drag to inspect
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
