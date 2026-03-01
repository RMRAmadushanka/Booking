"use client";

import React from "react";

/**
 * Skeleton loader that mirrors the package detail page layout.
 * Used in app/packages/[id]/loading.tsx.
 */
export default function PackageDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <div className="h-4 w-16 bg-slate-200 rounded" />
          <span className="text-slate-400">/</span>
          <div className="h-4 w-48 bg-slate-200 rounded" />
        </div>

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
          <div className="max-w-3xl flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="h-6 w-24 bg-slate-200 rounded-full" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-slate-200 rounded" />
                ))}
              </div>
              <div className="h-4 w-16 bg-slate-200 rounded" />
            </div>
            <div className="h-9 sm:h-10 bg-slate-200 rounded w-full max-w-xl mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-[85%]" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="h-4 w-28 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-[var(--radius-md)] p-4 sm:p-5 w-full lg:w-[360px] shrink-0">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-9 w-28 bg-slate-200 rounded mt-2" />
            <div className="h-3 w-full bg-slate-200 rounded mt-2" />
            <div className="h-10 w-full bg-slate-200 rounded-[var(--button-radius)] mt-4" />
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-7 h-[320px] sm:h-[420px] rounded-[var(--radius-md)] bg-slate-200" />
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[152px] sm:h-[198px] rounded-[var(--radius-md)] bg-slate-200"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <div className="h-6 w-40 bg-slate-200 rounded mb-3" />
              <div className="h-4 w-full bg-slate-200 rounded mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-slate-100 rounded border border-slate-100" />
                ))}
              </div>
            </section>
            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <div className="h-6 w-24 bg-slate-200 rounded mb-3" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-8 w-20 bg-slate-200 rounded-full" />
                ))}
              </div>
            </section>
            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <div className="h-6 w-28 bg-slate-200 rounded mb-3" />
              <div className="h-4 w-full bg-slate-200 rounded mb-4" />
              <div className="h-[280px] bg-slate-100 rounded border border-slate-100" />
            </section>
            <section className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <div className="h-6 w-32 bg-slate-200 rounded mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                      <div className="h-3 bg-slate-100 rounded w-full" />
                      <div className="h-3 bg-slate-100 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column - booking form skeleton */}
          <div className="lg:col-span-5 min-w-0">
            <div className="bg-white border border-slate-200 rounded-[var(--radius-md)] p-5 sm:p-6 shadow-sm">
              <div className="h-6 w-40 bg-slate-200 rounded mb-1" />
              <div className="h-4 w-full bg-slate-200 rounded mb-5" />
              <div className="space-y-4">
                <div className="h-10 bg-slate-100 rounded-[var(--radius)]" />
                <div className="h-10 bg-slate-100 rounded-[var(--radius)]" />
                <div className="h-10 bg-slate-100 rounded-[var(--radius)]" />
                <div className="h-24 bg-slate-100 rounded-[var(--radius)]" />
                <div className="h-12 bg-slate-200 rounded-[var(--button-radius)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="h-4 w-48 bg-slate-100 rounded mt-10" />
      </div>
    </div>
  );
}
