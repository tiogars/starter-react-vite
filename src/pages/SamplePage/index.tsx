import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type {
  GridPaginationModel,
  GridSortModel,
  GridFilterModel,
} from "@mui/x-data-grid";
import type {
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import BasicPage from "../../components/BasicPage";
import SampleCreateDialog from "../../components/SampleCreateDialog";
import SampleUpdateDialog from "../../components/SampleUpdateDialog";
import SampleDetailsDialog from "../../components/SampleDetailsDialog";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";
import ExportDialog from "../../components/ExportDialog";
import type { ExportOptions } from "../../components/ExportDialog/ExportDialog.types";
import { API_TIMEOUT_MS } from "../../store/emptyApi";
import {
  useCreateSampleMutation,
  useUpdateSampleMutation,
  useDeleteSampleMutation,
  useSearchSamplesMutation,
  useGetSampleQuery,
  useExportSamplesMutation,
  type Sample,
  type SampleCreateForm,
  type SampleUpdateForm,
  type SampleSearchRequest,
} from "../../store/sampleApi";
import { useSampleGrid } from "../../hooks/useSampleGrid";

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
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<number | null>(null);
  const [selectedSampleForUpdate, setSelectedSampleForUpdate] = useState<Sample | undefined>(undefined);

  // DataGrid state
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [rowCount, setRowCount] = useState(0);

  // RTK Query hooks
  const [searchSamples, { data: searchResponse, isLoading, error }] = useSearchSamplesMutation();
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
    updateSample,
    {
      isLoading: isUpdating,
      isError: isUpdateError,
      error: updateError,
      reset: resetUpdate,
    },
  ] = useUpdateSampleMutation();
  const [
    deleteSample,
    { isLoading: isDeleting, error: deleteError },
  ] = useDeleteSampleMutation();
  const [
    exportSamples,
    { isLoading: isExporting, error: exportError },
  ] = useExportSamplesMutation();

  // Helper to build search request from current state
  const buildSearchRequest = (): SampleSearchRequest => ({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sortModel: sortModel.map((sort) => ({
      field: sort.field,
      sort: sort.sort || "asc",
    })),
    filterModel: {
      items: filterModel.items.map((item) => ({
        field: item.field,
        operator: item.operator,
        value: item.value,
      })),
      logicOperator: filterModel.logicOperator || "and",
    },
  });

  // Helper to build search request for exporting all records
  const buildSearchRequestForExport = (scope: string): SampleSearchRequest => {
    if (scope === "all") {
      // Return a request for all records using the actual total count
      return {
        page: 0,
        pageSize: rowCount || 10000, // Use actual row count, fallback to 10000
        sortModel: sortModel.map((sort) => ({
          field: sort.field,
          sort: sort.sort || "asc",
        })),
        filterModel: {
          items: filterModel.items.map((item) => ({
            field: item.field,
            operator: item.operator,
            value: item.value,
          })),
          logicOperator: filterModel.logicOperator || "and",
        },
      };
    }
    // For current page or selection, use the normal search request
    return buildSearchRequest();
  };

  // Load samples when pagination, sort, or filter changes
  useEffect(() => {
    searchSamples({ sampleSearchRequest: buildSearchRequest() });
  }, [paginationModel, sortModel, filterModel, searchSamples]);

  // Update rowCount when search response changes
  useEffect(() => {
    if (searchResponse?.rowCount !== undefined) {
      setRowCount(searchResponse.rowCount);
    }
  }, [searchResponse]);

  const samples = searchResponse?.rows || [];

  // Dialog handlers
  const handleOpenCreateDialog = () => {
    // Clear any previous error state from the create mutation
    resetCreate();
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleOpenUpdateDialog = (sample: Sample) => {
    setSelectedSampleForUpdate(sample);
    setSelectedSampleId(sample.id!);
    // Clear any previous error state from the update mutation
    resetUpdate();
    setUpdateDialogOpen(true);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setSelectedSampleForUpdate(undefined);
    setSelectedSampleId(null);
  };

  const handleOpenViewDialog = (sample: Sample) => {
    setSelectedSampleId(sample.id!);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedSampleId(null);
  };

  const handleOpenDeleteDialog = (sample: Sample) => {
    setSelectedSampleId(sample.id!);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedSampleId(null);
  };

  // Create handler
  const handleCreateSample = async (formData: SampleCreateForm) => {
    try {
      await createSample({ sampleCreateForm: formData }).unwrap();
      handleCloseCreateDialog();
      // Refresh the list
      searchSamples({ sampleSearchRequest: buildSearchRequest() });
    } catch (err) {
      // The error will be available in createError; UI below will surface it
      console.error("Failed to create sample:", err);
    }
  };

  // Update handler
  const handleUpdateSample = async (updateFormData: SampleUpdateForm) => {
    if (updateFormData.id) {
      try {
        await updateSample({ 
          id: updateFormData.id, 
          sampleUpdateForm: updateFormData 
        }).unwrap();
        handleCloseUpdateDialog();
        // Refresh the list
        searchSamples({ sampleSearchRequest: buildSearchRequest() });
      } catch (err) {
        // The error will be available in updateError; UI below will surface it
        console.error("Failed to update sample:", err);
      }
    }
  };

  // Delete handler
  const handleDeleteSample = async () => {
    if (selectedSampleId) {
      try {
        await deleteSample({ id: selectedSampleId }).unwrap();
        handleCloseDeleteDialog();
        // Refresh the list
        searchSamples({ sampleSearchRequest: buildSearchRequest() });
      } catch (err) {
        console.error("Failed to delete sample:", err);
      }
    }
  };

  // Refresh handler
  const handleRefresh = () => {
    searchSamples({ sampleSearchRequest: buildSearchRequest() });
  };

  // Export dialog handlers
  const handleOpenExportDialog = () => {
    setExportDialogOpen(true);
  };

  const handleCloseExportDialog = () => {
    setExportDialogOpen(false);
  };

  // Export handler
  const handleExport = async (options: ExportOptions) => {
    try {
      const result = await exportSamples({
        sampleExportForm: {
          format: options.format,
          zip: options.zip,
          searchRequest: buildSearchRequestForExport(options.scope),
        },
      }).unwrap();

      // Create a download link for the blob
      const url = window.URL.createObjectURL(result);
      const link = document.createElement("a");
      link.href = url;
      const fileExtension = options.zip ? "zip" : options.format;
      link.download = `samples-export-${new Date().toISOString().split("T")[0]}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      handleCloseExportDialog();
    } catch (err) {
      // Error is automatically captured in exportError state by RTK Query
      console.error("Failed to export samples:", err);
    }
  };

  const createErrorParts = getErrorParts(createError);
  const updateErrorParts = getErrorParts(updateError);
  const deleteErrorParts = getErrorParts(deleteError);
  const viewErrorParts = getErrorParts(viewError);
  const exportErrorParts = getErrorParts(exportError);

  const { columns } = useSampleGrid({
    onView: handleOpenViewDialog,
    onEdit: handleOpenUpdateDialog,
    onDelete: handleOpenDeleteDialog,
  });

  const NoSamplesOverlay = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="body1" color="text.secondary">
        No samples found. Click "Create Sample" to add one.
      </Typography>
    </Box>
  );

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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleOpenExportDialog}
            disabled={samples.length === 0}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Error state */}
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

      {/* Export error state */}
      {exportError &&
        (() => {
          const exportErrorMessage = formatErrorMessage(
            exportErrorParts,
            "An error occurred while exporting samples."
          );
          return (
            <Alert severity="error" sx={{ mb: 2 }}>
              {exportErrorMessage}
            </Alert>
          );
        })()}

      {/* Samples DataGrid */}
      <Paper sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={samples}
          columns={columns}
          loading={isLoading}
          rowCount={rowCount}
          paginationMode="server"
          sortingMode="server"
          filterMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id ?? `temp-${Math.random()}`}
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
            noRowsOverlay: NoSamplesOverlay,
          }}
        />
      </Paper>

      {/* Create dialog */}
      <SampleCreateDialog
        open={createDialogOpen}
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

      {/* Update dialog */}
      <SampleUpdateDialog
        open={updateDialogOpen}
        initialData={selectedSampleForUpdate}
        onCancel={handleCloseUpdateDialog}
        onSubmit={handleUpdateSample}
        submitting={isUpdating}
        errorMessage={
          isUpdateError
            ? formatErrorMessage(updateErrorParts, "Update failed.")
            : undefined
        }
        violations={updateErrorParts.violations}
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

      {/* Export dialog */}
      <ExportDialog
        open={exportDialogOpen}
        loading={isExporting}
        errorMessage={
          exportError
            ? formatErrorMessage(exportErrorParts, "Export failed.")
            : undefined
        }
        onCancel={handleCloseExportDialog}
        onSubmit={handleExport}
      />
    </BasicPage>
  );
};

export default SamplePage;
