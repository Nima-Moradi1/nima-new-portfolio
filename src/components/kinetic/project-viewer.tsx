"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, MousePointer2, X } from "lucide-react";
import { PROJECT_DEMOS } from "@/content/project-demos";
import type { ProjectItem } from "@/types/portfolio";
import type { KineticContent } from "@/types/kinetic-content";
import styles from "./project-viewer.module.css";

export function ProjectViewer({ project, copy, onClose, staticView = false }: {
  project: ProjectItem; copy: KineticContent["detail"]; onClose: () => void; staticView?: boolean;
}) {
  const demo = PROJECT_DEMOS[project.id];
  const [interactive, setInteractive] = useState(false);
  const [live, setLive] = useState(!demo?.video && !!demo?.embeddable);
  const summary = project.summary.split(/(?<=[.!?؟])\s/)[0];
  return <article className={styles.viewer} data-static={staticView} aria-label={project.title} data-project-viewer={project.id}>
    <div className={styles.bar}>
      <span className={styles.liveLabel}><i />{live ? copy.live : copy.preview}</span>
      <div className={styles.actions}>
        {demo?.embeddable && demo.href && <button type="button" onClick={() => { setLive(value => !value); setInteractive(false); }}>{live ? copy.preview : copy.live}</button>}
        <button type="button" className={styles.close} onClick={onClose} aria-label={copy.back}><X size={18} /></button>
      </div>
    </div>
    <div className={styles.screen} data-interactive={interactive}>
      {live && demo?.href ? <iframe src={demo.href} title={`${project.title} — ${copy.live}`} loading="lazy" tabIndex={interactive ? 0 : -1} allow="autoplay; fullscreen" referrerPolicy="strict-origin-when-cross-origin" />
        : demo?.video ? <video src={demo.video} poster={demo.poster || project.image} autoPlay={!staticView} muted loop playsInline controls={staticView} preload="metadata" aria-label={project.imageAlt} />
          : <Image src={demo?.poster || project.image} alt={project.imageAlt} fill sizes="(max-width: 767px) 90vw, 72vw" className={styles.capture} />}
      {live && <button type="button" className={styles.interact} aria-pressed={interactive} onClick={() => setInteractive(value => !value)}><MousePointer2 size={13} />{interactive ? copy.scroll : copy.interact}</button>}
    </div>
    <div className={styles.caption}>
      <div><h2>{project.title}</h2><p>{summary}</p></div>
      {demo?.href && <a href={demo.href} target="_blank" rel="noopener noreferrer">{copy.visit}<ArrowUpRight size={16} /></a>}
    </div>
    <ul className={styles.tools} aria-label={copy.tools}>{project.technologies.map(tool => <li key={tool}><bdi>{tool}</bdi></li>)}</ul>
    {!staticView && <p className={styles.hint}><ArrowDown size={14} />{copy.scroll}</p>}
  </article>;
}
