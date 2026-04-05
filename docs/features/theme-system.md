# Theme System

The starter ships with a flexible theming system built on top of [Material-UI v7](https://mui.com/) and the Emotion CSS-in-JS library.

---

## Theme Variants

Three variants are available, configurable from **Settings → Theme Settings**:

| Variant | Behaviour | Route |
|---|---|---|
| `light-only` | Always renders in light mode; toggle button hidden | `/theme-light` |
| `dark-only` | Always renders in dark mode; toggle button hidden | `/theme-dark` |
| `switchable` | User can switch between light and dark at runtime | `/theme-switchable` |

The active variant is persisted to `localStorage` so the preference survives page refreshes.

---

## How It Works

### Redux Slice

Theme state is managed in `src/store/themeSlice.ts`:

```typescript
// Actions
setThemeMode('light' | 'dark')
toggleThemeMode()               // flips light ↔ dark
setThemeVariant('light-only' | 'dark-only' | 'switchable')

// Selectors
selectThemeMode    // → 'light' | 'dark'
selectThemeVariant // → ThemeVariant
```

State is loaded from `localStorage` on app start and saved on every change.

### MUI ThemeProvider

`App.tsx` reads the Redux state and passes the resolved MUI theme to `<ThemeProvider>`:

```tsx
const mode = useAppSelector(selectThemeMode);
const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);
```

### Theme Toggle Component

The `<ThemeToggle>` component in the top app bar reads `selectThemeVariant` and only renders when the variant is `switchable`. Clicking it dispatches `toggleThemeMode()`.

---

## Theme Showcase Pages

Three dedicated pages demonstrate the themes in isolation:

- `/theme-light` — Light theme showcase
- `/theme-dark` — Dark theme showcase
- `/theme-switchable` — Switchable theme showcase

These pages render the full component palette (buttons, cards, inputs, typography scales, etc.) which is useful when evaluating custom branding.

---

## Customising the Theme

The base theme configuration lives in `src/theme/theme.ts`. Override any MUI token there:

```typescript
// src/theme/theme.ts (example)
export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#e91e63' },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.5rem', fontWeight: 700 },
    },
    shape: { borderRadius: 8 },
  });
```

Because the theme is created dynamically based on `mode`, every palette override automatically applies to both light and dark variants.

---

## Related Files

| File | Purpose |
|---|---|
| `src/store/themeSlice.ts` | Redux slice for theme state |
| `src/theme/theme.ts` | MUI theme factory function |
| `src/components/ThemeToggle/` | Toggle button component |
| `src/components/ThemeShowcase/` | Full component palette preview |
| `src/pages/Settings/ThemeSettingsPage/` | Theme variant selector UI |
