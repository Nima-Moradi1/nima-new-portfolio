export const mobileExperienceReaderClassNames = {
  root: "mobile-experience-reader page-shell mx-auto w-full max-w-[var(--content-width)] px-[var(--gutter)] py-[clamp(2.5rem,6vw,5rem)] max-[38rem]:pt-8",
  heading: "mobile-experience-reader__heading",
  headingEyebrow:
    "flex items-center gap-3 font-mono text-[0.6rem] tracking-[0.09em] text-primary uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  headingIndex:
    "grid size-8 shrink-0 place-items-center rounded-full border border-line-strong",
  headingTitle:
    "mt-3 max-w-[min(100%,12ch)] break-words text-[clamp(2.25rem,7vw,4rem)] leading-none font-[520] tracking-[-0.065em] [html[lang=fa]_&]:max-w-[min(100%,16ch)] [html[lang=fa]_&]:text-[clamp(1.58rem,4.9vw,2.8rem)] [html[lang=fa]_&]:leading-[1.14] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:text-balance",
  headingDescription:
    "mt-3 max-w-[42rem] text-[0.78rem] leading-[1.6] text-muted-foreground",
  book: "mobile-experience-reader__book relative mx-auto mt-[clamp(1.25rem,3vw,2rem)] max-w-[70rem] rounded-2xl p-[0.45rem]",
  paper:
    "relative grid min-h-0 grid-cols-2 items-stretch overflow-hidden rounded-[0.65rem] text-book-ink max-[44rem]:grid-cols-1",
  page: "mobile-experience-reader__page min-w-0 overflow-hidden [overflow-wrap:anywhere] p-[clamp(1rem,3.5vw,1.75rem)] max-[44rem]:p-[clamp(1.25rem,5vw,1.75rem)] [html[lang=de]_&]:hyphens-auto",
  summaryPage: "mobile-experience-reader__page--summary",
  folio:
    "mobile-experience-reader__folio flex items-center justify-between gap-[0.35rem] border-b border-book-rule pb-[0.55rem] font-mono text-[clamp(0.42rem,1.55vw,0.55rem)] text-book-muted uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  folioNumber: "min-w-0 text-book-accent [unicode-bidi:plaintext]",
  folioPeriod: "min-w-0 text-end [unicode-bidi:plaintext]",
  company:
    "mobile-experience-reader__company mt-4 font-mono text-[clamp(0.48rem,1.85vw,0.62rem)] text-book-accent [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif]",
  pageTitle:
    "mt-[0.45rem] text-[clamp(1.25rem,3.2vw,1.75rem)] leading-[1.08] font-[650] tracking-[-0.045em] [html[lang=fa]_&]:max-w-full [html[lang=fa]_&]:text-[clamp(1.1rem,2.24vw,1.23rem)] [html[lang=fa]_&]:leading-[1.25] [html[lang=fa]_&]:tracking-normal",
  summary:
    "mobile-experience-reader__summary mt-[0.8rem] text-[clamp(0.75rem,1.8vw,0.9rem)] leading-[1.55] text-book-muted [html[lang=fa]_&]:leading-[1.65]",
  tags: "mobile-experience-reader__tags mt-4 flex flex-wrap gap-1",
  tag: "shrink overflow-visible whitespace-normal border-book-rule bg-transparent px-[0.3rem] py-[0.2rem] font-mono text-[clamp(0.5rem,1.2vw,0.6rem)] font-normal text-book-muted transition-none [unicode-bidi:plaintext] [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif]",
  highlightsPage:
    "mobile-experience-reader__page--highlights max-[44rem]:border-t max-[44rem]:border-book-rule",
  chapter:
    "mobile-experience-reader__chapter border-b border-book-rule pb-[0.55rem] font-mono text-[clamp(0.42rem,1.55vw,0.55rem)] tracking-[0.04em] text-book-accent uppercase [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  highlights: "mt-4 grid list-none gap-[clamp(0.42rem,1.7vw,0.72rem)]",
  highlight:
    "relative ps-[0.7rem] text-[clamp(0.72rem,1.65vw,0.84rem)] leading-[1.55] text-book-muted [html[lang=fa]_&]:leading-[1.65]",
  navigation:
    "mobile-experience-reader__navigation mt-[1.4rem] flex items-center justify-center gap-[0.7rem]",
  navigationButton:
    "size-12 cursor-pointer rounded-full border-line-strong bg-surface p-0 text-foreground shadow-none transition-none hover:border-line-strong hover:bg-surface hover:text-foreground disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-30",
  counter:
    "flex items-center gap-2 font-mono text-[0.58rem] text-muted-foreground [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif]",
  activeCount: "text-primary",
  counterRule: "h-px w-8 bg-line-strong",
} as const;
