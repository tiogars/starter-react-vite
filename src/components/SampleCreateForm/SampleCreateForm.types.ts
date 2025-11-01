import type { SampleCreateForm } from "../../store/sampleApi";

export interface SampleCreateFormProps {
  value: SampleCreateForm;
  onChange: (value: SampleCreateForm) => void;
  violations?: Record<string, string>;
  disabled?: boolean;
}
