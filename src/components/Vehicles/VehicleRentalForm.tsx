"use client";

import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import ReactDatePicker from "react-datepicker";
import CountrySearchDropdown from "@/components/forms/CountrySearchDropdown";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";

type VehicleRentalFormProps = {
  vehicleId: string;
  vehicleTitle: string;
  pricePerDay: number;
  defaultPickup: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; rentalId: string; emailSent: boolean; emailConfigured: boolean }
  | { status: "error"; message: string };

type RentalPostResponse =
  | { ok: true; rentalId: string; emailSent?: boolean; emailConfigured?: boolean }
  | { ok: false; error: string };

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const a = new Date(start + "T12:00:00");
  const b = new Date(end + "T12:00:00");
  const diff = (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(diff) + 1);
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

export default function VehicleRentalForm({
  vehicleId,
  vehicleTitle,
  pricePerDay,
  defaultPickup,
}: VehicleRentalFormProps) {
  const [travelerName, setTravelerName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState(defaultPickup);
  const [notes, setNotes] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const days = daysBetween(startDate, endDate);
  const estimatedTotal = days * pricePerDay;

  const validate = (): string | null => {
    if (!travelerName.trim()) return "Please enter your name.";
    if (!email.trim()) return "Please enter email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Please enter a valid email.";
    if (!startDate) return "Please select start date.";
    if (!endDate) return "Please select end date.";
    if (startDate > endDate) return "Start date must be before end date.";
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
      const res = await fetch("/api/vehicle-rentals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          vehicleId,
          vehicleTitle,
          travelerName: travelerName.trim(),
          email: email.trim(),
          country: country.trim(),
          startDate,
          endDate,
          pickupLocation: pickupLocation.trim(),
          notes: notes.trim() || undefined,
          pricePerDay,
          totalPrice: estimatedTotal,
          numberOfDays: days,
        }),
      });

      const data = (await res.json()) as RentalPostResponse;
      if (!res.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message: "error" in data ? data.error : "Failed to submit. Please try again.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        rentalId: data.rentalId,
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
        Rent this vehicle
      </h3>
      <p className="text-sm text-slate-600 mb-5">
        Submit your details and our team will confirm availability and contact you.
      </p>

      {submitState.status === "success" ? (
        <div className="rounded-[var(--radius)] border border-emerald-200 bg-emerald-50 p-4">
          <div className="font-semibold text-emerald-900">Request submitted</div>
          <div className="text-sm text-emerald-800 mt-1">
            Rental ID: <span className="font-mono">{submitState.rentalId}</span>
          </div>
          <div className="text-sm text-emerald-800 mt-1">
            Our team will reach out to <span className="font-medium">{email.trim()}</span>.
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
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          {submitState.status === "error" && (
            <div className="rounded-[var(--radius)] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              {submitState.message}
            </div>
          )}

          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Your name</span>
            <input
              type="text"
              value={travelerName}
              onChange={(e) => setTravelerName(e.target.value)}
              className="w-full rounded-[var(--radius)] border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Full name"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[var(--radius)] border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </label>

          <CountrySearchDropdown
            value={country}
            onChange={setCountry}
            placeholder="Search your country..."
            id="rental-country"
            required
          />

          <div className="rounded-[var(--radius)] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">Price estimate</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  ${pricePerDay}/day × {days} day{days !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Estimated total</div>
                <div className="text-xl font-bold text-indigo-600 tabular-nums">
                  ${estimatedTotal}
                </div>
              </div>
            </div>
          </div>

          <div className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Rental period</span>
            <Popover className="relative">
              <Popover.Button
                type="button"
                className="w-full flex items-center gap-3 rounded-[var(--radius)] border border-slate-300 bg-white px-3 py-2.5 text-left text-sm outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] text-slate-700"
              >
                <CalendarDaysIcon className="w-5 h-5 text-slate-500 shrink-0" />
                <span className={startDate && endDate ? "text-slate-700" : "text-slate-500"}>
                  {startDate && endDate
                    ? `${formatDateDisplay(startDate)} – ${formatDateDisplay(endDate)} (${daysBetween(startDate, endDate)} days)`
                    : startDate
                      ? `${formatDateDisplay(startDate)} – Select end date`
                      : "Select travel dates"}
                </span>
              </Popover.Button>
              <Popover.Panel className="absolute right-0 z-[1000] mt-2 w-auto max-h-[min(85vh,520px)] overflow-auto rounded-[var(--radius)] border border-slate-200 bg-white p-4 shadow-lg">
                <ReactDatePicker
                  selected={startDate ? isoToDate(startDate) : null}
                  startDate={startDate ? isoToDate(startDate) : null}
                  endDate={endDate ? isoToDate(endDate) : null}
                  selectsRange
                  minDate={isoToDate(todayISO())}
                  onChange={(dates: [Date | null, Date | null] | null) => {
                    if (!dates) return;
                    const [start, end] = dates;
                    if (start) {
                      const startISO = dateToISO(start);
                      const clampedStart = startISO < todayISO() ? todayISO() : startISO;
                      setStartDate(clampedStart);
                      if (!end) setEndDate("");
                    } else {
                      setStartDate("");
                      setEndDate("");
                    }
                    if (end) {
                      setEndDate(dateToISO(end));
                    }
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
              Pickup location
            </span>
            <input
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full rounded-[var(--radius)] border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. Airport, hotel, city"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Notes (optional)
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-24 rounded-[var(--radius)] border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Special requests, flight times, etc."
            />
          </label>

          <button
            type="submit"
            disabled={submitState.status === "submitting"}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-[var(--radius)] transition-colors"
          >
            {submitState.status === "submitting" ? "Submitting..." : "Submit rental request"}
          </button>
        </form>
      )}
    </div>
  );
}
