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
      className={`px-4 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;











