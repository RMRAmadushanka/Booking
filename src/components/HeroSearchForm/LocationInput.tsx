"use client";

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  /** When provided, show these as selectable options (e.g. package destinations or vehicle locations). */
  suggestions?: string[];
  /** Called when user selects a suggestion or changes input (when controlled, use this to sync). */
  onSelect?: (value: string) => void;
  /** Controlled value (when provided, parent manages value for submit URL). */
  value?: string;
  /** Called when input text changes (use with value for controlled mode). */
  onChange?: (value: string) => void;
}

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  suggestions,
  onSelect,
  value: controlledValue,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = (v: string) => {
    if (controlledValue === undefined) setInternalValue(v);
    onChange?.(v);
  };
  const [showPopover, setShowPopover] = useState(autoFocus);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    const eventClickOutsideDiv = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!showPopover || containerRef.current.contains(event.target as Node)) {
        return;
      }
      setShowPopover(false);
    };

    if (showPopover) {
      document.addEventListener("click", eventClickOutsideDiv);
    }
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const handleSelectLocation = (item: string) => {
    setValue(item);
    setShowPopover(false);
    onSelect?.(item);
  };

  const list = suggestions && suggestions.length > 0
    ? (value
        ? suggestions.filter((s) =>
            s.toLowerCase().includes(value.toLowerCase())
          )
        : suggestions)
    : value
      ? [
          "Ha Noi, Viet Nam",
          "San Diego, CA",
          "Humboldt Park, Chicago, IL",
          "Bangor, Northern Ireland",
        ].filter((s) =>
          s.toLowerCase().includes(value.toLowerCase())
        )
      : [
          "Hamptons, Suffolk County, NY",
          "Las Vegas, NV, United States",
          "Ueno, Taito, Tokyo",
          "Ikebukuro, Toshima, Tokyo",
        ];

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative nc-hero-field-padding flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-[#64748B]">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-[#64748B] xl:text-lg font-semibold placeholder-[#0F172A] truncate text-[#0F172A]`}
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e) => {
              const v = e.currentTarget.value;
              setValue(v);
              onSelect?.(v);
            }}
            ref={inputRef}
          />
          {!value && (
            <span className="block mt-0.5 text-sm text-[#64748B] font-light">
              <span className="line-clamp-1">{desc}</span>
            </span>
          )}
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                setValue("");
              }}
            />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className="absolute left-0 right-0 lg:right-auto z-40 w-auto lg:w-full min-w-0 lg:min-w-[300px] sm:min-w-[500px] bg-white top-full mt-3 rounded-[var(--radius-2xl)] shadow-lg border border-[#E5E7EB] mx-4 lg:mx-0 overflow-hidden flex flex-col max-h-[min(80vh,24rem)]">
          {/* Padding wraps the scroll area so the scrollbar sits inside the dropdown */}
          <div className="flex flex-1 min-h-0 flex-col py-3 sm:py-4 pr-3 overflow-hidden">
            <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0 overscroll-contain scrollbar-no-arrows">
              {list.length > 0 ? (
                list.map((item) => (
                  <span
                    onClick={() => handleSelectLocation(item)}
                    key={item}
                    className="flex px-4 sm:px-8 mx-2 sm:mx-4 items-center space-x-3 sm:space-x-4 py-4 hover:bg-gray-100 cursor-pointer transition-colors rounded-[var(--radius-2xl)]"
                  >
                    <span className="block text-[#64748B]">
                      <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
                    </span>
                    <span className="block font-medium text-[#0F172A]">{item}</span>
                  </span>
                ))
              ) : (
                <p className="px-4 sm:px-8 py-4 text-sm text-[#64748B]">No matches</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
