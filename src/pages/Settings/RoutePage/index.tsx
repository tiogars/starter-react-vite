import AddIcon from "@mui/icons-material/Add";
import { Alert, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import {
  useCreateRouteMutation,
  useDeleteRouteMutation,
  useGetAllRouteQuery,
  useUpdateRouteMutation,
  type Route,
  type RouteCreateForm,
  type RouteUpdateForm,
} from "../../../store/routesApi";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { RouteDialog } from "./RouteDialog";
import { useRouteGrid } from "./useRouteGrid";

export const RoutePage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // RTK Query hooks
  const { data: routes = [], isLoading, error } = useGetAllRouteQuery();
  const [createRoute, { isLoading: isCreating }] = useCreateRouteMutation();
  const [updateRoute, { isLoading: isUpdating }] = useUpdateRouteMutation();
  const [deleteRoute, { isLoading: isDeleting }] = useDeleteRouteMutation();

  // Debug: Log routes data
  console.log("Routes data:", routes);
  console.log("Is loading:", isLoading);
  console.log("Error:", error);

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

  const handleDialogSubmit = async (data: RouteCreateForm | RouteUpdateForm) => {
    try {
      if (selectedRoute?.id) {
        // Update existing route - data doit inclure l'id pour RouteUpdateForm
        const updateData: RouteUpdateForm = {
          ...data,
          id: selectedRoute.id,
        };
        await updateRoute({
          id: selectedRoute.id,
          routeUpdateForm: updateData,
        }).unwrap();
        setSnackbar({
          open: true,
          message: "Route updated successfully",
          severity: "success",
        });
      } else {
        // Create new route - data est RouteCreateForm (sans id)
        const createData: RouteCreateForm = {
          name: data.name,
          path: data.path,
        };
        await createRoute({ routeCreateForm: createData }).unwrap();
        setSnackbar({
          open: true,
          message: "Route created successfully",
          severity: "success",
        });
      }
      setDialogOpen(false);
      setSelectedRoute(null);
    } catch {
      setSnackbar({
        open: true,
        message: "Operation failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRoute?.id) return;

    try {
      await deleteRoute({ id: selectedRoute.id }).unwrap();
      setSnackbar({
        open: true,
        message: "Route deleted successfully",
        severity: "success",
      });
      setDeleteDialogOpen(false);
      setSelectedRoute(null);
    } catch {
      setSnackbar({
        open: true,
        message: "Delete failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const { columns } = useRouteGrid({
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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

      <Paper sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={routes}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row.id ?? `temp-${Math.random()}`}
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          }}
          slots={{
            noRowsOverlay: () => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  No routes found. Click "Create Route" to add one.
                </Typography>
              </Box>
            ),
          }}
        />
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load routes. Please check the console for details.
          <br />
          Error: {JSON.stringify(error)}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RoutePage;
