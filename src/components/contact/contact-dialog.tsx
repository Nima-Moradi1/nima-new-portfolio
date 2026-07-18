"use client";

import {
  ArrowUpRight,
  FileText,
  Mail,
  Phone,
  Send,
  X,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { usePortfolio } from "@/content/use-portfolio";
import { LinkedinIcon } from "./linkedin-icon";

type ContactDialogContextValue = {
  openContact: () => void;
};

const ContactDialogContext = createContext<ContactDialogContextValue | null>(
  null,
);

type ContactChannel = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  download?: boolean;
};

export function ContactDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const portfolio = usePortfolio();
  const t = useTranslations("ContactDialog");
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);
  const linkedin = portfolio.socialLinks.find((link) => link.id === "linkedin");

  const channels = useMemo<ContactChannel[]>(
    () => [
      {
        id: "linkedin",
        label: t("linkedin"),
        value: "Nima Moradirad",
        href: linkedin?.href ?? "https://www.linkedin.com/",
        icon: LinkedinIcon,
        external: true,
      },
      {
        id: "resume",
        label: t("resume"),
        value: t("resumeValue"),
        href: portfolio.identity.resumeUrl,
        icon: FileText,
        download: true,
      },
      {
        id: "telegram",
        label: t("telegram"),
        value: "@Nimamoradirad",
        href: "https://t.me/Nimamoradirad",
        icon: Send,
        external: true,
      },
      {
        id: "gmail",
        label: t("gmail"),
        value: portfolio.identity.email,
        href: `mailto:${portfolio.identity.email}`,
        icon: Mail,
      },
      {
        id: "phone",
        label: t("phone"),
        value: "+98 903 683 7788",
        href: "tel:+989036837788",
        icon: Phone,
      },
    ],
    [linkedin?.href, portfolio.identity.email, portfolio.identity.resumeUrl, t],
  );

  const contextValue = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactDialogContext.Provider value={contextValue}>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md" />
          <DialogPrimitive.Content className="fixed start-1/2 top-1/2 z-[201] max-h-[calc(100dvh-2rem)] w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[1.75rem] border border-line-strong bg-background-soft p-[clamp(1.25rem,4vw,2.25rem)] shadow-[0_2rem_7rem_rgb(0_0_0/45%)] outline-none rtl:translate-x-1/2">
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
              aria-hidden="true"
            >
              <div className="absolute -end-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-24 -start-24 size-56 rounded-full bg-signal-soft/10 blur-3xl" />
            </div>

            <div className="relative">
              <div className="mb-8 pe-12">
                <p className="mb-3 font-mono text-[0.64rem] tracking-[0.16em] text-primary uppercase">
                  {t("eyebrow")}
                </p>
                <DialogPrimitive.Title className="text-[clamp(2rem,6vw,3.4rem)] leading-[0.95] font-[650] tracking-[-0.055em] text-foreground">
                  {t("title")}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="mt-4 max-w-[32rem] text-sm leading-6 text-muted-foreground sm:text-base">
                  {t("description")}
                </DialogPrimitive.Description>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {channels.map((channel, index) => {
                  const Icon = channel.icon;
                  return (
                    <a
                      key={channel.id}
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noreferrer noopener" : undefined}
                      download={channel.download || undefined}
                      className={`group flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-background/55 p-4 hover:border-primary ${
                        index === channels.length - 1 ? "sm:col-span-2" : ""
                      }`}
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-background text-primary">
                        <Icon className="size-[1.15rem]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.58rem] tracking-[0.1em] text-muted-foreground uppercase">
                          {channel.label}
                        </span>
                        <span className="mt-1 block truncate text-sm font-[590] text-foreground sm:text-[0.95rem]">
                          <bdi>{channel.value}</bdi>
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-muted-foreground group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>

              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  className="absolute end-0 top-0 grid size-10 cursor-pointer place-items-center rounded-full border border-line-strong bg-background/70 text-muted-foreground hover:border-primary hover:text-foreground"
                  aria-label={t("close")}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </DialogPrimitive.Close>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </ContactDialogContext.Provider>
  );
}

export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (!context) {
    throw new Error(
      "useContactDialog must be used within ContactDialogProvider",
    );
  }
  return context;
}
