# Corner Radius System

## Overview

This application uses a **unified corner radius system** to ensure consistent, cohesive UI across all components. The system is built on CSS variables that are shared between **Tailwind CSS** and **MUI (Material-UI)**.

## Primary Radius: 12px

We use **12px** as the primary corner radius value. This provides a soft, modern, and friendly appearance suitable for travel and consumer products.

---

## CSS Variables (Source of Truth)

Defined in `src/app/globals.css`:

```css
:root {
  /* Primary radius - use this by default */
  --radius: 12px;
  
  /* Full radius scale */
  --radius-none: 0px;    /* Sharp corners */
  --radius-sm: 6px;      /* Subtle rounding */
  --radius-md: 16px;     /* Medium rounding */
  --radius-lg: 20px;     /* Large rounding */
  --radius-xl: 28px;     /* Extra large */
  --radius-2xl: 36px;    /* Very large */
  --radius-full: 9999px; /* Circular/pill */
}
```

---

## Usage

### Tailwind CSS

Use the CSS variable syntax for consistent radius:

```tsx
// Primary radius (8px) - most common use
<div className="rounded-[var(--radius)]">

// Medium radius (12px) - cards, popovers
<div className="rounded-[var(--radius-md)]">

// Large radius (16px) - hero sections
<div className="rounded-[var(--radius-lg)]">

// Circular elements - avatars, pills, switches
<div className="rounded-full">
```

### MUI Components

The MUI theme uses a shared constant from `src/theme/muiTheme.ts`:

```ts
import { RADIUS } from '@/theme/muiTheme';

// Constants available:
RADIUS.none   // 0
RADIUS.sm     // 6
RADIUS.base   // 12 (primary)
RADIUS.md     // 16
RADIUS.lg     // 20
RADIUS.xl     // 28
RADIUS['2xl'] // 36
RADIUS.full   // 9999
```

MUI components automatically use these values through theme overrides.

---

## Component Guidelines

| Component Type | Radius to Use | CSS Variable |
|---------------|---------------|--------------|
| Buttons | Primary (12px) | `--radius` |
| Inputs / TextFields | Primary (12px) | `--radius` |
| Cards | Primary (12px) or Medium (16px) | `--radius` or `--radius-md` |
| Modals / Dialogs | Medium (16px) | `--radius-md` |
| Dropdowns / Menus | Medium (16px) | `--radius-md` |
| Tooltips / Popovers | Medium (16px) | `--radius-md` |
| Avatars | Full (circular) | `--radius-full` |
| Pills / Tags | Full (circular) | `--radius-full` |
| Switches | Full (circular) | `--radius-full` |
| Hero Sections | Large (20px) | `--radius-lg` |

---

## DO's and DON'Ts

### ✅ DO

- Use CSS variables: `rounded-[var(--radius)]`
- Use `rounded-full` for circular elements
- Keep consistent radius within component families
- Refer to this document for guidance

### ❌ DON'T

- Use hardcoded values: ~~`rounded-lg`~~, ~~`rounded-xl`~~
- Mix different radius values arbitrarily
- Add inline `borderRadius` styles in MUI components
- Create new radius values without documenting them

---

## Changing the Radius Scale

To change the primary radius (e.g., from 8px to 12px):

1. Update `--radius` in `src/app/globals.css`
2. Update `RADIUS.base` in `src/theme/muiTheme.ts`
3. All components will automatically inherit the new value

---

## Exception Handling

If a component requires a non-standard radius:

1. Document the exception with a comment
2. Prefer using an existing scale value
3. If truly necessary, use an inline value with explanation

```tsx
// Exception: This card requires extra rounding for brand identity
<div className="rounded-[var(--radius-xl)]">
```

---

## Files Updated

- `src/app/globals.css` - CSS variables and Tailwind tokens
- `src/theme/muiTheme.ts` - MUI theme configuration with RADIUS constants
- All components updated to use CSS variable syntax
