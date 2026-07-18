export const contactSectionClassNames = {
  root: "section contact relative isolate min-h-0 overflow-hidden border-b border-border bg-background-soft py-[clamp(1.5rem,2.75vw,2.75rem)] [html[data-theme=light]_&]:[background:linear-gradient(rgba(23,26,21,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(23,26,21,0.035)_1px,transparent_1px),rgba(231,227,215,0.86)] [html[data-theme=light]_&]:[background-size:5rem_5rem,5rem_5rem,auto]",
  glow: "contact__glow absolute end-[-10%] bottom-[-35%] -z-10 aspect-square w-[min(75vw,70rem)] rounded-full bg-[radial-gradient(circle,rgba(184,255,69,0.12),transparent_64%)]",
  shell: "page-shell mx-auto w-full max-w-content px-[var(--gutter)]",
  heading: "contact__heading min-w-0",
  eyebrow:
    "flex gap-[1.2rem] font-mono text-[0.65rem] tracking-[0.1em] text-muted-foreground uppercase [html[lang=fa]_&]:[font-family:var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  eyebrowIndex: "text-primary",
  title:
    "mt-[clamp(0.5rem,1.25vw,1.125rem)] max-w-[14ch] text-[clamp(2.8rem,5.25vw,6.3rem)] leading-[0.9] font-[520] tracking-[-0.075em] [html[lang=fa]_&]:max-w-[min(100%,18ch)] [html[lang=fa]_&]:text-[clamp(1.96rem,3.68vw,4.41rem)] [html[lang=fa]_&]:leading-[1.16] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:break-words [html[lang=fa]_&]:text-start [html[lang=fa]_&]:text-balance",
  titleAccent: "block text-primary",
  layout:
    "contact__layout mt-[clamp(1rem,2.25vw,2.25rem)] grid grid-cols-[minmax(15rem,0.65fr)_minmax(0,1.35fr)] gap-[clamp(0.75rem,2vw,2.5rem)] max-[54rem]:mt-4 max-[54rem]:grid-cols-1 max-[54rem]:gap-[0.65rem]",
  layoutCell: "min-w-0",
  aside: "contact__aside min-w-0",
  description:
    "max-w-[24rem] text-base leading-[1.72] text-[var(--muted-bright)]",
  availability:
    "contact__availability mt-2 flex items-start gap-4 border-t border-border pt-[0.35rem]",
  statusDot:
    "status-dot relative mt-1 inline-block size-2 shrink-0 rounded-full bg-primary shadow-[0_0_14px_rgba(184,255,69,0.7)] after:absolute after:-inset-[0.3rem] after:rounded-[inherit] after:border after:border-[rgba(184,255,69,0.36)] after:content-[''] after:[animation:status-pulse_2.4s_ease-out_infinite] motion-reduce:after:animate-none forced-colors:[forced-color-adjust:none]",
  availabilityCopy: "grid gap-[0.3rem]",
  availabilityTitle: "text-[0.8rem] font-[560]",
  availabilityLocation: "font-mono text-[0.58rem] text-muted-foreground",
} as const;
