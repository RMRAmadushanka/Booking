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
  PackageType,
  Destination,
  Duration,
  BestFor,
  PackageFilters as FilterType,
} from "@/types/packages";

interface PackageFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const PACKAGE_TYPES: PackageType[] = [
  "Cultural Tours",
  "Adventure Tours",
  "Wildlife Tours",
  "Beach Holidays",
  "Honeymoon Packages",
  "Luxury Tours",
];

const DESTINATIONS: Destination[] = [
  "Colombo",
  "Kandy",
  "Sigiriya",
  "Ella",
  "Nuwara Eliya",
  "Yala",
  "Galle",
  "Bentota",
];

const DURATIONS: Duration[] = ["1-3 Days", "4-6 Days", "7-10 Days", "10+ Days"];

const BEST_FOR_OPTIONS: BestFor[] = [
  "Family",
  "Couples",
  "Solo Travelers",
  "Groups",
];

const MIN_PRICE = 0;
const MAX_PRICE = 5000;

const PackageFilters: React.FC<PackageFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isMobile = false,
  onClose,
}) => {
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);

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
    filters.packageTypes.length > 0 ||
    filters.destinations.length > 0 ||
    filters.durations.length > 0 ||
    filters.bestFor.length > 0 ||
    filters.minRating > 0 ||
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
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
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
          id="package-search"
          type="text"
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search packages..."
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

      {/* Package Type */}
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
          Package Type
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {PACKAGE_TYPES.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filters.packageTypes.includes(type)}
                  onChange={(e) => {
                    toggleArrayFilter("packageTypes", type);
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

      {/* Destinations */}
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
          Destinations
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {DESTINATIONS.map((destination) => (
            <FormControlLabel
              key={destination}
              control={
                <Checkbox
                  checked={filters.destinations.includes(destination)}
                  onChange={(e) => {
                    toggleArrayFilter("destinations", destination);
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
                  {destination}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>

      {/* Duration */}
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
          Duration
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {DURATIONS.map((duration) => (
            <FormControlLabel
              key={duration}
              control={
                <Checkbox
                  checked={filters.durations.includes(duration)}
                  onChange={(e) => {
                    toggleArrayFilter("durations", duration);
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
                  {duration}
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
          Price Range (USD)
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={filters.priceRange}
            onChange={(e, newValue) => handlePriceChange(newValue)}
            valueLabelDisplay="off"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={50}
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

      {/* Best For */}
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
          Best For
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {BEST_FOR_OPTIONS.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={filters.bestFor.includes(option)}
                  onChange={(e) => {
                    toggleArrayFilter("bestFor", option);
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
                  {option}
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
                onChange={(e) => {
                  updateFilter("minRating", e.target.checked ? 4 : 0);
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
                onChange={(e) => {
                  updateFilter("minRating", e.target.checked ? 3 : 0);
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
              packageTypes: [],
              destinations: [],
              durations: [],
              priceRange: [MIN_PRICE, MAX_PRICE],
              bestFor: [],
              minRating: 0,
            });
            setLocalSearch("");
          }}
          disabled={!hasActiveFilters}
          className="w-full px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#E5E7EB] disabled:text-[#64748B] disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
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

export default PackageFilters;

