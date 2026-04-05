# Data Export & Import

The starter template includes a comprehensive data export/import system. Both features are accessible from the **Samples** toolbar.

---

## Export

Click the **Export** button to open the Export dialog. The button is enabled only when the grid contains at least one row.

### Export Formats

| Format | Extension | Notes |
|---|---|---|
| JSON | `.json` | Array of sample objects |
| CSV | `.csv` | Comma-separated, headers on first row |
| Excel | `.xlsx` | Single worksheet |
| PDF | `.pdf` | Tabular layout |
| XML | `.xml` | Element-per-record structure |

### Export Scope

Choose how many records to include:

| Scope | Description |
|---|---|
| **All records** | Every record matching the current filter (not just the current page) |
| **Current page** | Only the rows visible on screen |
| **Selection** | Only the rows with the checkbox ticked |

### ZIP Compression

Enable the **ZIP** toggle to receive a single `.zip` archive containing the exported file. Useful when exporting large datasets.

### How It Works

The export is handled by the `useExportSamplesMutation` RTK Query hook. The backend returns a binary response (`Blob`). The `emptyApi.ts` base configuration includes a custom response handler that:

1. Detects binary content types (`application/zip`, `text/csv`, `application/pdf`, etc.).
2. Creates a browser `Blob` from the response body.
3. Extracts the filename from the `Content-Disposition` response header.
4. Triggers a browser download using a temporary `<a>` element.

```typescript
// src/store/emptyApi.ts (simplified)
responseHandler: async (response) => {
  const contentType = response.headers.get('content-type') ?? '';
  if (isBinaryContentType(contentType)) {
    const blob = await response.blob();
    const filename = extractFilename(response.headers.get('content-disposition'));
    triggerDownload(blob, filename);
    return { downloaded: true };
  }
  return response.json();
}
```

---

## Import

The import feature allows bulk loading of samples from a file. It is triggered programmatically via `useImportSamplesMutation`.

### Import Report

After a successful import the backend returns a detailed status report:

| Field | Type | Description |
|---|---|---|
| `totalProvided` | number | Number of records in the import file |
| `totalCreated` | number | Records successfully created |
| `totalDuplicates` | number | Records skipped because they already exist |
| `totalErrors` | number | Records that failed validation |
| `totalSkipped` | number | Records explicitly skipped by business rules |
| `items` | array | Per-record status with individual messages |

The report is displayed in the UI so users know exactly what happened to each row.

---

## Data Initialisation

The **Init Samples** feature (`useInitSamplesMutation`) populates the database with _N_ randomly-generated sample records. This is useful for:

- Quickly filling the grid for demo purposes.
- Load-testing pagination and sorting.
- Providing realistic test data for screenshots.

It is exposed from the toolbar in development mode.

---

## Related Code

| File | Responsibility |
|---|---|
| `src/components/ExportDialog/` | Export dialog UI and options form |
| `src/store/emptyApi.ts` | Binary response handler and download trigger |
| `src/store/sampleApi.ts` | `useExportSamplesMutation`, `useImportSamplesMutation`, `useInitSamplesMutation` |
