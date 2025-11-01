import type { SampleCreateForm } from "../../store/sampleApi";

export interface SampleCreateDialogProps {
  open: boolean;
  value: SampleCreateForm;
  onChange: (value: SampleCreateForm) => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitting?: boolean;
  errorMessage?: string;
  violations?: Record<string, string>;
}
