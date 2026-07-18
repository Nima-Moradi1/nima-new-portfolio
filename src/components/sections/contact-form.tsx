"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createContactSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { usePortfolio } from "@/content/use-portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormClassNames as styles } from "./contact-form.class-names";

type SubmitState =
  | { kind: "idle" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string; mailto?: string };

export function ContactForm() {
  const locale = useLocale();
  const portfolio = usePortfolio();
  const t = useTranslations("ContactForm");
  const contactSchema = useMemo(
    () =>
      createContactSchema({
        nameMin: t("validation.nameMin"),
        nameMax: t("validation.nameMax"),
        email: t("validation.email"),
        messageMin: t("validation.messageMin"),
        messageMax: t("validation.messageMax"),
        company: t("validation.company"),
      }),
    [t],
  );
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitState({ kind: "idle" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-portfolio-locale": locale,
        },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as {
        message?: string;
        mailto?: string;
      };

      if (!response.ok) {
        setSubmitState({
          kind: "error",
          message: result.message ?? t("fallbackError"),
          mailto: result.mailto,
        });
        return;
      }

      setSubmitState({
        kind: "success",
        message: result.message ?? t("fallbackSuccess"),
      });
      reset();
    } catch {
      setSubmitState({
        kind: "error",
        message: t("connectionError"),
        mailto: `mailto:${portfolio.identity.email}`,
      });
    }
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <Label className={styles.label} htmlFor="name">
          {t("fields.name")}
        </Label>
        <Input
          className={styles.input}
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder={t("fields.namePlaceholder")}
          dir="auto"
          {...register("name")}
        />
        {errors.name ? (
          <p className={styles.error} id="name-error">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <Label className={styles.label} htmlFor="email">
          {t("fields.email")}
        </Label>
        <Input
          className={styles.input}
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder={t("fields.emailPlaceholder")}
          dir="ltr"
          {...register("email")}
        />
        {errors.email ? (
          <p className={styles.error} id="email-error">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className={styles.fullField}>
        <Label className={styles.label} htmlFor="message">
          {t("fields.message")}
        </Label>
        <Textarea
          className={styles.textarea}
          id="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder={t("fields.messagePlaceholder")}
          dir="auto"
          {...register("message")}
        />
        {errors.message ? (
          <p className={styles.error} id="message-error">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <Label htmlFor="company">{t("fields.company")}</Label>
        <Input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className={styles.footer}>
        <Button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className={styles.spinner} aria-hidden="true" />
              {t("submitting")}
            </>
          ) : (
            <>
              {t("submit")}
              <ArrowUpRight className={styles.submitIcon} aria-hidden="true" />
            </>
          )}
        </Button>
        <p className={styles.footerCopy}>
          {t("preferEmail")}{" "}
          <a
            className={styles.link}
            href={`mailto:${portfolio.identity.email}`}
          >
            <bdi>{portfolio.identity.email}</bdi>
          </a>
        </p>
      </div>

      <div className={styles.status} aria-live="polite" role="status">
        {submitState.kind !== "idle" ? (
          <p className={styles.statusMessage} data-kind={submitState.kind}>
            {submitState.message}{" "}
            {submitState.kind === "error" && submitState.mailto ? (
              <a className={styles.link} href={submitState.mailto}>
                {t("openEmail")}
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </form>
  );
}
