"use client";

import Image from "next/image";
import { Download, ExternalLink, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from "react";
import { usePortfolio } from "@/content/use-portfolio";
import { cn } from "@/lib/cn";
import { resumeDialogClassNames as styles } from "./resume-dialog.class-names";
import backdrop from "./resume-dialog.module.css";

type ResumeDialogProps = {
  open: boolean;
  resumeUrl: string;
  onClose: () => void;
};

export function ResumeDialog({ open, resumeUrl, onClose }: ResumeDialogProps) {
  const portfolio = usePortfolio();
  const t = useTranslations("ResumeDialog");
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;

    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();

    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      node.close();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape, true);

    return () => {
      document.removeEventListener("keydown", handleEscape, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    dialog.current?.close();
  }

  return (
    <dialog
      ref={dialog}
      className={cn(styles.root, backdrop.dialog)}
      aria-labelledby="resume-dialog-title"
      onCancel={handleCancel}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <article className={styles.paper}>
        <header className={styles.header}>
          <div>
            <span className={styles.label}>{t("label")}</span>
            <h2 className={styles.title} id="resume-dialog-title">
              {t("title")}
            </h2>
          </div>
          <button
            className={styles.close}
            type="button"
            aria-label={t("close")}
            onClick={() => dialog.current?.close()}
          >
            <X aria-hidden="true" size={19} />
          </button>
        </header>

        <div
          className={styles.viewport}
          tabIndex={0}
          lang="en"
          dir="ltr"
          data-artifact-language="en"
        >
          <Image
            src={portfolio.identity.resumePreview}
            alt={t("previewAlt")}
            width={1191}
            height={1684}
            sizes="(max-width: 640px) 92vw, 46rem"
            loading={open ? "eager" : "lazy"}
            className={styles.preview}
          />
        </div>

        <footer className={styles.footer}>
          <p className={styles.description}>{t("description")}</p>
          <div className={styles.actions}>
            <a
              className={styles.action}
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t("open")}
              <ExternalLink aria-hidden="true" size={15} />
            </a>
            <a className={styles.action} href={resumeUrl} download>
              {t("download")}
              <Download aria-hidden="true" size={15} />
            </a>
          </div>
        </footer>
      </article>
    </dialog>
  );
}
