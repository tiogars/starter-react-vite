import type { GridColDef } from "@mui/x-data-grid";
import type { Sample } from "../store/sampleApi";
import type {
  UseSampleGridProps,
  UseSampleGridResult,
} from "./useSampleGrid.types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Chip, Stack, Typography } from "@mui/material";

export const useSampleGrid = ({
  onView,
  onEdit,
  onDelete,
}: UseSampleGridProps): UseSampleGridResult => {
  const columns: GridColDef<Sample>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      type: "number",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "active",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          color={params.value ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {params.value && params.value.length > 0 ? (
            params.value.map((tag: { id?: number; name: string }) => (
              <Chip
                key={tag.id || tag.name}
                label={tag.name}
                size="small"
                variant="outlined"
              />
            ))
          ) : (
            <Typography variant="caption" color="textSecondary">
              No tags
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      type: "dateTime",
      valueGetter: (value) => value && new Date(value),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key="view"
          icon={<VisibilityIcon />}
          label="View"
          onClick={() => onView(params.row)}
          showInMenu={false}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => onEdit(params.row)}
          showInMenu={false}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => onDelete(params.row)}
          showInMenu={false}
        />,
      ],
    },
  ];
  return { columns };
};
