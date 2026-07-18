export const aboutSectionClassNames = {
  root: "section about relative border-b border-border py-[clamp(1.5rem,2.75vw,2.75rem)] [--about-glow-position:12%] [background:radial-gradient(circle_at_var(--about-glow-position)_30%,rgba(169,140,255,0.08),transparent_28%),var(--ink-soft)] rtl:[--about-glow-position:88%] [html[data-theme=light]_&]:[background:radial-gradient(circle_at_var(--about-glow-position)_30%,rgba(105,72,200,0.1),transparent_28%),linear-gradient(rgba(23,26,21,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(23,26,21,0.035)_1px,transparent_1px),rgba(231,227,215,0.84)] [html[data-theme=light]_&]:[background-size:auto,5rem_5rem,5rem_5rem,auto]",
  shell: "page-shell mx-auto w-full max-w-content px-[var(--gutter)]",
  body: "about__body grid grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)] gap-[clamp(0.65rem,1.25vw,1.5rem)] max-[54rem]:grid-cols-1 max-[54rem]:gap-[0.65rem]",
  statement: "about__statement min-w-0",
  statementText:
    "max-w-[20ch] text-[clamp(1.55rem,2.35vw,2.7rem)] leading-[1.12] font-[480] tracking-[-0.045em] [html[lang=fa]_&]:max-w-[24ch] [html[lang=fa]_&]:leading-[1.25] [html[lang=fa]_&]:tracking-normal",
  coordinate:
    "about__coordinate mt-2 flex items-center gap-[0.8rem] font-mono text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase",
  coordinateAccent: "text-primary",
  portrait:
    "about__portrait mt-2 w-[min(100%,17rem)] overflow-hidden rounded-lg border border-line-strong bg-[rgba(255,255,255,0.025)] [html[data-theme=light]_&]:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_1.5rem_4rem_rgba(58,48,29,0.13)]",
  portraitImage:
    "block aspect-square h-auto w-full object-cover [direction:ltr] [filter:saturate(0.82)_contrast(1.04)]",
  portraitCaption:
    "flex items-center justify-between gap-4 border-t border-border px-4 py-[0.85rem] font-mono text-[0.58rem] tracking-[0.08em] text-muted-foreground uppercase",
  portraitName: "text-signal-soft",
  details:
    "about__details grid grid-cols-2 content-stretch border-s border-t border-border max-[38rem]:grid-cols-1",
  detailCell: "min-w-0 border-e border-b border-border",
  narrative:
    "about__narrative grid min-w-0 content-center border-e border-b border-border bg-[color-mix(in_srgb,var(--signal)_3%,transparent)] p-[clamp(0.65rem,0.9vw,0.9rem)]",
  narrativeParagraph:
    "text-[clamp(0.92rem,1.1vw,1.05rem)] leading-[1.65] text-[var(--muted-bright)]",
  principleCard:
    "principle-card h-full min-h-[8.5rem] p-[clamp(0.65rem,0.9vw,0.9rem)] [transition:background-color_var(--duration-base)_ease] hover:bg-[rgba(184,255,69,0.04)]",
  principleIndex:
    "mb-[clamp(0.45rem,0.75vw,0.75rem)] block font-mono text-[0.62rem] text-primary max-[54rem]:mb-3",
  principleTitle: "mb-1 text-[1.22rem] font-[560] tracking-[-0.025em]",
  principleText:
    "max-w-[28rem] text-[0.9rem] leading-[1.65] text-muted-foreground",
} as const;
