"use client";

import { startTransition, useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { NMBrandMark } from "@/components/branding/nm-brand-mark";
import { KineticThemeToggle } from "@/components/theme/kinetic-theme-toggle";
import { KineticContactDialog } from "./kinetic-contact-dialog";
import { KineticLocaleSelect } from "./kinetic-locale-select";
import { ProjectViewer } from "./project-viewer";
import { BootLoader, useBootReadiness } from "./boot-loader";
import type { KineticStageProps } from "./kinetic-stage";
import { PROJECT_DEMOS } from "@/content/project-demos";
import { PROJECT_TEXTURES } from "@/content/project-textures";
import { useScrollDirector } from "./use-scroll-director";
import { usePathname } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
import { createSceneState, DETAIL_VIEWPORTS, itemPosition, EXPERIENCE_ACCENTS, PROJECT_ACCENTS, notifyScene, type PortfolioMode, type ScenePhase } from "@/lib/kinetic-model";
import type { PortfolioContent } from "@/types/portfolio";
import type { KineticContent } from "@/types/kinetic-content";
import styles from "./kinetic-experience.module.css";

type Props = { locale: AppLocale; content: PortfolioContent; copy: KineticContent; initialMode?: PortfolioMode; initialItem?: string };

function UnavailableStage({ onFailure }: KineticStageProps) {
  useEffect(onFailure, [onFailure]);
  return null;
}
const KineticStage = dynamic<KineticStageProps>(() => import("./kinetic-stage").then(module => module.KineticStage).catch(() => UnavailableStage), { ssr: false });
const noSubscription = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const reducedMotionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function subscribeReducedMotion(update: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}
const suffixSnapshot = () => `${window.location.search}${window.location.hash}`;
const serverSuffix = () => "";
function subscribeLocation(update: () => void) {
  const events = ["popstate", "hashchange", "nm:location-update"];
  events.forEach(event => window.addEventListener(event, update));
  return () => events.forEach(event => window.removeEventListener(event, update));
}

export function KineticExperience({ locale, content, copy, initialMode = "projects", initialItem }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const initialIndex = Math.max(0, (initialMode === "projects" ? content.projects : content.experience).findIndex(item => item.id === initialItem));
  const [mode, setMode] = useState<PortfolioMode>(initialMode);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [proofIndex, setProofIndex] = useState(0);
  const [phase, setPhase] = useState<ScenePhase>("hero");
  const enhanced = useSyncExternalStore(noSubscription, clientSnapshot, serverSnapshot);
  const [reader, setReader] = useState(false);
  const [ready, setReady] = useState(false);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState(-1);
  const [detailVisible, setDetailVisible] = useState(false);
  const suffix = useSyncExternalStore(subscribeLocation, suffixSnapshot, serverSuffix);
  const [restorationRevision, setRestorationRevision] = useState(0);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, reducedMotionSnapshot, serverSnapshot);
  const pathname = usePathname();
  const rtl = locale === "fa";
  const items = mode === "projects" ? content.projects : content.experience;
  const scene = useRef({ ...createSceneState(initialMode, initialMode === "projects" ? content.projects.length : content.experience.length, rtl), itemProgress: initialIndex, activeIndex: initialIndex });
  const pendingSelection = useRef<{ id?: string; index?: number; jump: boolean; honorHash?: boolean } | null>(null);
  const initialSelectionHandled = useRef(false);
  const staticEdition = reader || failed || (enhanced && !!reducedMotion);
  const drag = useRef<{ x: number; y: number; scroll: number; moved: boolean } | null>(null);
  const suppressProjectClick = useRef(false);
  const smooth = enhanced && !staticEdition;
  const previousStaticEdition = useRef(staticEdition);
  const onReady = useCallback(() => { scene.current.ready = true; setReady(true); }, []);
  const onFailure = useCallback(() => { setFailed(true); }, []);
  const bootComplete = useBootReadiness({ sceneReady: ready, staticEdition, onTimeout: onFailure });
  const onSelection = useCallback((index: number) => setActiveIndex(index), []);
  const onProofSelection = useCallback((index: number) => setProofIndex(index), []);
  const onPhase = useCallback((next: ScenePhase) => setPhase(next), []);
  const onDetail = useCallback((visible: boolean) => setDetailVisible(visible), []);

  useEffect(() => {
    if (!enhanced || staticEdition) return;
    let active = true;
    let frame = 0;
    // Wait for a presented content frame, rather than assuming two RAFs mean
    // the compositor has painted. WebGL must not compete with that first paint.
    const enable = () => {
      if (!active) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => { if (active) startTransition(() => setSceneEnabled(true)); });
      });
    };
    const afterPaint = () => { Promise.resolve(document.fonts?.ready).then(enable, enable); };
    let observer: PerformanceObserver | undefined;
    if (typeof PerformanceObserver !== "undefined" && PerformanceObserver.supportedEntryTypes?.includes("paint")) {
      observer = new PerformanceObserver(list => {
        if (!list.getEntries().some(entry => entry.name === "first-contentful-paint")) return;
        observer?.disconnect();
        afterPaint();
      });
      observer.observe({ type: "paint", buffered: true });
    } else afterPaint();
    return () => { active = false; observer?.disconnect(); cancelAnimationFrame(frame); };
  }, [enhanced, staticEdition]);

  const scrollToItem = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const element = root.current?.querySelector<HTMLElement>('[data-chapter="work"]');
    if (!element) return;
    if (staticEdition) {
      root.current?.querySelector<HTMLElement>(`[data-static-item="${index}"]`)?.scrollIntoView({ behavior: "instant", block: "center" });
      setActiveIndex(index); return;
    }
    const top = element.getBoundingClientRect().top + window.scrollY;
    const span = scene.current.detailIndex >= 0 ? window.innerHeight * DETAIL_VIEWPORTS : 0;
    const range = Math.max(1, element.offsetHeight - window.innerHeight - span);
    const offset = span && index >= scene.current.detailIndex ? span : 0;
    window.scrollTo({ top: top + itemPosition(index, items.length) * range + offset + 1, behavior });
  }, [staticEdition, items.length]);
  const scrollToProof = useCallback((index: number, behavior: ScrollBehavior = "instant") => {
    const section = root.current?.querySelector<HTMLElement>('[data-chapter="proof"]');
    if (!section) return;
    if (staticEdition) {
      section.querySelectorAll<HTMLElement>("[data-proof-copy]")[index]?.scrollIntoView({ behavior: "instant", block: "center" });
    } else {
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + (section.offsetHeight - window.innerHeight) * ((index + .5) / copy.proof.items.length), behavior });
    }
  }, [staticEdition, copy.proof.items.length]);
  const syncSuffix = useCallback(() => window.dispatchEvent(new Event("nm:location-update")), []);
  const updateUrl = useCallback((nextMode: PortfolioMode, id?: string, replace = false, clearHash = false) => {
    const url = new URL(window.location.href);
    if (nextMode === "experience") url.searchParams.set("view", "experience"); else url.searchParams.delete("view");
    if (id) url.searchParams.set("item", id); else url.searchParams.delete("item");
    if (clearHash) url.hash = "";
    window.history[replace ? "replaceState" : "pushState"]({}, "", `${url.pathname}${url.search}${url.hash}`);
    syncSuffix();
  }, [syncSuffix]);
  const changeMode = useCallback((next: PortfolioMode) => {
    if (next === mode) return;
    scene.current.detailIndex = -1; scene.current.detailProgress = 0;
    setDetailIndex(-1); setDetailVisible(false);
    pendingSelection.current = { index: 0, jump: scene.current.phase !== "hero" || staticEdition };
    scene.current.mode = next;
    scene.current.count = next === "projects" ? content.projects.length : content.experience.length;
    scene.current.modeRevision += 1; scene.current.itemProgress = 0; scene.current.activeIndex = 0;
    setActiveIndex(0); setMode(next); updateUrl(next, undefined, false, true); notifyScene();
  }, [mode, content.projects.length, content.experience.length, updateUrl, staticEdition]);

  useEffect(() => {
    const restore = () => {
      scene.current.detailIndex = -1; scene.current.detailProgress = 0;
      setDetailIndex(-1); setDetailVisible(false);
      const url = new URL(window.location.href);
      const next: PortfolioMode = url.searchParams.get("view") === "experience" ? "experience" : "projects";
      scene.current.mode = next; scene.current.count = next === "projects" ? content.projects.length : content.experience.length;
      scene.current.modeRevision += 1;
      pendingSelection.current = { id: url.searchParams.get("item") || undefined, index: 0, jump: true, honorHash: true };
      setMode(next); setRestorationRevision(value => value + 1); syncSuffix(); notifyScene();
    };
    if (window.location.search) restore();
    window.addEventListener("popstate", restore); window.addEventListener("hashchange", syncSuffix);
    return () => { window.removeEventListener("popstate", restore); window.removeEventListener("hashchange", syncSuffix); };
  }, [content.projects.length, content.experience.length, syncSuffix]);
  useEffect(() => { scene.current.reducedMotion = !!reducedMotion || reader; scene.current.visible = !reader && !contactOpen && !document.hidden; notifyScene(); }, [reducedMotion, reader, contactOpen]);
  useEffect(() => {
    if (!enhanced || mode !== scene.current.mode) return;
    const pending = pendingSelection.current;
    const editionChanged = previousStaticEdition.current !== staticEdition;
    previousStaticEdition.current = staticEdition;
    const honorHash = !initialSelectionHandled.current || pending?.honorHash;
    const hash = window.location.hash.slice(1);
    if (honorHash && hash) {
      const proofIndex = copy.proof.items.findIndex(proof => `proof-${proof.id}` === hash);
      const target = document.getElementById(hash);
      if (proofIndex >= 0) scrollToProof(proofIndex);
      else if (target && root.current?.contains(target)) target.scrollIntoView({ behavior: "instant" });
      if (target) { initialSelectionHandled.current = true; pendingSelection.current = null; return; }
    }
    const id = pending?.id || (!initialSelectionHandled.current ? initialItem : undefined);
    const index = id ? items.findIndex(item => item.id === id) : (pending?.index ?? scene.current.activeIndex);
    if (pending?.jump || id || (editionChanged && ["assembly", "carousel"].includes(scene.current.phase))) scrollToItem(Math.max(0, index), "instant");
    else if (editionChanged && scene.current.phase === "proof") scrollToProof(scene.current.proofIndex);
    else if (editionChanged && scene.current.phase !== "hero") root.current?.querySelector<HTMLElement>(`[data-chapter="${scene.current.phase}"]`)?.scrollIntoView({ behavior: "instant" });
    initialSelectionHandled.current = true; pendingSelection.current = null;
  }, [mode, enhanced, items, initialItem, scrollToItem, scrollToProof, restorationRevision, staticEdition, copy.proof.items]);
  useScrollDirector({ root, scene, count: items.length, detailIndex, enabled: enhanced && !staticEdition, onDetail, onSelection, onProofSelection, onPhase });

  useEffect(() => {
    if (phase === "carousel") updateUrl(mode, items[Math.min(activeIndex, items.length - 1)].id, true);
  }, [activeIndex, phase, mode, items, updateUrl]);

  function selectItem(index: number) {
    const next = (index + items.length) % items.length;
    updateUrl(mode, items[next].id, true, true); scrollToItem(next, smooth ? "smooth" : "instant");
  }
  function openProject(index: number) {
    if (index < 0 || index >= content.projects.length) return;
    if (mode !== "projects") {
      scene.current.mode = "projects"; scene.current.count = content.projects.length; scene.current.modeRevision += 1;
      setMode("projects");
    }
    scene.current.detailIndex = index; scene.current.detailProgress = 0;
    setDetailIndex(index); setActiveIndex(index); setDetailVisible(staticEdition);
    updateUrl("projects", content.projects[index].id, false, true);
    requestAnimationFrame(() => {
      const section = root.current?.querySelector<HTMLElement>('[data-chapter="work"]');
      if (!section) return;
      if (staticEdition) { root.current?.querySelector<HTMLElement>(`[data-static-item="${index}"]`)?.scrollIntoView({ behavior: "instant", block: "start" }); return; }
      const span = window.innerHeight * DETAIL_VIEWPORTS;
      const range = Math.max(1, section.offsetHeight - window.innerHeight - span);
      // The sticky stage stays in place; only the physical rig animates. An
      // instant native anchor also leaves the next wheel/touch input unopposed.
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + itemPosition(index, content.projects.length) * range + span * .24, behavior: "instant" });
      notifyScene();
    });
  }
  function closeProject() {
    if (staticEdition) { setDetailIndex(-1); setDetailVisible(false); scene.current.detailIndex = -1; return; }
    const section = root.current?.querySelector<HTMLElement>('[data-chapter="work"]');
    if (!section) return;
    const span = window.innerHeight * DETAIL_VIEWPORTS;
    const range = Math.max(1, section.offsetHeight - window.innerHeight - span);
    window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + itemPosition(detailIndex, content.projects.length) * range + span + 2, behavior: "instant" });
  }
  function openRelated(href: string) {
    if (href === "#contact") { setContactOpen(true); return; }
    const index = content.projects.findIndex(project => project.href === href);
    if (index >= 0) openProject(index);
  }
  function selectorKeys(event: KeyboardEvent<HTMLDivElement>) {
    const proof = scene.current.phase === "proof";
    const index = proof ? scene.current.proofIndex : activeIndex;
    const count = proof ? copy.proof.items.length : items.length;
    let next: number | undefined;
    if (event.key === "ArrowRight") next = index + (rtl ? -1 : 1);
    if (event.key === "ArrowLeft") next = index + (rtl ? 1 : -1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = count - 1;
    if (next !== undefined) {
      event.preventDefault(); next = Math.max(0, Math.min(count - 1, next));
      if (proof) scrollToProof(next, "instant"); else selectItem(next);
    }
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    suppressProjectClick.current = false;
    if (staticEdition || detailVisible || !["carousel", "proof"].includes(scene.current.phase) || event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY, scroll: window.scrollY, moved: false };
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.moved && Math.abs(dy) > Math.abs(dx) + 8) { drag.current = null; return; }
    if (!gesture.moved && Math.abs(dx) > 8) {
      gesture.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!gesture.moved) return;
    const proof = scene.current.phase === "proof";
    const section = root.current?.querySelector<HTMLElement>(`[data-chapter="${proof ? "proof" : "work"}"]`);
    if (!section) return;
    const span = !proof && scene.current.detailIndex >= 0 ? window.innerHeight * DETAIL_VIEWPORTS : 0;
    const range = Math.max(1, section.offsetHeight - window.innerHeight - span);
    const count = proof ? copy.proof.items.length : items.length;
    const segment = range * (proof ? 1 / count : .895 / Math.max(1, count - 1));
    const start = section.getBoundingClientRect().top + window.scrollY;
    const detailStart = itemPosition(scene.current.detailIndex, count) * range;
    const nativeDistance = gesture.scroll - start;
    const logicalOrigin = nativeDistance - (span ? Math.min(span, Math.max(0, nativeDistance - detailStart)) : 0);
    const distance = logicalOrigin - dx / Math.min(320, window.innerWidth * .65) * segment * (rtl ? -1 : 1);
    const logicalTarget = Math.max(proof ? 1 : range * .106, Math.min(range - 1, distance));
    const detailOffset = span && logicalTarget >= detailStart ? span : 0;
    window.scrollTo({ top: start + logicalTarget + detailOffset, behavior: "instant" });
    suppressProjectClick.current = true;
  }
  function endDrag() { drag.current = null; }
  function handleProjectClick(index: number) {
    if (!suppressProjectClick.current) openProject(index);
  }
  const accents = mode === "projects" ? PROJECT_ACCENTS : EXPERIENCE_ACCENTS;
  const active = items[Math.min(activeIndex, items.length - 1)];
  const sceneInteractive = !staticEdition && (phase === "carousel" || phase === "proof");

  return (
    <div ref={root} className={styles.root} dir={rtl ? "rtl" : "ltr"} data-nm-portfolio="" data-enhanced={enhanced} data-reader={staticEdition} data-mode={mode} data-phase={phase} data-scene-ready={ready} data-boot-complete={bootComplete}
      onPointerMove={event => { if (event.pointerType !== "mouse" || staticEdition) return; scene.current.pointerX = (event.clientX / window.innerWidth - .5) * 2; scene.current.pointerY = (event.clientY / window.innerHeight - .5) * 2; notifyScene(); }}
      onPointerLeave={() => { scene.current.pointerX = 0; scene.current.pointerY = 0; notifyScene(); }}>
      <a className={styles.skip} href="#main-content">{copy.chrome.skip}</a>
      <div className={styles.progress} aria-hidden="true"><span /></div>
      <header className={styles.header}>
        <div className={styles.modeSwitch} role="group" aria-label={copy.controls.modeLabel}>{(["projects", "experience"] as const).map(value => <button type="button" key={value} aria-pressed={mode === value} onClick={() => changeMode(value)}>{copy.chrome[value]}</button>)}</div>
        <a className={styles.brand} href="#top" aria-label={content.identity.name}><NMBrandMark aria-hidden="true" /><span>NIMA MORADIRAD</span></a>
        <div className={styles.headerActions}>
          <KineticThemeToggle />
          <KineticLocaleSelect locale={locale} label={copy.chrome.locale} href={`${pathname}${suffix}`} />
          <button type="button" className={styles.contactButton} onClick={() => setContactOpen(true)}>{copy.chrome.contact}<ArrowUpRight size={13} aria-hidden="true" /></button>
        </div>
      </header>
      <div className={styles.scene} role={sceneInteractive ? "slider" : undefined} aria-hidden={!sceneInteractive || undefined}
        tabIndex={bootComplete && !staticEdition && (phase === "carousel" || phase === "proof") ? 0 : -1}
        aria-label={sceneInteractive ? copy.controls.select : undefined} aria-valuemin={sceneInteractive ? 1 : undefined} aria-valuemax={sceneInteractive ? (phase === "proof" ? 4 : items.length) : undefined}
        aria-valuenow={sceneInteractive ? (phase === "proof" ? proofIndex + 1 : activeIndex + 1) : undefined} aria-valuetext={sceneInteractive ? (phase === "proof" ? copy.proof.items[proofIndex].title : "title" in active ? active.title : active.company) : undefined}
        onKeyDown={selectorKeys} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
        {!staticEdition && sceneEnabled && <KineticStage state={scene} accents={accents} projects={content.projects} experiences={content.experience} onProjectClick={handleProjectClick} onReady={onReady} onFailure={onFailure} />}
      </div>
      <div className={styles.studioGlow} aria-hidden="true" /><div className={styles.frame} aria-hidden="true"><i /><i /><i /><i /></div>
      <span className={styles.ambient} aria-hidden="true">NM / ENGINEERING IN MOTION</span>
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <noscript><nav className={styles.noScriptNav} aria-label={copy.controls.modeLabel}><a href="#work">{copy.chrome.projects}</a><a href="#experience-history">{copy.chrome.experience}</a></nav></noscript>
        <section className={styles.hero} id="top" data-chapter="top" aria-labelledby="hero-title">
          <BootLoader visible={!bootComplete} scene name={content.identity.name} status={copy.loading.preparing} />
          <div className={styles.heroCopy}><p className={styles.eyebrow}><span className={styles.statusDot} />{copy.hero.eyebrow}</p><h1 id="hero-title">{copy.hero.title}</h1><p className={styles.heroDescription}>{copy.hero.description}</p></div>
          <div className={styles.heroFallback} aria-hidden="true"><NMBrandMark /></div>
          <div className={styles.heroFoot}><span>{copy.hero.availability}</span><a href="#work">{copy.hero.scroll}<ArrowDown size={14} aria-hidden="true" /></a><span className={styles.edition}>PORTFOLIO — 2026</span></div>
        </section>
        <section className={styles.track} id="work" data-chapter="work" aria-label={copy.chrome[mode]} style={{ "--track-count": items.length, "--detail-span": detailIndex >= 0 ? DETAIL_VIEWPORTS : 0 } as CSSProperties}>
          <span className={styles.anchor} id="experience" /><div className={styles.trackViewport}>
            <div className={styles.trackHeading}><span className={styles.eyebrow}>{copy.chrome[mode]}</span><span className={styles.meta}>{String(items.length).padStart(2, "0")} / NM ARCHIVE</span></div>
            <div className={styles.itemNarratives}>{items.map((item, index) => {
              const project = "title" in item;
              const title = project ? item.title : item.company;
              return <article className={styles.itemCopy} key={`${mode}-${item.id}`} id={`item-${item.id}`} data-track-copy data-static-item={index} data-active={index === activeIndex} aria-labelledby={`title-${item.id}`}>
                <p className={styles.itemCategory}><span>{String(index + 1).padStart(2, "0")}</span><bdi>{project ? item.category : item.period}</bdi></p>
                <h2 id={`title-${item.id}`}>{title}</h2>{!project && <p className={styles.jobRole}>{item.role}</p>}
                {project && <button type="button" className={styles.staticPreview} onClick={() => openProject(index)} aria-label={`${copy.controls.viewProject}: ${title}`}><Image src={enhanced && staticEdition ? item.image : PROJECT_TEXTURES[item.id] ?? item.image} alt={item.imageAlt} width={900} height={560} sizes="(max-width: 767px) 90vw, 600px" /></button>}
                <p className={styles.itemSummary}>{item.summary}</p>
                {!project && <ul className={styles.jobHighlights}>{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>}
                <ul className={styles.tools} aria-label={title}>{item.technologies.slice(0, 6).map(tool => <li key={tool}><bdi>{tool}</bdi></li>)}</ul>
                {project && <button type="button" className={styles.textLink} onClick={() => openProject(index)}>{copy.controls.viewProject}<ArrowUpRight size={17} aria-hidden="true" /></button>}
                {project && !enhanced && PROJECT_DEMOS[item.id]?.href && <a className={styles.textLink} href={PROJECT_DEMOS[item.id].href} target="_blank" rel="noopener noreferrer">{copy.detail.visit}<ArrowUpRight size={17} /></a>}
                {project && staticEdition && detailIndex === index && detailVisible && <ProjectViewer key={item.id} project={item} copy={copy.detail} staticView onClose={closeProject} />}
              </article>;
            })}</div>
            <div className={styles.trackFooter}><span>{copy.hero.scroll}</span></div>
            {!staticEdition && detailVisible && detailIndex >= 0 && <div className={styles.projectStage}><ProjectViewer key={content.projects[detailIndex].id} project={content.projects[detailIndex]} copy={copy.detail} onClose={closeProject} /></div>}
          </div>
        </section>
        <section className={styles.proof} id="proof" data-chapter="proof" aria-labelledby="proof-title"><span className={styles.anchor} id="capabilities" /><div className={styles.proofViewport}>
          <div className={styles.proofHeading}><p className={styles.eyebrow}>{copy.proof.eyebrow}</p><h2 id="proof-title">{copy.proof.title}</h2></div>
          <div className={styles.proofCopies}>{copy.proof.items.map((proof, index) => <article key={proof.id} id={`proof-${proof.id}`} className={styles.proofCopy} data-proof-copy data-active={index === 0}>
            <p className={styles.proofKicker}><span>0{index + 1}</span>{proof.kicker}</p><h3>{proof.title}</h3><p>{proof.description}</p><ul className={styles.tools}>{proof.technologies.map(tool => <li key={tool}><bdi>{tool}</bdi></li>)}</ul>
            {proof.evidenceHref.startsWith("/") || proof.evidenceHref === "#contact" ? <button type="button" className={styles.textLink} onClick={() => openRelated(proof.evidenceHref)}>{proof.evidenceLabel}<ArrowUpRight size={16} aria-hidden="true" /></button> : <a className={styles.textLink} href={proof.evidenceHref} target="_blank" rel="noreferrer noopener">{proof.evidenceLabel}<ArrowUpRight size={16} aria-hidden="true" /></a>}
          </article>)}</div>
        </div></section>
        <section className={styles.faq} id="faq" data-chapter="faq" aria-labelledby="faq-title"><div className={styles.faqHeading}><p className={styles.eyebrow}>{copy.faq.eyebrow}</p><h2 id="faq-title">{copy.faq.title}</h2></div>
          <div className={styles.faqList}>{copy.faq.items.map((faq, index) => <details key={faq.id} className={styles.faqItem} open={enhanced ? openFaq === faq.id : undefined} onToggle={event => { if (!enhanced) return; if (event.currentTarget.open) setOpenFaq(faq.id); else setOpenFaq(current => current === faq.id ? null : current); }}>
            <summary onClick={event => { if (enhanced) { event.preventDefault(); setOpenFaq(current => current === faq.id ? null : faq.id); } }}><span className={styles.faqNumber}>0{index + 1}</span><span>{faq.question}</span><span className={styles.faqIcon} aria-hidden="true">{openFaq === faq.id ? <Minus size={17} /> : <Plus size={17} />}</span></summary>
            <div className={styles.faqAnswer}><p>{faq.answer}</p>{faq.href && (faq.href === "#contact" || faq.href.startsWith("/projects/") ? <button type="button" className={styles.textLink} onClick={() => openRelated(faq.href!)}>{faq.linkLabel}<ArrowUpRight size={15} aria-hidden="true" /></button> : faq.href.startsWith("#") ? <a className={styles.textLink} href={faq.href}>{faq.linkLabel}<ArrowDown size={15} aria-hidden="true" /></a> : <a className={styles.textLink} href={faq.href} target="_blank" rel="noreferrer noopener">{faq.linkLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>
          </details>)}</div>
        </section>
        <section className={styles.fallbackHistory} id="experience-history" aria-label={copy.chrome.experience}>{mode === "projects" && <><h2>{copy.chrome.experience}</h2>{content.experience.map(job => <article key={job.id}><p>{job.period}</p><h3>{job.company} — {job.role}</h3><p>{job.summary}</p><ul>{job.highlights.map(line => <li key={line}>{line}</li>)}</ul></article>)}</>}<article><h3>{content.education.title}</h3><p>{content.education.institution}</p><p>{content.education.note}</p><ul>{content.education.languages.map(language => <li key={language}>{language}</li>)}</ul></article>{content.capabilities.map(group => <article key={group.id}><h3>{group.title}</h3><p>{group.description}</p><ul className={styles.tools}>{group.skills.map(skill => <li key={skill}><bdi>{skill}</bdi></li>)}</ul></article>)}</section>
        <footer className={styles.footer}><a className={styles.footerBrand} href="#top"><NMBrandMark aria-hidden="true" /><span>{content.identity.name}</span></a><p>{copy.footer.note}</p><a href="#top">{copy.footer.backToTop}<ArrowUpRight size={15} aria-hidden="true" /></a></footer>
      </main>
      <KineticContactDialog open={contactOpen} onOpenChange={setContactOpen} locale={locale} content={content} />
      {!failed && !(enhanced && reducedMotion) && <button className={styles.readerToggle} type="button" disabled={!bootComplete} aria-pressed={reader} onClick={() => setReader(value => !value)}>{reader ? copy.chrome.immersive : copy.chrome.reader}{reader && <Check size={12} aria-hidden="true" />}</button>}
      <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{phase === "carousel" ? `${copy.chrome[mode]}: ${"title" in active ? active.title : active.company}, ${activeIndex + 1}/${items.length}` : ""}</p>
    </div>
  );
}
