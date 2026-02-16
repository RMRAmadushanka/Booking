"use client";

import React, { Fragment, useState, useEffect, FC } from "react";
import { createPortal } from "react-dom";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileModalOpen]);

  // Don't render until we know if it's mobile or not (prevents hydration mismatch)
  if (isMobile === null) {
    return (
      <div className={`DateRangePicker z-10 relative flex flex-col lg:flex-row ${className}`}>
        <div className={`flex-1 z-10 flex items-center focus:outline-none`}>
          <div className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3`}>
            <div className="text-[#64748B]">
              <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-grow text-left">
              <span className="block xl:text-lg font-semibold text-[#0F172A]">
                {placeholder}
              </span>
              <span className="block mt-1 text-sm text-[#64748B] leading-none font-light">
                {description}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  const getDisplayText = () => {
    return startDate
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
  };

  const renderInput = () => {
    return (
      <>
        <div className="text-[#64748B]">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold text-[#0F172A]">
            {getDisplayText()}
          </span>
          <span className="block mt-1 text-sm text-[#64748B] leading-none font-light">
            {description}
          </span>
        </div>
      </>
    );
  };

  const renderDatePicker = () => (
    selectsRange ? (
      <DatePicker
        selected={startDate}
        onChange={onChangeDate}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={isMobile ? 1 : 2}
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
        monthsShown={isMobile ? 1 : 2}
        showPopperArrow={false}
        inline
        renderCustomHeader={(p) => (
          <DatePickerCustomHeaderTwoMonth {...p} />
        )}
        renderDayContents={(day, date) => (
          <DatePickerCustomDay dayOfMonth={day} date={date} />
        )}
      />
    )
  );

  // Mobile Modal - rendered via Portal to ensure it's above everything
  const renderMobileModal = () => {
    if (!isMobileModalOpen) return null;
    
    const modalContent = (
      <div className="fixed inset-0 z-[9999]">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 animate-fadeIn"
          onClick={() => setIsMobileModalOpen(false)}
        />

        {/* Full-screen modal */}
        <div className="fixed inset-0 bg-white flex flex-col animate-slideUp z-[10000]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-lg font-semibold text-[#0F172A]">
              {selectsRange ? "Select Dates" : "Select Date"}
            </h2>
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              type="button"
            >
              <XMarkIcon className="w-6 h-6 text-[#64748B]" />
            </button>
          </div>

          {/* Selected dates display */}
          <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748B]">{description}</p>
                <p className="text-base font-semibold text-[#0F172A] mt-1">
                  {getDisplayText()}
                </p>
              </div>
              {startDate && (
                <button
                  onClick={handleClear}
                  className="text-sm text-[#2563EB] font-medium hover:underline"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Calendar */}
          <div className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
            {renderDatePicker()}
          </div>

          {/* Footer with Apply button */}
          <div className="p-4 border-t border-[#E5E7EB] bg-white safe-area-bottom">
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-full h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-[var(--radius-xl)] transition-colors"
              type="button"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );

    // Use portal to render at document body level
    if (typeof document !== 'undefined') {
      return createPortal(modalContent, document.body);
    }
    return null;
  };

  // Mobile: Use modal, Desktop: Use popover
  if (isMobile) {
    return (
      <div className={`DateRangePicker z-10 relative flex flex-col ${className}`}>
        <div
          className={`flex-1 z-10 flex items-center focus:outline-none ${
            isMobileModalOpen ? "nc-hero-field-focused" : ""
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMobileModalOpen(true);
            }}
            className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none text-left`}
          >
            {renderInput()}
          </button>
        </div>

        {/* Mobile submit button - full width at bottom */}
        {hasButtonSubmit && (
          <div className="p-4 pt-2">
            <ButtonSubmit href={buttonSubmitHref} />
          </div>
        )}

        {renderMobileModal()}
      </div>
    );
  }

  // Desktop: Use Popover
  return (
    <Popover className={`DateRangePicker z-10 relative flex flex-col lg:flex-row ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              type="button"
              className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none`}
            >
              {renderInput()}
              {startDate && open && (
                <ClearDataButton onClick={handleClear} />
              )}
            </Popover.Button>

            {/* BUTTON SUBMIT OF FORM - Desktop only */}
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
            <Popover.Panel 
              className="absolute z-20 mt-3 top-full transform left-1/2 -translate-x-1/2 w-auto max-w-[700px]"
            >
              <div className="overflow-hidden rounded-[var(--radius-xl)] shadow-lg border border-[#E5E7EB] bg-white py-6 px-4 lg:py-8 lg:px-6">
                {renderDatePicker()}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DateRangePicker;

