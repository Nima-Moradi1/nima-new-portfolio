export const heroSectionClassNames = {
  root: "hero relative isolate min-h-svh overflow-hidden border-b border-border",
  grid: "hero__grid absolute inset-0 -z-20 opacity-[0.28] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:min(8vw,8rem)_min(8vw,8rem)] [mask-image:linear-gradient(to_bottom,black_5%,transparent_90%)]",
  glow: "hero__glow absolute top-[5%] end-[-5%] -z-10 aspect-square w-[min(62vw,58rem)] rounded-full bg-[radial-gradient(circle,rgba(184,255,69,0.12),transparent_63%)] blur-[12px]",
  content:
    "hero__content page-shell mx-auto flex min-h-svh w-full max-w-content flex-col px-[var(--gutter)] pt-[calc(var(--header-height)+0.55rem)] pb-[0.45rem] max-[54rem]:pt-[calc(var(--header-height)+1.4rem)]",
  status:
    "hero__status mb-5 inline-flex max-w-full items-center self-start font-mono text-[0.68rem] leading-normal tracking-[0.12em] text-[var(--muted-bright)] uppercase max-[38rem]:max-w-[80%] max-[38rem]:leading-[1.5] [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.78rem,0.9vw,0.92rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:font-bold [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case max-[38rem]:[html[lang=fa]_&]:max-w-full",
  statusDot:
    "status-dot relative me-[0.6rem] inline-block size-2 shrink-0 rounded-full bg-primary shadow-[0_0_14px_rgba(184,255,69,0.7)] after:absolute after:-inset-[0.3rem] after:rounded-[inherit] after:border after:border-[rgba(184,255,69,0.36)] after:content-[''] after:[animation:status-pulse_2.4s_ease-out_infinite] motion-reduce:after:animate-none",
  layout:
    "hero__layout grid min-w-0 flex-1 grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)] items-center gap-[clamp(3.5rem,5vw,6.5rem)] py-[clamp(0.5rem,1.25vh,1.125rem)] max-[72rem]:grid-cols-[minmax(0,0.78fr)_minmax(29rem,1.22fr)] max-[72rem]:gap-12 max-[54rem]:grid-cols-1 max-[54rem]:items-start max-[54rem]:gap-4",
  copy: "hero__copy hero__copy--edge-offset relative z-2 min-w-0 max-w-[53rem] min-[87.5rem]:-ms-14 max-[54rem]:max-w-none",
  role: "hero__role mb-[0.35rem] font-mono text-[clamp(0.68rem,0.9vw,0.82rem)] tracking-[0.12em] text-primary uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  title:
    "max-w-[12ch] text-[clamp(3.8rem,6.4vw,7.4rem)] leading-[0.88] font-[560] tracking-[-0.075em] text-balance max-[72rem]:text-[clamp(3.8rem,7.2vw,5.9rem)] max-[54rem]:max-w-[11ch] max-[54rem]:text-[clamp(3.45rem,11.5vw,5.7rem)] max-[38rem]:text-[clamp(3.15rem,15vw,4.8rem)] [html[lang=fa]_&]:max-w-[min(100%,18ch)] [html[lang=fa]_&]:text-[clamp(2.66rem,4.48vw,5.18rem)] [html[lang=fa]_&]:leading-[1.16] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:text-start [html[lang=fa]_&]:break-words max-[72rem]:[html[lang=fa]_&]:text-[clamp(2.66rem,5.04vw,4.13rem)] max-[54rem]:[html[lang=fa]_&]:text-[clamp(2.42rem,8.05vw,3.99rem)] max-[54rem]:[html[lang=fa]_&]:leading-[1.14] max-[38rem]:[html[lang=fa]_&]:text-[clamp(2.21rem,10.5vw,3.36rem)]",
  titleOutline:
    "block text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--paper)_58%,transparent)]",
  intro:
    "hero__intro mt-[clamp(0.45rem,0.9vh,0.75rem)] max-w-[39rem] text-[clamp(1rem,1.35vw,1.24rem)] leading-[1.62] text-[var(--muted-bright)] max-[38rem]:text-[0.95rem]",
  actions:
    "hero__actions mt-2 flex flex-wrap gap-[0.8rem] max-[38rem]:w-full [&_.magnetic-link]:max-[38rem]:w-full",
  workstation:
    "hero__workstation relative! min-h-[clamp(34rem,65vh,47rem)] min-w-0 self-stretch min-[72.01rem]:translate-x-[clamp(1.5rem,2.6vw,3.25rem)] rtl:min-[72.01rem]:translate-x-[clamp(-3.25rem,-2.6vw,-1.5rem)] max-[54rem]:min-h-[min(64svh,40rem)] max-[38rem]:min-h-[31rem]",
  footer:
    "hero__footer flex items-end justify-between gap-2 border-t border-border pt-1 max-[54rem]:flex-col max-[54rem]:items-start",
  scrollCue:
    "hero__scroll-cue inline-flex items-center gap-[0.55rem] font-mono text-[0.62rem] tracking-[0.08em] text-muted-foreground uppercase [&_svg]:text-primary [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  signals:
    "hero__signals flex flex-wrap justify-end gap-[clamp(0.25rem,0.55vw,0.6rem)] max-[54rem]:justify-start",
  signal: "grid gap-[0.15rem] text-[0.72rem] max-[38rem]:nth-[n+3]:hidden",
  signalIndex: "font-mono text-[0.52rem] text-muted-foreground",
} as const;
