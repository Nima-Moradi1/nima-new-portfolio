import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

export const LinkedinIcon: LucideIcon = forwardRef<SVGSVGElement, LucideProps>(
  function LinkedinIcon({ size = 24, ...props }, ref) {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M5.21 7.36H1.18V20h4.03V7.36ZM3.19 1A2.2 2.2 0 1 0 3.2 5.4 2.2 2.2 0 0 0 3.19 1ZM20.3 8.5c-.84-1.02-2.2-1.68-3.92-1.68-1.65 0-2.76.62-3.4 1.36v-.82H8.96V20h4.03v-6.27c0-1.66.31-3.26 2.37-3.26 2.03 0 2.06 1.9 2.06 3.37V20h4.03v-6.95c0-3.42-.74-6.05-5.15-6.05Z" />
      </svg>
    );
  },
);
