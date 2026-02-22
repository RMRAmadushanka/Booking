"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Destination, DestinationDetail, DestinationWithDay, RouteDayFromDb } from "@/types/packages";

const PLACEHOLDER_IMAGE_BASE = "https://picsum.photos/seed";
const PLACEHOLDER_DESCRIPTION =
  "A day on your route. Explore at your own pace or follow your guide's suggestions.";

export type PackageLocationsAccordionProps = {
  destinations: Destination[];
  /** When provided (from DB), use these for image and description per stop. */
  locationDetails?: DestinationDetail[] | null;
  /** Total days in the package (from duration). Exactly this many rows are shown (one per day). */
  dayCount: number;
  /** When provided (from DB destination_days), each stop is shown with this day number. Otherwise day = index + 1. */
  destinationDays?: DestinationWithDay[] | null;
  /** When provided (from DB route_days), Locations & route uses only this—all data from DB. */
  routeDays?: RouteDayFromDb[] | null;
  /** Optional: package id for stable placeholder image seeds. */
  packageId?: string;
};

type RouteDay = {
  day: number;
  name: string;
  imageUrl: string;
  description: string;
};

function buildRouteDaysFromDb(
  dayCount: number,
  destinations: Destination[],
  dbDestinationDetails: DestinationDetail[] | null | undefined,
  destinationDays: DestinationWithDay[] | null | undefined,
  packageId?: string
): RouteDay[] {
  const days: RouteDay[] = [];
  const used = new Set<number>();

  for (let d = 1; d <= dayCount; d++) {
    let name: string;
    let imageUrl: string;
    let description: string;

    if (Array.isArray(destinationDays) && destinationDays.length > 0) {
      const idx = destinationDays.findIndex((x) => x.day === d);
      if (idx >= 0 && idx < destinations.length && !used.has(idx)) {
        used.add(idx);
        name = destinations[idx];
        const detail = Array.isArray(dbDestinationDetails) ? dbDestinationDetails[idx] : undefined;
        imageUrl = detail?.imageUrl ?? `${PLACEHOLDER_IMAGE_BASE}/day-${packageId ?? "pkg"}-${d}/1200/800`;
        description = detail?.description ?? PLACEHOLDER_DESCRIPTION;
      } else {
        name = `Day ${d} – Free exploration`;
        imageUrl = `${PLACEHOLDER_IMAGE_BASE}/day-${packageId ?? "pkg"}-${d}/1200/800`;
        description = PLACEHOLDER_DESCRIPTION;
      }
    } else {
      const idx = d - 1;
      if (idx < destinations.length) {
        name = destinations[idx];
        const detail = Array.isArray(dbDestinationDetails) ? dbDestinationDetails[idx] : undefined;
        imageUrl = detail?.imageUrl ?? `${PLACEHOLDER_IMAGE_BASE}/day-${packageId ?? "pkg"}-${d}/1200/800`;
        description = detail?.description ?? PLACEHOLDER_DESCRIPTION;
      } else {
        name = `Day ${d} – Free exploration`;
        imageUrl = `${PLACEHOLDER_IMAGE_BASE}/day-${packageId ?? "pkg"}-${d}/1200/800`;
        description = PLACEHOLDER_DESCRIPTION;
      }
    }

    days.push({ day: d, name, imageUrl, description });
  }

  return days;
}

export default function PackageLocationsAccordion({
  destinations,
  locationDetails: dbDestinationDetails,
  dayCount,
  destinationDays,
  routeDays: routeDaysFromDb,
  packageId,
}: PackageLocationsAccordionProps) {
  const routeDays = useMemo((): RouteDay[] => {
    if (Array.isArray(routeDaysFromDb) && routeDaysFromDb.length > 0) {
      return routeDaysFromDb.map((r) => ({
        day: r.day,
        name: r.name,
        imageUrl: r.imageUrl,
        description: r.description,
      }));
    }
    return buildRouteDaysFromDb(
      Math.max(1, dayCount),
      destinations,
      dbDestinationDetails,
      destinationDays,
      packageId
    );
  }, [routeDaysFromDb, dayCount, destinations, dbDestinationDetails, destinationDays, packageId]);

  return (
    <div className="space-y-3">
      {routeDays.map(({ day, name, imageUrl, description }) => (
        <Accordion
          key={day}
          disableGutters
          elevation={0}
          sx={{
            borderRadius: "var(--radius)",
            border: "1px solid #E2E8F0",
            overflow: "hidden",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ChevronDownIcon className="w-5 h-5 text-slate-500" />}
            sx={{
              px: 2,
              py: 1,
              "& .MuiAccordionSummary-content": { my: 1 },
            }}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 flex-shrink-0">
                {day}
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-900 leading-5 truncate">
                  {name}
                </div>
                <div className="text-xs text-slate-500 leading-4">
                  Day {day}{dayCount > 0 ? ` of ${dayCount}` : ""}
                </div>
              </div>
            </div>
          </AccordionSummary>

          <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-5">
                <div className="relative w-full h-44 sm:h-36 rounded-[var(--radius-md)] overflow-hidden border border-slate-200 bg-slate-100">
                  <Image
                    src={imageUrl}
                    alt={`${name} – Day ${day}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 35vw"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="sm:col-span-7">
                <div className="text-sm font-semibold text-slate-900 mb-1">
                  About {name}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

