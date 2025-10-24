import { useState } from 'react';
import BasicPage from '../../components/BasicPage';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  Chip,
  FormControlLabel,
  Switch,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  useGetAllSamplesQuery,
  useCreateSampleMutation,
  useGetSampleQuery,
  useDeleteSampleMutation,
  type Sample,
  type SampleCreateForm,
} from '../../store/sampleApi';

export const SamplePage = () => {
  // État local pour les dialogues et la sélection
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<number | null>(null);
  
  // Formulaire de création
  const [formData, setFormData] = useState<SampleCreateForm>({
    name: '',
    description: '',
    active: true,
  });

  // Queries et Mutations RTK Query
  const { data: samples, isLoading, error, refetch } = useGetAllSamplesQuery();
  const { data: selectedSample, isLoading: isLoadingSample } = useGetSampleQuery(
    { id: selectedSampleId! },
    { skip: !selectedSampleId || !viewDialogOpen }
  );
  const [createSample, { isLoading: isCreating }] = useCreateSampleMutation();
  const [deleteSample, { isLoading: isDeleting }] = useDeleteSampleMutation();

  // Handlers pour les dialogues
  const handleOpenCreateDialog = () => {
    setFormData({ name: '', description: '', active: true });
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
    setFormData({ name: '', description: '', active: true });
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
      console.error('Failed to create sample:', err);
    }
  };

  // Handler pour la suppression
  const handleDeleteSample = async () => {
    if (selectedSampleId) {
      try {
        await deleteSample({ id: selectedSampleId }).unwrap();
        handleCloseDeleteDialog();
      } catch (err) {
        console.error('Failed to delete sample:', err);
      }
    }
  };

  // Formatage de la date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <BasicPage
      header="Sample Management"
      content="Manage all your samples with full CRUD operations"
    >
      {/* Actions principales */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading samples: {JSON.stringify(error)}
        </Alert>
      )}

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
                            label={sample.active ? 'Active' : 'Inactive'}
                            color={sample.active ? 'success' : 'default'}
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
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description || ''}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
            {isCreating ? <CircularProgress size={24} /> : 'Create'}
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
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}
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
                  {selectedSample.description || 'No description'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedSample.active ? 'Active' : 'Inactive'}
                  color={selectedSample.active ? 'success' : 'default'}
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
                  {selectedSample.createdBy || 'N/A'}
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
                  {selectedSample.updatedBy || 'N/A'}
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
          <Typography>
            Are you sure you want to delete this sample? This action cannot be undone.
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
            {isDeleting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </BasicPage>
  );
};

export default SamplePage;
