import "server-only";
import { siteConfig } from "@/config/site";
import { nightsBetween } from "./validation";

export interface CleanInquiry {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  room: string;
  message: string;
}

export type DeliveryResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "failed"; reason: string };

const TIMEOUT_MS = 8000;

function toPlainText(i: CleanInquiry): string {
  const nights = i.checkIn && i.checkOut ? nightsBetween(i.checkIn, i.checkOut) : null;
  return [
    `New inquiry from ${siteConfig.name} website`,
    "",
    `Name:    ${i.name}`,
    `Email:   ${i.email}`,
    `Phone:   ${i.phone || "(not given)"}`,
    `Dates:   ${i.checkIn ? `${i.checkIn} to ${i.checkOut}${nights ? ` (${nights} night${nights > 1 ? "s" : ""})` : ""}` : "(not given)"}`,
    `Guests:  ${i.guests}`,
    `Room:    ${i.room || "(not specified)"}`,
    "",
    "Message:",
    i.message || "(none)",
  ].join("\n");
}

async function sendViaWebhook(url: string, inquiry: CleanInquiry): Promise<DeliveryResult> {
  const secret = process.env.INQUIRY_WEBHOOK_SECRET;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
    },
    body: JSON.stringify({
      type: "booking_inquiry",
      receivedAt: new Date().toISOString(),
      source: siteConfig.url,
      inquiry,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return res.ok ? { status: "sent" } : { status: "failed", reason: `webhook responded ${res.status}` };
}

async function sendViaResend(
  config: { apiKey: string; to: string; from: string },
  inquiry: CleanInquiry,
): Promise<DeliveryResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: inquiry.email,
      subject: `Website inquiry from ${inquiry.name}`,
      // Plain text only: user input is never interpolated into HTML.
      text: toPlainText(inquiry),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return res.ok ? { status: "sent" } : { status: "failed", reason: `resend responded ${res.status}` };
}

/**
 * Adapter point. Add another provider here (or replace the body) to connect a
 * hotel-management system. Credentials are read from server-only env vars.
 */
export async function deliverInquiry(inquiry: CleanInquiry): Promise<DeliveryResult> {
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  const { RESEND_API_KEY: apiKey, INQUIRY_TO_EMAIL: to, INQUIRY_FROM_EMAIL: from } = process.env;

  try {
    if (webhookUrl) return await sendViaWebhook(webhookUrl, inquiry);
    if (apiKey && to && from) return await sendViaResend({ apiKey, to, from }, inquiry);
  } catch (error) {
    return { status: "failed", reason: error instanceof Error ? error.name : "unknown error" };
  }
  return { status: "not_configured" };
}
