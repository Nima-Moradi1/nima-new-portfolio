"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { magneticLinkClassNames as styles } from "./magnetic-link.class-names";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
};

export function MagneticLink({
  href,
  children,
  className,
  external = false,
  download = false,
}: MagneticLinkProps) {
  const t = useTranslations("A11y");

  return (
    <a
      className={cn(styles.root, className)}
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      aria-label={
        external ? `${String(children)} (${t("externalSuffix")})` : undefined
      }
    >
      <span>{children}</span>
      <ArrowUpRight
        className={styles.icon}
        aria-hidden="true"
        size={17}
        strokeWidth={1.7}
      />
    </a>
  );
}
