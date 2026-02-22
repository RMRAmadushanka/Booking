"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

type ReviewDetails = {
  ok: true;
  type: "booking" | "rental";
  id: string;
  shortId: string;
  title: string;
  travelerName: string;
  startDate: string;
  endDate: string;
};

function ReviewFormInner() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "";
  const token = searchParams.get("token") ?? "";

  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready"; data: ReviewDetails }
    | { status: "submitted"; message: string }
    | { status: "idle" }
  >(type && token ? { status: "loading" } : { status: "idle" });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!type || !token) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/review?type=${encodeURIComponent(type)}&token=${encodeURIComponent(token)}`
        );
        const data = await res.json();
        if (cancelled) return;
        if (res.status === 409) {
          setState({ status: "error", message: data.error ?? "You have already submitted a review." });
          return;
        }
        if (res.status === 404 || !data.ok) {
          setState({ status: "error", message: data.error ?? "Invalid or expired link." });
          return;
        }
        setState({ status: "ready", data: data as ReviewDetails });
      } catch (e) {
        if (!cancelled) setState({ status: "error", message: "Something went wrong. Please try again." });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [type, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !token || rating < 1 || rating > 5) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, token, rating, comment: comment.trim() || undefined }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setState({ status: "submitted", message: data.message ?? "Thank you for your feedback!" });
      } else {
        setSubmitError(data.error ?? "Failed to submit. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (state.status === "idle") {
    return (
      <div className="max-w-lg mx-auto text-center py-12 px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Leave a review</h1>
        <p className="text-slate-600 mb-6">
          Use the link from your email to leave feedback about your trip or rental.
        </p>
        <Link
          href="/"
          className="inline-block text-[#2563EB] font-medium hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="max-w-lg mx-auto text-center py-12 px-4">
        <p className="text-slate-600">Loading…</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="max-w-lg mx-auto text-center py-12 px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Unable to load</h1>
        <p className="text-slate-600 mb-6">{state.message}</p>
        <Link
          href="/"
          className="inline-block text-[#2563EB] font-medium hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  if (state.status === "submitted") {
    return (
      <div className="max-w-lg mx-auto text-center py-12 px-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h1 className="text-2xl font-bold text-emerald-900 mb-2">Thank you</h1>
          <p className="text-emerald-800 mb-6">{state.message}</p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-lg bg-[#2563EB] text-white font-medium hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const { data } = state;
  const displayType = data.type === "booking" ? "Travel package" : "Vehicle rental";

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Leave your review</h1>
      <p className="text-slate-600 mb-6">
        Hi {data.travelerName}, share your experience for &ldquo;{data.title}&rdquo;.
      </p>

      <div className="rounded-[var(--radius)] border border-slate-200 bg-slate-50 p-4 mb-6">
        <div className="text-sm text-slate-600">
          <span className="font-medium text-slate-700">{displayType}</span>
          <br />
          {data.title} · {data.startDate} to {data.endDate}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rating <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => {
              const active = (hoverRating || rating) >= value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-1"
                  aria-label={`${value} star${value === 1 ? "" : "s"}`}
                >
                  {active ? (
                    <StarIcon className="w-10 h-10 text-amber-400" />
                  ) : (
                    <StarOutlineIcon className="w-10 h-10 text-slate-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="review-comment" className="block text-sm font-medium text-slate-700 mb-2">
            Your feedback (optional)
          </label>
          <textarea
            id="review-comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-[var(--radius)] border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            placeholder="Tell us what you liked or what we could improve…"
          />
        </div>

        {submitError && (
          <p className="text-sm text-rose-600">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={submitting || rating < 1}
          className="w-full py-3 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Submitting…" : "Submit review"}
        </button>
      </form>

      <p className="mt-6 text-center">
        <Link href="/" className="text-[#2563EB] font-medium hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="max-w-lg mx-auto text-center py-12">Loading…</div>}>
          <ReviewFormInner />
        </Suspense>
      </div>
    </div>
  );
}
