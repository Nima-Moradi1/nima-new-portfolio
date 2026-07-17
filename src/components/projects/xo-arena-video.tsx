"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

export function XoArenaVideo() {
  preload("/assets/projects/xo-arena/xo-arena-preview.webm", {
    as: "fetch",
    crossOrigin: "anonymous",
    type: "video/webm",
  });

  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    node.load();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !reducedMotion.matches) {
          void node.play().catch(() => undefined);
        } else {
          node.pause();
        }
      },
      { threshold: 0.55 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  function updateBuffered() {
    const node = video.current;
    if (!node || node.duration <= 0 || node.buffered.length === 0) return;
    const bufferedEnd = node.buffered.end(node.buffered.length - 1);
    setBuffered(Math.min(100, Math.round((bufferedEnd / node.duration) * 100)));
  }

  return (
    <div className="xo-video" data-ready={ready}>
      <video
        ref={video}
        controls
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        poster="/assets/projects/xo-arena/video-poster.webp"
        aria-label="XO Arena product walkthrough showing authentication, the multiplayer lobby, game rooms, computer opponents, and profile history"
        onCanPlay={() => setReady(true)}
        onLoadedData={() => setReady(true)}
        onProgress={updateBuffered}
      >
        <source
          src="/assets/projects/xo-arena/xo-arena-preview.webm"
          type="video/webm"
        />
        <source
          src="/assets/projects/xo-arena/xo-arena-preview.mp4"
          type="video/mp4"
        />
      </video>

      <div className="xo-video__loading" aria-hidden="true">
        <span />
        <p>Buffering product walkthrough</p>
        <div>
          <i style={{ width: `${buffered}%` }} />
        </div>
      </div>

      <div className="xo-video__chrome" aria-hidden="true">
        <span>Product capture · 23 sec</span>
        <span>1166 × 720</span>
      </div>
    </div>
  );
}
