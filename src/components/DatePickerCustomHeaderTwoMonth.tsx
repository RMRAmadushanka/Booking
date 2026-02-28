"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";

const DatePickerCustomHeaderTwoMonth = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
}: ReactDatePickerCustomHeaderProps) => {
  const [isSingleMonth, setIsSingleMonth] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsSingleMonth(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // For single month (mobile): show both arrows on the single header
  // For two-month view (desktop):
  // - First month (count 0): Show only left arrow
  // - Second month (count 1): Show only right arrow
  // This prevents duplicate arrows in the middle
  const showLeftArrow = isSingleMonth || customHeaderCount === 0;
  const showRightArrow = isSingleMonth || customHeaderCount === 1;

  return (
    <div className="relative flex items-center justify-center min-h-[2.5rem]">
      {showLeftArrow && (
        <button
          aria-label="Previous Month"
          className="custom-nav-arrow react-datepicker__navigation react-datepicker__navigation--previous absolute left-0 flex items-center justify-center p-2 rounded-full hover:bg-[#EFF6FF] hover:text-[#2563EB] dark:hover:bg-[#1E3A5F] dark:hover:text-[#93C5FD] transition-colors z-10"
          onClick={decreaseMonth}
          type="button"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      )}
      <span className="react-datepicker__current-month block text-center font-semibold text-base px-8">
        {monthDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </span>
      {showRightArrow && (
        <button
          aria-label="Next Month"
          className="custom-nav-arrow react-datepicker__navigation react-datepicker__navigation--next absolute right-0 flex items-center justify-center p-2 hover:bg-[#EFF6FF] hover:text-[#2563EB] dark:hover:bg-[#1E3A5F] dark:hover:text-[#93C5FD] rounded-full transition-colors z-10"
          onClick={increaseMonth}
          type="button"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default DatePickerCustomHeaderTwoMonth;

