const localizedLabel =
  "[html[lang=fa]_&]:[font-family:var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case";

export const xoArenaVideoClassNames = {
  root: "xo-video group/video relative isolate mt-[clamp(3rem,7vw,6rem)] overflow-hidden rounded-[clamp(1rem,2.2vw,1.8rem)] border border-line-strong bg-[#07101c] shadow-[0_3rem_8rem_rgba(0,0,0,0.36)]",
  video:
    "block aspect-[1166/720] w-full bg-[#07101c] object-cover opacity-0 [direction:ltr] transition-opacity duration-[520ms] ease-expressive group-data-[ready=true]/video:opacity-100 motion-reduce:transition-none",
  loading:
    "xo-video__loading absolute inset-0 z-1 grid place-content-center gap-[0.8rem] text-center transition-[opacity,visibility] duration-[420ms] group-data-[ready=true]/video:invisible group-data-[ready=true]/video:opacity-0 motion-reduce:transition-none",
  spinner:
    "mx-auto aspect-square w-[2.2rem] animate-spin rounded-full border border-line-strong border-t-primary [animation-duration:900ms] motion-reduce:animate-none",
  loadingLabel: `font-mono text-[0.56rem] tracking-[0.08em] text-muted-foreground uppercase ${localizedLabel}`,
  progressTrack:
    "mx-auto grid h-px w-[min(42vw,14rem)] overflow-hidden bg-line-strong",
  progressIndicator:
    "block h-full justify-self-start bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none",
  chrome: `xo-video__chrome pointer-events-none absolute top-4 inset-x-4 z-3 flex justify-between gap-4 font-mono text-[0.56rem] tracking-[0.08em] text-muted-foreground uppercase ${localizedLabel}`,
  chromeBadge:
    "rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(7,16,28,0.76)] px-[0.58rem] py-[0.42rem] text-[rgba(255,255,255,0.72)] backdrop-blur-[10px] [unicode-bidi:plaintext]",
  chromeDimensions: "max-[38rem]:hidden",
} as const;
