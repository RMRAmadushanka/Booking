# Extracted Header Components

This folder contains reusable header components extracted from the Header3 component, including:
- Search button with Location, Check In, and Add guests sections (without onClick functionality)
- NAV section with NotifyDropdown, AvatarDropdown, and MenuBar
- Mobile responsive menu components

## Components Structure

```
extracted-header-components/
├── SearchButton.tsx              # Search button component (Location, Check In, Add guests)
├── NavSection.tsx                # NAV section with dropdowns and menu
├── HeaderSearchAndNav.tsx        # Combined component (Search + Nav)
├── README.md                     # This file
└── components/
    ├── NotifyDropdown.tsx        # Notifications dropdown
    ├── AvatarDropdown.tsx       # User avatar dropdown menu
    ├── MenuBar.tsx              # Mobile menu bar button
    ├── LangDropdown.tsx         # Language/Currency dropdown
    ├── CurrencyDropdown.tsx     # Currency dropdown (used by LangDropdown)
    ├── Navigation/
    │   └── NavMobile.tsx        # Mobile navigation menu
    └── MobileSearch/
        └── HeroSearchForm2MobileFactory.tsx  # Mobile search factory
```

## Usage

### Basic Usage

```tsx
import HeaderSearchAndNav from "./extracted-header-components/HeaderSearchAndNav";
import NavSection from "./extracted-header-components/NavSection";

// In your component
<div className="flex items-center">
  <HeaderSearchAndNav
    onLocationClick={() => console.log("Location clicked")}
    onCheckInClick={() => console.log("Check In clicked")}
    onGuestsClick={() => console.log("Guests clicked")}
    onSearchClick={() => console.log("Search clicked")}
  />
  <NavSection
    listPropertyHref="/add-listing"
    listPropertyText="List your property"
  />
</div>
```

### Using Components Separately

```tsx
import SearchButton from "./extracted-header-components/SearchButton";
import NavSection from "./extracted-header-components/NavSection";

// Search button only
<SearchButton
  onLocationClick={handleLocationClick}
  onCheckInClick={handleCheckInClick}
  onGuestsClick={handleGuestsClick}
  onSearchClick={handleSearchClick}
/>

// Nav section only
<NavSection />
```

## Dependencies

These components depend on the following shared components and utilities from the original project:

### Required Shared Components
- `@/shared/Avatar` - Avatar component
- `@/shared/Logo` - Logo component
- `@/shared/ButtonClose` - Close button component
- `@/shared/ButtonPrimary` - Primary button component
- `@/shared/SocialsList` - Social media links component
- `@/shared/SwitchDarkMode` - Dark mode toggle
- `@/shared/SwitchDarkMode2` - Dark mode toggle variant
- `@/shared/Navigation/NavigationItem` - Navigation item types
- `@/shared/MenuBar` - Menu bar component (if using original)

### Required Data
- `@/data/navigation` - Navigation data (NAVIGATION_DEMO)

### Required Types
- `@/routers/types` - PathName type

### Required Images
- `@/images/avatars/Image-4.png`
- `@/images/avatars/Image-5.png`
- `@/images/avatars/Image-6.png`

### External Libraries
- `@headlessui/react` - UI components (Popover, Transition, Dialog, Disclosure, Tab)
- `@heroicons/react` - Icons
- `next/link` - Next.js Link component
- `next/navigation` - Next.js navigation hooks (usePathname)

### Mobile Search Dependencies (Optional)
If you want to use the mobile search components, you'll also need:
- `@/app/(client-components)/(HeroSearchForm2Mobile)/HeroSearchForm2Mobile`
- `@/app/(client-components)/(HeroSearchForm2Mobile)/HeroSearchForm2RealEstateMobile`
- And their related search form components

## Notes

1. **SearchButton**: The onClick handlers are optional. If not provided, the elements won't have cursor-pointer styling and won't be clickable.

2. **Mobile Search**: The mobile search components have many dependencies. You may want to create simplified versions or replace them with your own mobile search implementation.

3. **Path Aliases**: The components use path aliases like `@/shared`. Make sure your project has these configured in `tsconfig.json` or adjust the imports accordingly.

4. **Styling**: The components use Tailwind CSS classes. Ensure Tailwind is properly configured in your project.

## Customization

You can customize the components by:
- Modifying the className props
- Adjusting the href/text props for links
- Replacing the mobile search with your own implementation
- Customizing the dropdown content (notifications, avatar menu items, etc.)

## Example Integration

```tsx
"use client";

import React from "react";
import HeaderSearchAndNav from "./extracted-header-components/HeaderSearchAndNav";
import NavSection from "./extracted-header-components/NavSection";

const MyHeader = () => {
  const handleLocationClick = () => {
    // Your location click handler
  };

  const handleCheckInClick = () => {
    // Your check-in click handler
  };

  const handleGuestsClick = () => {
    // Your guests click handler
  };

  const handleSearchClick = () => {
    // Your search click handler
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="container mx-auto px-4 h-[88px] flex items-center">
        <div className="flex-1">
          {/* Logo or other content */}
        </div>
        
        <HeaderSearchAndNav
          onLocationClick={handleLocationClick}
          onCheckInClick={handleCheckInClick}
          onGuestsClick={handleGuestsClick}
          onSearchClick={handleSearchClick}
        />
        
        <NavSection
          listPropertyHref="/add-listing"
          listPropertyText="List your property"
        />
      </div>
    </header>
  );
};

export default MyHeader;
```

