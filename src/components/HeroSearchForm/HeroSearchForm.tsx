"use client";

import React, { FC, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import ExperiencesSearchForm from "./(experiences-search-form)/ExperiencesSearchForm";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";

export type SearchTab = "Stays" | "Experiences" | "Cars" | "Flights";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Stays" | "Experiences" | "Cars" | "Flights";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Stays",
  currentPage,
}) => {
  const tabs: SearchTab[] = ["Stays", "Experiences", "Cars", "Flights"];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabActive(tabs[newValue]);
  };

  const renderForm = () => {
    switch (tabActive) {
      case "Stays":
        return <StaySearchForm />;
      case "Experiences":
        return <ExperiencesSearchForm />;
      case "Cars":
        return <RentalCarSearchForm />;
      case "Flights":
        return <FlightSearchForm />;

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
                      bgcolor: tabs.indexOf(tabActive) === index ? "#2563EB" : "transparent",
                    }}
                  />
                  <span>{tab}</span>
                </Box>
              }
              sx={{
                textTransform: "none",
                fontSize: { xs: "0.875rem", lg: "1rem" },
                fontWeight: tabs.indexOf(tabActive) === index ? 600 : 500,
                color: tabs.indexOf(tabActive) === index ? "#2563EB" : "#64748B",
                minWidth: "auto",
                padding: 0,
                "&:hover": {
                  color: "#2563EB",
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

