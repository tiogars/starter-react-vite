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

export const SamplePage = () => {
  // Helper pour parser les erreurs RTK Query (FetchBaseQueryError | SerializedError)
  const getErrorParts = (
    err: unknown
  ): {
    status?: number;
    message?: string;
    violations?: Record<string, string>;
  } => {
    const isObj = (v: unknown): v is Record<string, unknown> =>
      !!v && typeof v === "object";
    if (isObj(err) && "status" in err) {
      // Gestion des erreurs spéciales de fetchBaseQuery (TIMEOUT_ERROR, FETCH_ERROR, PARSING_ERROR)
      const statusVal = (err as { status: unknown }).status;
      if (typeof statusVal === "string") {
        if (statusVal === "TIMEOUT_ERROR") {
          return {
            message: `La requête a expiré après ${Math.round(
              API_TIMEOUT_MS / 1000
            )} secondes (timeout configuré).`,
          };
        }
        if (statusVal === "FETCH_ERROR") {
          return {
            message: "Erreur réseau: impossible de joindre le serveur.",
          };
        }
        if (statusVal === "PARSING_ERROR") {
          return {
            message: "Erreur lors du traitement de la réponse du serveur.",
          };
        }
      }
      const e = err as FetchBaseQueryError & { data?: unknown };
      const status = typeof e.status === "number" ? e.status : undefined;
      const data = (e.data ?? {}) as {
        message?: string;
        error?: string;
        violations?: Record<string, string>;
      };
      const message = data.message || data.error;
      const violations = data.violations;
      return { status, message, violations };
    }
    if (isObj(err) && ("message" in err || "name" in err)) {
      const e = err as SerializedError;
      return { message: e.message || e.name };
    }
    if (typeof err === "string") return { message: err };
    return {};
  };

  // État local pour les dialogues et la sélection
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<number | null>(null);

  // Formulaire de création
  const [formData, setFormData] = useState<SampleCreateForm>({
    name: "",
    description: "",
    active: true,
  });

  // Queries et Mutations RTK Query
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

  // Handlers pour les dialogues
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

  // Handler pour la création
  const handleCreateSample = async () => {
    try {
      await createSample({ sampleCreateForm: formData }).unwrap();
      handleCloseCreateDialog();
    } catch (err) {
      // The error will be available in createError; UI below will surface it
      console.error("Failed to create sample:", err);
    }
  };

  // Handler pour la suppression
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

  // Formatage de la date
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
      {/* Actions principales */}
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

      {/* Gestion des états de chargement et d'erreur */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error &&
        (() => {
          const { status, message } = getErrorParts(error);
          return (
            <Alert severity="error" sx={{ mb: 2 }}>
              {status ? `Erreur ${status} — ` : ""}
              {message ||
                `Une erreur est survenue lors du chargement des samples.`}
            </Alert>
          );
        })()}

      {/* Table des samples */}
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

      {/* Dialog de création */}
      <SampleCreateDialog
        open={createDialogOpen}
        value={formData}
        onChange={setFormData}
        onCancel={handleCloseCreateDialog}
        onSubmit={handleCreateSample}
        submitting={isCreating}
        errorMessage={
          isCreateError
            ? `${createErrorParts.status ? `Erreur ${createErrorParts.status} — ` : ""}${
                createErrorParts.message || "Echec de la création."
              }`
            : undefined
        }
        violations={createErrorParts.violations}
      />

      {/* Dialog de visualisation */}
      <SampleDetailsDialog
        open={viewDialogOpen}
        sample={selectedSample || undefined}
        isLoading={isLoadingSample}
        errorMessage={
          viewError
            ? `${viewErrorParts.status ? `Erreur ${viewErrorParts.status} — ` : ""}${
                viewErrorParts.message || "Impossible de charger les détails."
              }`
            : undefined
        }
        onClose={handleCloseViewDialog}
      />

      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        loading={isDeleting}
        errorMessage={
          deleteError
            ? `${deleteErrorParts.status ? `Erreur ${deleteErrorParts.status} — ` : ""}${
                deleteErrorParts.message || "La suppression a échoué."
              }`
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
