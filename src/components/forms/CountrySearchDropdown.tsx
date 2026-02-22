"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { COUNTRY_NAMES } from "@/lib/countries";

type CountrySearchDropdownProps = {
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
  id?: string;
  required?: boolean;
  className?: string;
};

export default function CountrySearchDropdown({
  value,
  onChange,
  placeholder = "Search country...",
  id = "country",
  required = false,
  className = "",
}: CountrySearchDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return COUNTRY_NAMES;
    return COUNTRY_NAMES.filter((c) => c.toLowerCase().includes(q));
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: string) => {
    onChange(country);
    setSearch("");
    setOpen(false);
  };

  const displayValue = open ? search : value;
  const showDropdown = open;

  useEffect(() => {
    if (open) {
      setSearch(value);
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        Country
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <div
        className={`w-full rounded-[var(--radius)] border bg-white px-3 py-2.5 text-sm outline-none focus-within:ring-2 focus-within:ring-[#2DD4BF] focus-within:border-[#2DD4BF] flex items-center gap-2 ${
          showDropdown ? "ring-2 ring-[#2DD4BF] border-[#2DD4BF]" : "border-slate-300"
        }`}
      >
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={displayValue}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="flex-1 min-w-0 bg-transparent border-none outline-none p-0 text-slate-900 placeholder-slate-400"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          role="combobox"
          aria-autocomplete="list"
        />
        <ChevronDownIcon
          className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </div>

      {showDropdown && (
        <div
          id={`${id}-listbox`}
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-1 bg-white rounded-[var(--radius)] shadow-lg border border-slate-200 overflow-hidden max-h-[min(16rem,60vh)] flex flex-col"
        >
          <div className="overflow-y-auto scrollbar-no-arrows p-1">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-sm text-slate-500 text-center">
                No country found
              </div>
            ) : (
              filtered.map((country) => (
                <button
                  key={country}
                  type="button"
                  role="option"
                  aria-selected={country === value}
                  onClick={() => handleSelect(country)}
                  className={`w-full text-left px-3 py-2.5 rounded-[var(--radius-sm)] text-sm transition-colors ${
                    country === value
                      ? "bg-[#2563EB]/10 text-[#2563EB] font-medium"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {country}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
