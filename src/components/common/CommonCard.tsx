"use client";

import React from "react";
import Image from "next/image";
import {
  MapPinIcon,
  ClockIcon,
  StarIcon,
  CogIcon,
  UserGroupIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { TravelPackage } from "@/types/packages";
import { Vehicle } from "@/types/vehicle";

// Card type discriminator
export type CardType = "travel" | "vehicle";

// Props for travel package
interface TravelCardProps {
  type: "travel";
  data: TravelPackage;
  reviewCount?: number;
  averageRating?: number | null;
  onBookNow?: (pkg: TravelPackage) => void;
}

// Props for vehicle
interface VehicleCardProps {
  type: "vehicle";
  data: Vehicle;
  reviewCount?: number;
  averageRating?: number | null;
  onBookNow?: (vehicle: Vehicle) => void;
}

// Union type for CommonCard props
export type CommonCardProps = TravelCardProps | VehicleCardProps;

// Star rating component (uses rounded value so e.g. 4.5 shows 5 stars)
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${
            i < stars ? "text-amber-400 fill-current" : "text-[var(--color-border)]"
          }`}
        />
      ))}
    </div>
  );
};

// Info item component – theme primary for icon, muted for text
const InfoItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  accentColor?: string;
}> = ({ icon, text, accentColor = "text-[var(--color-primary)]" }) => (
  <div className="flex items-center gap-1.5">
    <span className={accentColor}>{icon}</span>
    <span className="text-sm text-[var(--color-muted)]">{text}</span>
  </div>
);

const CommonCard: React.FC<CommonCardProps> = (props) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.type === "travel" && props.onBookNow) {
      props.onBookNow(props.data);
    } else if (props.type === "vehicle" && props.onBookNow) {
      props.onBookNow(props.data);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (props.type === "travel" && props.onBookNow) {
        props.onBookNow(props.data);
      } else if (props.type === "vehicle" && props.onBookNow) {
        props.onBookNow(props.data);
      }
    }
  };

  // Get common data from either type; use real average from reviews when available
  const { data, type } = props;
  const title = data.title;
  const imageUrl = data.imageUrl;
  const averageRating =
    type === "travel"
      ? (props as TravelCardProps).averageRating
      : (props as VehicleCardProps).averageRating;
  const rating =
    averageRating != null ? averageRating : data.rating;
  const description = data.description;

  // Type-specific data extraction
  const getBadgeText = () => {
    if (type === "travel") {
      return (data as TravelPackage).packageType;
    }
    return (data as Vehicle).vehicleType;
  };

  const getPrice = () => {
    if (type === "travel") {
      return (data as TravelPackage).price;
    }
    return (data as Vehicle).pricePerDay;
  };

  const getPriceLabel = () => {
    if (type === "travel") {
      return "/person";
    }
    return "/day";
  };

  // Render travel-specific info
  const renderTravelInfo = () => {
    const pkg = data as TravelPackage;
    return (
      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
        <InfoItem
          icon={<ClockIcon className="w-4 h-4" />}
          text={pkg.duration}
        />
        <InfoItem
          icon={<MapPinIcon className="w-4 h-4" />}
          text={`${pkg.destinations.length} destinations`}
        />
        <InfoItem
          icon={<TagIcon className="w-4 h-4" />}
          text={pkg.packageType.toLowerCase()}
        />
      </div>
    );
  };

  // Render vehicle-specific info
  const renderVehicleInfo = () => {
    const vehicle = data as Vehicle;
    return (
      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
        <InfoItem
          icon={<CogIcon className="w-4 h-4" />}
          text={vehicle.transmission}
        />
        <InfoItem
          icon={<UserGroupIcon className="w-4 h-4" />}
          text={`${vehicle.seats} seats`}
        />
        <InfoItem
          icon={<MapPinIcon className="w-4 h-4" />}
          text={vehicle.location}
        />
      </div>
    );
  };

  // Real review count from server, or 0 if not provided
  const reviewCount =
    props.type === "travel"
      ? (props as TravelCardProps).reviewCount ?? 0
      : (props as VehicleCardProps).reviewCount ?? 0;

  const isClickable =
    (props.type === "travel" && (props as TravelCardProps).onBookNow) ||
    (props.type === "vehicle" && (props as VehicleCardProps).onBookNow);

  return (
    <div
      {...(isClickable && {
        role: "button",
        tabIndex: 0,
        onClick: handleCardClick,
        onKeyDown: handleKeyDown,
      })}
      className={`group bg-white rounded-[var(--radius-md)] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 ${isClickable ? "cursor-pointer" : ""}`}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-button-gradient text-white text-xs font-semibold rounded-[var(--button-radius)] shadow-md">
            {getBadgeText()}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-muted)] mb-4 line-clamp-2">{description}</p>

        {/* Type-specific Info */}
        <div className="mb-4">
          {type === "travel" ? renderTravelInfo() : renderVehicleInfo()}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={rating} />
          <span className="text-sm font-semibold text-[var(--foreground)]">{rating}</span>
          <span className="text-xs text-[var(--color-muted)]">
            ({reviewCount} review{reviewCount === 1 ? "" : "s"})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center pt-4 border-t border-[var(--color-border)]">
          <span className="text-2xl font-bold text-[var(--color-primary)]">
            ${getPrice()}
          </span>
          <span className="text-sm text-[var(--color-muted)] ml-1">{getPriceLabel()}</span>
        </div>
      </div>
    </div>
  );
};

export default CommonCard;
