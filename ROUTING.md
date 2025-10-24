# Structure de Routage React Router

Ce projet utilise React Router v7 pour la navigation entre les pages.

## Structure des Routes

```
/                    → HomePage (avec Layout)
/routes              → RoutePage (gestion des routes)
* (erreur)           → ErrorPage
```

## Fichiers Principaux

### 1. `src/routes/index.tsx`
Configuration du routeur avec `createBrowserRouter`. Définit toutes les routes de l'application.

```tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'routes', element: <RoutePage /> },
    ],
  },
]);
```

### 2. `src/components/Layout/index.tsx`
Layout principal avec:
- AppBar (barre de navigation supérieure)
- Drawer permanent (desktop) / temporaire (mobile)
- Menu de navigation avec liens vers toutes les pages
- Zone de contenu avec `<Outlet />` pour afficher les pages enfants

**Features:**
- Responsive (drawer mobile et desktop)
- Navigation avec icônes
- Largeur du drawer: 240px

### 3. `src/pages/ErrorPage/index.tsx`
Page d'erreur affichée pour:
- Routes non trouvées (404)
- Erreurs de navigation
- Erreurs inattendues

**Features:**
- Affiche le code d'erreur et le message
- Bouton pour retourner à l'accueil
- Design Material-UI cohérent

## Navigation

### Navigation Programmatique

Pour naviguer par code, utilisez le hook `useNavigate`:

```tsx
import { useNavigate } from 'react-router';

const MyComponent = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/routes');
  };
  
  return <button onClick={handleClick}>Go to Routes</button>;
};
```

### Liens de Navigation

Pour créer des liens, utilisez `Link` de react-router:

```tsx
import { Link } from 'react-router';

// Lien simple
<Link to="/routes">Manage Routes</Link>

// Avec Material-UI Button
import { Link as RouterLink } from 'react-router';
import { Button } from '@mui/material';

<Button component={RouterLink} to="/routes">
  Manage Routes
</Button>
```

## Ajouter une Nouvelle Page

1. **Créer le composant de page** dans `src/pages/`
   ```tsx
   // src/pages/MyPage/index.tsx
   export const MyPage = () => {
     return <div>My New Page</div>;
   };
   export default MyPage;
   ```

2. **Ajouter la route** dans `src/routes/index.tsx`
   ```tsx
   import MyPage from '../pages/MyPage';
   
   // Dans children:
   {
     path: 'my-page',
     element: <MyPage />,
   }
   ```

3. **Ajouter un lien** dans le Layout (`src/components/Layout/index.tsx`)
   ```tsx
   const menuItems = [
     { text: 'Home', path: '/', icon: <HomeIcon /> },
     { text: 'Routes', path: '/routes', icon: <RouteIcon /> },
     { text: 'My Page', path: '/my-page', icon: <MyIcon /> },
   ];
   ```

## Routes Imbriquées

Pour créer des sous-routes:

```tsx
{
  path: 'settings',
  element: <SettingsLayout />,
  children: [
    { index: true, element: <SettingsHome /> },
    { path: 'profile', element: <ProfileSettings /> },
    { path: 'security', element: <SecuritySettings /> },
  ],
}
```

Accès:
- `/settings` → SettingsHome
- `/settings/profile` → ProfileSettings
- `/settings/security` → SecuritySettings

## Routes Protégées

Pour créer des routes nécessitant une authentification:

```tsx
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth(); // Votre logique d'auth
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Dans les routes:
{
  path: 'admin',
  element: <ProtectedRoute><AdminPage /></ProtectedRoute>,
}
```

## Paramètres d'URL

Pour utiliser des paramètres dynamiques:

```tsx
// Route avec paramètre
{
  path: 'routes/:id',
  element: <RouteDetail />,
}

// Dans le composant
import { useParams } from 'react-router';

const RouteDetail = () => {
  const { id } = useParams();
  return <div>Route ID: {id}</div>;
};
```

## Query Parameters

Pour lire les paramètres de requête (?key=value):

```tsx
import { useSearchParams } from 'react-router';

const MyComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filter = searchParams.get('filter');
  
  const updateFilter = (newFilter) => {
    setSearchParams({ filter: newFilter });
  };
};
```

## Tests

Pour tester les composants avec routing:

```tsx
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

test('renders component', () => {
  render(
    <MemoryRouter initialEntries={['/routes']}>
      <RoutePage />
    </MemoryRouter>
  );
});
```
