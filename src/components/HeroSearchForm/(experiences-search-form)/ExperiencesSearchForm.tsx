import React, { FC } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";

export interface ExperiencesSearchFormProps {}

const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = ({}) => {
  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex flex-col lg:flex-row rounded-[var(--radius-2xl)] shadow-sm bg-white border border-[#E5E7EB]">
        <LocationInput className="flex-[1.5]" />
        {/* Horizontal divider for mobile, vertical for desktop */}
        <div className="lg:hidden border-b border-[#E5E7EB] mx-4"></div>
        <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8"></div>
        <ExperiencesDateSingleInput className="flex-1" />
        {/* Horizontal divider for mobile, vertical for desktop */}
        <div className="lg:hidden border-b border-[#E5E7EB] mx-4"></div>
        <div className="hidden lg:block self-center border-r border-[#E5E7EB] h-8"></div>
        <GuestsInput
          className="flex-1"
          buttonSubmitHref="/listing-experiences"
        />
      </form>
    );
  };

  return renderForm();
};

export default ExperiencesSearchForm;


