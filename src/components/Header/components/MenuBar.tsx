"use client";

import React, { useState, useEffect } from "react";
import { Drawer, Box } from "@mui/material";
import NavMobile from "./Navigation/NavMobile";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export interface MenuBarProps {
  className?: string;
  iconClassName?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({
  className = "",
  iconClassName = "h-6 w-6",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  return (
    <>
      <button
        onClick={handleOpenMenu}
        className={`
          flex items-center justify-center
          p-2.5 rounded-[var(--radius)]
          text-[#2563EB]
          hover:bg-[#EFF6FF] hover:text-[#1D4ED8]
          active:bg-[#DBEAFE]
          transition-all duration-200 ease-in-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2
          ${className}
        `}
        aria-label="Open navigation menu"
      >
        <Bars3Icon className={iconClassName} strokeWidth={2} />
      </button>

      <Drawer
        anchor="right"
        open={isVisible}
        onClose={handleCloseMenu}
        sx={{
          zIndex: 1300,
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "24rem" },
            maxWidth: "24rem",
            borderLeft: "1px solid var(--color-border)",
            backgroundColor: "var(--background)",
            boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.08)",
          },
        }}
        transitionDuration={250}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: "rgba(15, 23, 42, 0.3)", // --color-dark with opacity
              backdropFilter: "blur(2px)",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#F1F5F9",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#CBD5E1",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#94A3B8",
            },
          }}
        >
          <NavMobile onClickClose={handleCloseMenu} />
        </Box>
      </Drawer>
    </>
  );
};

export default MenuBar;

