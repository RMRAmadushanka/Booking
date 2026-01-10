"use client";

import React, { FC } from "react";
import DateRangePicker from "../DateRangePicker";

export interface FlightDateRangeInputProps {
  className?: string;
  fieldClassName?: string;
  hasButtonSubmit?: boolean;
  selectsRange?: boolean;
}

const FlightDateRangeInput: FC<FlightDateRangeInputProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  hasButtonSubmit = true,
  selectsRange = true,
}) => {
  return (
    <DateRangePicker
      className={className}
      fieldClassName={fieldClassName}
      placeholder="Add dates"
      description={selectsRange ? "Pick up - Drop off" : "Pick up date"}
      selectsRange={selectsRange}
      hasButtonSubmit={hasButtonSubmit}
      buttonSubmitHref="/listing-car-detail"
      defaultStartDate={new Date("2023/05/01")}
      defaultEndDate={new Date("2023/05/16")}
      divHideVerticalLineClass="-left-0.5 right-10"
    />
  );
};

export default FlightDateRangeInput;


