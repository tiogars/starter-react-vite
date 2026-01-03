import type { SampleUpdateForm } from "../../store/sampleApi";

export interface SampleUpdateFormProps {
  value: SampleUpdateForm;
  onChange: (value: SampleUpdateForm) => void;
  violations?: Record<string, string>;
  disabled?: boolean;
}
