import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type {
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";
import BasicPage from "../../components/BasicPage";
import SampleCreateDialog from "../../components/SampleCreateDialog";
import SampleDetailsDialog from "../../components/SampleDetailsDialog";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";
import { API_TIMEOUT_MS } from "../../store/emptyApi";
import {
  useCreateSampleMutation,
  useDeleteSampleMutation,
  useGetAllSamplesQuery,
  useGetSampleQuery,
  type Sample,
  type SampleCreateForm,
} from "../../store/sampleApi";

const SamplePage = () => {
  // Helper functions for error parsing
  const isObj = (v: unknown): v is Record<string, unknown> =>
    !!v && typeof v === "object";

  const handleStringStatusErrors = (statusVal: string) => {
    const errorMessages: Record<string, string> = {
      TIMEOUT_ERROR: `Request timed out after ${Math.round(
        API_TIMEOUT_MS / 1000
      )} seconds (configured timeout).`,
      FETCH_ERROR: "Network error: unable to reach the server.",
      PARSING_ERROR: "Error while processing the server response.",
    };
    
    const message = errorMessages[statusVal];
    return message ? { message } : null;
  };

  const handleFetchBaseQueryError = (err: FetchBaseQueryError & { data?: unknown }) => {
    const status = typeof err.status === "number" ? err.status : undefined;
    const data = (err.data ?? {}) as {
      message?: string;
      error?: string;
      violations?: Record<string, string>;
    };
    const message = data.message || data.error;
    const violations = data.violations;
    return { status, message, violations };
  };

  // Helper to parse RTK Query errors (FetchBaseQueryError | SerializedError)
  const getErrorParts = (
    err: unknown
  ): {
    status?: number;
    message?: string;
    violations?: Record<string, string>;
  } => {
    if (!isObj(err)) {
      return typeof err === "string" ? { message: err } : {};
    }

    if ("status" in err) {
      const statusVal = (err as { status: unknown }).status;
      
      if (typeof statusVal === "string") {
        const stringError = handleStringStatusErrors(statusVal);
        if (stringError) return stringError;
      }
      
      return handleFetchBaseQueryError(err as FetchBaseQueryError & { data?: unknown });
    }

    if ("message" in err || "name" in err) {
      const e = err as SerializedError;
      return { message: e.message || e.name };
    }

    return {};
  };

  // Helper to format consistent error messages
  const formatErrorMessage = (
    errorParts: { status?: number; message?: string },
    defaultMessage: string
  ) => {
    const statusPrefix = errorParts.status ? `Error ${errorParts.status} — ` : "";
    const message = errorParts.message || defaultMessage;
    return `${statusPrefix}${message}`;
  };

  // Local state for dialogs and selection
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<number | null>(null);

  // Create form state
  const [formData, setFormData] = useState<SampleCreateForm>({
    name: "",
    description: "",
    active: true,
  });

  // RTK Query hooks
  const { data: samples, isLoading, error, refetch } = useGetAllSamplesQuery();
  const {
    data: selectedSample,
    isLoading: isLoadingSample,
    error: viewError,
  } = useGetSampleQuery(
    { id: selectedSampleId! },
    { skip: !selectedSampleId || !viewDialogOpen }
  );
  const [
    createSample,
    {
      isLoading: isCreating,
      isError: isCreateError,
      error: createError,
      reset: resetCreate,
    },
  ] = useCreateSampleMutation();
  const [
    deleteSample,
    { isLoading: isDeleting, error: deleteError },
  ] = useDeleteSampleMutation();

  // Dialog handlers
  const handleOpenCreateDialog = () => {
    setFormData({ name: "", description: "", active: true });
    // Clear any previous error state from the create mutation
    resetCreate();
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
    setFormData({ name: "", description: "", active: true });
  };

  const handleOpenViewDialog = (id: number) => {
    setSelectedSampleId(id);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedSampleId(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setSelectedSampleId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedSampleId(null);
  };

  // Create handler
  const handleCreateSample = async () => {
    try {
      await createSample({ sampleCreateForm: formData }).unwrap();
      handleCloseCreateDialog();
    } catch (err) {
      // The error will be available in createError; UI below will surface it
      console.error("Failed to create sample:", err);
    }
  };

  // Delete handler
  const handleDeleteSample = async () => {
    if (selectedSampleId) {
      try {
        await deleteSample({ id: selectedSampleId }).unwrap();
        handleCloseDeleteDialog();
      } catch (err) {
        console.error("Failed to delete sample:", err);
      }
    }
  };

  // Date formatting
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const createErrorParts = getErrorParts(createError);
  const deleteErrorParts = getErrorParts(deleteError);
  const viewErrorParts = getErrorParts(viewError);

  return (
    <BasicPage
      header="Sample Management"
      content="Manage all your samples with full CRUD operations"
    >
      {/* Primary actions */}
      <Box
        sx={{ mb: 3, display: "flex", gap: 2, justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
        >
          Create Sample
        </Button>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      </Box>

      {/* Loading and error states */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error &&
        (() => {
          const pageErrorParts = getErrorParts(error);
          const pageErrorMessage = formatErrorMessage(
            pageErrorParts,
            "An error occurred while loading samples."
          );
          return (
            <Alert severity="error" sx={{ mb: 2 }}>
              {pageErrorMessage}
            </Alert>
          );
        })()}

      {/* Samples table */}
      {!isLoading && samples && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Samples ({samples.length})
            </Typography>
            {samples.length === 0 ? (
              <Alert severity="info">
                No samples found. Create your first sample to get started!
              </Alert>
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {samples.map((sample: Sample) => (
                      <TableRow key={sample.id}>
                        <TableCell>{sample.id}</TableCell>
                        <TableCell>{sample.name}</TableCell>
                        <TableCell>{sample.description}</TableCell>
                        <TableCell>
                          <Chip
                            label={sample.active ? "Active" : "Inactive"}
                            color={sample.active ? "success" : "default"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{formatDate(sample.createdAt)}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenViewDialog(sample.id!)}
                            title="View details"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleOpenDeleteDialog(sample.id!)}
                            title="Delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      )}

      {/* Create dialog */}
      <SampleCreateDialog
        open={createDialogOpen}
        value={formData}
        onChange={setFormData}
        onCancel={handleCloseCreateDialog}
        onSubmit={handleCreateSample}
        submitting={isCreating}
        errorMessage={
          isCreateError
            ? formatErrorMessage(createErrorParts, "Creation failed.")
            : undefined
        }
        violations={createErrorParts.violations}
      />

      {/* Details dialog */}
      <SampleDetailsDialog
        open={viewDialogOpen}
        sample={selectedSample || undefined}
        isLoading={isLoadingSample}
        errorMessage={
          viewError
            ? formatErrorMessage(
                viewErrorParts,
                "Unable to load details."
              )
            : undefined
        }
        onClose={handleCloseViewDialog}
      />

      {/* Delete confirmation dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        loading={isDeleting}
        errorMessage={
          deleteError
            ? formatErrorMessage(deleteErrorParts, "Deletion failed.")
            : undefined
        }
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDeleteSample}
        message={
          "Are you sure you want to delete this sample? This action cannot be undone."
        }
      />
    </BasicPage>
  );
};

export default SamplePage;
