export const resumeDialogClassNames = {
  root: "resume-dialog m-0 h-full max-h-none w-full max-w-none overflow-auto border-0 bg-transparent p-[clamp(0.75rem,3vw,2rem)] open:grid open:place-items-center",
  paper:
    "resume-dialog__paper grid h-[min(91svh,56rem)] min-h-[32rem] w-[min(100%,61rem)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[0.7rem] rounded-ee-lg border border-[rgba(24,28,21,0.28)] bg-[#fffdf2] text-[#171b14] shadow-[0_3rem_8rem_rgba(0,0,0,0.48),inset_0_0_5rem_rgba(105,92,61,0.05)] max-[38rem]:h-[calc(100svh-1.5rem)] max-[38rem]:min-h-0",
  header:
    "resume-dialog__header flex items-center justify-between gap-6 border-b border-[rgba(24,28,21,0.16)] px-[clamp(1rem,3vw,1.6rem)] py-4",
  label:
    "font-mono text-[0.56rem] tracking-[0.08em] text-[#5c6558] uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  title:
    "mt-[0.22rem] text-[clamp(1rem,2vw,1.35rem)] font-[620] tracking-[-0.025em]",
  close:
    "grid size-[2.7rem] shrink-0 cursor-pointer place-items-center rounded-full border border-[rgba(24,28,21,0.22)] bg-[#f1eee3] text-[#171b14]",
  viewport:
    "resume-dialog__viewport grid min-h-0 content-start overflow-auto bg-[#e7e5db] p-[clamp(0.6rem,1.5vw,1rem)] [background-image:linear-gradient(rgba(23,27,20,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(23,27,20,0.035)_1px,transparent_1px)] [background-size:3rem_3rem] max-[38rem]:p-[0.55rem]",
  preview:
    "mx-auto block h-auto w-[min(100%,46rem)] max-w-full border border-[rgba(24,28,21,0.18)] bg-white object-contain [direction:ltr]",
  footer:
    "resume-dialog__footer flex items-center justify-between gap-6 border-t border-[rgba(24,28,21,0.16)] px-[clamp(1rem,3vw,1.6rem)] py-4 max-[38rem]:flex-col max-[38rem]:items-stretch",
  description: "text-[0.72rem] text-[#5c6558]",
  actions: "flex gap-[0.55rem] max-[38rem]:grid max-[38rem]:grid-cols-2",
  action:
    "inline-flex min-h-10 items-center gap-[0.45rem] rounded-full border border-[rgba(24,28,21,0.22)] px-3 py-[0.55rem] font-mono text-[0.58rem] max-[38rem]:justify-center [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif]",
} as const;
