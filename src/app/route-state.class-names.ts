export const routeStateClassNames = {
  loading:
    "route-loading grid min-h-svh place-content-center gap-[1.2rem] bg-background p-[var(--gutter)] text-center",
  loadingCore:
    "route-loading__core mx-auto aspect-square w-14 rounded-full bg-primary shadow-[0_0_3rem_color-mix(in_srgb,var(--signal)_50%,transparent)] [animation:status-pulse_1.5s_ease-in-out_infinite] motion-reduce:animate-none",
  loadingLabel:
    "font-mono text-[0.68rem] tracking-[0.1em] text-primary uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  message:
    "route-message grid min-h-svh place-content-center gap-[1.2rem] bg-background p-[var(--gutter)] text-center",
  eyebrow:
    "font-mono text-[0.68rem] tracking-[0.1em] text-primary uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  title:
    "max-w-[14ch] text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] font-[520] tracking-[-0.06em] [html[lang=fa]_&]:max-w-[min(100%,18ch)] [html[lang=fa]_&]:text-[clamp(1.96rem,4.9vw,4.2rem)] [html[lang=fa]_&]:leading-[1.16] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:text-start [html[lang=fa]_&]:break-words",
  description: "mx-auto max-w-[35rem] text-muted-foreground",
  link: "justify-self-center text-primary underline underline-offset-[0.3rem]",
  button:
    "inline-flex min-h-[3.6rem] items-center justify-center justify-self-center gap-[1.4rem] rounded-full border-0 bg-primary py-[0.9rem] ps-[1.4rem] pe-[1.1rem] text-[0.78rem] font-[680] text-primary-foreground transition-[background-color,transform] duration-[var(--duration-fast)] ease-expressive hover:-translate-y-[0.15rem] hover:bg-signal-soft motion-reduce:transform-none motion-reduce:transition-none",
} as const;
