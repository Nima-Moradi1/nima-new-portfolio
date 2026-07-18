const orbitBase =
  "absolute rounded-full border after:absolute after:top-[8%] after:start-[12%] after:aspect-square after:w-[0.72rem] after:rounded-full after:content-[''] motion-reduce:animate-none";

export const landingPreloaderClassNames = {
  shell: "landing-shell group/landing",
  preloader:
    "landing-preloader fixed inset-0 z-[10000] grid touch-none grid-cols-[minmax(16rem,0.85fr)_minmax(20rem,1.15fr)] items-center gap-[clamp(3rem,8vw,9rem)] overflow-hidden p-[var(--gutter)] opacity-100 transition-[opacity,visibility] duration-[520ms] ease-expressive group-data-[boot-state=exiting]/landing:invisible group-data-[boot-state=exiting]/landing:opacity-0 max-[54rem]:grid-cols-1 max-[54rem]:content-center max-[54rem]:gap-8",
  field:
    "landing-preloader__field relative z-1 aspect-square w-[min(56vw,31rem)] justify-self-center max-[54rem]:w-[min(62vw,18rem)] max-[38rem]:w-[min(58vw,15rem)]",
  orbitPrimary: `${orbitBase} inset-[8%] border-[color-mix(in_srgb,var(--signal)_45%,transparent)] animate-spin [animation-duration:3.8s] after:bg-primary after:shadow-[0_0_2rem_color-mix(in_srgb,var(--signal)_72%,transparent)]`,
  orbitSecondary: `${orbitBase} inset-[22%] rotate-120 border-[color-mix(in_srgb,var(--violet)_48%,transparent)] animate-spin [animation-direction:reverse] [animation-duration:2.9s] after:bg-brand-violet after:shadow-[0_0_2rem_color-mix(in_srgb,var(--violet)_62%,transparent)]`,
  orbitTertiary: `${orbitBase} inset-[35%] border-[color-mix(in_srgb,var(--coral)_45%,transparent)] animate-spin [animation-duration:2.2s] after:bg-brand-coral after:shadow-[0_0_2rem_color-mix(in_srgb,var(--coral)_62%,transparent)]`,
  core: "absolute inset-[43%] rounded-full bg-primary shadow-[0_0_2rem_color-mix(in_srgb,var(--signal)_62%,transparent),0_0_6rem_color-mix(in_srgb,var(--signal)_28%,transparent)]",
  copy: "landing-preloader__copy relative z-2 max-w-[43rem] max-[54rem]:justify-self-center max-[54rem]:text-center",
  eyebrow:
    "font-mono text-[0.62rem] tracking-[0.1em] text-primary uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  title:
    "mt-[1.4rem] max-w-[10ch] text-[clamp(3.5rem,7vw,7.8rem)] leading-[0.9] font-[520] tracking-[-0.07em] max-[54rem]:max-w-[11ch] max-[54rem]:text-[clamp(3.2rem,13vw,5.5rem)] max-[38rem]:text-[clamp(3rem,15vw,4.8rem)] [html[lang=fa]_&]:max-w-[min(100%,14ch)] [html[lang=fa]_&]:[overflow-wrap:anywhere] [html[lang=fa]_&]:text-[clamp(2.45rem,4.9vw,5.46rem)] [html[lang=fa]_&]:leading-[1.14] [html[lang=fa]_&]:tracking-[-0.035em] max-[54rem]:[html[lang=fa]_&]:text-[clamp(2.24rem,9.1vw,3.85rem)] max-[38rem]:[html[lang=fa]_&]:text-[clamp(2.1rem,10.5vw,3.36rem)]",
  meter:
    "landing-preloader__meter mt-[clamp(3rem,8vh,6rem)] grid h-px overflow-hidden bg-line-strong max-[38rem]:mt-10",
  meterValue:
    "block h-full justify-self-start bg-primary shadow-[0_0_1rem_var(--signal)] transition-[width] duration-[420ms] ease-expressive",
  status:
    "landing-preloader__status mt-[0.9rem] flex justify-between gap-4 text-start font-mono text-[0.62rem] tracking-[0.1em] text-muted-foreground uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  progress: "text-primary",
  content:
    "landing-content opacity-100 transition-opacity duration-[520ms] ease-expressive group-data-[boot-state=loading]/landing:pointer-events-none group-data-[boot-state=loading]/landing:opacity-0",
} as const;
