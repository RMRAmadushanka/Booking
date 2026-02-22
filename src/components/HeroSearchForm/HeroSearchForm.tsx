"use client";

import React, { FC, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";

export type SearchTab = "Travel Package" | "Cars";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  /** When true, tab labels (Travel Package, Cars) use white text for dark hero backgrounds. */
  tabTextWhite?: boolean;
  /** Destination options for the Travel Package tab (e.g. from DB). */
  destinations?: string[];
  /** Package type options for the Travel Package tab (e.g. from DB). */
  packageTypes?: string[];
  /** Pickup location options for the Cars tab (e.g. from DB). */
  vehicleLocations?: string[];
  /** Vehicle type options for the Cars tab (e.g. from DB). */
  vehicleTypes?: string[];
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Travel Package",
  tabTextWhite = false,
  destinations = [],
  packageTypes = [],
  vehicleLocations = [],
  vehicleTypes = [],
}) => {
  const tabs: SearchTab[] = ["Travel Package", "Cars"];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const tabActiveColor = tabTextWhite ? "#FFFFFF" : "#2563EB";
  const tabInactiveColor = tabTextWhite ? "rgba(255,255,255,0.8)" : "#64748B";
  const tabHoverColor = tabTextWhite ? "#FFFFFF" : "#2563EB";
  const dotActiveBg = tabTextWhite ? "#FFFFFF" : "#2563EB";

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabActive(tabs[newValue]);
  };

  const renderForm = () => {
    switch (tabActive) {
      case "Travel Package":
        return <StaySearchForm destinations={destinations} packageTypes={packageTypes} />;
      case "Cars":
        return <RentalCarSearchForm vehicleLocations={vehicleLocations} vehicleTypes={vehicleTypes} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      <Box
        sx={{
          ml: { xs: 0.5, sm: 1.5, md: 3 },
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        <Tabs
          value={tabs.indexOf(tabActive)}
          onChange={handleTabChange}
          sx={{
            minHeight: "auto",
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTabs-flexContainer": {
              gap: { xs: "1.25rem", sm: "2rem", lg: "2.75rem" },
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      bgcolor: tabs.indexOf(tabActive) === index ? dotActiveBg : "transparent",
                      border: tabTextWhite && tabs.indexOf(tabActive) !== index ? "1px solid rgba(255,255,255,0.5)" : "none",
                    }}
                  />
                  <span>{tab}</span>
                </Box>
              }
              sx={{
                textTransform: "none",
                fontSize: { xs: "0.875rem", lg: "1rem" },
                fontWeight: tabs.indexOf(tabActive) === index ? 600 : 500,
                color: tabs.indexOf(tabActive) === index ? tabActiveColor : tabInactiveColor,
                minWidth: "auto",
                padding: 0,
                "&:hover": {
                  color: tabHoverColor,
                },
                "&.Mui-selected": {
                  color: `${tabActiveColor} !important`,
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;

