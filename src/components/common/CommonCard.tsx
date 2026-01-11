"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPinIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  CogIcon,
  UserGroupIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { TravelPackage } from "@/types/packages";
import { Vehicle } from "@/types/vehicle";

// Card type discriminator
export type CardType = "travel" | "vehicle";

// Props for travel package
interface TravelCardProps {
  type: "travel";
  data: TravelPackage;
  onBookNow?: (pkg: TravelPackage) => void;
  onFavorite?: (pkg: TravelPackage, isFavorite: boolean) => void;
}

// Props for vehicle
interface VehicleCardProps {
  type: "vehicle";
  data: Vehicle;
  onBookNow?: (vehicle: Vehicle) => void;
  onFavorite?: (vehicle: Vehicle, isFavorite: boolean) => void;
}

// Union type for CommonCard props
export type CommonCardProps = TravelCardProps | VehicleCardProps;

// Star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-amber-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Info item component for consistent styling
const InfoItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  accentColor?: string;
}> = ({ icon, text, accentColor = "text-indigo-600" }) => (
  <div className="flex items-center gap-1.5">
    <span className={accentColor}>{icon}</span>
    <span className="text-sm text-slate-600">{text}</span>
  </div>
);

const CommonCard: React.FC<CommonCardProps> = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    if (props.type === "travel" && props.onFavorite) {
      props.onFavorite(props.data, newFavoriteState);
    } else if (props.type === "vehicle" && props.onFavorite) {
      props.onFavorite(props.data, newFavoriteState);
    }
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.type === "travel" && props.onBookNow) {
      props.onBookNow(props.data);
    } else if (props.type === "vehicle" && props.onBookNow) {
      props.onBookNow(props.data);
    }
  };

  // Get common data from either type
  const { data, type } = props;
  const title = data.title;
  const imageUrl = data.imageUrl;
  const rating = data.rating;
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

  const getActionButtonText = () => {
    if (type === "travel") {
      return "Book Now";
    }
    return "Rent Now";
  };

  // Render travel-specific info
  const renderTravelInfo = () => {
    const pkg = data as TravelPackage;
    return (
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
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
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
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

  // Generate random review count for display (consistent with original)
  const reviewCount = Math.floor(Math.random() * 100 + 50);

  return (
    <div className="group bg-white rounded-[var(--radius-md)] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-indigo-200">
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
          <span className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow-md">
            {getBadgeText()}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-md group/fav"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <HeartIcon className="w-5 h-5 text-rose-500" />
          ) : (
            <HeartOutlineIcon className="w-5 h-5 text-slate-400 group-hover/fav:text-rose-500 transition-colors" />
          )}
        </button>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{description}</p>

        {/* Type-specific Info */}
        <div className="mb-4">
          {type === "travel" ? renderTravelInfo() : renderVehicleInfo()}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={rating} />
          <span className="text-sm font-semibold text-slate-900">{rating}</span>
          <span className="text-xs text-slate-500">({reviewCount} reviews)</span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div>
            <span className="text-2xl font-bold text-indigo-600">
              ${getPrice()}
            </span>
            <span className="text-sm text-slate-500 ml-1">{getPriceLabel()}</span>
          </div>
          <button
            onClick={handleBookNow}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-[var(--radius)] transition-colors shadow-sm hover:shadow-md"
          >
            {getActionButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonCard;
