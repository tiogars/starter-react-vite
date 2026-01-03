import type { Sample } from '../store/sampleApi';

export interface UseSampleGridProps {
  onView: (sample: Sample) => void;
  onEdit: (sample: Sample) => void;
  onDelete: (sample: Sample) => void;
}

export interface UseSampleGridResult {
  columns: import('@mui/x-data-grid').GridColDef<Sample>[];
}
