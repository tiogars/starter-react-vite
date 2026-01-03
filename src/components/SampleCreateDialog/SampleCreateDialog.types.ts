import type { SampleCreateForm } from "../../store/sampleApi";

export interface SampleCreateDialogProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (data: SampleCreateForm) => void;
  submitting?: boolean;
  errorMessage?: string;
  violations?: Record<string, string>;
}
