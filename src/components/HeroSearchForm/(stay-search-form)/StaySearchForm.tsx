"use client";

import React, { FC, useState, useMemo, useRef, useEffect } from "react";
import { ChevronDownIcon, TagIcon } from "@heroicons/react/24/outline";
import LocationInput from "../LocationInput";
import ButtonSubmit from "../ButtonSubmit";
export interface StaySearchFormProps {
  /** Destination options for the destination dropdown (e.g. from DB). */
  destinations?: string[];
  /** Package type options for the package type dropdown (e.g. from DB). */
  packageTypes?: string[];
}

const StaySearchForm: FC<StaySearchFormProps> = ({ destinations = [], packageTypes = [] }) => {
  const [destination, setDestination] = useState("");
  const [packageType, setPackageType] = useState("");
  const [showPackageTypeDropdown, setShowPackageTypeDropdown] = useState(false);
  const packageTypeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPackageTypeDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (packageTypeContainerRef.current && !packageTypeContainerRef.current.contains(e.target as Node)) {
        setShowPackageTypeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPackageTypeDropdown]);

  const packagesHref = useMemo(() => {
    const params = new URLSearchParams();
    if (destination.trim()) params.set("destinations", destination.trim());
    if (packageType) params.set("types", packageType);
    const q = params.toString();
    return q ? `/packages?${q}` : "/packages";
  }, [destination, packageType]);

  return (
    <form className="w-full relative mt-8 flex flex-col lg:flex-row rounded-[var(--radius-2xl)] xl:rounded-full shadow-sm bg-white border border-[#E5E7EB]">
      <LocationInput
        className="flex-[1.5]"
        placeHolder="Destination"
        desc="Where do you want to go?"
        suggestions={destinations}
        value={destination}
        onChange={setDestination}
        onSelect={setDestination}
      />
      <div className="lg:hidden border-b border-[#E5E7EB] mx-4" />
      <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8" />

      <div className="flex-1 flex flex-col sm:flex-row">
        <div
          className="relative flex-1 flex flex-col justify-center nc-hero-field-padding border-b sm:border-b-0 border-[#E5E7EB] min-h-[60px]"
          ref={packageTypeContainerRef}
        >
          <label className="text-xs sm:text-sm text-[#64748B] font-light">
            Package type
          </label>
          <button
            type="button"
            onClick={() => setShowPackageTypeDropdown((v) => !v)}
            className={`flex items-center gap-2 w-full text-left bg-transparent border-none text-[#0F172A] font-semibold text-base xl:text-lg focus:ring-0 focus:outline-none cursor-pointer py-0.5 ${
              showPackageTypeDropdown ? "nc-hero-field-focused" : ""
            }`}
            aria-label="Package type"
            aria-expanded={showPackageTypeDropdown}
            aria-haspopup="listbox"
          >
            <span className="flex-1 truncate">{packageType || "Any type"}</span>
            <ChevronDownIcon
              className={`h-5 w-5 text-[#64748B] shrink-0 transition-transform ${
                showPackageTypeDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showPackageTypeDropdown && (
            <div className="absolute left-0 right-0 z-40 mt-1 bg-white rounded-[var(--radius-2xl)] shadow-lg border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[min(80vh,24rem)] top-full">
              <div className="flex flex-1 min-h-0 flex-col py-3 sm:py-4 pr-3 overflow-hidden">
                <div
                  className="overflow-y-auto overflow-x-hidden flex-1 min-h-0 overscroll-contain scrollbar-no-arrows"
                  role="listbox"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={!packageType}
                    onClick={() => {
                      setPackageType("");
                      setShowPackageTypeDropdown(false);
                    }}
                    className="flex w-full px-4 sm:px-8 mx-2 sm:mx-4 items-center space-x-3 sm:space-x-4 py-4 hover:bg-gray-100 cursor-pointer transition-colors rounded-[var(--radius-2xl)] text-left"
                  >
                    <span className="block text-[#64748B]">
                      <TagIcon className="h-4 sm:h-6 w-4 sm:w-6" />
                    </span>
                    <span className="block font-medium text-[#0F172A]">Any type</span>
                  </button>
                  {packageTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="option"
                      aria-selected={packageType === t}
                      onClick={() => {
                        setPackageType(t);
                        setShowPackageTypeDropdown(false);
                      }}
                      className="flex w-full px-4 sm:px-8 mx-2 sm:mx-4 items-center space-x-3 sm:space-x-4 py-4 hover:bg-gray-100 cursor-pointer transition-colors rounded-[var(--radius-2xl)] text-left"
                    >
                      <span className="block text-[#64748B]">
                        <TagIcon className="h-4 sm:h-6 w-4 sm:w-6" />
                      </span>
                      <span className="block font-medium text-[#0F172A]">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden border-b border-[#E5E7EB] mx-4" />
      <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8" />

      <div className="flex items-center p-4 lg:py-4 lg:pr-4 lg:pl-2">
        <ButtonSubmit href={packagesHref} />
      </div>
    </form>
  );
};

export default StaySearchForm;
