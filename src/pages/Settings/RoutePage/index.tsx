import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
  useGetAllRouteQuery,
  useCreateRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
  type Route,
} from '../../../store/routesApi';
import { RouteDialog } from './RouteDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

export const RoutePage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // RTK Query hooks
  const { data: routes = [], isLoading, error } = useGetAllRouteQuery();
  const [createRoute, { isLoading: isCreating }] = useCreateRouteMutation();
  const [updateRoute, { isLoading: isUpdating }] = useUpdateRouteMutation();
  const [deleteRoute, { isLoading: isDeleting }] = useDeleteRouteMutation();

  const handleCreate = () => {
    setSelectedRoute(null);
    setDialogOpen(true);
  };

  const handleEdit = (route: Route) => {
    setSelectedRoute(route);
    setDialogOpen(true);
  };

  const handleDeleteClick = (route: Route) => {
    setSelectedRoute(route);
    setDeleteDialogOpen(true);
  };

  const handleDialogSubmit = async (data: Route) => {
    try {
      if (selectedRoute?.id) {
        // Update existing route
        await updateRoute({
          id: selectedRoute.id,
          route: { ...data, id: selectedRoute.id },
        }).unwrap();
        setSnackbar({
          open: true,
          message: 'Route updated successfully',
          severity: 'success',
        });
      } else {
        // Create new route
        await createRoute({ route: data }).unwrap();
        setSnackbar({
          open: true,
          message: 'Route created successfully',
          severity: 'success',
        });
      }
      setDialogOpen(false);
      setSelectedRoute(null);
    } catch {
      setSnackbar({
        open: true,
        message: 'Operation failed. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRoute?.id) return;

    try {
      await deleteRoute({ id: selectedRoute.id }).unwrap();
      setSnackbar({
        open: true,
        message: 'Route deleted successfully',
        severity: 'success',
      });
      setDeleteDialogOpen(false);
      setSelectedRoute(null);
    } catch {
      setSnackbar({
        open: true,
        message: 'Delete failed. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns: GridColDef<Route>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      type: 'number',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'path',
      headerName: 'Path',
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
          showInMenu={false}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row)}
          showInMenu={false}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Route Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Create Route
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={routes}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
          }}
        />
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load routes. Please try again later.
        </Alert>
      )}

      <RouteDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedRoute(null);
        }}
        onSubmit={handleDialogSubmit}
        initialData={selectedRoute}
        isLoading={isCreating || isUpdating}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedRoute(null);
        }}
        onConfirm={handleDeleteConfirm}
        route={selectedRoute}
        isLoading={isDeleting}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RoutePage;
