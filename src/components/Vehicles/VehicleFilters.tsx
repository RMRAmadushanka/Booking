"use client";

import React, { useState, useCallback } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Slider,
  Box,
  Typography,
  Drawer,
} from "@mui/material";
import {
  VehicleType,
  TransmissionType,
  FuelType,
  VehicleFilters as FilterType,
} from "@/types/vehicle";

/** When provided, filter options are derived from DB (vehicles); otherwise use fallback lists. */
export interface VehicleFilterOptions {
  vehicleTypes: string[];
  transmissions: string[];
  fuelTypes: string[];
  locations: string[];
}

const FALLBACK_VEHICLE_TYPES: VehicleType[] = [
  "SUV",
  "Sedan",
  "Sports",
  "Compact",
  "Luxury",
  "Van",
  "Convertible",
];

const FALLBACK_TRANSMISSION_TYPES: TransmissionType[] = ["Automatic", "Manual"];

const FALLBACK_FUEL_TYPES: FuelType[] = ["Petrol", "Diesel", "Hybrid", "Electric"];

const FALLBACK_LOCATIONS = ["Colombo", "Kandy", "Galle", "Ella", "Bentota", "Airport"];

interface VehicleFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  onClearFilters: () => void;
  /** Options from vehicles DB; when provided, only these values are shown in filters. */
  filterOptions?: VehicleFilterOptions;
  isMobile?: boolean;
  onClose?: () => void;
}

const MIN_PRICE = 0;
const MAX_PRICE = 400;

const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  filterOptions,
  isMobile = false,
  onClose,
}) => {
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

  const vehicleTypes = filterOptions?.vehicleTypes?.length
    ? filterOptions.vehicleTypes
    : FALLBACK_VEHICLE_TYPES;
  const transmissionTypes = filterOptions?.transmissions?.length
    ? filterOptions.transmissions
    : FALLBACK_TRANSMISSION_TYPES;
  const fuelTypes = filterOptions?.fuelTypes?.length
    ? filterOptions.fuelTypes
    : FALLBACK_FUEL_TYPES;
  const locations = filterOptions?.locations?.length
    ? filterOptions.locations
    : FALLBACK_LOCATIONS;

  const updateFilter = useCallback(
    <K extends keyof FilterType>(key: K, value: FilterType[K]) => {
      onFiltersChange({ ...filters, [key]: value });
    },
    [filters, onFiltersChange]
  );

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    updateFilter("searchQuery", value);
  };

  const toggleArrayFilter = <T extends string>(
    key: keyof FilterType,
    value: T
  ) => {
    const current = filters[key] as T[];
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, newValue as FilterType[typeof key]);
  };

  const handlePriceChange = (values: number | number[]) => {
    const [min, max] = Array.isArray(values) ? values : [values, MAX_PRICE];
    updateFilter("priceRange", [min, max]);
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.vehicleTypes.length > 0 ||
    filters.transmissions.length > 0 ||
    filters.fuelTypes.length > 0 ||
    filters.minSeats > 0 ||
    filters.minRating > 0 ||
    filters.location ||
    filters.priceRange[0] > MIN_PRICE ||
    filters.priceRange[1] < MAX_PRICE;

  const filterContent = (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        bgcolor: "white",
        height: "100%",
        overflowY: "auto",
      }}
    >
      {/* Mobile Header */}
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#0F172A",
            }}
          >
            Filters
          </Typography>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius)] hover:bg-gray-50 transition-colors"
            aria-label="Close filters"
          >
            <XMarkIcon className="w-6 h-6 text-[#64748B]" />
          </button>
        </Box>
      )}

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0F172A",
            mb: 1,
          }}
        >
          Search
        </Typography>
        <TextField
          fullWidth
          id="vehicle-search"
          type="text"
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search vehicles..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlassIcon className="w-5 h-5 text-[#64748B]" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {/* Vehicle Type */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0F172A",
            mb: 1.5,
          }}
        >
          Vehicle Type
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {vehicleTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filters.vehicleTypes.includes(type)}
                  onChange={() => {
                    toggleArrayFilter("vehicleTypes", type);
                  }}
                  sx={{
                    color: "#E5E7EB",
                    "&.Mui-checked": {
                      color: "#2563EB",
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    color: "#0F172A",
                    fontWeight: 500,
                  }}
                >
                  {type}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>

      {/* Transmission */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0F172A",
            mb: 1.5,
          }}
        >
          Transmission
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {transmissionTypes.map((transmission) => (
            <FormControlLabel
              key={transmission}
              control={
                <Checkbox
                  checked={filters.transmissions.includes(transmission)}
                  onChange={() => {
                    toggleArrayFilter("transmissions", transmission);
                  }}
                  sx={{
                    color: "#E5E7EB",
                    "&.Mui-checked": {
                      color: "#2563EB",
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    color: "#0F172A",
                    fontWeight: 500,
                  }}
                >
                  {transmission}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>

      {/* Fuel Type */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0F172A",
            mb: 1.5,
          }}
        >
          Fuel Type
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {fuelTypes.map((fuel) => (
            <FormControlLabel
              key={fuel}
              control={
                <Checkbox
                  checked={filters.fuelTypes.includes(fuel)}
                  onChange={() => {
                    toggleArrayFilter("fuelTypes", fuel);
                  }}
                  sx={{
                    color: "#E5E7EB",
                    "&.Mui-checked": {
                      color: "#2563EB",
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    color: "#0F172A",
                    fontWeight: 500,
                  }}
                >
                  {fuel}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0F172A",
            mb: 1.5,
          }}
        >
          Price Range (USD/day)
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={filters.priceRange}
            onChange={(e, newValue) => handlePriceChange(newValue)}
            valueLabelDisplay="off"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10}
            sx={{
              mb: 2,
              color: "#2563EB",
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                border: "2px solid #2563EB",
              },
              "& .MuiSlider-track": {
                height: 6,
                borderRadius: 3,
              },
              "& .MuiSlider-rail": {
                height: 6,
                borderRadius: 3,
                backgroundColor: "#E5E7EB",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              color: "#64748B",
            }}
          >
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </Box>
        </Box>
      </Box>

      {/* Seats */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0F172A",
            mb: 1.5,
          }}
        >
          Minimum Seats
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {[2, 4, 5, 7].map((seats) => (
            <FormControlLabel
              key={seats}
              control={
                <Checkbox
                  checked={filters.minSeats === seats}
                  onChange={() => {
                    updateFilter("minSeats", filters.minSeats === seats ? 0 : seats);
                  }}
                  sx={{
                    color: "#E5E7EB",
                    "&.Mui-checked": {
                      color: "#2563EB",
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    color: "#0F172A",
                    fontWeight: 500,
                  }}
                >
                  {seats}+ seats
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>

      {/* Location */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0F172A",
            mb: 1.5,
          }}
        >
          Pickup Location
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {locations.map((location) => (
            <FormControlLabel
              key={location}
              control={
                <Checkbox
                  checked={filters.location === location}
                  onChange={() => {
                    updateFilter("location", filters.location === location ? "" : location);
                  }}
                  sx={{
                    color: "#E5E7EB",
                    "&.Mui-checked": {
                      color: "#2563EB",
                    },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.875rem",
                    color: "#0F172A",
                    fontWeight: 500,
                  }}
                >
                  {location}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>

      {/* Rating */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0F172A",
            mb: 1.5,
          }}
        >
          Rating
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.minRating >= 4}
                onChange={() => {
                  updateFilter("minRating", filters.minRating >= 4 ? 0 : 4);
                }}
                sx={{
                  color: "#E5E7EB",
                  "&.Mui-checked": {
                    color: "#2563EB",
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: "#0F172A",
                  fontWeight: 500,
                }}
              >
                4★ & above
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.minRating >= 3 && filters.minRating < 4}
                onChange={() => {
                  updateFilter("minRating", filters.minRating === 3 ? 0 : 3);
                }}
                sx={{
                  color: "#E5E7EB",
                  "&.Mui-checked": {
                    color: "#2563EB",
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: "#0F172A",
                  fontWeight: 500,
                }}
              >
                3★ & above
              </Typography>
            }
          />
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          pt: 2,
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <button
          onClick={() => {
            onFiltersChange({
              searchQuery: "",
              vehicleTypes: [],
              transmissions: [],
              fuelTypes: [],
              priceRange: [MIN_PRICE, MAX_PRICE],
              minSeats: 0,
              minRating: 0,
              location: "",
            });
            setLocalSearch("");
          }}
          disabled={!hasActiveFilters}
          className="w-full px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#E5E7EB] disabled:text-[#64748B] disabled:cursor-not-allowed text-white font-medium rounded-[var(--radius)] transition-colors"
        >
          Clear All
        </button>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={true}
        onClose={onClose}
        sx={{
          zIndex: 1300,
          "& .MuiDrawer-paper": {
            width: "20rem",
            maxWidth: "85vw",
            borderRight: "1px solid #E5E7EB",
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          },
        }}
      >
        {filterContent}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRight: "1px solid #E5E7EB",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {filterContent}
    </Box>
  );
};

export default VehicleFilters;
