import { NextResponse } from "next/server";
import { MIN_FORM_FILL_MS } from "@/config/constants";
import { siteConfig } from "@/config/site";
import { deliverInquiry } from "@/lib/inquiry-delivery";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { cleanBlock, cleanLine } from "@/lib/sanitize";
import { inquirySchema, type InquiryApiResponse } from "@/lib/validation";

const MAX_BODY_BYTES = 10_000;

function respond(body: InquiryApiResponse, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const url = new URL(origin);
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    return url.host === host || url.origin === siteConfig.url;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return respond({ ok: false, code: "forbidden", message: "This request was not allowed." }, 403);
  }

  const limit = rateLimit(clientIp(request.headers));
  if (!limit.allowed) {
    return respond(
      {
        ok: false,
        code: "rate_limited",
        message: `Too many inquiries from this connection. Try again in ${Math.ceil(limit.retryAfterSeconds / 60)} minutes.`,
      },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return respond({ ok: false, code: "bad_request", message: "That message is too long to send." }, 413);
    }
    payload = JSON.parse(raw);
  } catch {
    return respond({ ok: false, code: "bad_request", message: "The request could not be read." }, 400);
  }

  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return respond(
      { ok: false, code: "validation", message: "Check the highlighted fields and send again.", fieldErrors },
      400,
    );
  }
  const data = parsed.data;

  // Honeypot: bots fill it, people never see it. Pretend success; deliver nothing.
  if (data.website) return respond({ ok: true });

  if (Date.now() - data.startedAt < MIN_FORM_FILL_MS) {
    return respond(
      { ok: false, code: "too_fast", message: "That was quick. Check your details and send again." },
      400,
    );
  }

  const result = await deliverInquiry({
    name: cleanLine(data.name),
    email: cleanLine(data.email),
    phone: cleanLine(data.phone),
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    guests: data.guests,
    room: cleanLine(data.room),
    message: cleanBlock(data.message),
  });

  if (result.status === "sent") return respond({ ok: true });

  if (result.status === "not_configured") {
    return respond(
      {
        ok: false,
        code: "not_configured",
        message: "Online inquiries aren’t switched on yet, so your message was not sent.",
      },
      503,
    );
  }

  console.error("[inquiry] delivery failed:", result.reason);
  return respond(
    { ok: false, code: "delivery_failed", message: "We couldn’t send your inquiry. Please try again shortly." },
    502,
  );
}
