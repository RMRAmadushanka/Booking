import React, { FC } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";

const StaySearchForm: FC<{}> = ({}) => {
  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-lg shadow-sm bg-white border border-[#E5E7EB]">
        <LocationInput className="flex-[1.5]" />
        <div className="self-center border-r border-[#E5E7EB] h-8"></div>
        <StayDatesRangeInput className="flex-1" />
        <div className="self-center border-r border-[#E5E7EB] h-8"></div>
        <GuestsInput className="flex-1" />
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;


