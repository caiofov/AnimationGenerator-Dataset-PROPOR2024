import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

type MultiSelectProps<T extends string> = {
  inputLabel: string;
  allValues: T[];
  selectedValues: T[];
  getSelectLabel: (v: T) => string;
  onChange: (v: T[]) => void;
};

export const MultiSelect = <T extends string>({
  inputLabel,
  allValues,
  selectedValues,
  getSelectLabel,
  onChange,
}: MultiSelectProps<T>) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel shrink>{inputLabel}</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={(v) => {
          onChange(v.target.value as T[]);
        }}
        input={<OutlinedInput label={inputLabel} />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              height: "40px",
              width: "100%",
              overflowY: "auto",
              alignItems: "center",
            }}
          >
            {selected.sort().map((value) => (
              <Chip key={value} label={getSelectLabel(value)} />
            ))}
          </Box>
        )}
        slotProps={{ input: { sx: { p: "10px" } } }}
      >
        {allValues.map((id) => (
          <MenuItem key={id} value={id}>
            <Checkbox checked={selectedValues.includes(id)} />
            <ListItemText>{getSelectLabel(id)}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
