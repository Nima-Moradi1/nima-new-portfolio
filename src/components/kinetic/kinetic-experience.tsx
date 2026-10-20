"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { NMBrandMark } from "@/components/branding/nm-brand-mark";
import { KineticContactDialog } from "./kinetic-contact-dialog";
import { KineticLocaleSelect } from "./kinetic-locale-select";
import { ProjectViewer } from "./project-viewer";
import { PROJECT_DEMOS } from "@/content/project-demos";
import { useScrollDirector } from "./use-scroll-director";
import { usePathname } from "@/i18n/navigation";
import { type AppLocale } from "@/i18n/routing";
import { createSceneState, DETAIL_VIEWPORTS, itemPosition, EXPERIENCE_ACCENTS, PROJECT_ACCENTS, notifyScene, type PortfolioMode, type ScenePhase } from "@/lib/kinetic-model";
import type { PortfolioContent } from "@/types/portfolio";
import type { KineticContent } from "@/types/kinetic-content";
import styles from "./kinetic-experience.module.css";

type Props = { locale: AppLocale; content: PortfolioContent; copy: KineticContent; initialMode?: PortfolioMode; initialItem?: string };

const KineticStage = dynamic(() => import("./kinetic-stage").then(module => module.KineticStage), { ssr: false });
const noSubscription = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const COMPACT_QUERY = "(max-width: 767px) and (max-height: 650px), (max-height: 500px)";
const compactSnapshot = () => window.matchMedia(COMPACT_QUERY).matches;
function subscribeCompact(update: () => void) {
  const media = window.matchMedia(COMPACT_QUERY);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
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
  const [phase, setPhase] = useState<ScenePhase>("hero");
  const enhanced = useSyncExternalStore(noSubscription, clientSnapshot, serverSnapshot);
  const [reader, setReader] = useState(false);
  const compactViewport = useSyncExternalStore(subscribeCompact, compactSnapshot, serverSnapshot);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loaderDismissed, setLoaderDismissed] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState(-1);
  const [detailVisible, setDetailVisible] = useState(false);
  const suffix = useSyncExternalStore(subscribeLocation, suffixSnapshot, serverSuffix);
  const [restorationRevision, setRestorationRevision] = useState(0);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const rtl = locale === "fa";
  const items = mode === "projects" ? content.projects : content.experience;
  const scene = useRef({ ...createSceneState(initialMode, initialMode === "projects" ? content.projects.length : content.experience.length, rtl), itemProgress: initialIndex, activeIndex: initialIndex });
  const pendingSelection = useRef<{ id?: string; index?: number; jump: boolean; honorHash?: boolean } | null>(null);
  const initialSelectionHandled = useRef(false);
  const staticEdition = reader || failed || !!reducedMotion || compactViewport;
  const smooth = enhanced && !staticEdition;
  const previousStaticEdition = useRef(staticEdition);
  const onReady = useCallback(() => { scene.current.ready = true; setReady(true); }, []);
  const onFailure = useCallback(() => { setFailed(true); setLoaderDismissed(true); }, []);
  const onSelection = useCallback((index: number) => setActiveIndex(index), []);
  const onPhase = useCallback((next: ScenePhase) => setPhase(next), []);
  const onDetail = useCallback((visible: boolean) => setDetailVisible(visible), []);

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
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + (section.offsetHeight - window.innerHeight) * ((index + .15) / copy.proof.items.length), behavior });
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
    window.addEventListener("popstate", restore); window.addEventListener("hashchange", syncSuffix);
    return () => { window.removeEventListener("popstate", restore); window.removeEventListener("hashchange", syncSuffix); };
  }, [content.projects.length, content.experience.length, syncSuffix]);
  useEffect(() => {
    if (!enhanced || staticEdition || ready) return;
    const timer = window.setTimeout(() => { setLoaderDismissed(true); setFailed(true); }, 6500);
    return () => clearTimeout(timer);
  }, [enhanced, staticEdition, ready]);
  useEffect(() => { scene.current.reducedMotion = !!reducedMotion || reader; scene.current.visible = !reader && !contactOpen && !document.hidden; notifyScene(); }, [reducedMotion, reader, contactOpen]);
  useEffect(() => {
    if (!enhanced) return;
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
  useScrollDirector({ root, scene, count: items.length, detailIndex, enabled: enhanced && !staticEdition, onDetail, onSelection, onPhase });

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
    let next: number | undefined;
    if (event.key === "ArrowRight") next = activeIndex + (rtl ? -1 : 1);
    if (event.key === "ArrowLeft") next = activeIndex + (rtl ? 1 : -1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (next !== undefined) {
      event.preventDefault(); next = Math.max(0, Math.min(items.length - 1, next)); selectItem(next);
      root.current?.querySelector<HTMLButtonElement>(`[data-selector-index="${next}"]`)?.focus({ preventScroll: true });
    }
  }
  const accents = mode === "projects" ? PROJECT_ACCENTS : EXPERIENCE_ACCENTS;
  const active = items[Math.min(activeIndex, items.length - 1)];

  return (
    <div ref={root} className={styles.root} data-enhanced={enhanced} data-reader={staticEdition} data-mode={mode} data-phase={phase} data-scene-ready={ready}
      onPointerMove={event => { if (event.pointerType !== "mouse" || staticEdition) return; scene.current.pointerX = (event.clientX / window.innerWidth - .5) * 2; scene.current.pointerY = (event.clientY / window.innerHeight - .5) * 2; notifyScene(); }}
      onPointerLeave={() => { scene.current.pointerX = 0; scene.current.pointerY = 0; notifyScene(); }}>
      <a className={styles.skip} href="#main-content">{copy.chrome.skip}</a>
      <div className={styles.progress} aria-hidden="true"><span /></div>
      <header className={styles.header}>
        <div className={styles.modeSwitch} role="group" aria-label={copy.controls.modeLabel}>{(["projects", "experience"] as const).map(value => <button type="button" key={value} aria-pressed={mode === value} onClick={() => changeMode(value)}>{copy.chrome[value]}</button>)}</div>
        <a className={styles.brand} href="#top" aria-label={content.identity.name}><NMBrandMark aria-hidden="true" /><span>NIMA MORADIRAD</span></a>
        <div className={styles.headerActions}>
          <KineticLocaleSelect locale={locale} label={copy.chrome.locale} href={`${pathname}${suffix}`} />
          <button type="button" className={styles.contactButton} onClick={() => setContactOpen(true)}>{copy.chrome.contact}<ArrowUpRight size={13} aria-hidden="true" /></button>
        </div>
      </header>
      <div className={styles.scene} aria-hidden="true">{!staticEdition && enhanced && <KineticStage state={scene} accents={accents} projects={content.projects} experiences={content.experience} onProjectClick={openProject} onReady={onReady} onFailure={onFailure} />}</div>
      <div className={styles.studioGlow} aria-hidden="true" /><div className={styles.frame} aria-hidden="true"><i /><i /><i /><i /></div>
      <span className={styles.ambient} aria-hidden="true">NM / ENGINEERING IN MOTION</span>
      <AnimatePresence>{enhanced && !loaderDismissed && !staticEdition && !ready && <motion.div className={styles.loader} initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: .55 }}>
        <div className={styles.loaderMark}><NMBrandMark aria-hidden="true" /></div><p role="status">{ready ? copy.loading.ready : copy.loading.preparing}</p><span className={styles.loaderLine} aria-hidden="true" /><button type="button" onClick={() => setLoaderDismissed(true)}>{copy.loading.enter}<ArrowRight size={14} aria-hidden="true" /></button>
      </motion.div>}</AnimatePresence>
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <noscript><nav className={styles.noScriptNav} aria-label={copy.controls.modeLabel}><a href="?view=projects#work">{copy.chrome.projects}</a><a href="?view=experience#work">{copy.chrome.experience}</a></nav></noscript>
        <section className={styles.hero} id="top" data-chapter="top" aria-labelledby="hero-title">
          <div className={styles.heroCopy}><p className={styles.eyebrow}><span className={styles.statusDot} />{copy.hero.eyebrow}</p><h1 id="hero-title">{copy.hero.title}</h1><p className={styles.heroDescription}>{copy.hero.description}</p><a className={styles.textLink} href="#work">{copy.controls.viewProject}<ArrowUpRight size={18} aria-hidden="true" /></a></div>
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
                {project && <button type="button" className={styles.staticPreview} onClick={() => openProject(index)} aria-label={`${copy.controls.viewProject}: ${title}`}><Image src={item.image} alt={item.imageAlt} width={900} height={560} sizes="(max-width: 767px) 90vw, 600px" /></button>}
                <p className={styles.itemSummary}>{item.summary}</p>
                {!project && <ul className={styles.jobHighlights}>{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>}
                <ul className={styles.tools} aria-label={title}>{item.technologies.slice(0, 6).map(tool => <li key={tool}><bdi>{tool}</bdi></li>)}</ul>
                {project && <button type="button" className={styles.textLink} onClick={() => openProject(index)}>{copy.controls.viewProject}<ArrowUpRight size={17} aria-hidden="true" /></button>}
                {project && !enhanced && PROJECT_DEMOS[item.id]?.href && <a className={styles.textLink} href={PROJECT_DEMOS[item.id].href} target="_blank" rel="noopener noreferrer">{copy.detail.visit}<ArrowUpRight size={17} /></a>}
                {project && staticEdition && detailIndex === index && detailVisible && <ProjectViewer key={item.id} project={item} copy={copy.detail} staticView onClose={closeProject} />}
              </article>;
            })}</div>
            <div className={styles.selector} role="group" aria-label={copy.controls.select} onKeyDown={selectorKeys}>
              <button type="button" className={styles.arrow} aria-label={copy.controls.previous} onClick={() => selectItem(activeIndex - 1)}><ArrowLeft size={18} aria-hidden="true" /></button>
              <div className={styles.selectorDots}>{items.map((item, index) => <button type="button" key={item.id} data-selector-index={index} tabIndex={index === activeIndex ? 0 : -1} aria-pressed={index === activeIndex} aria-label={`${copy.controls.itemLabel} ${index + 1}: ${"title" in item ? item.title : item.company}`} onClick={() => selectItem(index)} style={{ "--item-accent": accents[index % accents.length] } as CSSProperties}><span /></button>)}</div>
              <button type="button" className={styles.arrow} aria-label={copy.controls.next} onClick={() => selectItem(activeIndex + 1)}><ArrowRight size={18} aria-hidden="true" /></button>
            </div>
            <div className={styles.trackFooter}><bdi>{String(activeIndex + 1).padStart(2, "0")} — {String(items.length).padStart(2, "0")}</bdi><span>{copy.hero.scroll}</span></div>
            {!staticEdition && detailVisible && detailIndex >= 0 && <div className={styles.projectStage}><ProjectViewer key={content.projects[detailIndex].id} project={content.projects[detailIndex]} copy={copy.detail} onClose={closeProject} /></div>}
          </div>
        </section>
        <section className={styles.proof} id="proof" data-chapter="proof" aria-labelledby="proof-title"><span className={styles.anchor} id="capabilities" /><div className={styles.proofViewport}>
          <div className={styles.proofHeading}><p className={styles.eyebrow}>{copy.proof.eyebrow}</p><h2 id="proof-title">{copy.proof.title}</h2></div>
          <div className={styles.proofCopies}>{copy.proof.items.map((proof, index) => <article key={proof.id} id={`proof-${proof.id}`} className={styles.proofCopy} data-proof-copy data-active={index === 0}>
            <p className={styles.proofKicker}><span>0{index + 1}</span>{proof.kicker}</p><h3>{proof.title}</h3><p>{proof.description}</p><ul className={styles.tools}>{proof.technologies.map(tool => <li key={tool}><bdi>{tool}</bdi></li>)}</ul>
            {proof.evidenceHref.startsWith("/") || proof.evidenceHref === "#contact" ? <button type="button" className={styles.textLink} onClick={() => openRelated(proof.evidenceHref)}>{proof.evidenceLabel}<ArrowUpRight size={16} aria-hidden="true" /></button> : <a className={styles.textLink} href={proof.evidenceHref} target="_blank" rel="noreferrer noopener">{proof.evidenceLabel}<ArrowUpRight size={16} aria-hidden="true" /></a>}
          </article>)}</div>
          <nav className={styles.proofRail} aria-label={copy.proof.title}>{copy.proof.items.map((proof, index) => <a key={proof.id} href={`#proof-${proof.id}`} data-proof-index={index} aria-label={proof.title} onClick={event => { if (!staticEdition) { event.preventDefault(); const url = new URL(window.location.href); url.hash = `proof-${proof.id}`; window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`); syncSuffix(); scrollToProof(index, smooth ? "smooth" : "instant"); } }}><span>0{index + 1}</span></a>)}</nav>
        </div></section>
        <section className={styles.recap} id="recap" data-chapter="recap"><p className={styles.eyebrow}>{copy.recap.title}</p><p>{copy.recap.description}</p><a className={styles.textLink} href="#faq">{copy.faq.title}<ArrowDown size={17} aria-hidden="true" /></a></section>
        <section className={styles.faq} id="faq" data-chapter="faq" aria-labelledby="faq-title"><div className={styles.faqHeading}><p className={styles.eyebrow}>{copy.faq.eyebrow}</p><h2 id="faq-title">{copy.faq.title}</h2></div>
          <div className={styles.faqList}>{copy.faq.items.map((faq, index) => <details key={faq.id} className={styles.faqItem} open={enhanced ? openFaq === faq.id : undefined} onToggle={event => { if (!enhanced) return; if (event.currentTarget.open) setOpenFaq(faq.id); else setOpenFaq(current => current === faq.id ? null : current); }}>
            <summary onClick={event => { if (enhanced) { event.preventDefault(); setOpenFaq(current => current === faq.id ? null : faq.id); } }}><span className={styles.faqNumber}>0{index + 1}</span><span>{faq.question}</span><span className={styles.faqIcon} aria-hidden="true">{openFaq === faq.id ? <Minus size={17} /> : <Plus size={17} />}</span></summary>
            <div className={styles.faqAnswer}><p>{faq.answer}</p>{faq.href && (faq.href === "#contact" || faq.href.startsWith("/projects/") ? <button type="button" className={styles.textLink} onClick={() => openRelated(faq.href!)}>{faq.linkLabel}<ArrowUpRight size={15} aria-hidden="true" /></button> : faq.href.startsWith("#") ? <a className={styles.textLink} href={faq.href}>{faq.linkLabel}<ArrowDown size={15} aria-hidden="true" /></a> : <a className={styles.textLink} href={faq.href} target="_blank" rel="noreferrer noopener">{faq.linkLabel}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>
          </details>)}</div>
        </section>
        <section className={styles.fallbackHistory} aria-label={copy.chrome.experience}>{mode === "projects" && <><h2>{copy.chrome.experience}</h2>{content.experience.map(job => <article key={job.id}><p>{job.period}</p><h3>{job.company} — {job.role}</h3><p>{job.summary}</p><ul>{job.highlights.map(line => <li key={line}>{line}</li>)}</ul></article>)}</>}<article><h3>{content.education.title}</h3><p>{content.education.institution}</p><p>{content.education.note}</p><ul>{content.education.languages.map(language => <li key={language}>{language}</li>)}</ul></article>{content.capabilities.map(group => <article key={group.id}><h3>{group.title}</h3><p>{group.description}</p><ul className={styles.tools}>{group.skills.map(skill => <li key={skill}><bdi>{skill}</bdi></li>)}</ul></article>)}</section>
        <footer className={styles.footer}><a className={styles.footerBrand} href="#top"><NMBrandMark aria-hidden="true" /><span>{content.identity.name}</span></a><p>{copy.footer.note}</p><a href="#top">{copy.footer.backToTop}<ArrowUpRight size={15} aria-hidden="true" /></a></footer>
      </main>
      <KineticContactDialog open={contactOpen} onOpenChange={setContactOpen} locale={locale} content={content} />
      {!failed && !reducedMotion && !compactViewport && <button className={styles.readerToggle} type="button" aria-pressed={reader} onClick={() => setReader(value => !value)}>{reader ? copy.chrome.immersive : copy.chrome.reader}{reader && <Check size={12} aria-hidden="true" />}</button>}
      <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{phase === "carousel" ? `${copy.chrome[mode]}: ${"title" in active ? active.title : active.company}, ${activeIndex + 1}/${items.length}` : ""}</p>
    </div>
  );
}
