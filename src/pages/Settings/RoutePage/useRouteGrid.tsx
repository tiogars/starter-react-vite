import type { GridColDef } from "@mui/x-data-grid";
import type { Route } from "../../../store/routesApi";
import type {
  UseRouteGridProps,
  UseRouteGridResult,
} from "./useRouteGrid.types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";

export const useRouteGrid = ({
  onEdit,
  onDelete,
}: UseRouteGridProps): UseRouteGridResult => {
  const columns: GridColDef<Route>[] = [
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
      field: "path",
      headerName: "Path",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => onEdit(params.row)}
          showInMenu={false}
        />,
        <GridActionsCellItem
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

export default useRouteGrid;
