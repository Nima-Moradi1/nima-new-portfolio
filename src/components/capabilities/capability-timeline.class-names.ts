export const capabilityTimelineClassNames = {
  root: "capability-timeline relative h-auto min-h-0 pb-[clamp(1.25rem,2.25vw,2rem)] min-[54.01rem]:pb-2",
  stage:
    "capability-timeline__stage relative isolate h-auto min-h-0 touch-pan-y overflow-clip pt-[calc(var(--header-height)+1.5rem)] pb-[1.1rem] focus-visible:outline-2 focus-visible:-outline-offset-[0.6rem] focus-visible:outline-primary min-[54.01rem]:pt-[calc(var(--header-height)+3rem)] min-[54.01rem]:pb-2",
  chrome:
    "capability-timeline__chrome page-shell pointer-events-none absolute inset-x-0 top-8 z-4 mx-auto flex w-full max-w-content items-center justify-between gap-8 px-[var(--gutter)] min-[54.01rem]:top-[calc(var(--header-height)-64px)]",
  chromeLabel:
    "font-mono text-[0.6rem] tracking-[0.1em] text-primary uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  chromeDescription:
    "mt-[0.4rem] text-[0.76rem] text-muted-foreground max-[38rem]:hidden",
  controls:
    "capability-timeline__controls pointer-events-auto flex items-center gap-[0.45rem]",
  controlButton:
    "size-[2.7rem] cursor-pointer rounded-full border-border bg-surface p-0 hover:border-primary hover:bg-surface hover:text-primary disabled:cursor-not-allowed disabled:opacity-30",
  counter:
    "flex min-w-[7.4rem] items-center justify-center gap-[0.65rem] font-mono text-[0.62rem] text-muted-foreground max-[38rem]:min-w-[5.6rem]",
  activeCount: "text-primary",
  counterRule: "h-px w-[1.8rem] bg-line-strong max-[38rem]:w-4",
  viewport:
    "capability-timeline__viewport relative z-2 min-h-[34rem] overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-color:var(--signal)_transparent] [scroll-snap-type:x_mandatory] min-[54.01rem]:min-h-[27rem]",
  track:
    "capability-timeline__track flex min-h-[34rem] w-max list-none items-center gap-[clamp(0.85rem,1.4vw,1.4rem)] px-[var(--gutter)] [will-change:auto] min-[54.01rem]:min-h-[27rem]",
  item: "capability-timeline__item h-[clamp(21rem,50vh,27rem)] w-[clamp(19rem,27vw,23.5rem)] min-w-0 basis-[clamp(19rem,27vw,23.5rem)] shrink-0 snap-center max-[54rem]:h-full max-[54rem]:w-[min(86vw,36rem)] max-[54rem]:basis-[min(86vw,36rem)] max-[38rem]:w-[86vw] max-[38rem]:basis-[86vw]",
  card: "capability-row capability-timeline__card grid h-full min-h-0 grid-cols-1 grid-rows-[auto_auto_minmax(0,1fr)] content-start gap-[clamp(0.75rem,1.5vh,1rem)] overflow-auto overscroll-contain rounded-lg border border-border p-[clamp(1rem,1.5vw,1.35rem)] shadow-soft max-[54rem]:gap-[clamp(1rem,2.4vh,1.7rem)] max-[54rem]:p-[clamp(1.15rem,4vw,1.8rem)]",
  node: "capability-timeline__node grid size-[2.35rem] place-items-center rounded-full border border-[color-mix(in_srgb,var(--signal)_55%,transparent)] font-mono text-[0.62rem] text-primary shadow-[0_0_0_0.4rem_color-mix(in_srgb,var(--signal)_4%,transparent),0_0_1.4rem_color-mix(in_srgb,var(--signal)_12%,transparent)]",
  copyLabel:
    "font-mono text-[0.58rem] tracking-[0.08em] text-primary uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  copyTitle:
    "mt-[0.38rem] text-[clamp(1.4rem,2vw,2.1rem)] leading-[0.95] font-[530] tracking-[-0.06em] capitalize max-[54rem]:text-[clamp(1.9rem,7vw,3.3rem)] [html[lang=fa]_&]:max-w-[24ch] [html[lang=fa]_&]:[overflow-wrap:anywhere] [html[lang=fa]_&]:text-[clamp(0.98rem,1.4vw,1.47rem)] [html[lang=fa]_&]:leading-[1.25] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case max-[54rem]:[html[lang=fa]_&]:text-[clamp(1.33rem,4.9vw,2.31rem)]",
  copyDescription:
    "mt-[0.55rem] max-w-[38rem] text-[clamp(0.72rem,0.82vw,0.82rem)] leading-[1.5] text-muted-foreground",
  skills:
    "grid list-none grid-cols-2 content-start self-end border-t border-s border-border max-[54rem]:grid-cols-3",
  skill:
    "grid min-h-[2.35rem] place-items-center border-e border-b border-border p-[0.4rem] text-center text-[clamp(0.64rem,0.7vw,0.74rem)] leading-[1.25] text-[var(--muted-bright)] transition-colors duration-[var(--duration-fast)] hover:bg-accent hover:text-signal-soft max-[38rem]:min-h-12 max-[38rem]:[overflow-wrap:anywhere] max-[38rem]:px-[0.3rem] max-[38rem]:py-[0.48rem] max-[38rem]:text-[clamp(0.64rem,2.6vw,0.78rem)]",
  education:
    "education-card capability-timeline__education grid h-full grid-cols-[3.25rem_minmax(0,1fr)] grid-rows-[auto_1fr] content-center items-center gap-4 rounded-lg border border-border p-[clamp(1rem,1.5vw,1.35rem)] shadow-soft max-[54rem]:grid-cols-[5rem_minmax(0,1fr)] max-[38rem]:grid-cols-1 max-[38rem]:grid-rows-[auto_auto_1fr]",
  educationSignal:
    "education-card__signal relative grid aspect-square w-12 place-items-center max-[54rem]:w-20",
  signalCore:
    "absolute size-4 rounded-full border border-[rgba(184,255,69,0.4)] bg-primary shadow-[0_0_1.5rem_rgba(184,255,69,0.42)]",
  signalMiddle:
    "absolute size-8 rounded-full border border-[rgba(184,255,69,0.4)] max-[54rem]:size-12",
  signalOuter:
    "absolute size-12 rounded-full border border-[rgba(184,255,69,0.4)] opacity-35 max-[54rem]:size-20",
  educationLabel:
    "font-mono text-[0.6rem] tracking-[0.08em] text-primary uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  educationTitle: "mt-[0.6rem] text-[1.2rem] font-[560]",
  educationInstitution:
    "mt-[0.4rem] text-[0.88rem] leading-[1.62] text-muted-foreground",
  educationDetails:
    "education-card__details col-span-full self-end border-t border-border pt-[clamp(0.9rem,1.5vh,1.25rem)] max-[38rem]:col-auto",
  educationNote: "text-[0.88rem] leading-[1.62] text-muted-foreground",
  languages: "mt-4 flex list-none flex-wrap gap-[0.55rem]",
  language:
    "rounded-full border border-border px-[0.68rem] py-[0.48rem] font-mono text-[0.58rem] tracking-[0.03em] text-[var(--muted-bright)]",
  steps: "capability-timeline__steps hidden",
} as const;
