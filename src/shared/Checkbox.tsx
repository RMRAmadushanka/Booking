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
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded cursor-pointer"
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={name}
          className="font-medium text-neutral-900 dark:text-neutral-100 cursor-pointer"
        >
          {label}
        </label>
        {subLabel && (
          <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
            {subLabel}
          </p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;

