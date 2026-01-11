"use client";

import React, { FC, useState } from "react";
import LocationInput from "../LocationInput";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";

export interface RentalCarSearchFormProps {}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({}) => {
  const [dropOffLocationType, setDropOffLocationType] = useState<
    "same" | "different"
  >("different");

  const renderRadioBtn = () => {
    return (
      <div className="py-4 lg:py-5 px-4 lg:px-6 flex items-center flex-wrap flex-row border-b border-[#E5E7EB]">
        <div
          className={`py-1.5 px-3 sm:px-4 flex items-center rounded-[var(--radius-lg)] font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 transition-colors ${
            dropOffLocationType === "different"
              ? "bg-[#2563EB] text-white shadow-sm"
              : "border border-[#E5E7EB] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"
          }`}
          onClick={(e) => setDropOffLocationType("different")}
        >
          Different drop off
        </div>
        <div
          className={`py-1.5 px-3 sm:px-4 flex items-center rounded-[var(--radius-lg)] font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 transition-colors ${
            dropOffLocationType === "same"
              ? "bg-[#2563EB] text-white shadow-sm"
              : "border border-[#E5E7EB] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"
          }`}
          onClick={(e) => setDropOffLocationType("same")}
        >
          Same drop off
        </div>
      </div>
    );
  };

  const isDdropOffdifferent = dropOffLocationType === "different";

  return (
    <form className="w-full relative mt-8 rounded-[var(--radius-2xl)] shadow-sm bg-white border border-[#E5E7EB]">
      {renderRadioBtn()}
      <div className={`relative flex flex-col lg:flex-row`}>
        <LocationInput
          placeHolder="City or Airport"
          desc="Pick up location"
          className="flex-1"
        />
        {isDdropOffdifferent && (
          <>
            {/* Horizontal divider for mobile, vertical for desktop */}
            <div className="lg:hidden border-b border-[#E5E7EB] mx-4"></div>
            <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8"></div>
            <LocationInput
              placeHolder="City or Airport"
              desc="Drop off location"
              className="flex-1"
              divHideVerticalLineClass="-inset-x-0.5"
            />
          </>
        )}
        {/* Horizontal divider for mobile, vertical for desktop */}
        <div className="lg:hidden border-b border-[#E5E7EB] mx-4"></div>
        <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8"></div>
        <RentalCarDatesRangeInput className="flex-1" hasButtonSubmit={true} />
      </div>
    </form>
  );
};

export default RentalCarSearchForm;


