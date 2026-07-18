export const siteFooterClassNames = {
  root: "site-footer grid grid-cols-[1fr_auto_1fr] items-center gap-8 bg-background px-[var(--gutter)] py-[2.4rem] [data-theme=light]_&:bg-[rgba(240,238,229,0.82)] max-[38rem]:grid-cols-1 max-[38rem]:justify-items-center",
  mark: "site-footer__mark grid size-[2.6rem] place-items-center rounded-full border border-line-strong font-mono text-[0.72rem] tracking-[-0.04em] text-primary [direction:ltr] [unicode-bidi:isolate]",
  copy: "text-center font-mono text-[0.58rem] leading-[1.7] tracking-[0.06em] text-muted-foreground uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  links:
    "site-footer__links flex min-w-0 max-w-full flex-wrap justify-end gap-[1.2rem] justify-self-end max-[38rem]:justify-center max-[38rem]:justify-self-center",
  link: "relative py-[0.35rem] text-[0.66rem] text-[var(--muted-bright)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-[var(--underline-rest-origin)] after:scale-x-0 after:bg-primary after:content-[''] after:transition-transform after:duration-[var(--duration-base)] after:ease-expressive hover:after:origin-[var(--underline-active-origin)] hover:after:scale-x-100 motion-reduce:after:transition-none",
} as const;
