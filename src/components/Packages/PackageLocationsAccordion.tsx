"use client";

import React from "react";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { Destination } from "@/types/packages";
import { destinationDetails } from "@/data/destinationDetails";

type PackageLocationsAccordionProps = {
  destinations: Destination[];
};

export default function PackageLocationsAccordion({
  destinations,
}: PackageLocationsAccordionProps) {
  return (
    <div className="space-y-3">
      {destinations.map((d, idx) => {
        const details = destinationDetails[d];
        return (
          <Accordion
            key={`${d}-${idx}`}
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
                  {idx + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-900 leading-5 truncate">
                    {d}
                  </div>
                  <div className="text-xs text-slate-500 leading-4">
                    Stop {idx + 1} of {destinations.length}
                  </div>
                </div>
              </div>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-5">
                  <div className="relative w-full h-44 sm:h-36 rounded-[var(--radius-md)] overflow-hidden border border-slate-200 bg-slate-100">
                    <Image
                      src={details.imageUrl}
                      alt={`${d} location`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 35vw"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="sm:col-span-7">
                  <div className="text-sm font-semibold text-slate-900 mb-1">
                    About {d}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {details.description}
                  </p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

