import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormHelperText, FormLabel, Grow, OutlinedInput } from '@mui/material';
import FormGrid from './FormGrid';
import { useController } from 'react-hook-form';

export default function AutoComplete({
  label,
  options,
  required,
  placeholder,
  name,
  autoCompleteProps,
  onChange,
}) {
  const {
    fieldState: { error },
    field: { value, onBlur },
  } = useController({ name });

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor={name} required={required}>
        {label}
      </FormLabel>
      <Autocomplete
        value={value}
        options={options}
        disablePortal
        onBlur={onBlur}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
        {...autoCompleteProps}
      />
      <Grow in={!!error} unmountOnExit>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </Grow>
    </FormGrid>
  );
}
