"use client";

import { useSyncExternalStore } from "react";

// The overlaid two-page WebGL book only has a comfortable reading measure on
// genuinely large, tall screens. Laptops with a short viewport and tablets get
// the intrinsic-height reader so translated copy is never squeezed into the
// decorative canvas projection.
const COMPACT_QUERY =
  "(max-width: 72rem), (max-height: 48rem), (pointer: coarse)";

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
