# Extracted Header Components

This folder contains extracted header components from the Header3 component that can be reused in other projects.

## Components

### 1. HeroSearchButton
A search button component extracted from `renderButtonOpenHeroSearch` without onClick functionality.

**Props:**
- `className?: string` - Additional CSS classes
- `showHeroSearch?: boolean` - Controls visibility state (default: false)

**Usage:**
```tsx
import HeroSearchButton from './extracted-header-components/HeroSearchButton';

<HeroSearchButton showHeroSearch={false} />
```

### 2. NavSection
The navigation section component containing the "List your property" link, NotifyDropdown, AvatarDropdown, and MenuBar.

**Props:**
- `className?: string` - Additional CSS classes
- `listPropertyHref?: string` - URL for the "List your property" link (default: "/add-listing/1")
- `listPropertyText?: string` - Text for the "List your property" link (default: "List your property")

**Usage:**
```tsx
import NavSection from './extracted-header-components/NavSection';

<NavSection 
  listPropertyHref="/your-path"
  listPropertyText="Your Text"
/>
```

### 3. NotifyDropdown
Notification dropdown component with bell icon.

**Props:**
- `className?: string` - Additional CSS classes

**Dependencies:**
- `@headlessui/react` - Popover, Transition
- `@heroicons/react` - BellIcon
- `@/shared/Avatar` - Avatar component
- `@/images/avatars/Image-4.png`, `Image-5.png`, `Image-6.png` - Avatar images

### 4. AvatarDropdown
User avatar dropdown with account menu.

**Props:**
- `className?: string` - Additional CSS classes

**Dependencies:**
- `@headlessui/react` - Popover, Transition
- `next/link` - Link component
- `@/shared/Avatar` - Avatar component
- `@/shared/SwitchDarkMode2` - Dark mode toggle

### 5. MenuBar
Mobile menu bar component with hamburger icon.

**Props:**
- `className?: string` - Additional CSS classes (default: "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300")
- `iconClassName?: string` - Icon CSS classes (default: "h-8 w-8")

**Dependencies:**
- `@headlessui/react` - Transition, Dialog
- `@heroicons/react` - Bars3Icon
- `next/navigation` - usePathname
- `@/shared/Navigation/NavMobile` - NavMobile component

## Dependencies

These components require the following dependencies to be available in your project:

### NPM Packages
- `@headlessui/react`
- `@heroicons/react`
- `next` (for Link and usePathname)

### Shared Components
- `@/shared/Avatar`
- `@/shared/SwitchDarkMode2`
- `@/shared/Navigation/NavMobile`

### Images
- `@/images/avatars/Image-4.png`
- `@/images/avatars/Image-5.png`
- `@/images/avatars/Image-6.png`

## Setup Instructions

1. Copy this folder to your new project
2. Ensure all dependencies are installed
3. Update import paths (`@/shared/*`, `@/images/*`) to match your project's path aliases
4. Make sure all shared components exist in your project or create them
5. Import and use the components as needed

## Notes

- The `HeroSearchButton` component has been extracted without onClick handlers - you'll need to add your own click handlers if needed
- All components use Tailwind CSS classes for styling
- Components are designed to work with dark mode (using `dark:` classes)
- The components maintain the original styling and structure from the source project

