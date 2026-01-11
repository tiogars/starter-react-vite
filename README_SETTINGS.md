# Settings Page - Theme Management

## Overview
The Settings page provides a centralized location for managing application preferences, including theme mode selection and quick access to theme showcases.

## Location
**Menu**: Settings (bottom of navigation drawer)  
**Route**: `/settings`  
**Icon**: ⚙️ Settings

## Features

### Theme Mode Selector
- **Light Mode** - Bright background, ideal for well-lit environments
- **Dark Mode** - Dark background, reduces eye strain in low-light

The selected theme is:
- ✅ Applied immediately across the entire application
- ✅ Automatically saved to localStorage
- ✅ Persists across browser sessions

### Theme Showcase Quick Access
Direct links to preview different theme variants:

1. **Light Only Theme** (`/theme-light`)
   - Professional blue color scheme
   - Fixed light mode
   - Best for business applications

2. **Dark Only Theme** (`/theme-dark`)
   - Midnight purple color scheme
   - Fixed dark mode
   - Best for creative applications

3. **Switchable Theme** (`/theme-switchable`)
   - Current implementation
   - Toggle between light/dark
   - Maximum flexibility

## Navigation Menu Updates

The left navigation drawer now includes:

```
🏠 Home
⭐ Features
🛣️ Routes
🌳 Architecture
🧪 Samples
⚙️ Settings         ← NEW
```

## Usage

### Changing Theme Mode

1. Click **Settings** in the navigation drawer
2. Select your preferred theme mode (Light/Dark)
3. Theme changes immediately - no save button needed

### Previewing Theme Showcases

1. Navigate to Settings page
2. Click any of the three theme showcase buttons
3. Explore all UI components in that theme variant
4. Use browser back or navigation drawer to return

## Implementation Details

### Components Created
- [src/pages/SettingsPage/index.tsx](src/pages/SettingsPage/index.tsx) - Main settings page
- [src/pages/SettingsPage/SettingsPage.types.ts](src/pages/SettingsPage/SettingsPage.types.ts) - TypeScript types

### Files Modified
- [src/components/NavigationDrawer/index.tsx](src/components/NavigationDrawer/index.tsx) - Added Settings menu item
- [src/hooks/hookIcons.tsx](src/hooks/hookIcons.tsx) - Added settings & theme icons
- [src/routes/index.tsx](src/routes/index.tsx) - Added `/settings` route

### Redux Integration
Uses existing Redux theme management:
- `useSelector(selectThemeMode)` - Read current theme
- `dispatch(setThemeMode(mode))` - Update theme
- Automatically syncs with `localStorage`

## Screenshots Reference

**Settings Page Layout:**
- Theme Mode Selector (Radio buttons with Light/Dark options)
- Current Theme Display
- Theme Showcase Quick Links (3 preview buttons)

**Navigation Drawer:**
- Settings item appears at the bottom of the menu
- Icon matches MUI's SettingsIcon design
- Responsive behavior (drawer closes on mobile after navigation)

## Related Documentation
- [THEME_SHOWCASE.md](./THEME_SHOWCASE.md) - Comprehensive theme documentation
- [README_THEME_SHOWCASE.md](./README_THEME_SHOWCASE.md) - Quick start guide
