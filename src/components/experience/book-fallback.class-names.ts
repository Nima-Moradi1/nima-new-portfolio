export const bookFallbackClassNames = {
  root: "book-fallback absolute top-1/2 start-1/2 aspect-[1.58] w-[min(85%,50rem)] max-[54rem]:top-[46%] max-[54rem]:w-[var(--book-copy-width)]",
  layer: "absolute block",
  cover:
    "book-fallback__cover top-0 h-full w-1/2 rounded-[0.8rem] border border-primary bg-surface",
  leftCover: "book-fallback__cover--left start-0",
  rightCover: "book-fallback__cover--right end-0",
  page: "book-fallback__page inset-y-[2.5%] h-[95%] w-1/2 rounded-[0.55rem] bg-book-paper",
  leftPage: "book-fallback__page--left start-0",
  rightPage: "book-fallback__page--right end-0",
  spine:
    "book-fallback__spine absolute top-[1%] bottom-[1%] start-1/2 z-2 block w-0.5 bg-book-rule",
} as const;
