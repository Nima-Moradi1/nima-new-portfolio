import { contactSchema } from "@/lib/contact-schema";
import { portfolio } from "@/content/portfolio";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type RateEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateEntry>();

function response(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function getClientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function exceedsRateLimit(key: string): boolean {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_ATTEMPTS) return true;
  current.count += 1;
  return false;
}

function fallbackMailto(name = "", message = ""): string {
  const subject = encodeURIComponent(
    `Portfolio enquiry${name ? ` from ${name}` : ""}`,
  );
  const body = encodeURIComponent(message);
  return `mailto:${portfolio.identity.email}?subject=${subject}&body=${body}`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) {
    return response({ message: "The message is too large." }, 413);
  }

  if (exceedsRateLimit(getClientKey(request))) {
    return response(
      {
        message: "Too many attempts. Please wait a few minutes or use email.",
        mailto: fallbackMailto(),
      },
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return response({ message: "Invalid request body." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return response(
      {
        message: "Please review the form fields and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      400,
    );
  }

  const { name, email, message, company } = parsed.data;
  if (company) {
    return response({ message: "Message received." }, 200);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.CONTACT_DESTINATION_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !destination || !from) {
    return response(
      {
        message:
          "Direct delivery is not configured yet. Your message was not sent; please use email instead.",
        mailto: fallbackMailto(name, message),
      },
      503,
    );
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
      subject: `Portfolio enquiry from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);

  if (!providerResponse?.ok) {
    return response(
      {
        message:
          "The delivery service did not accept the message. It was not sent; please use email instead.",
        mailto: fallbackMailto(name, message),
      },
      502,
    );
  }

  return response(
    { message: "Signal received. I’ll get back to you as soon as I can." },
    200,
  );
}
