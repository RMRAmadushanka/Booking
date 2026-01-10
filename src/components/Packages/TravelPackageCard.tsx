"use client";

import React from "react";
import Image from "next/image";
import { MapPinIcon, ClockIcon, StarIcon } from "@heroicons/react/24/solid";
import { TravelPackage } from "@/types/packages";
import Link from "next/link";

interface TravelPackageCardProps {
  package: TravelPackage;
}

const TravelPackageCard: React.FC<TravelPackageCardProps> = ({ package: pkg }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-[#E5E7EB]"
        }`}
      />
    ));
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E5E7EB]">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={pkg.imageUrl}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-lg">
            {pkg.packageType}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-semibold text-[#0F172A] mb-2 line-clamp-1 group-hover:text-[#2563EB] transition-colors">
          {pkg.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#64748B] mb-4 line-clamp-2">
          {pkg.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.highlights.slice(0, 3).map((highlight, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-blue-50 text-[#2563EB] text-xs font-medium rounded-md"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Info Icons */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-[#64748B]">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-[#2563EB]" />
            <span>{pkg.duration}</span>
          </div>

          {/* Destinations */}
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="w-4 h-4 text-[#2563EB]" />
            <span>{pkg.destinations.length} destinations</span>
          </div>

          {/* Package Type Icon */}
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-[#2563EB]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span className="capitalize">{pkg.packageType.toLowerCase()}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {renderStars(pkg.rating)}
          </div>
          <span className="text-sm font-semibold text-[#0F172A]">
            {pkg.rating}
          </span>
          <span className="text-xs text-[#64748B]">
            ({Math.floor(Math.random() * 100 + 50)} reviews)
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
          <div>
            <span className="text-2xl font-semibold text-[#2563EB]">
              ${pkg.price}
            </span>
            <span className="text-sm text-[#64748B] ml-1">
              /person
            </span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/packages/${pkg.id}`}
              className="px-4 py-2 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              View Details
            </Link>
            <button className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPackageCard;

