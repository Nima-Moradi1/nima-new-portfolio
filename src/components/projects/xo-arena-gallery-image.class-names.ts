export const xoArenaGalleryImageClassNames = {
  root: "xo-gallery-card group/gallery min-w-0 overflow-hidden rounded-lg border border-border bg-card shadow-soft",
  media:
    "xo-gallery-card__media relative aspect-[1.68] overflow-hidden bg-background-soft",
  image:
    "block size-full scale-[1.015] object-cover opacity-0 [direction:ltr] [transition:opacity_620ms_ease,transform_900ms_var(--ease-out)] group-data-[loaded=true]/gallery:scale-100 group-data-[loaded=true]/gallery:opacity-100 motion-reduce:transition-none",
  skeleton:
    "xo-gallery-card__skeleton absolute inset-0 animate-none rounded-none bg-transparent group-data-[loaded=true]/gallery:invisible group-data-[loaded=true]/gallery:opacity-0 motion-reduce:transition-none",
  caption:
    "grid grid-cols-[2.4rem_1fr] gap-4 border-t border-border p-[clamp(1.3rem,2.5vw,2rem)] max-[38rem]:grid-cols-1",
  index: "font-mono text-[0.58rem] text-primary [unicode-bidi:plaintext]",
  copy: "min-w-0",
  title:
    "text-[1.3rem] font-[560] tracking-[-0.035em] [html[lang=fa]_&]:max-w-[24ch] [html[lang=fa]_&]:leading-[1.25] [html[lang=fa]_&]:tracking-normal [html[lang=de]_&]:hyphens-auto [html[lang=de]_&]:[overflow-wrap:break-word]",
  description:
    "mt-[0.65rem] text-[0.82rem] leading-[1.62] text-muted-foreground",
} as const;
