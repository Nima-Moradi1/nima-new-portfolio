"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownToLine, ArrowUpRight, Check, LoaderCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AppLocale as Locale } from "@/i18n/routing";
import { createContactSchema, type ContactFormValues } from "@/lib/contact-schema";
import type { PortfolioContent } from "@/types/portfolio";
import styles from "./contact-stage.module.css";

type ContactStageProps = {
  locale: Locale;
  content: PortfolioContent;
  eyebrow: string;
  title: string;
  description: string;
};

type DeliveryState = { kind: "success" | "error"; message: string; locale: Locale } | null;
type ContactResponse = { code?: string; issues?: Record<string, unknown> };

const ERROR_CODES = {
  too_large: "tooLarge",
  rate_limited: "rateLimited",
  invalid_body: "invalidBody",
  invalid_fields: "invalidFields",
  not_configured: "notConfigured",
  provider_rejected: "providerRejected",
} as const;

/** A real delivery request, with direct channels available even when forwarding is unavailable. */
export function ContactStage({ locale, content, eyebrow, title, description }: ContactStageProps) {
  const t = useTranslations("ContactForm");
  const api = useTranslations("ApiContact");
  const channels = useTranslations("ContactDialog");
  const [delivery, setDelivery] = useState<DeliveryState>(null);
  const requestRef = useRef<AbortController | null>(null);
  const schema = useMemo(() => createContactSchema({
    nameMin: t("validation.nameMin"),
    nameMax: t("validation.nameMax"),
    email: t("validation.email"),
    messageMin: t("validation.messageMin"),
    messageMax: t("validation.messageMax"),
    company: t("validation.company"),
  }), [t]);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", company: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const values = useWatch({ control });
  const emailSubject = values.name?.trim()
    ? api("mailtoSubjectWithName", { name: values.name.trim() })
    : api("mailtoSubject");
  const emailBody = values.message
    ? api("emailBody", { name: values.name ?? "", email: values.email ?? "", message: values.message })
    : "";
  const mailto = `mailto:${content.identity.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const visibleDelivery = delivery?.locale === locale ? delivery : null;

  useEffect(() => () => {
    requestRef.current?.abort();
    requestRef.current = null;
  }, [locale]);

  async function submit(values: ContactFormValues) {
    if (requestRef.current) return;
    setDelivery(null);
    const controller = new AbortController();
    requestRef.current = controller;
    const deadline = window.setTimeout(() => controller.abort(), 12_000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-portfolio-locale": locale },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null) as ContactResponse | null;
      if (requestRef.current !== controller) return;
      if (response.ok && result?.code === "success") {
        setDelivery({ kind: "success", message: api("success"), locale });
        reset();
        return;
      }
      if (result?.code === "invalid_fields" && result.issues) {
        const fields = ["name", "email", "message", "company"] as const;
        for (const field of fields) {
          const issue = result.issues[field];
          if (Array.isArray(issue) && typeof issue[0] === "string") {
            setError(field, { type: "server", message: issue[0] }, { shouldFocus: field !== "company" });
          }
        }
      }
      const key = result?.code && Object.hasOwn(ERROR_CODES, result.code)
        ? ERROR_CODES[result.code as keyof typeof ERROR_CODES]
        : null;
      setDelivery({ kind: "error", message: key ? api(key) : t("fallbackError"), locale });
    } catch {
      if (requestRef.current === controller) {
        setDelivery({ kind: "error", message: t("connectionError"), locale });
      }
    } finally {
      window.clearTimeout(deadline);
      if (requestRef.current === controller) requestRef.current = null;
    }
  }

  return (
    <section className={styles.contact} aria-labelledby="contact-title" dir={locale === "fa" ? "rtl" : "ltr"}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}><span aria-hidden="true">↗</span> {eyebrow}</p>
        <h2 id="contact-title" className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.body}>
        <div className={styles.channels}>
          <a className={styles.email} href={`mailto:${content.identity.email}`}>
            <Mail aria-hidden="true" />
            <bdi>{content.identity.email}</bdi>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <div className={styles.socials}>
            {content.socialLinks.map((link) => (
              <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer">
                <bdi>{link.label}</bdi><ArrowUpRight aria-hidden="true" />
              </a>
            ))}
            <a href="https://t.me/Nimamoradirad" target="_blank" rel="noopener noreferrer">
              {channels("telegram")}<ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <a className={styles.resume} href={content.identity.resumeUrl} download>
            <ArrowDownToLine aria-hidden="true" />
            <span>{channels("resume")}<small>{channels("resumeValue")}</small></span>
          </a>
        </div>

        <form className={styles.form} onSubmit={event => { void handleSubmit(submit, () => setDelivery(null))(event); }} noValidate aria-busy={isSubmitting}>
          <fieldset disabled={isSubmitting} className={styles.fields}>
            <div className={styles.field}>
              <Label htmlFor="contact-name">{t("fields.name")}</Label>
              <Input id="contact-name" autoComplete="name" placeholder={t("fields.namePlaceholder")} maxLength={80} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} {...register("name")} />
              {errors.name && <p id="contact-name-error" className={styles.fieldError}>{errors.name.message}</p>}
            </div>
            <div className={styles.field}>
              <Label htmlFor="contact-email">{t("fields.email")}</Label>
              <Input id="contact-email" type="email" dir="ltr" autoComplete="email" inputMode="email" placeholder={t("fields.emailPlaceholder")} maxLength={254} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} {...register("email")} />
              {errors.email && <p id="contact-email-error" className={styles.fieldError}>{errors.email.message}</p>}
            </div>
            <div className={`${styles.field} ${styles.message}`}>
              <Label htmlFor="contact-message">{t("fields.message")}</Label>
              <Textarea id="contact-message" placeholder={t("fields.messagePlaceholder")} maxLength={2000} minLength={20} rows={5} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} {...register("message")} />
              {errors.message && <p id="contact-message-error" className={styles.fieldError}>{errors.message.message}</p>}
            </div>
            <div className={styles.honeypot} aria-hidden="true">
              <Label htmlFor="contact-company">{t("fields.company")}</Label>
              <Input id="contact-company" autoComplete="off" tabIndex={-1} {...register("company")} />
            </div>
            <div className={styles.actions}>
              <Button type="submit" size="lg" className={styles.submit}>
                {isSubmitting ? <LoaderCircle className={styles.spinner} aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
                {isSubmitting ? t("submitting") : t("submit")}
              </Button>
              <p className={styles.fallback}>{t("preferEmail")} <a href={mailto}>{t("openEmail")}</a></p>
            </div>
          </fieldset>
          <div aria-live="polite" aria-atomic="true" className={styles.status}>
            {visibleDelivery && <p className={visibleDelivery.kind === "success" ? styles.success : styles.error}>
              {visibleDelivery.kind === "success" && <Check aria-hidden="true" />}
              <span>{visibleDelivery.message}{visibleDelivery.kind === "error" && <> <a href={mailto}>{t("openEmail")}</a></>}</span>
            </p>}
            {errors.company && <p className={styles.error}>{t("validation.company")}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
