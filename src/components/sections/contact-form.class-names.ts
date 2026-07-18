const persianLabelStyles =
  "[html[lang=fa]_&]:[font-family:var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case";

export const contactFormClassNames = {
  root: "contact-form relative grid grid-cols-2 gap-x-[0.6rem] gap-y-3 max-[38rem]:grid-cols-1",
  field: "contact-form__field relative grid gap-[0.3rem]",
  fullField:
    "contact-form__field contact-form__field--full relative col-span-full grid gap-[0.3rem] max-[38rem]:col-auto",
  label: `contact-form__label block font-mono text-[0.62rem] leading-[1.5] font-normal tracking-[0.08em] text-[var(--muted-bright)] uppercase ${persianLabelStyles}`,
  input:
    "contact-form__control h-auto min-h-[3.2rem] rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-0 text-base leading-[1.5] shadow-none outline-none [transition:border-color_var(--duration-fast)_ease] placeholder:text-[#737a72] focus:border-primary focus-visible:border-primary focus-visible:ring-0 aria-invalid:border-destructive md:text-base",
  textarea:
    "contact-form__control min-h-[5.5rem] rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-[0.35rem] text-base leading-[1.5] shadow-none outline-none [transition:border-color_var(--duration-fast)_ease] placeholder:text-[#737a72] focus:border-primary focus-visible:border-primary focus-visible:ring-0 aria-invalid:border-destructive md:text-base",
  error: "field-error text-[0.72rem] text-destructive",
  honeypot: "contact-form__honeypot sr-only",
  footer:
    "contact-form__footer col-span-full mt-[0.2rem] flex items-center justify-between gap-2 max-[38rem]:col-auto max-[38rem]:flex-col max-[38rem]:items-start",
  submit:
    "contact-form__submit h-auto min-h-[3.6rem] gap-[1.4rem] rounded-full bg-primary py-[0.9rem] ps-[1.4rem] pe-[1.1rem] text-[0.78rem] font-[680] text-primary-foreground [transition:background-color_var(--duration-fast)_ease,transform_var(--duration-base)_var(--ease-out)] hover:-translate-y-[0.15rem] hover:bg-signal-soft motion-reduce:hover:translate-y-0 disabled:pointer-events-auto disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 max-[38rem]:w-full",
  submitIcon: "icon-directional size-[1.1rem]",
  spinner:
    "spin size-[1.1rem] animate-spin [animation-duration:0.8s] motion-reduce:animate-none",
  footerCopy: "min-w-0 break-words text-[0.72rem] text-muted-foreground",
  link: "text-foreground underline decoration-line-strong underline-offset-4",
  status:
    "contact-form__status col-span-full min-h-[1.6rem] max-[38rem]:col-auto",
  statusMessage:
    "rounded-sm border border-border px-4 py-[0.8rem] text-[0.75rem] text-[var(--muted-bright)] data-[kind=success]:border-[rgba(184,255,69,0.4)] data-[kind=error]:border-[rgba(255,155,139,0.4)]",
} as const;
