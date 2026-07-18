export const themeLampClassNames = {
  root: "theme-lamp group/theme-lamp relative z-[3] h-full w-14 flex-none pointer-events-none max-[54rem]:w-[3.25rem] max-[54rem]:basis-[3.25rem] max-[38rem]:w-12 max-[38rem]:basis-12",
  fixture:
    "theme-lamp__fixture absolute inset-x-0 top-0 h-[3.45rem] origin-top",
  glow: "theme-lamp__glow absolute top-[1.1rem] left-1/2 block h-[4.4rem] w-[5.25rem] -translate-x-1/2 rounded-full opacity-0 blur-[0.2rem] transition-opacity duration-[var(--theme-duration)] group-data-[lit=true]/theme-lamp:opacity-100 motion-reduce:transition-none",
  shade:
    "theme-lamp__shade absolute top-[0.9rem] left-1/2 z-[2] block h-[1.55rem] w-[2.65rem] -translate-x-1/2 transition-[filter,transform] duration-[var(--theme-duration)]",
  bulb: "theme-lamp__bulb absolute top-[1.95rem] left-1/2 z-[1] block size-[0.72rem] -translate-x-1/2 rounded-full transition-[background-color,box-shadow] duration-[var(--theme-duration)] motion-reduce:transition-none",
  pull: "theme-lamp__pull group/pull pointer-events-auto absolute top-[2.2rem] left-1/2 z-[4] h-[calc(100%+1.25rem)] w-[2.8rem] -translate-x-1/2 cursor-grab touch-none border-0 bg-transparent [--pull-offset:0px] hover:drop-shadow-[0_0_0.5rem_color-mix(in_srgb,var(--signal)_70%,transparent)] active:cursor-grabbing max-[38rem]:w-10",
  pendulum:
    "theme-lamp__pendulum pointer-events-none absolute top-0 left-1/2 h-[calc(2.35rem+var(--pull-offset))] w-0.5 origin-top [transform:translateX(-50%)_rotateZ(-8deg)] transition-[height] duration-[240ms] ease-expressive will-change-transform group-data-[dragging=true]/pull:[animation-play-state:paused] group-data-[dragging=true]/pull:transition-none motion-reduce:!animate-none",
  cord: "theme-lamp__cord absolute inset-[0_auto_auto_50%] h-full w-0.5 -translate-x-1/2 rounded-full",
  handle:
    "theme-lamp__handle pointer-events-none absolute top-full left-1/2 h-[0.92rem] w-[0.62rem] -translate-x-1/2 rounded-full border border-primary",
} as const;
