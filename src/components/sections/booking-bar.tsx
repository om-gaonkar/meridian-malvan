"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Field, fieldProps, inputClass } from "@/components/ui/form-fields";
import { MAX_GUESTS } from "@/config/constants";
import { useToday } from "@/lib/use-today";
import { addDaysIso, validateStayDates, type DateIssue } from "@/lib/validation";

/**
 * A plain GET form to /contact, so it works without JavaScript. With JavaScript it
 * validates the dates first. It starts an inquiry; it does not check live availability.
 */
export function BookingBar() {
  const today = useToday();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [issue, setIssue] = useState<DateIssue | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const found = validateStayDates(checkIn, checkOut);
    if (found) {
      event.preventDefault();
      setIssue(found);
      document.getElementById(found.field === "checkIn" ? "bar-check-in" : "bar-check-out")?.focus();
    }
  }

  function handleCheckIn(value: string) {
    setCheckIn(value);
    setIssue(null);
    if (checkOut && value && checkOut <= value) setCheckOut("");
  }

  return (
    <Container className="anim-fade-up relative z-10 -mt-14 [--d:1.3s]">
      <form
        action="/contact"
        method="get"
        noValidate
        onSubmit={handleSubmit}
        aria-labelledby="booking-bar-title"
        className="grid gap-4 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-lift backdrop-blur-xl sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_9rem_auto] lg:items-start"
      >
        <h2 id="booking-bar-title" className="sr-only">
          Start a booking inquiry
        </h2>
        <Field id="bar-check-in" label="Check-in" error={issue?.field === "checkIn" ? issue.message : undefined}>
          <input
            {...fieldProps("bar-check-in", issue?.field === "checkIn" ? issue.message : undefined)}
            type="date"
            name="checkIn"
            min={today || undefined}
            value={checkIn}
            onChange={(e) => handleCheckIn(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="bar-check-out" label="Check-out" error={issue?.field === "checkOut" ? issue.message : undefined}>
          <input
            {...fieldProps("bar-check-out", issue?.field === "checkOut" ? issue.message : undefined)}
            type="date"
            name="checkOut"
            min={checkIn ? addDaysIso(checkIn, 1) : today || undefined}
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setIssue(null);
            }}
            className={inputClass}
          />
        </Field>
        <Field id="bar-guests" label="Guests">
          <select id="bar-guests" name="guests" defaultValue="2" className={inputClass}>
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2 lg:col-span-1 lg:pt-[1.75rem]">
          <Button type="submit" className="w-full">
            Start an inquiry
          </Button>
        </div>
        <p className="text-sm text-ink-soft sm:col-span-2 lg:col-span-4">
          Inquiry only: nothing is reserved or charged until the hotel confirms.
        </p>
      </form>
    </Container>
  );
}
