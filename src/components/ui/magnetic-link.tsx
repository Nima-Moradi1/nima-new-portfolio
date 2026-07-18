"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { useContactDialog } from "@/components/contact/contact-dialog";
import { magneticLinkClassNames as styles } from "./magnetic-link.class-names";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
  contact?: boolean;
};

export function MagneticLink({
  href,
  children,
  className,
  external = false,
  download = false,
  contact = false,
}: MagneticLinkProps) {
  const t = useTranslations("A11y");
  const { openContact } = useContactDialog();

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
      onClick={
        contact
          ? (event) => {
              event.preventDefault();
              openContact();
            }
          : undefined
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
