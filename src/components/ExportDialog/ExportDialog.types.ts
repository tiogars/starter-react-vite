export type ExportFormat = "json" | "xml" | "csv" | "xlsx";
export type ExportScope = "all" | "currentPage" | "selection";

export interface ExportOptions {
  format: ExportFormat;
  zip: boolean;
  scope: ExportScope;
}

export interface ExportDialogProps {
  open: boolean;
  loading?: boolean;
  errorMessage?: string;
  onCancel: () => void;
  onSubmit: (options: ExportOptions) => void;
  disableSelection?: boolean;
  hasSelection?: boolean;
}
