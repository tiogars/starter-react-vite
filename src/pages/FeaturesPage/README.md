# Features Page

Page dédiée présentant toutes les fonctionnalités et technologies de l'application.

## Route

`/features`

## Structure

La page est divisée en deux sections principales:

### 1. Liste des Fonctionnalités

Affichage des fonctionnalités sous forme de liste avec:
- **Icône** représentative de chaque feature
- **Titre** de la fonctionnalité
- **Description** détaillée

Fonctionnalités présentées:
- ✅ **Easy to Use** - Interface intuitive
- 📱 **Responsive Design** - Adapté à tous les écrans
- 🎨 **Customizable Components** - Composants Material-UI modulaires
- 🛣️ **React Router Integration** - Navigation fluide
- 💾 **Redux Toolkit & RTK Query** - Gestion d'état moderne
- ⚡ **High Performance** - Optimisé avec Vite

### 2. Technologies Utilisées

Card avec badges affichant les technologies:
- React 19
- TypeScript
- Vite
- Material-UI v7
- React Router v7
- Redux Toolkit
- RTK Query
- React Hook Form
- MUI X Data Grid
- Vitest

## Composants MUI Utilisés

- `Container` - Layout principal
- `Typography` - Textes et titres
- `List`, `ListItem`, `ListItemIcon`, `ListItemText` - Liste des features
- `Paper` - Cards pour chaque feature
- `Card`, `CardContent` - Section technologies
- `Box` - Layout flex

## Effets Visuels

- **Hover effect** sur les features (élévation et translation)
- **Badges colorés** pour les technologies
- **Icônes colorées** Material-UI
- **Espacement cohérent** et responsive

## Navigation

Accessible depuis:
- HomePage → Bouton "View Features"
- Menu latéral → Item "Features"
- AppBar → Bouton "Features"

## Personnalisation

### Ajouter une fonctionnalité

```tsx
const features = [
  {
    title: 'Nouvelle Feature',
    description: 'Description de la feature',
    icon: <NewIcon color="primary" />,
  },
  // ...
];
```

### Ajouter une technologie

```tsx
{[
  'React 19',
  'TypeScript',
  'Ma Nouvelle Tech',
  // ...
].map((tech) => (
  // ...
))}
```

### Modifier les couleurs

```tsx
<Paper
  sx={{
    bgcolor: 'secondary.main', // Au lieu de primary.main
    color: 'secondary.contrastText',
  }}
>
```
