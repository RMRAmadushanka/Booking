"use client";

import React, { useMemo, useState } from "react";
import { Popover } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import ReactDatePicker from "react-datepicker";
import type { Destination, Duration } from "@/types/packages";
import CountrySearchDropdown from "@/components/forms/CountrySearchDropdown";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";

/** Fixed number of days for the package (used for date range). Supports "5 Days" / "1 Day" or legacy "1-3 Days", etc. */
function getFixedDayCount(duration: Duration | string): number {
  const s = String(duration).trim();
  const singleMatch = s.match(/^(\d+)\s*Day(s)?$/i);
  if (singleMatch) {
    const n = parseInt(singleMatch[1], 10);
    return Number.isFinite(n) && n >= 1 ? n : 3;
  }
  switch (s) {
    case "1-3 Days":
      return 3;
    case "4-6 Days":
      return 5;
    case "7-10 Days":
      return 8;
    case "10+ Days":
      return 10;
    default:
      return 3;
  }
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateDisplay(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function isoToDate(iso: string): Date {
  return new Date(iso + "T12:00:00");
}

function dateToISO(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

type PackageBookingFormProps = {
  packageId: string;
  packageTitle: string;
  destinations: Destination[];
  duration: Duration;
  basePricePerPerson: number; // adult price
  childPriceMultiplier?: number; // e.g. 0.75 = 25% off
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; bookingId: string; emailSent: boolean; emailConfigured: boolean }
  | { status: "error"; message: string };

type BookingPostResponse =
  | { ok: true; bookingId: string; emailSent?: boolean; emailConfigured?: boolean }
  | { ok: false; error: string };

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function PackageBookingForm({
  packageId,
  packageTitle,
  destinations,
  duration,
  basePricePerPerson,
  childPriceMultiplier = 0.75,
}: PackageBookingFormProps) {
  const defaultPickup = useMemo<string>(() => destinations[0] ?? "", [destinations]);
  const dayCount = useMemo(() => getFixedDayCount(duration), [duration]);

  const [travelerName, setTravelerName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [startDate, setStartDate] = useState(todayISO());
  const [pickupLocation, setPickupLocation] = useState<string>(defaultPickup);
  const [notes, setNotes] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const today = todayISO();
  const endDate = addDays(startDate, dayCount - 1);

  const guestCount = adultCount + childrenCount;
  const childPricePerPerson = Math.round(basePricePerPerson * childPriceMultiplier);
  const estimatedTotalPrice =
    adultCount * basePricePerPerson + childrenCount * childPricePerPerson;

  const validate = (): string | null => {
    if (!travelerName.trim()) return "Please enter traveler name.";
    if (!email.trim()) return "Please enter email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Please enter a valid email.";
    if (!Number.isFinite(adultCount) || adultCount < 1)
      return "Adults must be at least 1.";
    if (!Number.isFinite(childrenCount) || childrenCount < 0)
      return "Children cannot be negative.";
    if (!Number.isFinite(basePricePerPerson) || basePricePerPerson <= 0)
      return "Package price is missing.";
    if (!startDate?.trim()) return "Please select trip start date.";
    if (startDate < todayISO()) return "Start date cannot be in the past.";
    if (!pickupLocation.trim()) return "Please enter pickup location.";
    if (!country.trim()) return "Please select your country.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setSubmitState({ status: "error", message: err });
      return;
    }

    setSubmitState({ status: "submitting" });
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          packageId,
          packageTitle,
          travelerName,
          email,
          adultCount,
          childrenCount,
          guestCount,
          pricing: {
            currency: "USD",
            adultPricePerPerson: basePricePerPerson,
            childPricePerPerson,
            childPriceMultiplier,
            estimatedTotalPrice,
          },
          startDate,
          endDate,
          pickupLocation,
          country: country.trim(),
          notes: notes.trim() ? notes : undefined,
        }),
      });

      const data = (await res.json()) as BookingPostResponse;
      if (!res.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message: "error" in data ? data.error : "Failed to submit. Please try again.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        bookingId: data.bookingId,
        emailSent: data.emailSent === true,
        emailConfigured: data.emailConfigured === true,
      });
    } catch {
      setSubmitState({ status: "error", message: "Network error. Please try again." });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1">
        Book this package
      </h3>
      <p className="text-sm text-slate-600 mb-5">
        Submit your details and our agent will contact you.
      </p>

      {submitState.status === "success" ? (
        <div className="rounded-[var(--radius)] border border-emerald-200 bg-emerald-50 p-4">
          <div className="font-semibold text-emerald-900">Request submitted</div>
          <div className="text-sm text-emerald-800 mt-1">
            Booking ID: <span className="font-mono">{submitState.bookingId}</span>
          </div>
          <div className="text-sm text-emerald-800 mt-1">
            Our agent will reach out to <span className="font-medium">{email.trim()}</span>.
          </div>
          {submitState.emailSent ? (
            <div className="text-sm text-emerald-800 mt-1">
              A confirmation email was sent to your inbox.
            </div>
          ) : (
            <div className="text-sm text-emerald-800 mt-1">
              We couldn&apos;t send a confirmation email to your inbox, but our team will contact you at the email you provided.
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setSubmitState({ status: "idle" });
              setTravelerName("");
              setEmail("");
              setCountry("");
              setAdultCount(1);
              setChildrenCount(0);
              setStartDate(todayISO());
              setPickupLocation(defaultPickup);
              setNotes("");
            }}
            className="mt-4 px-4 py-2 text-sm font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-[var(--radius)] hover:bg-emerald-50 transition-colors"
          >
            Book again
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4 min-w-0">
          {submitState.status === "error" && (
            <div className="rounded-[var(--radius)] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              {submitState.message}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">
                Traveler name
              </span>
              <input
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                className="w-full rounded-[var(--radius)] border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                placeholder="Full name"
                autoComplete="name"
              />
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[var(--radius)] border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
              />
            </label>
          </div>

          <CountrySearchDropdown
            value={country}
            onChange={setCountry}
            placeholder="Search your country..."
            id="booking-country"
            required
          />

          {/* Guests - responsive: stacks on narrow (e.g. sidebar), side-by-side on wide */}
          <div className="block min-w-0">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Guests
            </span>
            <div className="rounded-[var(--radius)] border border-slate-300 bg-white p-3 sm:p-3.5 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Adults - stack label above controls on narrow to prevent button overlap */}
                <div className="flex flex-col gap-2 min-w-0">
                  <div>
                    <div className="text-sm font-semibold text-slate-900 leading-5">
                      Adults
                    </div>
                    <div className="text-xs text-slate-500 leading-4">Age 12+</div>
                  </div>
                  <div className="flex items-center gap-2 w-fit">
                    <button
                      type="button"
                      onClick={() => setAdultCount((v) => Math.max(1, v - 1))}
                      className="w-9 h-9 shrink-0 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold flex items-center justify-center transition-colors"
                      aria-label="Decrease adults"
                    >
                      −
                    </button>
                    <div className="w-10 text-center text-sm font-semibold text-slate-900 tabular-nums">
                      {adultCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setAdultCount((v) => v + 1)}
                      className="w-9 h-9 shrink-0 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold flex items-center justify-center transition-colors"
                      aria-label="Increase adults"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex flex-col gap-2 min-w-0">
                  <div>
                    <div className="text-sm font-semibold text-slate-900 leading-5">
                      Children
                    </div>
                    <div className="text-xs text-slate-500 leading-4">Age 0–11</div>
                  </div>
                  <div className="flex items-center gap-2 w-fit">
                    <button
                      type="button"
                      onClick={() => setChildrenCount((v) => Math.max(0, v - 1))}
                      className="w-9 h-9 shrink-0 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold flex items-center justify-center transition-colors"
                      aria-label="Decrease children"
                    >
                      −
                    </button>
                    <div className="w-10 text-center text-sm font-semibold text-slate-900 tabular-nums">
                      {childrenCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setChildrenCount((v) => v + 1)}
                      className="w-9 h-9 shrink-0 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold flex items-center justify-center transition-colors"
                      aria-label="Increase children"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Total guests:{" "}
                <span className="font-semibold text-slate-700 tabular-nums">
                  {guestCount}
                </span>
              </div>
            </div>
          </div>

          {/* Price estimate */}
          <div className="rounded-[var(--radius)] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">Price estimate</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Children are charged at {Math.round(childPriceMultiplier * 100)}% of adult
                  price.
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Estimated total</div>
                <div className="text-xl font-bold text-indigo-600 tabular-nums">
                  ${estimatedTotalPrice}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">
                  Adults ({adultCount} × ${basePricePerPerson})
                </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${adultCount * basePricePerPerson}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">
                  Children ({childrenCount} × ${childPricePerPerson})
                </span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${childrenCount * childPricePerPerson}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 mt-2">
              Note: This is an estimate. Final price may vary by dates, inclusions, and pickup
              location.
            </div>
          </div>

          {/* Trip details: date range picker (fixed day count) + pickup */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-slate-700">
              Trip details — {dayCount} day{dayCount !== 1 ? "s" : ""}
            </div>
            <div className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">
                Trip dates
              </span>
              <Popover className="relative">
                <Popover.Button
                  type="button"
                  className="w-full flex items-center gap-3 rounded-[var(--radius)] border border-slate-300 bg-white px-3 py-2.5 text-left text-sm outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <CalendarDaysIcon className="w-5 h-5 text-slate-500 shrink-0" />
                  <span className="text-slate-700">
                    {formatDateDisplay(startDate)} – {formatDateDisplay(endDate)}
                    <span className="text-slate-500 ml-1">({dayCount} days)</span>
                  </span>
                </Popover.Button>
                <Popover.Panel className="absolute right-0 z-[1000] mt-2 w-auto max-h-[min(85vh,520px)] overflow-auto rounded-[var(--radius)] border border-slate-200 bg-white p-4 shadow-lg">
                  <ReactDatePicker
                    selected={isoToDate(startDate)}
                    startDate={isoToDate(startDate)}
                    endDate={isoToDate(endDate)}
                    selectsRange
                    minDate={isoToDate(today)}
                    onChange={(dates: [Date | null, Date | null] | null) => {
                      if (!dates || !dates[0]) return;
                      let start = dates[0];
                      let startISO = dateToISO(start);
                      if (startISO < today) startISO = today;
                      setStartDate(startISO);
                    }}
                    monthsShown={2}
                    showPopperArrow={false}
                    inline
                    renderCustomHeader={(props) => (
                      <DatePickerCustomHeaderTwoMonth {...props} />
                    )}
                  />
                </Popover.Panel>
              </Popover>
            </div>

            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">
                Pick-up location
              </span>
              <input
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full rounded-[var(--radius)] border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                placeholder="e.g. airport, hotel, or city"
                autoComplete="street-address"
              />
              {!!defaultPickup && (
                <div className="text-xs text-slate-500 mt-1">
                  Default: first destination ({defaultPickup}). Change if you need a different pick-up point.
                </div>
              )}
            </label>
          </div>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Notes (optional)
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-24 rounded-[var(--radius)] border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
              placeholder="Any preferences, special requests, flight times, etc."
            />
          </label>

          <button
            type="submit"
            disabled={submitState.status === "submitting"}
            className="w-full px-5 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-[var(--radius)] transition-colors shadow-sm"
          >
            {submitState.status === "submitting" ? "Submitting..." : "Submit to agent"}
          </button>
        </form>
      )}
    </div>
  );
}

