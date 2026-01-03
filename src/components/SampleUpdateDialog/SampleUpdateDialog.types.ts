import type { SampleUpdateForm } from "../../store/sampleApi";

export interface SampleUpdateDialogProps {
  open: boolean;
  value: SampleUpdateForm;
  onChange: (value: SampleUpdateForm) => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitting?: boolean;
  errorMessage?: string;
  violations?: Record<string, string>;
}
