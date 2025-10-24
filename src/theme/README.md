# Gestion du Thème avec Material-UI

Ce projet utilise Material-UI (MUI) avec une gestion complète du thème clair/sombre.

## Architecture

### 1. Store Redux - `themeSlice.ts`

Le thème est géré via Redux Toolkit avec les fonctionnalités suivantes :

- **État initial** : Récupère le thème sauvegardé dans localStorage ou utilise la préférence système
- **Actions** :
  - `setThemeMode(mode)` : Définit le thème ('light' ou 'dark')
  - `toggleThemeMode()` : Bascule entre clair et sombre
- **Sélecteur** : `selectThemeMode` pour accéder au mode actuel

### 2. Configuration du Thème - `theme/theme.ts`

Définit les thèmes clair et sombre avec :

- **Options communes** : Police Roboto, border-radius, styles des boutons
- **Thème clair** : Palette avec couleurs claires
- **Thème sombre** : Palette avec couleurs sombres adaptées
- **Fonction `getTheme(mode)`** : Retourne le thème approprié selon le mode

### 3. Composant ThemeToggle

Un bouton avec icône pour basculer entre les thèmes :

- Icône soleil (Brightness7) en mode sombre
- Icône lune (Brightness4) en mode clair
- Tooltip explicatif
- Intégré dans la barre d'outils (toolbar)

### 4. Intégration dans App.tsx

- `ThemeProvider` de MUI entoure l'application
- `CssBaseline` pour des styles de base cohérents
- Le thème est mis à jour automatiquement lors du changement de mode

## Utilisation

### Basculer le thème

L'utilisateur peut cliquer sur le bouton en haut à droite de la barre d'outils pour basculer entre les thèmes.

### Accéder au mode du thème dans un composant

```tsx
import { useSelector } from 'react-redux';
import { selectThemeMode } from '../store/themeSlice';

const MyComponent = () => {
  const themeMode = useSelector(selectThemeMode);
  
  return <div>Mode actuel : {themeMode}</div>;
};
```

### Changer le thème par programmation

```tsx
import { useDispatch } from 'react-redux';
import { setThemeMode, toggleThemeMode } from '../store/themeSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  const switchToDark = () => {
    dispatch(setThemeMode('dark'));
  };
  
  const toggle = () => {
    dispatch(toggleThemeMode());
  };
  
  return (
    <>
      <button onClick={switchToDark}>Mode Sombre</button>
      <button onClick={toggle}>Basculer</button>
    </>
  );
};
```

### Utiliser les couleurs du thème

```tsx
import { useTheme } from '@mui/material';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary 
    }}>
      Contenu avec les couleurs du thème
    </div>
  );
};
```

## Personnalisation

### Modifier les couleurs du thème

Éditez `src/theme/theme.ts` :

```typescript
const lightThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#votre-couleur',
    },
    // ... autres couleurs
  },
};
```

### Ajouter des composants personnalisés

Dans `commonOptions` de `theme.ts` :

```typescript
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        // Vos styles personnalisés
      },
    },
  },
  MuiCard: {
    // Configuration pour les cartes
  },
},
```

## Persistance

Le thème sélectionné est automatiquement sauvegardé dans `localStorage` sous la clé `theme-mode` et est restauré au rechargement de la page.

## Détection de la préférence système

Si aucun thème n'est sauvegardé, l'application détecte automatiquement la préférence système de l'utilisateur via `window.matchMedia('(prefers-color-scheme: dark)')`.
