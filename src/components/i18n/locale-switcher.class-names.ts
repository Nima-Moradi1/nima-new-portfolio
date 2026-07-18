export const localeSwitcherClassNames = {
  root: "locale-switcher isolate inline-flex min-h-[2.35rem] items-center gap-[0.15rem] rounded-full border border-border bg-[color-mix(in_srgb,var(--floating-surface)_84%,transparent)] p-[0.2rem] [direction:ltr] [unicode-bidi:isolate] backdrop-blur-[10px] max-[38rem]:gap-[0.05rem] max-[38rem]:p-[0.15rem]",
  icon: "ms-[0.3rem] me-[0.15rem] text-muted-foreground max-[38rem]:hidden",
  currentLabel: "sr-only",
  link: "grid min-h-[1.85rem] min-w-[1.85rem] place-items-center rounded-full px-[0.3rem] font-mono text-[0.54rem] font-[650] tracking-[0.03em] text-[var(--muted-bright)] transition-colors duration-[var(--duration-fast)] hover:text-signal-soft aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground max-[38rem]:min-h-[1.75rem] max-[38rem]:min-w-[1.55rem] max-[38rem]:px-[0.15rem] motion-reduce:transition-none",
} as const;
