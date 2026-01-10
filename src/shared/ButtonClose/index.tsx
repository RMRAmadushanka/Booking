"use client";

import React, { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ButtonCloseProps {
  onClick?: () => void;
  className?: string;
}

const ButtonClose: FC<ButtonCloseProps> = ({
  onClick,
  className = "p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800",
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













