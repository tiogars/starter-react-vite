# MUI X DataGrid — Technical Review

This project uses [MUI X DataGrid v8](https://mui.com/x/react-data-grid/) to display the Sample list. This page explains how the grid is configured and how the server-side data flow works.

---

## Why MUI X DataGrid?

| Feature | Detail |
|---|---|
| Server-side model | Pagination, sort, and filter are all driven by the backend |
| Column definitions | Rich API for custom renderers, action cells, and column menus |
| Performance | Virtualised rows — only visible rows are in the DOM |
| MUI integration | Inherits the MUI theme automatically |
| TypeScript | Generic `GridColDef<T>[]` with full type inference |

---

## Grid Setup

The DataGrid is rendered inside `src/pages/SamplePage/index.tsx`:

```tsx
import { DataGrid } from '@mui/x-data-grid';
import type {
  GridPaginationModel,
  GridSortModel,
  GridFilterModel,
} from '@mui/x-data-grid';

<DataGrid
  rows={rows}
  columns={columns}
  rowCount={rowCount}
  paginationMode="server"
  sortingMode="server"
  filterMode="server"
  paginationModel={paginationModel}
  onPaginationModelChange={setPaginationModel}
  onSortModelChange={handleSortChange}
  onFilterModelChange={handleFilterChange}
  pageSizeOptions={[5, 10, 25, 50]}
  checkboxSelection
  disableRowSelectionOnClick
  slots={{ noRowsOverlay: NoRowsOverlay }}
  loading={isLoading}
/>
```

All three modes (`paginationMode`, `sortingMode`, `filterMode`) are set to `"server"` so the grid never attempts to sort or filter the local `rows` array — all data manipulation happens on the backend.

---

## Column Definitions

Column definitions are extracted into the `useSampleGrid` custom hook (`src/hooks/useSampleGrid.tsx`), keeping the page component clean:

```typescript
export const useSampleGrid = ({
  onView,
  onEdit,
  onDelete,
}: UseSampleGridProps): GridColDef<Sample>[] => [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    minWidth: 250,
  },
  {
    field: 'active',
    headerName: 'Status',
    width: 120,
    renderCell: ({ value }) => (
      <Chip
        label={value ? 'Active' : 'Inactive'}
        color={value ? 'success' : 'default'}
        size="small"
      />
    ),
  },
  {
    field: 'tags',
    headerName: 'Tags',
    flex: 1,
    sortable: false,
    renderCell: ({ value }) => (
      <Stack direction="row" spacing={0.5} flexWrap="wrap">
        {(value as Tag[])?.map((tag) => (
          <Chip key={tag.id} label={tag.name} size="small" variant="outlined" />
        ))}
      </Stack>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 180,
    valueFormatter: (value) =>
      value ? DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_MED) : '—',
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 120,
    getActions: ({ row }) => [
      <GridActionsCellItem icon={<VisibilityIcon />} label="View" onClick={() => onView(row)} />,
      <GridActionsCellItem icon={<EditIcon />}       label="Edit" onClick={() => onEdit(row)} />,
      <GridActionsCellItem icon={<DeleteIcon />}     label="Delete" onClick={() => onDelete(row)} />,
    ],
  },
];
```

### Column Highlights

| Column | Technique | Notes |
|---|---|---|
| Status | `renderCell` with `<Chip>` | Green for active, grey for inactive |
| Tags | `renderCell` with `<Stack>` + `<Chip>` | Multi-value, `sortable: false` |
| Created At | `valueFormatter` with Luxon | Locale-aware date/time string |
| Actions | `type: 'actions'` with `GridActionsCellItem` | Row-level view/edit/delete |

---

## Server-Side Data Flow

### Pagination

`paginationModel` is a React state object `{ page: number; pageSize: number }`. When the user changes the page or page size, `setPaginationModel` updates the state and triggers a new search mutation.

```typescript
const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
  page: 0,
  pageSize: 10,
});
```

### Sorting

```typescript
const handleSortChange = (model: GridSortModel) => {
  setSortModel(model);
};
```

The sort model is mapped to `sortField` and `sortDirection` in the search request.

### Filtering

```typescript
const handleFilterChange = (model: GridFilterModel) => {
  setFilterModel(model);
  // Reset to first page when filter changes
  setPaginationModel((prev) => ({ ...prev, page: 0 }));
};
```

Filter items are mapped to the backend's filter format:

```typescript
const filters = filterModel.items
  .filter((item) => item.value !== undefined && item.value !== '')
  .map((item) => ({
    field: item.field,
    operator: item.operator,
    value: String(item.value),
  }));
```

### Full Search Request

All three models are combined into a single `SampleSearchRequest` sent to the backend:

```typescript
const searchRequest: SampleSearchRequest = {
  page: paginationModel.page,
  pageSize: paginationModel.pageSize,
  sortField: sortModel[0]?.field,
  sortDirection: sortModel[0]?.sort ?? undefined,
  filters,
  logicOperator: filterModel.logicOperator,
};
```

---

## Custom Overlays

### No Rows Overlay

When the grid has no data (either empty database or no filter matches), a custom overlay is shown instead of the default "No rows" message:

```tsx
const NoRowsOverlay = () => (
  <Stack alignItems="center" justifyContent="center" height="100%">
    <Typography variant="h6">No samples available yet</Typography>
    <Typography variant="body2" color="text.secondary">
      Start by creating a sample to populate this view.
    </Typography>
    <Button startIcon={<AddIcon />} onClick={handleCreateOpen}>
      Create Sample
    </Button>
  </Stack>
);
```

This gives users a clear path forward instead of an empty table.

---

## Stats Bar

The page renders a stats bar above the grid with live counters:

| Stat | Source |
|---|---|
| Total records | `rowCount` returned by the backend search response |
| Active filters | `filterModel.items.length` |
| Sorting | Current `sortModel[0].field` + direction, or "Default order" |

---

## Performance Notes

- **`rowCount`** is always set from the server response so the DataGrid shows the correct total pages even when on page 2+.
- **`disableRowSelectionOnClick`** prevents accidental selections when clicking action buttons.
- **`checkboxSelection`** enables multi-select for the Export scope "Selection" feature.
- The **Tags** column has `sortable: false` because sorting by a relation array is not supported server-side.

---

## File Reference

| File | Purpose |
|---|---|
| `src/pages/SamplePage/index.tsx` | Grid integration, state management |
| `src/hooks/useSampleGrid.tsx` | Column definitions |
| `src/store/sampleApi.ts` | `useSearchSamplesMutation`, `SampleSearchRequest` type |
