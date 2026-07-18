export const siteFooterClassNames = {
  root: "site-footer grid grid-cols-[1fr_auto_1fr] items-center gap-8 bg-background px-[var(--gutter)] py-[2.4rem] [data-theme=light]_&:bg-[rgba(240,238,229,0.82)] max-[38rem]:grid-cols-1 max-[38rem]:justify-items-center",
  mark: "site-footer__mark block size-[2.6rem] overflow-hidden rounded-full border border-line-strong bg-background-soft",
  markImage: "size-full object-cover object-center",
  copy: "text-center font-mono text-[0.58rem] leading-[1.7] tracking-[0.06em] text-muted-foreground uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  links:
    "site-footer__links flex min-w-0 max-w-full flex-wrap items-center justify-end gap-2 justify-self-end max-[38rem]:justify-center max-[38rem]:justify-self-center",
  link: "relative grid min-h-9 min-w-9 place-items-center rounded-full border border-transparent px-2 text-[0.66rem] text-[var(--muted-bright)] hover:border-line-strong hover:text-primary",
  linkIcon: "size-3.5",
} as const;
