"use client";

import React, { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ButtonCloseProps {
  onClick?: () => void;
  className?: string;
}

const ButtonClose: FC<ButtonCloseProps> = ({
  onClick,
  className = "p-1 rounded-full hover:bg-[#EFF6FF] hover:text-[#2563EB] dark:hover:bg-[#1E3A5F] dark:hover:text-[#93C5FD]",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-neutral-700 dark:text-neutral-300 focus:outline-none ${className}`}
    >
      <XMarkIcon className="w-5 h-5" />
    </button>
  );
};

export default ButtonClose;













