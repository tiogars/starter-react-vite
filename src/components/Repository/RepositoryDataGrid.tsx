
import React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Typography, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Repository } from "./Repository.types";
import { useGetAllRepositoriesQuery } from "../../store/repositoryApi";

type RepositoryDataGridProps = {
  onEdit?: (repo: Repository) => void;
  onDelete?: (repo: Repository) => void;
};

const columns = (onEdit?: (repo: Repository) => void, onDelete?: (repo: Repository) => void): GridColDef<Repository>[] => [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "url", headerName: "URL", flex: 2 },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="edit"
          size="small"
          onClick={() => onEdit && onEdit(params.row)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => onDelete && onDelete(params.row)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    ),
  },
];

const RepositoryDataGrid: React.FC<RepositoryDataGridProps> = ({ onEdit, onDelete }) => {
  const { data, isLoading, error } = useGetAllRepositoriesQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Failed to load repositories.</Typography>;

  // Support both array and single object response
  const rows = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <DataGrid
      autoHeight
      rows={rows}
      columns={columns(onEdit, onDelete)}
      getRowId={(row) => row.id}
      pageSizeOptions={[5, 10, 20]}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      disableRowSelectionOnClick
    />
  );
};

export default RepositoryDataGrid;
