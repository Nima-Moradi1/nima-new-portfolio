"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import { NMBrandMark } from "@/components/branding/nm-brand-mark";
import styles from "./boot-loader.module.css";

export const BOOT_DEADLINE_MS = 6500;

type BootReadinessOptions = {
  /** Reported only after the scene's critical assets and first frame commit. */
  sceneReady: boolean;
  /** An intentional reading edition, reduced motion, or renderer failure. */
  staticEdition: boolean;
  onTimeout: () => void;
};

/**
 * Start closed in server HTML. Release as soon as real critical work settles;
 * an unavailable renderer/font must never keep the semantic page inaccessible.
 */
export function useBootReadiness({ sceneReady, staticEdition, onTimeout }: BootReadinessOptions) {
  const [fontsSettled, setFontsSettled] = useState(false);
  const [expired, setExpired] = useState(false);
  const complete = expired || (fontsSettled && (sceneReady || staticEdition));

  useEffect(() => {
    let active = true;
    const settled = () => { if (active) setFontsSettled(true); };
    // Font failures settle too: the browser's usable fallback font is enough.
    Promise.resolve(document.fonts?.ready).then(settled, settled);
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (complete) return;
    const deadline = window.setTimeout(() => {
      setExpired(true);
      onTimeout();
    }, BOOT_DEADLINE_MS);
    return () => window.clearTimeout(deadline);
  }, [complete, onTimeout]);

  return complete;
}

type BootLoaderProps = {
  visible: boolean;
  name: string;
  status: string;
};

const DEPTH_LAYERS = [0, 1, 2, 3, 4, 5];
const MARK_PATH = "M7 59V21h9l15 23V21h9v38h-9L16 36v23H7Zm36 0V21h8l8.5 15L68 21h8v38h-9V38l-7.5 12L52 38v21h-9Z";

/** Original NM silhouette, CSS extrusion and orbital light; no second canvas. */
export function BootLoader({ visible, name, status }: BootLoaderProps) {
  const metalId = useId();
  if (!visible) return null;

  return (
    <div className={styles.loader} data-nm-boot-loader>
      <p className={styles.identity}>{name}</p>
      <div className={styles.art} aria-hidden="true">
        <div className={styles.halo} />
        <div className={styles.orbitScene}>
          <div className={`${styles.orbit} ${styles.outerOrbit}`}><i /><span /></div>
          <div className={`${styles.orbit} ${styles.middleOrbit}`}><i /><span /></div>
          <div className={`${styles.orbit} ${styles.innerOrbit}`}><i /></div>
          <div className={styles.monogram}>
            {DEPTH_LAYERS.map(layer => <NMBrandMark key={layer} className={styles.depth} style={{ "--layer": layer } as CSSProperties} />)}
            <svg className={styles.face} viewBox="0 0 80 80" fill="none">
              <defs>
                <linearGradient id={metalId} x1="4" y1="10" x2="70" y2="67" gradientUnits="userSpaceOnUse">
                  <stop stopColor="var(--nm-muted)" />
                  <stop offset=".24" stopColor="var(--nm-fg)" />
                  <stop offset=".4" stopColor="var(--nm-ice)" />
                  <stop offset=".51" stopColor="var(--nm-space)" />
                  <stop offset=".67" stopColor="var(--nm-fg)" />
                  <stop offset="1" stopColor="var(--nm-muted)" />
                </linearGradient>
              </defs>
              <path d={MARK_PATH} fill={`url(#${metalId})`} stroke="var(--nm-fg)" strokeWidth=".18" />
              <path d="m19 21 20 30m13-30 7.5 14L67 21" stroke="var(--nm-ice)" strokeWidth=".7" />
            </svg>
          </div>
        </div>
        <div className={styles.ground} />
      </div>
      <div className={styles.status} role="status" aria-live="polite"><span aria-hidden="true" /><p>{status}</p></div>
      <div className={styles.signature} aria-hidden="true"><span />NM<span /></div>
      <noscript><style>{`[data-nm-boot-loader]{display:none!important}`}</style></noscript>
    </div>
  );
}
