# Hero Search Forms - Extracted Components

This folder contains three main hero search form components extracted from the Online Booking Management project, along with all their child components and dependencies.

## 📁 Structure

```
extracted-hero-search-forms/
├── HeroSearchForm/              # Main desktop search form
│   ├── (car-search-form)/
│   ├── (experiences-search-form)/
│   ├── (flight-search-form)/
│   ├── (real-estate-search-form)/
│   ├── (stay-search-form)/
│   ├── ButtonSubmit.tsx
│   ├── ClearDataButton.tsx
│   ├── GuestsInput.tsx
│   ├── HeroSearchForm.tsx
│   └── LocationInput.tsx
├── HeroSearchForm2Mobile/       # Mobile search form with modal
│   ├── (car-search-form)/
│   ├── (flight-search-form)/
│   ├── (real-estate-search-form)/
│   ├── (stay-search-form)/
│   ├── ButtonSubmit.tsx
│   ├── DatesRangeInput.tsx
│   ├── GuestsInput.tsx
│   ├── HeroSearchForm2Mobile.tsx
│   ├── HeroSearchForm2MobileFactory.tsx
│   ├── HeroSearchForm2RealEstateMobile.tsx
│   └── LocationInput.tsx
├── HeroSearchFormSmall/        # Compact search form variant
│   ├── (car-search-form)/
│   ├── (experiences-search-form)/
│   ├── (flight-search-form)/
│   ├── (stay-search-form)/
│   ├── ButtonSubmit.tsx
│   ├── ClearDataButton.tsx
│   ├── GuestsInput.tsx
│   ├── HeroSearchFormSmall.tsx
│   └── LocationInput.tsx
├── type.ts                      # Shared TypeScript types
└── README.md                    # This file
```

## 🎯 Components Overview

### 1. HeroSearchForm
Main desktop search form component with tabbed interface for Stays, Experiences, Cars, and Flights.

**Props:**
- `className?: string` - Additional CSS classes
- `currentTab?: SearchTab` - Initial active tab ("Stays" | "Experiences" | "Cars" | "Flights")
- `currentPage?: SearchTab` - Current page context

### 2. HeroSearchForm2Mobile
Mobile-optimized search form that opens in a modal dialog. Includes a factory component that conditionally renders based on the current route.

**Components:**
- `HeroSearchForm2Mobile` - Main mobile search form
- `HeroSearchForm2MobileFactory` - Factory that selects the appropriate form based on route
- `HeroSearchForm2RealEstateMobile` - Real estate variant

### 3. HeroSearchFormSmall
Compact variant of the search form, suitable for smaller spaces or secondary locations.

**Props:**
- `className?: string` - Additional CSS classes
- `defaultTab?: SearchTab` - Initial active tab
- `onTabChange?: (tab: SearchTab) => void` - Callback when tab changes
- `defaultFieldFocus?: StaySearchFormFields` - Field to focus initially ("location" | "guests" | "dates")

## 📦 Required Dependencies

### NPM Packages
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "^13.0.0",
    "@headlessui/react": "^1.7.0",
    "@heroicons/react": "^24.0.0",
    "react-datepicker": "^4.0.0",
    "react-use": "^17.0.0"
  }
}
```

### External Components & Utilities

These components need to be available in your project with the `@/` path alias configured:

1. **Components:**
   - `@/components/NcInputNumber` - Number input component with increment/decrement buttons
   - `@/components/DatePickerCustomHeaderTwoMonth` - Custom date picker header for two-month view
   - `@/components/DatePickerCustomDay` - Custom day renderer for date picker

2. **Shared Components:**
   - `@/shared/Checkbox` - Checkbox component (used in PropertyTypeSelect)

3. **Hooks:**
   - `@/hooks/useOutsideAlerter` - Hook to detect clicks outside an element

4. **Utils:**
   - `@/utils/convertNumbThousand` - Utility to format numbers with thousand separators
   - `@/utils/converSelectedDateToString` - Utility to convert selected dates to string format

5. **Types:**
   - `@/routers/types` - PathName type definition (can be a simple string type in your project)

### TypeScript Configuration

Ensure your `tsconfig.json` has path aliases configured:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Next.js Configuration

If using Next.js, configure path aliases in `next.config.js` or use the `tsconfig.json` paths (Next.js 13+ supports this automatically).

## 🚀 Usage

### Basic Usage

```tsx
import HeroSearchForm from './extracted-hero-search-forms/HeroSearchForm/HeroSearchForm';
import HeroSearchForm2Mobile from './extracted-hero-search-forms/HeroSearchForm2Mobile/HeroSearchForm2Mobile';
import HeroSearchFormSmall from './extracted-hero-search-forms/HeroSearchFormSmall/HeroSearchFormSmall';

// Desktop version
<HeroSearchForm currentTab="Stays" />

// Mobile version
<HeroSearchForm2Mobile />

// Small/compact version
<HeroSearchFormSmall 
  defaultTab="Stays" 
  onTabChange={(tab) => console.log('Tab changed:', tab)}
/>
```

### With Next.js App Router

1. Copy the `extracted-hero-search-forms` folder to your project's `src/components` or `src/app` directory
2. Ensure all external dependencies are installed and available
3. Import and use the components in your pages/components

### Example Integration

```tsx
// app/page.tsx or components/HeroSection.tsx
"use client";

import HeroSearchForm from "@/components/extracted-hero-search-forms/HeroSearchForm/HeroSearchForm";
import HeroSearchForm2Mobile from "@/components/extracted-hero-search-forms/HeroSearchForm2Mobile/HeroSearchForm2Mobile";

export default function HeroSection() {
  return (
    <div className="container mx-auto">
      {/* Desktop */}
      <div className="hidden md:block">
        <HeroSearchForm currentTab="Stays" />
      </div>
      
      {/* Mobile */}
      <div className="block md:hidden">
        <HeroSearchForm2Mobile />
      </div>
    </div>
  );
}
```

## 📝 Type Definitions

The `type.ts` file exports the following types:

```typescript
export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}

export type StaySearchFormFields = "location" | "guests" | "dates";

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];
```

## 🎨 Styling

These components use Tailwind CSS classes. Ensure you have Tailwind CSS configured in your project with the following:

- Dark mode support (using `dark:` prefix)
- Custom classes like `nc-hero-field-padding`, `nc-flex-1`, etc.
- The `hiddenScrollbar` utility class

### Required Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Add any custom colors or utilities used
    }
  },
  plugins: [
    // Add any plugins needed
  ]
}
```

## ⚠️ Important Notes

1. **Path Aliases**: All components use `@/` path aliases. Make sure these are properly configured in your project.

2. **Client Components**: All main components are marked with `"use client"` directive, so they can be used in Next.js App Router.

3. **Dependencies**: Some components have dependencies on external utilities and components. Make sure to:
   - Copy or recreate the required components
   - Install all required npm packages
   - Configure path aliases correctly

4. **Routing**: The `ButtonSubmit` components use `PathName` type which should be compatible with your routing system. You may need to adjust the `href` props to match your route structure.

5. **Date Picker**: Components use `react-datepicker` with custom headers and day renderers. Ensure you have the correct version installed and the custom components available.

## 🔧 Customization

To customize these components:

1. Modify the component files directly
2. Override styles using the `className` prop
3. Extend the type definitions in `type.ts` if needed
4. Adjust the search form logic in individual form components

## 📄 License

These components are extracted from the Online Booking Management project. Please ensure you have the appropriate license to use them in your project.

