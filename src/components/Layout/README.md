# Layout Component

Composant Layout principal qui enveloppe toutes les pages de l'application avec une navigation cohérente.

## Structure

Le Layout comprend trois sections principales:

1. **AppBar** - Barre de navigation supérieure
2. **Drawer** - Menu latéral (permanent desktop / temporaire mobile)
3. **Content Area** - Zone principale avec `<Outlet />` pour les pages enfants

## Fonctionnalités

### Navigation

Menu avec icônes et texte pour chaque page:

- Home → Page d'accueil
- Routes → Gestion des routes

```tsx
const menuItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Routes', path: '/routes', icon: <RouteIcon /> },
];
```

### Responsive Design

**Desktop (≥ md breakpoint = 900px):**

- Drawer permanent (240px de largeur)
- AppBar avec largeur réduite pour accommoder le drawer
- Boutons de navigation dans l'AppBar

**Mobile (< md breakpoint):**

- Drawer temporaire (overlay)
- Bouton hamburger (MenuIcon) pour ouvrir/fermer le drawer
- Le drawer se ferme automatiquement après sélection d'un item

### Styling

```tsx
const drawerWidth = 240;
```

- **AppBar**: Fixed position, décalé pour desktop
- **Desktop Drawer**: Permanent, 240px width
- **Mobile Drawer**: Temporary, overlay mode
- **Content**: Padding de 3 unités, max width XL

## Utilisation

Le Layout est utilisé dans la configuration du routeur:

```tsx
{
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'routes', element: <RoutePage /> },
  ],
}
```

## Composants MUI Utilisés

- `AppBar` - Barre de navigation supérieure
- `Toolbar` - Container pour le contenu de l'AppBar
- `Drawer` - Menu latéral
- `List` / `ListItem` / `ListItemButton` - Items du menu
- `ListItemIcon` / `ListItemText` - Icônes et texte des items
- `IconButton` - Bouton hamburger mobile
- `Container` - Container pour le contenu principal
- `Box` - Container flex

## Personnalisation

### Ajouter un item au menu

```tsx
const menuItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Routes', path: '/routes', icon: <RouteIcon /> },
  { text: 'Nouveau', path: '/nouveau', icon: <NewIcon /> },
];
```

### Modifier la largeur du drawer

```tsx
const drawerWidth = 300; // Au lieu de 240
```

### Changer le titre

```tsx
<Typography variant="h6" noWrap component="div">
  Mon Application
</Typography>
```

### Ajouter des items dans l'AppBar

```tsx
<Button color="inherit" component={RouterLink} to="/profile">
  Profile
</Button>
```

## Hooks Utilisés

- `useState` - Gestion de l'état ouvert/fermé du drawer mobile
- `useTheme` - Accès au theme MUI
- `useMediaQuery` - Détection responsive (mobile vs desktop)

## Intégration React Router

Utilise `RouterLink` de react-router pour la navigation:

```tsx
import { Link as RouterLink } from 'react-router';

<ListItemButton component={RouterLink} to={item.path}>
```

Le composant `<Outlet />` affiche la page enfant correspondant à la route active.
