# HomePage

Page d'accueil de l'application avec navigation rapide vers les différentes sections.

## Fonctionnalités

### Quick Actions Card
- Bouton "Manage Routes" qui navigue vers `/routes`
- Utilise React Router pour la navigation

### Features Card
Liste des fonctionnalités principales de l'application:
- Interface facile à utiliser
- Design responsive
- Composants personnalisables
- Intégration React Router
- Redux Toolkit & RTK Query

### Liens Utiles
Section avec liens vers la documentation des technologies utilisées:
- Material-UI
- React
- Vite
- Vitest
- React Router
- Redux Toolkit
- Repository GitHub

## Navigation

La page utilise React Router pour la navigation:
```tsx
import { Link as RouterLink } from "react-router";

<Button
  component={RouterLink}
  to="/routes"
  variant="contained"
>
  Manage Routes
</Button>
```

## Layout

La page est enveloppée dans le composant `BasicPage` qui fournit:
- Titre (header1)
- Description (content)
- Zone de contenu pour les enfants

## Responsive

Utilise MUI Stack avec direction responsive:
- Mobile: Cartes empilées verticalement
- Desktop: Cartes côte à côte (flex direction row)
