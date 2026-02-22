"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Popover } from "@headlessui/react";
import {
  MapPinIcon,
  SparklesIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import ReactDatePicker from "react-datepicker";
import { Destination } from "@/types/packages";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";

function getDaysBetween(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)) + 1);
}

function todayISO(): string {
  const d = new Date();
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

function formatDayDate(start: Date, dayIndex: number): string {
  const d = new Date(start);
  d.setDate(d.getDate() + dayIndex);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const DESTINATIONS: Destination[] = [
  "Colombo",
  "Kandy",
  "Sigiriya",
  "Ella",
  "Nuwara Eliya",
  "Yala",
  "Galle",
  "Bentota",
];

const FLEXIBLE_LABEL = "Travel day / Flexible";

interface LocationAutocompleteProps {
  value: Destination | "";
  onChange: (value: Destination | "") => void;
  placeholder?: string;
  id?: string;
  options?: Destination[];
}

function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Search location...",
  id,
  options = DESTINATIONS,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((loc) => loc.toLowerCase().includes(q));
  }, [query, options]);

  const choices = useMemo(() => [FLEXIBLE_LABEL, ...filtered], [filtered]);
  const displayValue = value || "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) setHighlightIndex(0);
  }, [open]);

  const select = (item: string) => {
    if (item === FLEXIBLE_LABEL) {
      onChange("");
    } else {
      onChange(item as Destination);
    }
    setQuery("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % choices.length);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i - 1 + choices.length) % choices.length);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      select(choices[highlightIndex]);
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
        <input
          id={id}
          type="text"
          value={open ? query : displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full pl-9 pr-9 py-2.5 rounded-[var(--radius)] border border-[var(--color-border)] text-[var(--color-dark)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-sm placeholder:text-[var(--color-muted)]"
        />
        <ChevronUpDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none" />
      </div>
      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-52 overflow-auto rounded-[var(--radius)] border border-[var(--color-border)] bg-white shadow-lg py-1"
          aria-label="Location options"
        >
          {choices.map((item, i) => (
            <li
              key={item}
              role="option"
              aria-selected={highlightIndex === i}
              onClick={() => select(item)}
              onMouseEnter={() => setHighlightIndex(i)}
              className={`px-3 py-2.5 text-sm cursor-pointer flex items-center gap-2 ${
                highlightIndex === i ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]" : item === FLEXIBLE_LABEL ? "text-[var(--color-muted)]" : "text-[var(--color-dark)]"
              } ${item === FLEXIBLE_LABEL ? "border-b border-[var(--color-border)]" : ""}`}
            >
              {item === FLEXIBLE_LABEL ? (
                <span>{item}</span>
              ) : (
                <>
                  <MapPinIcon className="w-4 h-4 flex-shrink-0 text-[var(--color-muted)]" />
                  <span>{item}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CustomizeTripPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tripStartDate, setTripStartDate] = useState<Date | null>(null);
  const [tripEndDate, setTripEndDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [dayPlans, setDayPlans] = useState<(Destination | "")[]>([]);
  const [travelPlan, setTravelPlan] = useState("");
  const [notes, setNotes] = useState("");

  type SubmitState =
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "success"; requestId: string; emailSent: boolean; emailConfigured: boolean }
    | { status: "error"; message: string };
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const tripDayCount = useMemo(() => {
    if (!tripStartDate || !tripEndDate) return 0;
    return getDaysBetween(tripStartDate, tripEndDate);
  }, [tripStartDate, tripEndDate]);

  useEffect(() => {
    setDayPlans((prev) => {
      if (tripDayCount <= 0) return [];
      const next = new Array(tripDayCount).fill("") as (Destination | "")[];
      prev.forEach((v, i) => {
        if (i < tripDayCount) next[i] = v;
      });
      return next;
    });
  }, [tripDayCount]);

  const setDayPlan = (dayIndex: number, value: Destination | "") => {
    setDayPlans((prev) => {
      const next = [...prev];
      next[dayIndex] = value;
      return next;
    });
  };

  function dateToISO(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  const validate = (): string | null => {
    if (!name.trim()) return "Please enter your name.";
    if (!email.trim()) return "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Please enter a valid email.";
    if (!Number.isFinite(adults) || adults < 1) return "Adults must be at least 1.";
    if (!Number.isFinite(children) || children < 0) return "Children cannot be negative.";
    if (tripStartDate && tripEndDate && tripStartDate > tripEndDate) return "Start date must be before end date.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setSubmitState({ status: "error", message: err });
      return;
    }

    setSubmitState({ status: "submitting" });
    try {
      const res = await fetch("/api/custom-trip-requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          startDate: tripStartDate ? dateToISO(tripStartDate) : undefined,
          endDate: tripEndDate ? dateToISO(tripEndDate) : undefined,
          adults,
          children,
          dayPlan: dayPlans.map((loc) => (loc || "").trim()),
          travelPlanNotes: travelPlan.trim() || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message: data?.error ?? "Failed to submit. Please try again.",
        });
        return;
      }

      setSubmitState({
        status: "success",
        requestId: data.requestId,
        emailSent: data.emailSent === true,
        emailConfigured: data.emailConfigured === true,
      });
    } catch {
      setSubmitState({ status: "error", message: "Network error. Please try again." });
    }
  };

  const resetForm = () => {
    setSubmitState({ status: "idle" });
    setName("");
    setEmail("");
    setPhone("");
    setTripStartDate(null);
    setTripEndDate(null);
    setAdults(1);
    setChildren(0);
    setDayPlans([]);
    setTravelPlan("");
    setNotes("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-border)] sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-[var(--radius)] bg-[var(--color-primary)]/10">
              <SparklesIcon className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--color-dark)]">
                Customize Your Trip
              </h1>
              <p className="text-sm text-[var(--color-muted)] mt-0.5">
                Share your travel plan and we&apos;ll create a package for you
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        {submitState.status === "success" ? (
          <div className="rounded-[var(--radius-md)] border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-900">Request submitted</p>
                <p className="text-sm text-emerald-800 mt-1">
                  Request ID: <span className="font-mono">{submitState.requestId}</span>
                </p>
                <p className="text-sm text-emerald-800 mt-1">
                  Our team will reach out to <span className="font-medium">{email.trim()}</span>.
                </p>
                {submitState.emailSent ? (
                  <p className="text-sm text-emerald-800 mt-1">
                    A confirmation email was sent to your inbox.
                  </p>
                ) : (
                  <p className="text-sm text-emerald-800 mt-1">
                    We couldn&apos;t send a confirmation email, but our team will contact you at the email you provided.
                  </p>
                )}
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-4 px-4 py-2.5 text-sm font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-[var(--radius)] hover:bg-emerald-50 transition-colors"
                >
                  Submit another request
                </button>
              </div>
            </div>
          </div>
        ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-label="Submit your travel plan"
        >
          {submitState.status === "error" && (
            <div className="rounded-[var(--radius-md)] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              {submitState.message}
            </div>
          )}
          {/* Contact */}
          <section className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-dark)]">
                Your details
              </h2>
              <p className="text-sm text-[var(--color-muted)] mt-0.5">
                So the agency can get back to you
              </p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--color-dark)] mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] text-[var(--color-dark)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--color-dark)] mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] text-[var(--color-dark)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-dark)] mb-1.5">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+94 7X XXX XXXX"
                  className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] text-[var(--color-dark)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* Trip basics - overflow-visible so date range picker popover is not clipped */}
          <section className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-sm overflow-visible">
            <div className="px-5 py-4 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-dark)]">
                Trip basics
              </h2>
            </div>
            <div className="p-5 space-y-4 overflow-visible">
              <div>
                <label className="block text-sm font-medium text-[var(--color-dark)] mb-2">
                  Trip duration
                </label>
                <Popover className="relative">
                  <Popover.Button
                    type="button"
                    className="w-full flex items-center gap-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-white px-4 py-3 text-left text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-[var(--color-dark)]"
                  >
                    <CalendarDaysIcon className="w-5 h-5 text-[var(--color-muted)] shrink-0" />
                    <span className={tripStartDate || tripEndDate ? "text-[var(--color-dark)]" : "text-[var(--color-muted)]"}>
                      {tripStartDate && tripEndDate
                        ? `${formatDateDisplay(dateToISO(tripStartDate))} – ${formatDateDisplay(dateToISO(tripEndDate))} (${getDaysBetween(tripStartDate, tripEndDate)} days)`
                        : tripStartDate
                          ? `${formatDateDisplay(dateToISO(tripStartDate))} – Select end date`
                          : "Select travel dates"}
                    </span>
                  </Popover.Button>
                  <Popover.Panel className="absolute right-0 z-[1000] mt-2 w-auto max-h-[min(85vh,520px)] overflow-auto rounded-[var(--radius)] border border-[var(--color-border)] bg-white p-4 shadow-lg">
                    <ReactDatePicker
                      selected={tripStartDate ?? null}
                      startDate={tripStartDate ?? null}
                      endDate={tripEndDate ?? null}
                      selectsRange
                      minDate={isoToDate(todayISO())}
                      onChange={(dates: [Date | null, Date | null] | null) => {
                        if (!dates) return;
                        const [start, end] = dates;
                        if (start) {
                          const startISO = dateToISO(start);
                          const clampedStart = startISO < todayISO() ? todayISO() : startISO;
                          setTripStartDate(isoToDate(clampedStart));
                        } else {
                          setTripStartDate(null);
                        }
                        if (end) {
                          setTripEndDate(end);
                        } else {
                          setTripEndDate(null);
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
              <div>
                <label className="block text-sm font-medium text-[var(--color-dark)] mb-3">
                  Number of travelers
                </label>
                <div className="rounded-[var(--radius)] border border-[var(--color-border)] divide-y divide-[var(--color-border)] overflow-hidden">
                  {/* Adults */}
                  <div className="flex items-center justify-between px-4 py-3 bg-white">
                    <div className="flex items-center gap-2">
                      <UserGroupIcon className="w-5 h-5 text-[var(--color-muted)]" />
                      <div>
                        <span className="font-medium text-[var(--color-dark)]">Adults</span>
                        <span className="block text-xs text-[var(--color-muted)]">18+ years</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setAdults((n) => Math.max(1, n - 1))}
                        disabled={adults <= 1}
                        aria-label="Decrease adults"
                        className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-dark)] hover:bg-[#F1F5F9] hover:border-[var(--color-primary)]/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[var(--color-border)] transition-colors"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="min-w-[2rem] text-center font-medium text-[var(--color-dark)]" aria-live="polite">
                        {adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdults((n) => Math.min(9, n + 1))}
                        disabled={adults >= 9}
                        aria-label="Increase adults"
                        className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-dark)] hover:bg-[#F1F5F9] hover:border-[var(--color-primary)]/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[var(--color-border)] transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {/* Children */}
                  <div className="flex items-center justify-between px-4 py-3 bg-white">
                    <div className="flex items-center gap-2">
                      <UserGroupIcon className="w-5 h-5 text-[var(--color-muted)]" />
                      <div>
                        <span className="font-medium text-[var(--color-dark)]">Children</span>
                        <span className="block text-xs text-[var(--color-muted)]">0–17 years</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setChildren((n) => Math.max(0, n - 1))}
                        disabled={children <= 0}
                        aria-label="Decrease children"
                        className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-dark)] hover:bg-[#F1F5F9] hover:border-[var(--color-primary)]/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[var(--color-border)] transition-colors"
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="min-w-[2rem] text-center font-medium text-[var(--color-dark)]" aria-live="polite">
                        {children}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildren((n) => Math.min(9, n + 1))}
                        disabled={children >= 9}
                        aria-label="Increase children"
                        className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-dark)] hover:bg-[#F1F5F9] hover:border-[var(--color-primary)]/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[var(--color-border)] transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-[var(--color-muted)]">
                  Total: {adults + children} traveler{(adults + children) !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </section>

          {/* Your travel plan - day-by-day itinerary */}
          <section className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-dark)] flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5 text-[var(--color-primary)]" />
                Your travel plan
              </h2>
              <p className="text-sm text-[var(--color-muted)] mt-0.5">
                Assign a place to each day based on your trip dates. Select your travel dates above first.
              </p>
            </div>
            <div className="p-5 space-y-4">
              {tripDayCount === 0 ? (
                <div className="py-6 text-center rounded-[var(--radius)] bg-[#F8FAFC] border border-dashed border-[var(--color-border)]">
                  <CalendarDaysIcon className="w-10 h-10 mx-auto text-[var(--color-muted)] mb-2" />
                  <p className="text-sm font-medium text-[var(--color-dark)]">
                    Select your trip dates above to plan day by day
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    Your itinerary will appear here once you choose a date range
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[var(--color-muted)]">
                    <span className="font-medium text-[var(--color-dark)]">{tripDayCount} days</span>
                    {" "}({tripStartDate && formatDayDate(tripStartDate, 0)} – {tripEndDate && tripStartDate && formatDayDate(tripStartDate, tripDayCount - 1)})
                  </p>
                  <div className="space-y-3">
                    {dayPlans.map((selected, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-white"
                      >
                        <label className="sm:w-32 flex-shrink-0 text-sm font-medium text-[var(--color-dark)]">
                          Day {dayIndex + 1}
                          {tripStartDate && (
                            <span className="block text-xs font-normal text-[var(--color-muted)]">
                              {formatDayDate(tripStartDate, dayIndex)}
                            </span>
                          )}
                        </label>
                        <LocationAutocomplete
                          value={selected}
                          onChange={(v) => setDayPlan(dayIndex, v)}
                          placeholder="Search location..."
                          id={`day-${dayIndex}-location`}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div>
                <label htmlFor="travel-plan-notes" className="block text-sm font-medium text-[var(--color-dark)] mb-1.5">
                  Additional itinerary notes (optional)
                </label>
                <textarea
                  id="travel-plan-notes"
                  value={travelPlan}
                  onChange={(e) => setTravelPlan(e.target.value)}
                  placeholder="e.g. I want to visit the Temple of the Tooth in Kandy, do the train to Ella, and have a beach day in Galle..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] text-[var(--color-dark)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-y"
                />
              </div>
            </div>
          </section>

          {/* Additional notes */}
          <section className="bg-white rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)]">
              <h2 className="text-lg font-semibold text-[var(--color-dark)]">
                Additional notes (optional)
              </h2>
            </div>
            <div className="p-5">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Dietary needs, accessibility, special requests..."
                rows={2}
                className="w-full px-4 py-3 rounded-[var(--radius)] border border-[var(--color-border)] text-[var(--color-dark)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
              />
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={submitState.status === "submitting"}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold rounded-[var(--radius)] shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitState.status === "submitting" ? (
                <>Submitting…</>
              ) : (
                <>
                  Submit to agency
                  <ChevronRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
