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
  className = "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300",
  iconClassName = "h-8 w-8",
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
        className={`focus:outline-none flex items-center justify-center ${className}`}
        aria-label="Open navigation menu"
      >
        <Bars3Icon className={iconClassName} />
      </button>

      <Drawer
        anchor="right"
        open={isVisible}
        onClose={handleCloseMenu}
        sx={{
          zIndex: 1300,
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "28rem" },
            maxWidth: "28rem",
            borderLeft: "1px solid #E5E7EB",
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.25)",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
        >
          <NavMobile onClickClose={handleCloseMenu} />
        </Box>
      </Drawer>
    </>
  );
};

export default MenuBar;

