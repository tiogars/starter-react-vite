# Route Management Page

This page provides a complete CRUD (Create, Read, Update, Delete) interface for managing routes using Material-UI's DataGrid and React Hook Form.

## Features

- **List Routes**: Display all routes in a Material-UI DataGrid with pagination
- **Create Route**: Add new routes using a form dialog with validation
- **Update Route**: Edit existing routes with pre-filled form data
- **Delete Route**: Remove routes with confirmation dialog
- **Real-time Updates**: Automatic cache invalidation and UI updates using RTK Query
- **Form Validation**: Client-side validation using react-hook-form
- **User Feedback**: Snackbar notifications for all operations

## Components

### RoutePage (index.tsx)
Main component that displays the DataGrid and manages all CRUD operations.

**Features:**
- DataGrid with pagination (5, 10, 25, 50 items per page)
- Action buttons (Edit, Delete) for each row
- Create button in the header
- Loading states and error handling
- Success/error notifications

### RouteDialog
Form dialog for creating and editing routes.

**Features:**
- React Hook Form integration
- Form validation:
  - Name: Required, minimum 2 characters
  - Path: Required, must start with `/` and contain only valid characters
- Disabled state during submission
- Auto-reset on close

### DeleteConfirmDialog
Confirmation dialog for delete operations.

**Features:**
- Shows route name being deleted
- Warning message
- Disabled state during deletion

## RTK Query Integration

The page uses RTK Query hooks from `routesApi.ts`:
- `useGetAllRouteQuery()`: Fetch all routes
- `useCreateRouteMutation()`: Create new route
- `useUpdateRouteMutation()`: Update existing route
- `useDeleteRouteMutation()`: Delete route

## Route Type

```typescript
type Route = {
  id?: number;
  name?: string;
  path?: string;
};
```

## Usage

The RoutePage is currently rendered directly in `App.tsx`. You can integrate it into your routing system:

```tsx
import RoutePage from './pages/Settings/RoutePage';

// In your router
<Route path="/settings/routes" element={<RoutePage />} />
```

## API Configuration

The API base URL is configured in `src/store/emptyApi.ts`:
```typescript
baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' })
```

Update this to match your backend API URL.

## Customization

### Adding More Fields
To add more fields to the Route form:

1. Update the `Route` type in `routesApi.ts`
2. Add Controller fields in `RouteDialog.tsx`
3. Add columns to the DataGrid in `index.tsx`

### Styling
All components use Material-UI's `sx` prop for styling. You can customize:
- DataGrid height: Change `height: 600` in the Paper component
- Dialog width: Change `maxWidth="sm"` in Dialog components
- Pagination options: Modify `pageSizeOptions` array

### Validation Rules
Form validation rules are in the `Controller` components in `RouteDialog.tsx`:
```tsx
rules={{
  required: 'Name is required',
  minLength: {
    value: 2,
    message: 'Name must be at least 2 characters',
  },
}}
```
