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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import type {
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";
import BasicPage from "../../components/BasicPage";
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
      <Dialog
        open={createDialogOpen}
        onClose={handleCloseCreateDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Sample</DialogTitle>
        <DialogContent>
          {/* Affichage d'erreur de création */}
          {isCreateError &&
            (() => {
              const { status, message, violations } =
                getErrorParts(createError);
              return (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {status ? `Erreur ${status} — ` : ""}
                  {message || "Echec de la création."}
                  {violations && (
                    <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                      {Object.entries(violations).map(([field, msg]) => (
                        <li key={field}>
                          <strong>{field}:</strong> {msg}
                        </li>
                      ))}
                    </Box>
                  )}
                </Alert>
              );
            })()}
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              error={Boolean(getErrorParts(createError).violations?.name)}
              helperText={getErrorParts(createError).violations?.name}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              error={Boolean(
                getErrorParts(createError).violations?.description
              )}
              helperText={getErrorParts(createError).violations?.description}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.active || false}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                />
              }
              label="Active"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Cancel</Button>
          <Button
            onClick={handleCreateSample}
            variant="contained"
            disabled={isCreating || !formData.name}
          >
            {isCreating ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de visualisation */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Sample Details</DialogTitle>
        <DialogContent>
          {isLoadingSample && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {viewError &&
            (() => {
              const { status, message } = getErrorParts(viewError);
              return (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {status ? `Erreur ${status} — ` : ""}
                  {message || "Impossible de charger les détails."}
                </Alert>
              );
            })()}
          {selectedSample && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  ID
                </Typography>
                <Typography variant="body1">{selectedSample.id}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{selectedSample.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {selectedSample.description || "No description"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedSample.active ? "Active" : "Inactive"}
                  color={selectedSample.active ? "success" : "default"}
                  size="small"
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Created At
                </Typography>
                <Typography variant="body1">
                  {formatDate(selectedSample.createdAt)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Created By
                </Typography>
                <Typography variant="body1">
                  {selectedSample.createdBy || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Updated At
                </Typography>
                <Typography variant="body1">
                  {formatDate(selectedSample.updatedAt)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Updated By
                </Typography>
                <Typography variant="body1">
                  {selectedSample.updatedBy || "N/A"}
                </Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {deleteError &&
            (() => {
              const { status, message } = getErrorParts(deleteError);
              return (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {status ? `Erreur ${status} — ` : ""}
                  {message || "La suppression a échoué."}
                </Alert>
              );
            })()}
          <Typography>
            Are you sure you want to delete this sample? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button
            onClick={handleDeleteSample}
            variant="contained"
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </BasicPage>
  );
};

export default SamplePage;
