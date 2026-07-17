"use client";

import { useSyncExternalStore } from "react";

const COMPACT_QUERY = "(max-width: 54rem), (pointer: coarse)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(COMPACT_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useCompactViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
