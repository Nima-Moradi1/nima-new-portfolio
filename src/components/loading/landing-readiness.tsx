"use client";

import { createContext, useContext } from "react";

export type LandingHeroReadiness = "webgl-frame" | "static-fallback";

type LandingReadinessContextValue = {
  reportHeroReady: (readiness: LandingHeroReadiness) => void;
};

export const LandingReadinessContext =
  createContext<LandingReadinessContextValue | null>(null);

const reportOutsideLanding = () => undefined;

/**
 * Reports the first usable hero frame to the landing boot coordinator.
 * The no-op fallback keeps HeroStudio reusable outside the landing page.
 */
export function useReportLandingHeroReady() {
  return (
    useContext(LandingReadinessContext)?.reportHeroReady ?? reportOutsideLanding
  );
}
