"use client";

import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { SignalFallback } from "@/components/three/signal-fallback";
import { WebGLErrorBoundary } from "@/components/three/webgl-error-boundary";
import { useTheme } from "@/components/theme/theme-provider";

const SignalScene = dynamic(
  () =>
    import("@/components/three/signal-scene").then(
      (module) => module.SignalScene,
    ),
  {
    ssr: false,
    loading: () => <SignalFallback />,
  },
);

export function HeroCanvas() {
  const runtime = useRef<HTMLDivElement>(null);
  const webGLSupported = useWebGLSupport();
  const reducedMotion = useReducedMotion() ?? false;
  const isInView = useInView(runtime, { margin: "20% 0px" });
  const { theme } = useTheme();

  if (webGLSupported === false) {
    return (
      <div ref={runtime} className="hero-canvas-runtime">
        <SignalFallback />
      </div>
    );
  }

  return (
    <div ref={runtime} className="hero-canvas-runtime">
      <WebGLErrorBoundary fallback={<SignalFallback />}>
        {webGLSupported === null ? (
          <SignalFallback />
        ) : (
          <SignalScene
            active={isInView}
            reducedMotion={reducedMotion}
            theme={theme}
          />
        )}
      </WebGLErrorBoundary>
    </div>
  );
}
