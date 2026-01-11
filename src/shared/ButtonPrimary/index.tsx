"use client";

import React, { FC, ReactNode } from "react";

interface ButtonPrimaryProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-[#2563EB] text-white rounded-[var(--radius)] font-medium hover:bg-[#1D4ED8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;













