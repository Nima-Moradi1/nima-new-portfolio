const pageShell = "page-shell mx-auto w-full max-w-content px-[var(--gutter)]";

const sectionFrame = "border-b border-border py-[clamp(6rem,11vw,11rem)]";

const localizedLabel =
  "[html[lang=fa]_&]:[font-family:var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case";

const localizedDisplay =
  "[html[lang=fa]_&]:max-w-[min(100%,18ch)] [html[lang=fa]_&]:leading-[1.16] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:break-words [html[lang=fa]_&]:text-start [html[lang=de]_&]:hyphens-auto [html[lang=de]_&]:[overflow-wrap:break-word]";

export const xoArenaPageClassNames = {
  skipLink:
    "skip-link fixed top-3 start-3 z-[1000] -translate-y-[160%] rounded-sm bg-primary px-4 py-[0.8rem] font-bold text-primary-foreground transition-transform duration-[var(--duration-fast)] ease-expressive focus:translate-y-0 motion-reduce:transition-none",
  root: "xo-case bg-background",
  hero: "xo-case__hero relative min-h-svh overflow-hidden border-b border-border pt-[calc(var(--header-height)+3rem)] pb-[clamp(5rem,9vw,8rem)] max-[38rem]:pt-[calc(var(--header-height)+2rem)]",
  heroGrid: "xo-case__grid pointer-events-none absolute inset-0",
  shell: pageShell,
  heroShell: `${pageShell} relative z-1`,
  back: `xo-case__back inline-flex items-center gap-[0.55rem] font-mono text-[0.62rem] tracking-[0.08em] text-muted-foreground uppercase transition-colors duration-[var(--duration-fast)] hover:text-primary ${localizedLabel}`,
  heroCopy:
    "xo-case__hero-copy mt-[clamp(3.5rem,8vw,7rem)] grid min-w-0 grid-cols-[minmax(0,1.28fr)_minmax(20rem,0.72fr)] items-end gap-[clamp(3rem,8vw,9rem)] max-[54rem]:grid-cols-1 max-[54rem]:gap-10 max-[38rem]:mt-12",
  heroCopyCell: "min-w-0",
  eyebrow: `xo-case__eyebrow flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.1em] text-primary uppercase ${localizedLabel}`,
  eyebrowIndex:
    "grid size-8 place-items-center rounded-full border border-line-strong",
  heroTitle: `mt-[1.3rem] max-w-[11ch] text-[clamp(4rem,8.3vw,9.2rem)] leading-[0.86] font-[520] tracking-[-0.075em] text-balance max-[54rem]:text-[clamp(3.8rem,13vw,7rem)] max-[38rem]:text-[clamp(3.4rem,16vw,5.5rem)] ${localizedDisplay} [html[lang=fa]_&]:text-[clamp(2.8rem,5.81vw,6.44rem)] [html[lang=fa]_&]:max-[54rem]:text-[clamp(2.66rem,9.1vw,4.9rem)] [html[lang=fa]_&]:max-[38rem]:text-[clamp(2.38rem,11.2vw,3.85rem)]`,
  intro: "xo-case__intro min-w-0",
  introCopy:
    "text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.7] text-[var(--muted-bright)]",
  availability: `xo-case__availability mt-6 flex items-center gap-[0.65rem] font-mono text-[0.58rem] tracking-[0.06em] text-muted-foreground uppercase ${localizedLabel}`,
  availabilityDot:
    "size-[0.46rem] shrink-0 rounded-full bg-primary shadow-[0_0_1rem_var(--signal)] forced-colors:[forced-color-adjust:none]",
  system: `xo-system ${sectionFrame} bg-background-soft`,
  sectionHeading:
    "xo-section-heading mb-[clamp(4rem,7vw,7rem)] grid min-w-0 grid-cols-[minmax(12rem,0.52fr)_minmax(0,1.48fr)] gap-[clamp(2rem,7vw,8rem)] max-[54rem]:grid-cols-1 max-[54rem]:gap-10",
  sectionEyebrow: `pt-[0.6rem] font-mono text-[0.62rem] tracking-[0.09em] text-primary uppercase ${localizedLabel}`,
  sectionCopy: "min-w-0",
  sectionTitle: `max-w-[14ch] text-[clamp(3rem,5.8vw,6.5rem)] leading-[0.94] font-[520] tracking-[-0.065em] text-balance max-[38rem]:text-[clamp(2.8rem,13vw,4.4rem)] ${localizedDisplay} [html[lang=fa]_&]:text-[clamp(2.1rem,4.06vw,4.55rem)] [html[lang=fa]_&]:max-[38rem]:text-[clamp(1.96rem,9.1vw,3.08rem)]`,
  sectionDescription:
    "mt-6 max-w-[45rem] text-base leading-[1.7] text-muted-foreground",
  systemGrid:
    "xo-system__grid grid grid-cols-3 border-t border-s border-border max-[54rem]:grid-cols-2 max-[38rem]:grid-cols-1",
  signalCard:
    "min-h-72 border-e border-b border-border p-[clamp(1.5rem,3vw,2.5rem)] transition-colors duration-[var(--duration-base)] hover:bg-[color-mix(in_srgb,var(--signal)_4%,transparent)] max-[38rem]:min-h-60 motion-reduce:transition-none",
  signalHeader: "flex items-center justify-between text-primary",
  signalIndex: "font-mono text-[0.56rem]",
  signalTitle:
    "mt-16 text-[1.45rem] font-[560] tracking-[-0.035em] max-[38rem]:mt-12 [html[lang=fa]_&]:max-w-[24ch] [html[lang=fa]_&]:leading-[1.25] [html[lang=fa]_&]:tracking-normal [html[lang=de]_&]:hyphens-auto [html[lang=de]_&]:[overflow-wrap:break-word]",
  signalText: "mt-[0.8rem] text-[0.86rem] leading-[1.65] text-muted-foreground",
  technologyList: "xo-tech mt-8 flex flex-wrap gap-[0.6rem]",
  technologyBadge:
    "h-auto rounded-full border-border bg-transparent px-[0.78rem] py-[0.58rem] font-mono text-[0.58rem] font-normal text-[var(--muted-bright)] [unicode-bidi:plaintext]",
  latinToken: "font-mono [direction:ltr] [unicode-bidi:isolate]",
  gallery: `xo-gallery ${sectionFrame}`,
  galleryGrid:
    "xo-gallery__grid grid grid-cols-2 gap-[clamp(1.2rem,2vw,2rem)] max-[54rem]:grid-cols-1",
  deployment: `xo-deployment ${sectionFrame}`,
  deploymentLayout: `${pageShell} xo-deployment__layout grid min-w-0 grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] gap-[clamp(3rem,9vw,10rem)] max-[54rem]:grid-cols-1 max-[54rem]:gap-10`,
  deploymentHeading: "min-w-0",
  deploymentTitle: `mt-[1.2rem] max-w-[14ch] text-[clamp(3rem,5.8vw,6.5rem)] leading-[0.94] font-[520] tracking-[-0.065em] text-balance max-[38rem]:text-[clamp(2.8rem,13vw,4.4rem)] ${localizedDisplay} [html[lang=fa]_&]:text-[clamp(2.1rem,4.06vw,4.55rem)] [html[lang=fa]_&]:max-[38rem]:text-[clamp(1.96rem,9.1vw,3.08rem)]`,
  deploymentCopy:
    "min-w-0 border-s border-border ps-[clamp(1.5rem,4vw,4rem)] max-[54rem]:border-s-0 max-[54rem]:border-t max-[54rem]:pt-8 max-[54rem]:ps-0",
  deploymentParagraph:
    "text-[clamp(1rem,1.35vw,1.18rem)] leading-[1.75] text-[var(--muted-bright)]",
  deploymentParagraphMuted: "mt-6 text-muted-foreground",
  next: `xo-next ${sectionFrame} text-center`,
  nextShell: `${pageShell} grid justify-items-center`,
  nextTitle: `mt-4 max-w-[14ch] text-[clamp(3rem,5.8vw,6.5rem)] leading-[0.94] font-[520] tracking-[-0.065em] text-balance max-[38rem]:text-[clamp(2.8rem,13vw,4.4rem)] ${localizedDisplay} [html[lang=fa]_&]:text-[clamp(2.1rem,4.06vw,4.55rem)] [html[lang=fa]_&]:max-[38rem]:text-[clamp(1.96rem,9.1vw,3.08rem)]`,
  nextActions: "mt-10 flex flex-wrap justify-center gap-[0.8rem]",
  nextLink:
    "h-auto min-h-[3.2rem] gap-[1.1rem] rounded-full border-line-strong bg-transparent py-3 ps-[1.2rem] pe-4 text-[0.72rem] font-normal text-foreground hover:bg-transparent hover:text-foreground [&_svg]:size-[17px]",
  nextPrimaryLink:
    "border-primary bg-primary font-[650] text-primary-foreground hover:bg-primary hover:text-primary-foreground",
} as const;
