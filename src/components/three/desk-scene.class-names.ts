export const deskSceneClassNames = {
  pullTarget:
    "desk-lamp__pull-target block h-14 w-12 cursor-grab touch-none select-none active:cursor-grabbing",
  pullHandCopy:
    "lamp-pull-hand-copy inline-flex items-center whitespace-nowrap rounded-full border border-[color-mix(in_srgb,var(--signal)_68%,transparent)] bg-[color-mix(in_srgb,var(--floating-surface)_90%,transparent)] px-[0.42rem] py-[0.28rem] font-mono text-[0.43rem] leading-none tracking-[0.08em] text-primary uppercase shadow-[0_0_0.8rem_var(--signal-wash)] backdrop-blur-sm",
  resumeHint:
    "resume-touch-hint pointer-events-none relative grid size-[1.4rem] place-items-center rounded-full border border-[color-mix(in_srgb,var(--signal)_72%,transparent)] bg-[color-mix(in_srgb,var(--ink)_82%,transparent)] text-primary shadow-[0_0_0.8rem_color-mix(in_srgb,var(--signal)_28%,transparent),inset_0_1px_color-mix(in_srgb,var(--paper)_16%,transparent)]",
} as const;
