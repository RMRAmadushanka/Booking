"use client";

import React, { FC, useState, useMemo, useRef, useEffect } from "react";
import { ChevronDownIcon, TruckIcon } from "@heroicons/react/24/outline";
import LocationInput from "../LocationInput";
import ButtonSubmit from "../ButtonSubmit";

export interface RentalCarSearchFormProps {
  /** Pickup/location options for the dropdown (e.g. from DB). */
  vehicleLocations?: string[];
  /** Vehicle type options for the dropdown (e.g. from DB). */
  vehicleTypes?: string[];
}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({
  vehicleLocations = [],
  vehicleTypes = [],
}) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [showVehicleTypeDropdown, setShowVehicleTypeDropdown] = useState(false);
  const vehicleTypeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showVehicleTypeDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (vehicleTypeContainerRef.current && !vehicleTypeContainerRef.current.contains(e.target as Node)) {
        setShowVehicleTypeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showVehicleTypeDropdown]);

  const vehiclesHref = useMemo(() => {
    const params = new URLSearchParams();
    if (pickupLocation.trim()) params.set("location", pickupLocation.trim());
    if (vehicleType) params.set("types", vehicleType);
    const q = params.toString();
    return q ? `/vehicles?${q}` : "/vehicles";
  }, [pickupLocation, vehicleType]);

  return (
    <form className="w-full relative mt-8 flex flex-col lg:flex-row rounded-[var(--radius-2xl)] xl:rounded-full shadow-sm bg-white border border-[#E5E7EB]">
      <LocationInput
        className="flex-[1.5]"
        placeHolder="City or Airport"
        desc="Pick up location"
        suggestions={vehicleLocations}
        value={pickupLocation}
        onChange={setPickupLocation}
        onSelect={setPickupLocation}
      />
      <div className="lg:hidden border-b border-[#E5E7EB] mx-4" />
      <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8" />

      <div className="flex-1 flex flex-col sm:flex-row">
        <div
          className="relative flex-1 flex flex-col justify-center nc-hero-field-padding border-b sm:border-b-0 border-[#E5E7EB] min-h-[60px]"
          ref={vehicleTypeContainerRef}
        >
          <label className="text-xs sm:text-sm text-[#64748B] font-light">
            Vehicle type
          </label>
          <button
            type="button"
            onClick={() => setShowVehicleTypeDropdown((v) => !v)}
            className={`flex items-center gap-2 w-full text-left bg-transparent border-none text-[#0F172A] font-semibold text-base xl:text-lg focus:ring-0 focus:outline-none cursor-pointer py-0.5 ${
              showVehicleTypeDropdown ? "nc-hero-field-focused" : ""
            }`}
            aria-label="Vehicle type"
            aria-expanded={showVehicleTypeDropdown}
            aria-haspopup="listbox"
          >
            <span className="flex-1 truncate">{vehicleType || "Any type"}</span>
            <ChevronDownIcon
              className={`h-5 w-5 text-[#64748B] shrink-0 transition-transform ${
                showVehicleTypeDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showVehicleTypeDropdown && (
            <div className="absolute left-0 right-0 z-40 mt-1 bg-white rounded-[var(--radius-2xl)] shadow-lg border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[min(80vh,24rem)] top-full">
              <div className="flex flex-1 min-h-0 flex-col py-3 sm:py-4 pr-3 overflow-hidden">
                <div
                  className="overflow-y-auto overflow-x-hidden flex-1 min-h-0 overscroll-contain scrollbar-no-arrows"
                  role="listbox"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={!vehicleType}
                    onClick={() => {
                      setVehicleType("");
                      setShowVehicleTypeDropdown(false);
                    }}
                    className="flex w-full px-4 sm:px-8 mx-2 sm:mx-4 items-center space-x-3 sm:space-x-4 py-4 hover:bg-gray-100 cursor-pointer transition-colors rounded-[var(--radius-2xl)] text-left"
                  >
                    <span className="block text-[#64748B]">
                      <TruckIcon className="h-4 sm:h-6 w-4 sm:w-6" />
                    </span>
                    <span className="block font-medium text-[#0F172A]">Any type</span>
                  </button>
                  {vehicleTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="option"
                      aria-selected={vehicleType === t}
                      onClick={() => {
                        setVehicleType(t);
                        setShowVehicleTypeDropdown(false);
                      }}
                      className="flex w-full px-4 sm:px-8 mx-2 sm:mx-4 items-center space-x-3 sm:space-x-4 py-4 hover:bg-gray-100 cursor-pointer transition-colors rounded-[var(--radius-2xl)] text-left"
                    >
                      <span className="block text-[#64748B]">
                        <TruckIcon className="h-4 sm:h-6 w-4 sm:w-6" />
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
        <ButtonSubmit href={vehiclesHref} />
      </div>
    </form>
  );
};

export default RentalCarSearchForm;
