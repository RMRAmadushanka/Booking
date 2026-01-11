import { createTheme } from "@mui/material/styles";

/**
 * ===========================================
 * CORNER RADIUS SYSTEM
 * ===========================================
 * This file defines the MUI theme radius values that stay in sync
 * with Tailwind CSS variables defined in globals.css.
 * 
 * Primary radius: 12px (soft, modern, friendly)
 * 
 * Scale (matching Tailwind):
 * - RADIUS_BASE (12px): Default for most components
 * - RADIUS_SM (6px): Subtle rounding
 * - RADIUS_MD (16px): Medium elements
 * - RADIUS_LG (20px): Large elements
 * - RADIUS_FULL (9999px): Circular/pill shapes
 * ===========================================
 */

// Shared radius constants - single source of truth
export const RADIUS = {
  none: 0,
  sm: 6,
  base: 12,   // Primary radius - use this by default
  md: 16,
  lg: 20,
  xl: 28,
  '2xl': 36,
  full: 9999,
} as const;

// Project color palette matching Tailwind CSS variables
const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB", // --color-primary
      dark: "#1D4ED8", // --color-primary-hover
      light: "#3B82F6",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2DD4BF", // --color-accent
      contrastText: "#ffffff",
    },
    text: {
      primary: "#0F172A", // --color-dark
      secondary: "#64748B", // --color-muted
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    divider: "#E5E7EB", // --color-border
    grey: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B", // --color-muted
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A", // --color-dark
    },
  },
  typography: {
    fontFamily: [
      "var(--font-geist-sans)",
      "system-ui",
      "-apple-system",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 600,
      color: "#0F172A",
    },
    h2: {
      fontWeight: 600,
      color: "#0F172A",
    },
    h3: {
      fontWeight: 600,
      color: "#0F172A",
    },
    body1: {
      color: "#0F172A",
    },
    body2: {
      color: "#64748B",
    },
  },
  shape: {
    borderRadius: RADIUS.base, // 8px - primary radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: RADIUS.base,
          padding: "10px 16px",
          "&:hover": {
            backgroundColor: "#1D4ED8",
          },
        },
        contained: {
          backgroundColor: "#2563EB",
          "&:hover": {
            backgroundColor: "#1D4ED8",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: RADIUS.base,
            "& fieldset": {
              borderColor: "#E5E7EB",
            },
            "&:hover fieldset": {
              borderColor: "#2563EB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2563EB",
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: RADIUS.base,
            "& fieldset": {
              borderColor: "#E5E7EB",
            },
            "&:hover fieldset": {
              borderColor: "#2563EB",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2563EB",
            },
          },
        },
        paper: {
          borderRadius: RADIUS.base,
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: "auto",
        },
        indicator: {
          backgroundColor: "#2563EB",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          color: "#64748B",
          minHeight: "auto",
          padding: "8px 16px",
          "&.Mui-selected": {
            color: "#2563EB",
            fontWeight: 600,
          },
          "&:hover": {
            color: "#2563EB",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: RADIUS.base, // Standardized to 8px (was 12px)
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          marginTop: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: RADIUS.sm, // 4px for menu items (subtle)
          margin: "4px 8px",
          "&:hover": {
            backgroundColor: "#F1F5F9",
          },
          "&.Mui-selected": {
            backgroundColor: "#F1F5F9",
            color: "#2563EB",
            "&:hover": {
              backgroundColor: "#E2E8F0",
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E5E7EB",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "none",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
          minHeight: "auto",
          "&.Mui-expanded": {
            minHeight: "auto",
          },
          "&:hover": {
            backgroundColor: "#F8FAFC",
          },
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: RADIUS.base,
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "#2563EB",
        },
        thumb: {
          width: 20,
          height: 20,
          border: "2px solid #2563EB",
        },
        track: {
          height: 6,
          borderRadius: RADIUS.sm, // 4px for slider track
        },
        rail: {
          height: 6,
          borderRadius: RADIUS.sm, // 4px for slider rail
          backgroundColor: "#E5E7EB",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#E5E7EB",
          "&.Mui-checked": {
            color: "#2563EB",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#2563EB",
            "& + .MuiSwitch-track": {
              backgroundColor: "#2563EB",
            },
          },
        },
        track: {
          backgroundColor: "#CBD5E1",
        },
      },
    },
  },
});

export default theme;

