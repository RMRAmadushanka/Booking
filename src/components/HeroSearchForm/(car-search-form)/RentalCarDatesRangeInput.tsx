"use client";

import React, { FC } from "react";
import DateRangePicker from "../DateRangePicker";

export interface RentalCarDatesRangeInputProps {
  className?: string;
  fieldClassName?: string;
  hasButtonSubmit?: boolean;
}

const RentalCarDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  hasButtonSubmit = true,
}) => {
  return (
    <DateRangePicker
      className={className}
      fieldClassName={fieldClassName}
      placeholder="Add dates"
      description="Pick up - Drop off"
      selectsRange={true}
      hasButtonSubmit={hasButtonSubmit}
      buttonSubmitHref="/listing-car-detail"
      defaultStartDate={new Date("2023/03/01")}
      defaultEndDate={new Date("2023/03/16")}
      divHideVerticalLineClass="-left-0.5 right-0.5"
    />
  );
};

export default RentalCarDatesRangeInput;


