# Guide de Navigation - React Router

## 🚀 Démarrage Rapide

L'application utilise maintenant React Router pour la navigation entre les pages.

## 📍 Pages Disponibles

### Page d'Accueil (`/`)
- Point d'entrée principal de l'application
- Liens vers les différentes sections
- Bouton "Manage Routes" pour accéder à la gestion des routes

### Gestion des Routes (`/routes`)
- Interface CRUD complète pour gérer les routes
- DataGrid avec pagination
- Formulaires de création/édition
- Confirmation de suppression

### Page d'Erreur (404)
- Affichée automatiquement pour les routes non trouvées
- Bouton de retour à l'accueil

## 🎨 Layout & Navigation

### Menu de Navigation
Le layout inclut:
- **AppBar** en haut avec boutons Home et Routes
- **Drawer** latéral (permanent sur desktop, temporaire sur mobile)
- Zone de contenu principale responsive

### Navigation Mobile
- Cliquez sur l'icône menu (☰) pour ouvrir le drawer
- Sélectionnez une page pour naviguer
- Le menu se ferme automatiquement après sélection

## 💡 Utilisation

### Naviguer vers une page

**Depuis un bouton:**
```tsx
import { Link as RouterLink } from 'react-router';
import { Button } from '@mui/material';

<Button component={RouterLink} to="/routes">
  Go to Routes
</Button>
```

**Depuis un lien:**
```tsx
import { Link } from 'react-router';

<Link to="/routes">Manage Routes</Link>
```

**Par code (programmatiquement):**
```tsx
import { useNavigate } from 'react-router';

const MyComponent = () => {
  const navigate = useNavigate();
  
  const goToRoutes = () => {
    navigate('/routes');
  };
  
  return <button onClick={goToRoutes}>Go to Routes</button>;
};
```

## 📂 Structure des Fichiers

```
src/
├── routes/
│   └── index.tsx              # Configuration du routeur
├── components/
│   └── Layout/
│       └── index.tsx          # Layout avec navigation
├── pages/
│   ├── HomePage/
│   │   └── index.tsx          # Page d'accueil
│   ├── Settings/
│   │   └── RoutePage/
│   │       └── index.tsx      # Page de gestion des routes
│   └── ErrorPage/
│       └── index.tsx          # Page d'erreur 404
└── App.tsx                    # Point d'entrée avec RouterProvider
```

## 🔧 Personnalisation

### Ajouter une nouvelle page

1. Créez le composant dans `src/pages/`
2. Ajoutez la route dans `src/routes/index.tsx`
3. Ajoutez un lien dans le menu du Layout

### Modifier le menu de navigation

Éditez `src/components/Layout/index.tsx` et modifiez le tableau `menuItems`:

```tsx
const menuItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'Routes', path: '/routes', icon: <RouteIcon /> },
  // Ajoutez vos pages ici
];
```

## 📱 Responsive Design

- **Mobile (< 900px)**: Menu drawer temporaire avec bouton hamburger
- **Desktop (≥ 900px)**: Menu drawer permanent à gauche
- Toutes les pages sont responsive et s'adaptent à la taille de l'écran

## 🎯 Next Steps

Pour aller plus loin:
- Consultez `ROUTING.md` pour une documentation détaillée
- Ajoutez de nouvelles pages selon vos besoins
- Explorez les routes imbriquées et protégées
- Configurez la gestion de l'état global avec Redux

## 🆘 Dépannage

**Le menu ne s'affiche pas:**
- Vérifiez que le Layout est bien importé dans les routes
- Vérifiez la largeur de votre navigateur (mobile vs desktop)

**La navigation ne fonctionne pas:**
- Assurez-vous d'utiliser `Link` ou `RouterLink` de 'react-router'
- Vérifiez que RouterProvider est bien dans App.tsx

**Page 404:**
- Vérifiez le chemin dans `src/routes/index.tsx`
- Assurez-vous que le composant de page est bien exporté
