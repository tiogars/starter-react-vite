import type { Sample } from "../../store/sampleApi";

export interface SampleDetailsDialogProps {
  open: boolean;
  sample?: Sample;
  isLoading?: boolean;
  errorMessage?: string;
  onClose: () => void;
}
