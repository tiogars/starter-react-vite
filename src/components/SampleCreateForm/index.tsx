import { FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import type { SampleCreateFormProps } from "./SampleCreateForm.types";

export const SampleCreateForm = (props: SampleCreateFormProps) => {
  const { value, onChange, violations, disabled } = props;

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <TextField
        label="Name"
        fullWidth
        value={value.name || ""}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
        required
        error={Boolean(violations?.name)}
        helperText={violations?.name}
        disabled={disabled}
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        value={value.description || ""}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
        error={Boolean(violations?.description)}
        helperText={violations?.description}
        disabled={disabled}
      />
      <FormControlLabel
        control={
          <Switch
            checked={value.active || false}
            onChange={(e) => onChange({ ...value, active: e.target.checked })}
            disabled={disabled}
          />
        }
        label="Active"
      />
    </Stack>
  );
};

export default SampleCreateForm;
