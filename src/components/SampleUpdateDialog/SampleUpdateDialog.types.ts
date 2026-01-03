import type { Sample, SampleUpdateForm } from "../../store/sampleApi";

export interface SampleUpdateDialogProps {
  open: boolean;
  initialData?: Sample;
  onCancel: () => void;
  onSubmit: (data: SampleUpdateForm) => void;
  submitting?: boolean;
  errorMessage?: string;
  violations?: Record<string, string>;
}
