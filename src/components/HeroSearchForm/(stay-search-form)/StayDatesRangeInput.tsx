"use client";

import React, { FC } from "react";
import DateRangePicker from "../DateRangePicker";

export interface StayDatesRangeInputProps {
  className?: string;
  fieldClassName?: string;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "[ lg:nc-flex-2 ]",
  fieldClassName = "[ nc-hero-field-padding ]",
}) => {
  return (
    <DateRangePicker
      className={className}
      fieldClassName={fieldClassName}
      placeholder="Add dates"
      description="Check in - Check out"
      selectsRange={true}
      hasButtonSubmit={false}
      defaultStartDate={new Date("2023/02/06")}
      defaultEndDate={new Date("2023/02/23")}
    />
  );
};

export default StayDatesRangeInput;


