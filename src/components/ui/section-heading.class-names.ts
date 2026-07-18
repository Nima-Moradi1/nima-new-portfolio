export const sectionHeadingClassNames = {
  root: "section-heading mb-[clamp(0.75rem,1.5vw,1.5rem)] grid grid-cols-[minmax(0,1fr)_minmax(0,41rem)_minmax(0,1fr)] items-center gap-[clamp(0.5rem,1.75vw,2rem)] [&>*]:min-w-0 max-[54rem]:grid-cols-1 max-[54rem]:gap-[0.65rem] max-[54rem]:mb-[0.75rem]",
  meta: "section-heading__meta flex items-start  gap-[0.8rem] pt-[0.15rem] font-mono text-[0.66rem] tracking-[0.1em] text-muted-foreground uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  eyebrow: "[html[lang=fa]_&]:text-lg",
  index: "text-primary [html[lang=fa]_&]:text-lg",
  copy: "section-heading__copy col-start-2 flex flex-col items-center justify-center text-center max-[54rem]:col-start-1",
  title:
    "max-w-[16ch] text-center text-[clamp(2.35rem,4.15vw,4.8rem)] leading-[0.98] font-[530] tracking-[-0.065em] text-balance max-[38rem]:text-[clamp(2.3rem,11.5vw,3.6rem)] [html[lang=fa]_&]:max-w-[min(100%,28ch)] [html[lang=fa]_&]:text-[clamp(1.65rem,2.91vw,3.36rem)] [html[lang=fa]_&]:leading-[1.16] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:break-words max-[38rem]:[html[lang=fa]_&]:text-[clamp(1.61rem,8.05vw,2.52rem)]",
  description:
    "mt-[0.25rem] max-w-[41rem] text-center text-base leading-[1.7] text-muted-foreground",
} as const;
