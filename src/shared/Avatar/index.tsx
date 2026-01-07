"use client";

import React, { FC } from "react";
import Image from "next/image";

export interface AvatarProps {
  sizeClass?: string;
  radius?: string;
  imgUrl?: string;
  userName?: string;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({
  sizeClass = "w-10 h-10",
  radius = "rounded-full",
  imgUrl,
  userName,
  className = "",
}) => {
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isExternalUrl = imgUrl?.startsWith("http");

  return (
    <div
      className={`relative inline-flex ${sizeClass} ${radius} ${className}`}
      title={userName}
    >
      {imgUrl ? (
        isExternalUrl ? (
          <img
            src={imgUrl}
            alt={userName || "Avatar"}
            className={`${sizeClass} ${radius} object-cover`}
          />
        ) : (
          <Image
            src={imgUrl}
            alt={userName || "Avatar"}
            fill
            className={`object-cover ${radius}`}
          />
        )
      ) : (
        <div
          className={`${sizeClass} ${radius} bg-primary-600 flex items-center justify-center text-white font-semibold`}
        >
          {getInitials(userName)}
        </div>
      )}
    </div>
  );
};

export default Avatar;

