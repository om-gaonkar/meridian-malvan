"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, fieldProps, inputClass } from "@/components/ui/form-fields";
import { MAX_GUESTS } from "@/config/constants";
import { useToday } from "@/lib/use-today";
import { formatDisplayDate } from "@/lib/utils";
import {
  addDaysIso,
  inquirySchema,
  isRealIsoDate,
  nightsBetween,
  type InquiryApiResponse,
  type InquiryInput,
} from "@/lib/validation";

const GUESTS_HINT = "Adults and children together";
const MESSAGE_HINT = "Optional if you have chosen dates. Up to 1,500 characters.";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export function InquiryForm({ phone, email }: { phone: string | null; email: string | null }) {
  const today = useToday();
  const startedAt = useRef(0);
  const noticeRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      room: "",
      message: "",
      consent: false,
      startedAt: 0,
      website: "",
    },
  });

  const [checkIn, checkOut, guests, room] = useWatch({
    control,
    name: ["checkIn", "checkOut", "guests", "room"],
  });

  // Record when the form appeared (bot check) and prefill from the home-page booking bar
  // or a room card. The page itself stays statically generated.
  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    const paramIn = params.get("checkIn") ?? "";
    const paramOut = params.get("checkOut") ?? "";
    if (isRealIsoDate(paramIn)) setValue("checkIn", paramIn);
    if (isRealIsoDate(paramOut)) setValue("checkOut", paramOut);
    const paramGuests = Number(params.get("guests"));
    if (Number.isInteger(paramGuests) && paramGuests >= 1 && paramGuests <= MAX_GUESTS) {
      setValue("guests", paramGuests);
    }
    const paramRoom = params.get("room");
    if (paramRoom) setValue("room", paramRoom.slice(0, 80));
  }, [setValue]);

  useEffect(() => {
    if (status.state === "error" || status.state === "success") noticeRef.current?.focus();
  }, [status.state]);

  async function onSubmit(values: InquiryInput) {
    setStatus({ state: "submitting" });
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const data = (await response.json().catch(() => null)) as InquiryApiResponse | null;

      if (response.ok && data?.ok) {
        reset();
        setStatus({ state: "success" });
        return;
      }

      if (data && !data.ok && data.fieldErrors) {
        for (const [field, messages] of Object.entries(data.fieldErrors)) {
          setError(field as keyof InquiryInput, { type: "server", message: messages[0] ?? "Check this field" });
        }
      }
      setStatus({
        state: "error",
        message: data && !data.ok ? data.message : "Something went wrong and your message was not sent.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "We couldn’t reach the server, so your message was not sent. Check your connection and try again.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div ref={noticeRef} tabIndex={-1} role="status" className="anim-pop rounded-2xl bg-mist p-8">
        <CircleCheck className="size-7 text-ocean" />
        <h3 className="mt-4 text-3xl">Inquiry sent</h3>
        <p className="mt-3 max-w-[50ch] text-ink-soft">
          Thank you. The hotel team has your inquiry and will reply using the email address or phone
          number you gave. Nothing is reserved until they confirm.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus({ state: "idle" })}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  const nights = nightsBetween(checkIn, checkOut);
  const showSummary = nights !== null && !errors.checkIn && !errors.checkOut;
  const submitting = status.state === "submitting";

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
      <Field id="inq-name" label="Full name" required error={errors.name?.message}>
        <input
          {...fieldProps("inq-name", errors.name?.message)}
          {...register("name")}
          type="text"
          autoComplete="name"
          aria-required="true"
          className={inputClass}
        />
      </Field>

      <Field id="inq-email" label="Email" required error={errors.email?.message}>
        <input
          {...fieldProps("inq-email", errors.email?.message)}
          {...register("email")}
          type="email"
          autoComplete="email"
          aria-required="true"
          className={inputClass}
        />
      </Field>

      <Field id="inq-phone" label="Phone (optional)" error={errors.phone?.message}>
        <input
          {...fieldProps("inq-phone", errors.phone?.message)}
          {...register("phone")}
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </Field>

      <Field
        id="inq-guests"
        label="Guests"
        hint={GUESTS_HINT}
        error={errors.guests?.message}
      >
        <select
          {...fieldProps("inq-guests", errors.guests?.message, GUESTS_HINT)}
          {...register("guests", { valueAsNumber: true })}
          className={inputClass}
        >
          {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </Field>

      <Field id="inq-check-in" label="Check-in" error={errors.checkIn?.message}>
        <input
          {...fieldProps("inq-check-in", errors.checkIn?.message)}
          {...register("checkIn")}
          type="date"
          min={today || undefined}
          className={inputClass}
        />
      </Field>

      <Field id="inq-check-out" label="Check-out" error={errors.checkOut?.message}>
        <input
          {...fieldProps("inq-check-out", errors.checkOut?.message)}
          {...register("checkOut")}
          type="date"
          min={checkIn && isRealIsoDate(checkIn) ? addDaysIso(checkIn, 1) : today || undefined}
          className={inputClass}
        />
      </Field>

      {showSummary ? (
        <aside
          aria-label="Inquiry summary"
          className="rounded-2xl border border-line bg-mist/60 p-5 text-[0.95rem] sm:col-span-2"
        >
          <p className="font-medium">Your inquiry</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-5 gap-y-0.5">
            <dt className="text-ink-soft">Dates</dt>
            <dd>
              {formatDisplayDate(checkIn)} to {formatDisplayDate(checkOut)}
            </dd>
            <dt className="text-ink-soft">Length</dt>
            <dd>
              {nights} {nights === 1 ? "night" : "nights"}
            </dd>
            <dt className="text-ink-soft">Guests</dt>
            <dd>{guests}</dd>
            {room ? (
              <>
                <dt className="text-ink-soft">Room</dt>
                <dd>{room}</dd>
              </>
            ) : null}
          </dl>
          <p className="mt-2 text-sm text-ink-soft">
            No payment is taken. The hotel confirms availability and rates before anything is reserved.
          </p>
        </aside>
      ) : null}

      <Field
        id="inq-message"
        label="Message"
        hint={MESSAGE_HINT}
        error={errors.message?.message}
        className="sm:col-span-2"
      >
        <textarea
          {...fieldProps("inq-message", errors.message?.message, MESSAGE_HINT)}
          {...register("message")}
          rows={5}
          className={inputClass}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id="inq-consent"
            type="checkbox"
            {...register("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "inq-consent-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-ocean"
          />
          <label htmlFor="inq-consent" className="text-[0.95rem]">
            I agree to be contacted about this inquiry and have read the{" "}
            <Link href="/privacy-policy" className="text-ocean underline underline-offset-4">
              privacy policy
            </Link>
            .
          </label>
        </div>
        {errors.consent ? (
          <p id="inq-consent-error" className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-sunset-dark">
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
            <span>{errors.consent.message}</span>
          </p>
        ) : null}
      </div>

      {status.state === "error" ? (
        <div
          ref={noticeRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl border-2 border-sunset bg-surface p-4 sm:col-span-2"
        >
          <p className="flex items-start gap-2 font-medium text-sunset-dark">
            <CircleAlert className="mt-0.5 size-5 shrink-0" />
            <span>{status.message}</span>
          </p>
          {phone || email ? (
            <p className="mt-2 text-sm">
              You can also reach the hotel directly
              {phone ? (
                <>
                  {" "}
                  on{" "}
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="underline underline-offset-4">
                    {phone}
                  </a>
                </>
              ) : null}
              {phone && email ? " or" : null}
              {email ? (
                <>
                  {" "}
                  at{" "}
                  <a href={`mailto:${email}`} className="underline underline-offset-4">
                    {email}
                  </a>
                </>
              ) : null}
              .
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {submitting ? "Sending" : "Send inquiry"}
        </Button>
        {submitting ? (
          <p role="status" className="sr-only">
            Sending your inquiry
          </p>
        ) : null}
      </div>
    </form>
  );
}
