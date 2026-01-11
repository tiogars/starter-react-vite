# Theme Showcase Setup Guide

## Overview
This guide describes the three MUI theme variants available in this application and how to test them.

## Theme Variants

### 1. Light Only Theme (Professional Blue)
**File:** `src/theme/themeVariants.ts` → `lightOnlyTheme`
**Route:** `/theme-light`

A clean, professional light theme with deep blue accents and orange secondary colors.

**Characteristics:**
- Primary Color: Deep Blue (#0d47a1)
- Secondary Color: Orange (#f57c00)
- Background: Light gray (#fafafa)
- Best for: Business applications, data-heavy interfaces

### 2. Dark Only Theme (Midnight Purple)
**File:** `src/theme/themeVariants.ts` → `darkOnlyTheme`
**Route:** `/theme-dark`

A sleek dark theme with vibrant purple and cyan accents.

**Characteristics:**
- Primary Color: Vibrant Purple (#7c4dff)
- Secondary Color: Cyan (#00e5ff)
- Background: Near black (#0a0a0a)
- Best for: Creative applications, extended use in low-light environments
- Special: Cards have subtle purple glow effect

### 3. Switchable Theme (Current Implementation - Enhanced)
**File:** `src/theme/themeVariants.ts` → `getSwitchableTheme()`
**Route:** `/theme-switchable`

Allows users to toggle between light and dark modes using the existing theme switcher.

**Characteristics:**
- Light Mode: Blue primary (#1976d2), Pink secondary (#dc004e)
- Dark Mode: Light blue primary (#90caf9), Pink secondary (#f48fb1)
- Best for: User preference flexibility, accessibility
- Uses Redux state management for theme persistence

## Theme Showcase Page

The showcase page (`/theme-light`, `/theme-dark`, `/theme-switchable`) demonstrates:

### Components Included:
1. **Carousel** - Interactive image/content slider with navigation
2. **Dashboard Cards** - Metric cards with icons and trend indicators
3. **Charts** - Line chart (sales trends) and bar chart (user growth) using Recharts
4. **Form Elements** - Text fields, selects, checkboxes, multi-line inputs, buttons
5. **DataGrid** - MUI X DataGrid with pagination and selection
6. **Table** - Standard MUI table with status chips
7. **Typography** - Three paragraphs demonstrating text rendering

## Installation

### Required Dependencies

The theme showcase requires the `recharts` library for chart visualization:

```bash
cd starter-react-vite
pnpm add recharts
```

### Already Installed:
- `@mui/material` - Core MUI components
- `@mui/x-data-grid` - DataGrid component
- `@mui/icons-material` - Material icons

## Usage

### Testing Each Theme:

1. **Light Only Theme:**
   ```
   Navigate to: http://localhost:5173/theme-light
   ```

2. **Dark Only Theme:**
   ```
   Navigate to: http://localhost:5173/theme-dark
   ```

3. **Switchable Theme:**
   ```
   Navigate to: http://localhost:5173/theme-switchable
   Then use the theme toggle button in the app toolbar
   ```

## Implementing a Theme in Your App

### Option 1: Light Only Theme
Update `src/App.tsx`:

```typescript
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightOnlyTheme } from './theme/themeVariants';

function App() {
  return (
    <ThemeProvider theme={lightOnlyTheme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Option 2: Dark Only Theme
Update `src/App.tsx`:

```typescript
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkOnlyTheme } from './theme/themeVariants';

function App() {
  return (
    <ThemeProvider theme={darkOnlyTheme}>
      <CssBaseline />
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Option 3: Switchable Theme (Already Implemented)
The current implementation in `src/App.tsx` already uses the switchable theme.
It reads from Redux state and provides a toggle button.

## Customization

### Modifying Colors:

Edit `src/theme/themeVariants.ts`:

```typescript
// Example: Change light theme primary color
const lightOnlyOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#your-color-here',
    },
    // ... other options
  },
};
```

### Adding Components Styles:

```typescript
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        // Your custom styles
      },
    },
  },
}
```

## File Structure

```
src/
├── theme/
│   ├── theme.ts              # Original theme (still used by App.tsx)
│   ├── themeVariants.ts      # New theme variants
│   └── themeDatagrid.ts      # DataGrid theme customization
├── components/
│   └── ThemeShowcase/
│       ├── index.tsx         # Showcase component
│       └── ThemeShowcase.types.ts
├── pages/
│   ├── ThemeLightOnlyPage.tsx
│   ├── ThemeDarkOnlyPage.tsx
│   └── ThemeSwitchablePage.tsx
└── routes/
    └── index.tsx             # Route definitions
```

## Theme Selection Recommendation

- **Use Light Only** if your app is primarily used in bright environments or for professional/corporate applications
- **Use Dark Only** if your app is creative-focused, gaming-related, or used in dark environments
- **Use Switchable** if you want maximum user flexibility and accessibility compliance

## Accessibility Considerations

All three themes:
- ✅ Meet WCAG contrast requirements
- ✅ Support keyboard navigation
- ✅ Provide clear focus indicators
- ✅ Use semantic HTML elements

The switchable theme provides the best accessibility by allowing users to choose their preferred mode.
