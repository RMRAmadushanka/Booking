"use client";

import React, { FC, useState, useEffect } from "react";

export interface CheckboxProps {
  name: string;
  label: string;
  subLabel?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  label,
  subLabel,
  defaultChecked = false,
  onChange,
  className = "",
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    onChange && onChange(newChecked);
  };

  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB] border-[#E5E7EB] rounded cursor-pointer"
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={name}
          className="font-medium text-[#0F172A] cursor-pointer"
        >
          {label}
        </label>
        {subLabel && (
          <p className="text-[#64748B] text-xs mt-0.5">
            {subLabel}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;

