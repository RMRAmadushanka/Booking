"use client";

import React, { Fragment, useState, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";

export interface DateRangePickerProps {
  className?: string;
  fieldClassName?: string;
  placeholder?: string;
  description?: string;
  selectsRange?: boolean;
  hasButtonSubmit?: boolean;
  buttonSubmitHref?: string;
  defaultStartDate?: Date | null;
  defaultEndDate?: Date | null;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
  divHideVerticalLineClass?: string;
}

const DateRangePicker: FC<DateRangePickerProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  placeholder = "Add dates",
  description = "Check in - Check out",
  selectsRange = true,
  hasButtonSubmit = false,
  buttonSubmitHref = "/listing-stay-map",
  defaultStartDate = null,
  defaultEndDate = null,
  onChange,
  divHideVerticalLineClass = "-inset-x-0.5",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);

  const onChangeDate = (dates: [Date | null, Date | null] | Date | null) => {
    if (selectsRange && Array.isArray(dates)) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      onChange?.(start, end);
    } else if (!selectsRange && dates instanceof Date) {
      setStartDate(dates);
      setEndDate(null);
      onChange?.(dates, null);
    } else if (!selectsRange && dates === null) {
      setStartDate(null);
      setEndDate(null);
      onChange?.(null, null);
    }
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onChange?.(null, null);
  };

  const renderInput = () => {
    const displayText = startDate
      ? startDate.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }) +
        (selectsRange && endDate
          ? " - " +
            endDate.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            })
          : "")
      : placeholder;

    return (
      <>
        <div className="text-[#64748B]">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold text-[#0F172A]">
            {displayText}
          </span>
          <span className="block mt-1 text-sm text-[#64748B] leading-none font-light">
            {description}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`DateRangePicker z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none`}
            >
              {renderInput()}
              {startDate && open && (
                <ClearDataButton onClick={handleClear} />
              )}
            </Popover.Button>

            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4">
                <ButtonSubmit href={buttonSubmitHref} />
              </div>
            )}
          </div>

          {open && (
            <div
              className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white ${divHideVerticalLineClass}`}
            ></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 top-full w-screen max-w-[90vw] -translate-x-1/2 transform px-4 sm:px-0 sm:max-w-[700px]">
              <div className="overflow-hidden rounded-lg shadow-lg border border-[#E5E7EB] bg-white py-4 pl-3 pr-2 sm:py-6 sm:pl-4 sm:pr-3 lg:py-8 lg:pl-6">
                {selectsRange ? (
                  <DatePicker
                    selected={startDate}
                    onChange={onChangeDate}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    monthsShown={2}
                    showPopperArrow={false}
                    inline
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                ) : (
                  <DatePicker
                    selected={startDate}
                    onChange={onChangeDate}
                    monthsShown={2}
                    showPopperArrow={false}
                    inline
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DateRangePicker;

