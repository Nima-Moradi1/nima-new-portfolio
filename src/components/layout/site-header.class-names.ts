export const siteHeaderClassNames = {
  root: "site-header fixed inset-x-0 top-0 z-[100] grid h-[var(--header-height)] grid-cols-[minmax(13rem,1fr)_auto_minmax(13rem,1fr)] items-center border-b border-transparent px-[var(--gutter)] backdrop-blur-none backdrop-saturate-100 transition-[height,border-color,backdrop-filter] duration-[var(--duration-base)] ease-expressive data-[scrolled=true]:h-[4.6rem] data-[scrolled=true]:border-border data-[scrolled=true]:bg-[linear-gradient(110deg,color-mix(in_srgb,var(--header-glass)_96%,transparent),color-mix(in_srgb,var(--header-glass)_72%,transparent))] data-[scrolled=true]:shadow-[0_8px_32px_rgb(0_0_0/15%)] data-[scrolled=true]:backdrop-blur-[18px] data-[scrolled=true]:backdrop-saturate-[130%] rtl:data-[scrolled=true]:bg-[linear-gradient(250deg,color-mix(in_srgb,var(--header-glass)_96%,transparent),color-mix(in_srgb,var(--header-glass)_72%,transparent))] max-[72rem]:isolate max-[72rem]:grid-cols-[1fr_auto] max-[72rem]:border-border max-[72rem]:bg-[linear-gradient(110deg,color-mix(in_srgb,var(--header-glass)_92%,transparent),color-mix(in_srgb,var(--header-glass)_68%,transparent))] max-[72rem]:shadow-[0_0.5rem_2rem_rgb(0_0_0/12%),inset_0_1px_color-mix(in_srgb,var(--paper)_8%,transparent)] max-[72rem]:backdrop-blur-[22px] max-[72rem]:backdrop-saturate-[145%] max-[72rem]:transition-[height,border-color,box-shadow] max-[72rem]:data-[scrolled=true]:bg-[linear-gradient(110deg,color-mix(in_srgb,var(--header-glass)_92%,transparent),color-mix(in_srgb,var(--header-glass)_68%,transparent))] max-[72rem]:rtl:bg-[linear-gradient(250deg,color-mix(in_srgb,var(--header-glass)_92%,transparent),color-mix(in_srgb,var(--header-glass)_68%,transparent))] max-[72rem]:rtl:data-[scrolled=true]:bg-[linear-gradient(250deg,color-mix(in_srgb,var(--header-glass)_92%,transparent),color-mix(in_srgb,var(--header-glass)_68%,transparent))] motion-reduce:transition-none",
  brand: "site-header__brand inline-flex items-center justify-self-start gap-3",
  mark: "site-header__mark block size-[2.6rem] overflow-hidden rounded-full border border-line-strong bg-background-soft",
  markImage: "size-full object-cover object-center",
  identity: "site-header__identity grid gap-[0.08rem] max-[22rem]:hidden",
  identityName: "text-[0.86rem] font-[620]",
  identityRole:
    "font-mono text-[0.62rem] tracking-[0.08em] text-muted-foreground uppercase max-[38rem]:hidden [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55] [html[lang=fa]_&]:tracking-normal [html[lang=fa]_&]:normal-case",
  desktopNav:
    "site-header__desktop-nav flex items-center justify-center gap-[clamp(1rem,2.4vw,2.4rem)] max-[72rem]:hidden",
  desktopNavLink:
    "relative cursor-pointer border-0 bg-transparent py-[0.45rem] text-[0.78rem] text-[var(--muted-bright)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-[var(--underline-rest-origin)] after:scale-x-0 after:bg-primary after:content-[''] after:transition-transform after:duration-[var(--duration-base)] after:ease-expressive hover:after:origin-[var(--underline-active-origin)] hover:after:scale-x-100 motion-reduce:after:transition-none",
  actions:
    "site-header__actions flex h-full items-center justify-self-end gap-[clamp(0.75rem,1.5vw,1.4rem)] max-[72rem]:gap-[0.35rem]",
  contact:
    "site-header__contact relative cursor-pointer justify-self-end border-0 bg-transparent py-[0.45rem] text-[0.78rem] text-signal-soft after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-[var(--underline-rest-origin)] after:scale-x-0 after:bg-primary after:content-[''] after:transition-transform after:duration-[var(--duration-base)] after:ease-expressive hover:after:origin-[var(--underline-active-origin)] hover:after:scale-x-100 max-[72rem]:hidden motion-reduce:after:transition-none",
  menuButton:
    "site-header__menu-button relative z-[2] hidden size-[2.8rem] cursor-pointer place-items-center rounded-full border border-line-strong bg-background-soft max-[72rem]:grid",
  menuIcon: "w-[1.15rem]",
  mobileOverlay: "bg-transparent backdrop-blur-none",
  mobileNav:
    "mobile-nav fixed inset-0 z-[90] flex h-dvh max-h-none min-h-dvh w-screen max-w-none -translate-y-4 flex-col justify-between gap-0 overflow-y-auto overscroll-contain border-0 bg-[radial-gradient(circle_at_88%_9%,color-mix(in_srgb,var(--signal)_12%,transparent),transparent_24rem),linear-gradient(135deg,color-mix(in_srgb,var(--mobile-nav-bg)_98%,transparent),color-mix(in_srgb,var(--mobile-nav-bg)_94%,transparent))] px-[var(--gutter)] pt-[calc(var(--header-height)+3rem)] pb-8 opacity-0 backdrop-blur-[28px] backdrop-saturate-[135%] [isolation:isolate] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] before:opacity-[0.18] before:content-[''] before:[background-size:4.5rem_4.5rem] data-[state=open]:translate-y-0 data-[state=open]:opacity-100 rtl:bg-[radial-gradient(circle_at_12%_9%,color-mix(in_srgb,var(--signal)_12%,transparent),transparent_24rem),linear-gradient(225deg,color-mix(in_srgb,var(--mobile-nav-bg)_98%,transparent),color-mix(in_srgb,var(--mobile-nav-bg)_94%,transparent))] min-[72.01rem]:hidden motion-reduce:transition-none",
  mobileTitle: "sr-only",
  mobileNavList: "grid",
  mobileNavLink:
    "flex w-full min-w-0 cursor-pointer items-baseline gap-[1.2rem] border-x-0 border-t-0 border-b border-border bg-transparent py-[0.65rem] text-start text-[clamp(2.5rem,8vw,5rem)] leading-none font-[520] tracking-[-0.06em] break-words [html[lang=de]_&]:hyphens-auto [html[lang=fa]_&]:text-[clamp(1.75rem,5.6vw,3.5rem)] [html[lang=fa]_&]:leading-[1.15] [html[lang=fa]_&]:tracking-normal",
  mobileNavIndex:
    "shrink-0 font-mono text-[0.62rem] tracking-normal text-primary [direction:ltr] [unicode-bidi:isolate]",
  mobileLocation:
    "font-mono text-[0.62rem] text-muted-foreground [html[lang=fa]_&]:font-[var(--font-vazirmatn),Tahoma,Arial,sans-serif] [html[lang=fa]_&]:text-[clamp(0.64rem,0.72vw,0.76rem)] [html[lang=fa]_&]:leading-[1.55]",
} as const;
