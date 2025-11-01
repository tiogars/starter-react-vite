import { Alert, Box, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Button, Stack, Typography } from "@mui/material";
import type { SampleDetailsDialogProps } from "./SampleDetailsDialog.types";

export const SampleDetailsDialog = (props: SampleDetailsDialogProps) => {
  const { open, sample, isLoading, errorMessage, onClose } = props;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Sample Details</DialogTitle>
      <DialogContent>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {sample && (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                ID
              </Typography>
              <Typography variant="body1">{sample.id}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1">{sample.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1">
                {sample.description || "No description"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={sample.active ? "Active" : "Inactive"}
                color={sample.active ? "success" : "default"}
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body1">{formatDate(sample.createdAt)}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Created By
              </Typography>
              <Typography variant="body1">{sample.createdBy || "N/A"}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Updated At
              </Typography>
              <Typography variant="body1">{formatDate(sample.updatedAt)}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Updated By
              </Typography>
              <Typography variant="body1">{sample.updatedBy || "N/A"}</Typography>
            </Box>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SampleDetailsDialog;
