export const xoArenaLoadingClassNames = {
  root: "xo-route-loading grid min-h-svh place-content-center gap-6 bg-background text-center",
  board:
    "mx-auto grid aspect-square w-36 grid-cols-3 border border-line-strong",
  cell: "grid place-items-center border border-border text-[1.2rem] font-bold text-primary",
  label:
    "font-mono text-[0.62rem] tracking-[0.08em] text-muted-foreground uppercase [html[lang=fa]_&]:[font-family:var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
} as const;
