import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { portfolio } from "@/content/portfolio";
import { routing } from "@/i18n/routing";
import { createContactSchema } from "@/lib/contact-schema";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_BODY_BYTES = 12_000;
const MAX_RATE_ENTRIES = 2_000;

type RateEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateEntry>();

function response(
  code: string,
  message: string,
  status: number,
  extra: Record<string, unknown> = {},
) {
  return Response.json(
    { code, message, ...extra },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function getClientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 128) ||
    request.headers.get("x-real-ip")?.slice(0, 128) ||
    "unknown"
  );
}

function exceedsRateLimit(key: string): boolean {
  const now = Date.now();
  for (const [storedKey, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(storedKey);
  }
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    // Keep the best-effort, process-local store bounded without resetting active limits.
    if (rateLimitStore.size >= MAX_RATE_ENTRIES) return true;
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_ATTEMPTS) return true;
  current.count += 1;
  return false;
}

async function readBoundedBody(request: Request): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(chunk.value, { stream: true });
    }
    return body + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

function fallbackMailto(subject: string, message = ""): string {
  return `mailto:${portfolio.identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

export async function POST(request: Request) {
  const requestedLocale = request.headers.get("x-portfolio-locale");
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "ApiContact" });
  const validation = await getTranslations({
    locale,
    namespace: "ContactForm.validation",
  });
  const schema = createContactSchema({
    nameMin: validation("nameMin"),
    nameMax: validation("nameMax"),
    email: validation("email"),
    messageMin: validation("messageMin"),
    messageMax: validation("messageMax"),
    company: validation("company"),
  });

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return response("too_large", t("tooLarge"), 413);
  }

  if (exceedsRateLimit(getClientKey(request))) {
    return response("rate_limited", t("rateLimited"), 429, {
      mailto: fallbackMailto(t("mailtoSubject")),
    });
  }

  let body: unknown;
  try {
    const rawBody = await readBoundedBody(request);
    if (rawBody === null) return response("too_large", t("tooLarge"), 413);
    body = JSON.parse(rawBody);
  } catch {
    return response("invalid_body", t("invalidBody"), 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return response("invalid_fields", t("invalidFields"), 400, {
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.CONTACT_DESTINATION_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const subject = t("mailtoSubjectWithName", { name });

  if (!apiKey || !destination || !from) {
    return response("not_configured", t("notConfigured"), 503, {
      mailto: fallbackMailto(subject, message),
    });
  }

  const safeName = name.replace(/[\r\n]+/g, " ");
  const providerResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [destination],
      reply_to: email,
      subject: t("providerSubject", { name: safeName }),
      text: t("emailBody", { name, email, message }),
    }),
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);

  if (!providerResponse?.ok) {
    return response("provider_rejected", t("providerRejected"), 502, {
      mailto: fallbackMailto(subject, message),
    });
  }

  return response("success", t("success"), 200);
}
