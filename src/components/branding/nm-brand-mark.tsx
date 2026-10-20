import type { SVGProps } from "react";

/** Original, optically simplified NM ligature. No font or external artwork. */
export function NMBrandMark({
  title,
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        fill="currentColor"
        d="M7 59V21h9l15 23V21h9v38h-9L16 36v23H7Zm36 0V21h8l8.5 15L68 21h8v38h-9V38l-7.5 12L52 38v21h-9Z"
      />
      <path d="m19 21 20 30m13-30 7.5 14L67 21" stroke="var(--nm-ice, #8be9f4)" strokeWidth="1.4" />
    </svg>
  );
}
