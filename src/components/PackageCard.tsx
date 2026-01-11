"use client";

import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export type PackageType = "travel" | "vehicle";
export type CardVariant = 
  | "default" | "glass" | "minimal" | "modern" | "elegant"
  | "neon" | "vintage" | "bold" | "soft" | "dark" | "vibrant" | "corporate" | "artistic"
  | "split" | "split-colorful" | "split-minimal" | "split-modern" | "split-elegant" | "split-dark" | "split-vibrant" | "split-gradient";

interface BasePackageProps {
  title: string;
  price: string;
  imageUrl: string;
  onAction?: () => void;
  badge?: string;
  variant?: CardVariant;
}

interface TravelPackageProps extends BasePackageProps {
  type: "travel";
  destination?: string;
  duration?: string;
  rating?: number;
  features?: string[];
  origin?: string;
  classType?: string;
}

interface VehiclePackageProps extends BasePackageProps {
  type: "vehicle";
  vehicleModel?: string;
  location?: string;
  transmission?: string;
  seats?: number;
  features?: string[];
}

type PackageCardProps = TravelPackageProps | VehiclePackageProps;

export default function PackageCard(props: PackageCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { title, price, imageUrl, onAction, badge, type, variant = "default" } = props;

  const renderPackageInfo = () => {
    if (type === "travel") {
      const { destination, duration, rating, features } = props as TravelPackageProps;
      return (
        <>
          {/* Destination */}
          {destination && (
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                className="w-4 h-4 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm font-medium text-white/90">{destination}</span>
            </div>
          )}

          {/* Duration */}
          {duration && (
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                className="w-4 h-4 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-white/90">{duration}</span>
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-white/90">{rating}</span>
            </div>
          )}
        </>
      );
    } else {
      const { vehicleModel, location, transmission, seats, features } = props as VehiclePackageProps;
      return (
        <>
          {/* Vehicle Model */}
          {vehicleModel && (
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                className="w-4 h-4 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-white/90">{vehicleModel}</span>
            </div>
          )}

          {/* Location */}
          {location && (
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                className="w-4 h-4 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm font-medium text-white/90">{location}</span>
            </div>
          )}

          {/* Transmission and Seats */}
          <div className="flex items-center gap-3 mb-2">
            {transmission && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-xs text-white/80">{transmission}</span>
              </div>
            )}
            {seats && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-xs text-white/80">{seats} seats</span>
              </div>
            )}
          </div>
        </>
      );
    }
  };

  const getActionButtonText = () => {
    if (type === "travel") {
      return "View Package";
    } else {
      return "Rent Now";
    }
  };

  // Style configurations for different variants
  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return {
          container: "relative rounded-[var(--radius-lg)] overflow-hidden shadow-xl hover:shadow-2xl border border-white/20 bg-white/5 backdrop-blur-sm w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
          bokeh: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent blur-sm",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "relative backdrop-blur-md bg-white/10 border-t border-white/20 rounded-t-[var(--radius-lg)]",
          contentInner: "relative z-10 p-5 text-white",
          title: "text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg",
          badge: "absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30",
          favoriteButton: "absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors border border-white/30",
          button: "w-full bg-white/95 backdrop-blur-sm text-black py-2.5 px-6 rounded-[var(--radius-md)] font-semibold hover:bg-white transition-all shadow-lg hover:shadow-xl text-sm sm:text-base",
        };
      case "minimal":
        return {
          container: "relative rounded-[var(--radius-md)] overflow-hidden shadow-lg hover:shadow-xl border border-neutral-200 bg-white w-full max-w-sm mx-auto group cursor-pointer transition-shadow duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent",
          bokeh: "",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-2xl font-semibold mb-2",
          badge: "absolute top-4 left-4 z-10 px-2.5 py-1 rounded-[var(--radius)] bg-neutral-900/80 text-white text-xs font-medium",
          favoriteButton: "absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-900/60 hover:bg-neutral-900/80 transition-colors",
          button: "w-full bg-neutral-900 text-white py-2.5 px-6 rounded-[var(--radius)] font-medium hover:bg-neutral-800 transition-colors text-sm",
        };
      case "modern":
        return {
          container: "relative rounded-[var(--radius-xl)] overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-2 border-primary-500/20 bg-white w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-700/40 to-transparent",
          bokeh: "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary-900/60 to-transparent blur-xl",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-3xl font-extrabold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent",
          badge: "absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold shadow-lg",
          favoriteButton: "absolute top-4 right-4 z-10 p-3 rounded-full bg-primary-500/80 backdrop-blur-sm hover:bg-primary-500 transition-colors shadow-lg",
          button: "w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-[var(--radius-md)] font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base",
        };
      case "elegant":
        return {
          container: "relative rounded-[var(--radius-lg)] overflow-hidden shadow-xl hover:shadow-2xl border border-neutral-300/50 bg-white w-full max-w-sm mx-auto group cursor-pointer transition-all duration-500",
          overlay: "absolute inset-0 bg-gradient-to-t from-neutral-900/85 via-neutral-800/50 to-neutral-700/20",
          bokeh: "absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-neutral-900/70 via-neutral-800/40 to-transparent",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-2xl sm:text-3xl font-light mb-3 tracking-wide",
          badge: "absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-neutral-800/90 backdrop-blur-sm text-white text-xs font-light tracking-wider border border-white/10",
          favoriteButton: "absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-800/60 backdrop-blur-sm hover:bg-neutral-800/80 transition-all border border-white/20",
          button: "w-full bg-white/10 backdrop-blur-sm text-white py-2.5 px-6 rounded-[var(--radius)] font-light hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base tracking-wide",
        };
      case "neon":
        return {
          container: "relative rounded-[var(--radius-lg)] overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border-2 border-purple-500/50 bg-black w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-purple-900/90 via-pink-900/60 to-transparent",
          bokeh: "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-600/40 via-pink-600/30 to-transparent blur-2xl",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]",
          badge: "absolute top-4 left-4 z-10 px-4 py-2 rounded-[var(--radius)] bg-purple-500/90 text-white text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.8)] border border-purple-400/50",
          favoriteButton: "absolute top-4 right-4 z-10 p-3 rounded-full bg-purple-500/80 hover:bg-purple-500 transition-all shadow-[0_0_15px_rgba(168,85,247,0.6)] border border-purple-400/50",
          button: "w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-[var(--radius-md)] font-bold hover:from-purple-500 hover:to-pink-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] text-sm sm:text-base",
        };
      case "vintage":
        return {
          container: "relative rounded-[var(--radius)] overflow-hidden shadow-2xl hover:shadow-3xl border-4 border-amber-800/40 bg-gradient-to-br from-amber-50 to-amber-100 w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-amber-900/85 via-amber-800/50 to-amber-700/20",
          bokeh: "absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-amber-900/60 to-transparent",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-amber-50",
          title: "text-3xl font-bold mb-2 italic tracking-tight drop-shadow-lg",
          badge: "absolute top-4 left-4 z-10 px-3 py-1.5 rounded-[var(--radius)] bg-amber-800/90 text-amber-50 text-xs font-bold border-2 border-amber-700/50 shadow-lg",
          favoriteButton: "absolute top-4 right-4 z-10 p-2.5 rounded-full bg-amber-800/80 hover:bg-amber-800 transition-colors border-2 border-amber-700/50 shadow-md",
          button: "w-full bg-amber-800 text-amber-50 py-3 px-6 rounded-[var(--radius)] font-bold hover:bg-amber-900 transition-all border-2 border-amber-700/50 shadow-lg text-sm sm:text-base",
        };
      case "bold":
        return {
          container: "relative overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-black bg-white w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30",
          bokeh: "",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-4xl font-black mb-3 uppercase tracking-tighter",
          badge: "absolute top-4 left-4 z-10 px-4 py-2 bg-yellow-400 text-black text-xs font-black uppercase border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
          favoriteButton: "absolute top-4 right-4 z-10 p-3 bg-white hover:bg-yellow-400 transition-all border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]",
          button: "w-full bg-yellow-400 text-black py-3 px-6 font-black uppercase hover:bg-yellow-300 transition-all border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-sm sm:text-base",
        };
      case "soft":
        return {
          container: "relative rounded-[3rem] overflow-hidden shadow-lg hover:shadow-xl border-2 border-pink-200/50 bg-gradient-to-br from-pink-50 to-purple-50 w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-pink-800/40 via-purple-800/30 to-transparent",
          bokeh: "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pink-400/20 via-purple-400/20 to-transparent blur-2xl",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-2xl sm:text-3xl font-semibold mb-2 text-white/95",
          badge: "absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-pink-300/90 backdrop-blur-sm text-pink-900 text-xs font-semibold border border-pink-400/50",
          favoriteButton: "absolute top-4 right-4 z-10 p-3 rounded-full bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all border border-white/50",
          button: "w-full bg-white/90 backdrop-blur-sm text-pink-800 py-3 px-6 rounded-full font-semibold hover:bg-white transition-all shadow-md text-sm sm:text-base",
        };
      case "dark":
        return {
          container: "relative rounded-[var(--radius-md)] overflow-hidden shadow-xl hover:shadow-2xl border border-neutral-800 bg-neutral-950 w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-900/80 to-neutral-800/40",
          bokeh: "",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-neutral-100",
          title: "text-2xl sm:text-3xl font-medium mb-2 text-white",
          badge: "absolute top-4 left-4 z-10 px-3 py-1.5 rounded-[var(--radius)] bg-neutral-800/90 text-neutral-200 text-xs font-medium border border-neutral-700",
          favoriteButton: "absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 transition-colors border border-neutral-700",
          button: "w-full bg-neutral-800 text-neutral-100 py-2.5 px-6 rounded-[var(--radius)] font-medium hover:bg-neutral-700 transition-colors border border-neutral-700 text-sm sm:text-base",
        };
      case "vibrant":
        return {
          container: "relative rounded-[var(--radius-xl)] overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(255,0,150,0.4)] border-4 border-cyan-400/50 bg-gradient-to-br from-cyan-400 via-pink-400 to-yellow-400 w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent",
          bokeh: "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-500/30 via-pink-500/30 to-yellow-500/30 blur-2xl",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-3xl font-extrabold mb-2 bg-gradient-to-r from-cyan-200 via-pink-200 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg",
          badge: "absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 text-white text-xs font-bold shadow-lg",
          favoriteButton: "absolute top-4 right-4 z-10 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all border-2 border-white/50",
          button: "w-full bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-500 text-white py-3 px-6 rounded-[var(--radius-lg)] font-bold hover:opacity-90 transition-all shadow-lg text-sm sm:text-base",
        };
      case "corporate":
        return {
          container: "relative rounded-[var(--radius)] overflow-hidden shadow-lg hover:shadow-xl border border-neutral-300 bg-white w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/50 to-blue-700/20",
          bokeh: "",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-2xl font-bold mb-2 text-white",
          badge: "absolute top-4 left-4 z-10 px-3 py-1.5 rounded bg-blue-700 text-white text-xs font-semibold uppercase tracking-wide",
          favoriteButton: "absolute top-4 right-4 z-10 p-2.5 rounded bg-blue-700/80 hover:bg-blue-700 transition-colors",
          button: "w-full bg-blue-700 text-white py-2.5 px-6 rounded font-semibold hover:bg-blue-800 transition-colors text-sm sm:text-base uppercase tracking-wide",
        };
      case "artistic":
        return {
          container: "relative overflow-hidden shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-2 border-white/30 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 w-full max-w-sm mx-auto group cursor-pointer transition-all duration-500 rounded-[2rem]",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
          bokeh: "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "relative backdrop-blur-xl bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-t-[2rem] border-t border-white/20",
          contentInner: "relative z-10 p-6 text-white",
          title: "text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent",
          badge: "absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 backdrop-blur-md text-white text-xs font-bold border border-white/30",
          favoriteButton: "absolute top-4 right-4 z-10 p-3 rounded-full bg-gradient-to-r from-indigo-500/60 via-purple-500/60 to-pink-500/60 backdrop-blur-md hover:opacity-80 transition-all border border-white/30",
          button: "w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-6 rounded-[var(--radius-lg)] font-bold hover:opacity-90 transition-all shadow-xl text-sm sm:text-base",
        };
      case "split":
        return {
          container: "relative rounded-[var(--radius)] overflow-hidden shadow-sm hover:shadow-md border border-[#E5E7EB] bg-white w-full max-w-sm mx-auto group cursor-pointer transition-all duration-300",
          overlay: "absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent",
          bokeh: "",
          contentContainer: "",
          contentWrapper: "",
          contentInner: "",
          title: "text-2xl font-semibold mb-1 text-[#0F172A]",
          badge: "",
          favoriteButton: "",
          button: "bg-[#2563EB] text-white py-2.5 px-6 rounded-[var(--radius)] font-medium hover:bg-[#1D4ED8] transition-colors shadow-sm text-sm",
          isSplit: true as const,
        };
      default: // "default"
        return {
          container: "relative rounded-[var(--radius)] overflow-hidden shadow-sm hover:shadow-md border border-[#E5E7EB] bg-white w-full max-w-sm mx-auto group cursor-pointer transition-shadow duration-300",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent",
          bokeh: "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent blur-sm",
          contentContainer: "absolute bottom-0 left-0 right-0",
          contentWrapper: "",
          contentInner: "relative z-10 p-5 text-white",
          title: "text-2xl sm:text-3xl font-semibold mb-2",
          badge: "absolute top-4 left-4 z-10 px-3 py-1.5 rounded-[var(--radius)] bg-[#2563EB] text-white text-xs font-semibold",
          favoriteButton: "absolute top-4 right-4 z-10 p-2.5 rounded-[var(--radius)] bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30",
          button: "w-full bg-white text-[#0F172A] py-2.5 px-6 rounded-[var(--radius)] font-semibold hover:bg-gray-50 transition-colors shadow-sm text-sm sm:text-base",
        };
    }
  };

  const styles = getVariantStyles() as ReturnType<typeof getVariantStyles> & { isSplit?: boolean };

  // Special render for split layout
  if ('isSplit' in styles && styles.isSplit) {
    return (
      <div className={styles.container}>
        {/* Image Section - Top 60-65% */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          
          {/* Gradient Overlay at bottom of image */}
          <div className={styles.overlay}></div>
        </div>

        {/* White Content Section - Bottom 35-40% */}
        <div className="bg-white p-5">
          {/* Title */}
          <h3 className={styles.title}>{title}</h3>
          
          {/* Class Type / Subtitle */}
          <p className="text-sm text-[#64748B] mb-3">
            {type === "travel" 
              ? (props as TravelPackageProps).classType || (props as TravelPackageProps).destination || "Premium economy"
              : (props as VehiclePackageProps).vehicleModel || "Premium"
            }
          </p>

          {/* Details Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Price */}
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-[#64748B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span className="text-sm text-[#2563EB] font-medium">{price}</span>
            </div>

            {/* Origin Airport / Location */}
            {(type === "travel" ? (props as TravelPackageProps).origin : (props as VehiclePackageProps).location) && (
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-[#64748B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                <span className="text-sm text-[#64748B]">
                  {type === "travel" 
                    ? (props as TravelPackageProps).origin
                    : (props as VehiclePackageProps).location
                  }
                </span>
              </div>
            )}
          </div>

          {/* Button and Favorite Icon Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={onAction}
              className={`${styles.button} flex-1`}
            >
              {getActionButtonText()}
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
              aria-label="Add to favorites"
            >
              {isFavorite ? (
                <HeartIconSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard overlay layout for all other variants
  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        
        {/* Badge */}
        {badge && (
          <div className={styles.badge}>
            {badge}
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className={styles.overlay}></div>
        {styles.bokeh && <div className={styles.bokeh}></div>}
        
        {/* Favorite Icon */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={styles.favoriteButton}
          aria-label="Add to favorites"
        >
          {isFavorite ? (
            <HeartIconSolid className="w-5 h-5 text-white" />
          ) : (
            <HeartIcon className="w-5 h-5 text-white stroke-2" />
          )}
        </button>

        {/* Content Overlay */}
        <div className={styles.contentContainer}>
          {styles.contentWrapper ? (
            <div className={styles.contentWrapper}>
              <div className={styles.contentInner}>
                {/* Title */}
                <h3 className={styles.title}>{title}</h3>
                
                {/* Package-specific info */}
                <div className="mb-3 space-y-1">
                  {renderPackageInfo()}
                </div>

                {/* Price */}
                <div className="flex items-center gap-1.5 mb-4">
                  <svg
                    className="w-4 h-4 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span className="text-base font-semibold text-white">{price}</span>
                </div>

                {/* Action Button */}
                <button
                  onClick={onAction}
                  className={styles.button}
                >
                  {getActionButtonText()}
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.contentInner}>
              {/* Title */}
              <h3 className={styles.title}>{title}</h3>
              
              {/* Package-specific info */}
              <div className="mb-3 space-y-1">
                {renderPackageInfo()}
              </div>

              {/* Price */}
              <div className="flex items-center gap-1.5 mb-4">
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span className="text-base font-semibold text-white">{price}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={onAction}
                className={styles.button}
              >
                {getActionButtonText()}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

