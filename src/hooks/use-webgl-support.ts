"use client";

import { useSyncExternalStore } from "react";

let cachedWebGLSupport: boolean | undefined;

function subscribe() {
  return () => undefined;
}

function getWebGLSnapshot(): boolean {
  if (cachedWebGLSupport !== undefined) return cachedWebGLSupport;

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    cachedWebGLSupport = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cachedWebGLSupport = false;
  }

  return cachedWebGLSupport;
}

function getServerSnapshot(): null {
  return null;
}

export function useWebGLSupport(): boolean | null {
  return useSyncExternalStore(subscribe, getWebGLSnapshot, getServerSnapshot);
}
