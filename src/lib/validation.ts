import { z } from "zod";
import { MAX_GUESTS, TIME_ZONE } from "@/config/constants";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isRealIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/** Today's date (YYYY-MM-DD) in the hotel's time zone, regardless of where the code runs. */
export function todayInKolkata(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addDaysIso(value: string, days: number): string {
  const d = new Date(`${value}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function nightsBetween(checkIn: string, checkOut: string): number | null {
  if (!isRealIsoDate(checkIn) || !isRealIsoDate(checkOut)) return null;
  const diff = (Date.parse(`${checkOut}T00:00:00Z`) - Date.parse(`${checkIn}T00:00:00Z`)) / 86_400_000;
  return diff > 0 ? diff : null;
}

export interface DateIssue {
  field: "checkIn" | "checkOut";
  message: string;
}

/** Shared by the booking bar, the inquiry form and the server endpoint. */
export function validateStayDates(
  checkIn: string,
  checkOut: string,
  today: string = todayInKolkata(),
): DateIssue | null {
  if (!checkIn) return { field: "checkIn", message: "Choose a check-in date" };
  if (!isRealIsoDate(checkIn)) return { field: "checkIn", message: "Enter a valid check-in date" };
  if (checkIn < today) return { field: "checkIn", message: "Check-in can’t be in the past" };
  if (!checkOut) return { field: "checkOut", message: "Choose a check-out date" };
  if (!isRealIsoDate(checkOut)) return { field: "checkOut", message: "Enter a valid check-out date" };
  if (checkOut <= checkIn) return { field: "checkOut", message: "Check-out must be after check-in" };
  return null;
}

export const inquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your name")
      .max(100, "Keep your name under 100 characters"),
    email: z.email("Enter a valid email address").max(254, "That email address is too long"),
    phone: z
      .string()
      .trim()
      .refine((v) => v === "" || /^\+?[\d\s()-]{7,20}$/.test(v), "Enter a valid phone number"),
    checkIn: z.string(),
    checkOut: z.string(),
    guests: z
      .number({ error: "Choose the number of guests" })
      .int("Choose the number of guests")
      .min(1, "At least 1 guest")
      .max(MAX_GUESTS, `For more than ${MAX_GUESTS} guests, please describe your group in the message`),
    room: z.string().trim().max(80),
    message: z.string().trim().max(1500, "Keep your message under 1,500 characters"),
    consent: z.boolean().refine((v) => v === true, "Please confirm you agree to be contacted"),
    /** Epoch ms when the form was first shown; used as a bot check. */
    startedAt: z.number(),
    /** Honeypot. Real visitors never see or fill this. */
    website: z.string().max(200).optional(),
  })
  .superRefine((value, ctx) => {
    const hasDates = value.checkIn !== "" || value.checkOut !== "";
    if (hasDates) {
      const issue = validateStayDates(value.checkIn, value.checkOut);
      if (issue) ctx.addIssue({ code: "custom", path: [issue.field], message: issue.message });
    } else if (value.message === "") {
      ctx.addIssue({ code: "custom", path: ["message"], message: "Write a message or choose your dates" });
    }
  });

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryApiResponse =
  | { ok: true }
  | {
      ok: false;
      code:
        | "validation"
        | "too_fast"
        | "rate_limited"
        | "not_configured"
        | "delivery_failed"
        | "bad_request"
        | "forbidden";
      message: string;
      fieldErrors?: Record<string, string[]>;
    };
