"use client";

import React, { FC, useState, useMemo } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";

const PACKAGE_DESTINATIONS = [
  "Colombo",
  "Kandy",
  "Sigiriya",
  "Ella",
  "Nuwara Eliya",
  "Yala",
  "Galle",
  "Bentota",
];

export interface ExperiencesSearchFormProps {}

const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = () => {
  const [destination, setDestination] = useState("");

  const packagesHref = useMemo(() => {
    const params = new URLSearchParams();
    if (destination.trim()) params.set("destinations", destination.trim());
    params.set("types", "Adventure Tours");
    const q = params.toString();
    return `/packages?${q}`;
  }, [destination]);

  return (
    <form className="w-full relative mt-8 flex flex-col lg:flex-row rounded-[var(--radius-2xl)] shadow-sm bg-white border border-[#E5E7EB]">
      <LocationInput
        className="flex-[1.5]"
        placeHolder="Destination"
        desc="Where do you want to go?"
        suggestions={PACKAGE_DESTINATIONS}
        value={destination}
        onChange={setDestination}
        onSelect={setDestination}
      />
      <div className="lg:hidden border-b border-[#E5E7EB] mx-4"></div>
      <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8"></div>
      <ExperiencesDateSingleInput className="flex-1" />
      <div className="lg:hidden border-b border-[#E5E7EB] mx-4"></div>
      <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8"></div>
      <GuestsInput className="flex-1" buttonSubmitHref={packagesHref} />
    </form>
  );
};

export default ExperiencesSearchForm;


