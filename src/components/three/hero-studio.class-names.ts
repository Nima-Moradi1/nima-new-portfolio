export const heroStudioClassNames = {
  root: "hero-studio grid h-full min-h-[inherit] grid-rows-[minmax(0,1fr)]",
  viewport:
    "hero-studio__viewport relative isolate min-h-[30rem] overflow-hidden rounded-[clamp(1rem,2vw,1.7rem)] border border-line-strong max-[54rem]:min-h-[min(56svh,35rem)] max-[38rem]:min-h-[25rem]",
  status:
    "hero-studio__status pointer-events-none absolute top-4 inset-x-4 z-3 flex items-center justify-between gap-4 font-mono text-[0.58rem] tracking-[0.09em] text-[var(--muted-bright)] uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  statusChip:
    "inline-flex items-center gap-2 rounded-full border border-border bg-[color-mix(in_srgb,var(--floating-surface)_88%,transparent)] px-[0.58rem] py-[0.42rem] backdrop-blur-[10px]",
  statusFile:
    "[direction:ltr] [unicode-bidi:isolate] max-[38rem]:hidden [font-family:var(--font-geist-mono),monospace]",
  statusCode:
    "before:size-[0.38rem] before:rounded-full before:bg-primary before:shadow-[0_0_0.8rem_var(--signal)] before:content-[''] before:[animation:status-pulse_2.4s_ease-out_infinite] motion-reduce:before:animate-none",
  statusInteraction: "[&_svg]:text-primary",
} as const;
