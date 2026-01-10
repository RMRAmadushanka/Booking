"use client";

import React, { FC } from "react";
import DateRangePicker from "../DateRangePicker";

export interface ExperiencesDateSingleInputProps {
  className?: string;
  fieldClassName?: string;
}

const ExperiencesDateSingleInput: FC<ExperiencesDateSingleInputProps> = ({
  className = "",
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
      defaultStartDate={new Date("2023/03/01")}
      defaultEndDate={new Date("2023/03/16")}
    />
  );
};

export default ExperiencesDateSingleInput;


