import { FormHelperText, FormLabel, Grow, OutlinedInput } from '@mui/material';
import { useController } from 'react-hook-form';
import FormGrid from './FormGrid';

function FormInput({ field, label, name, placeholder, type }) {
  const {
    fieldState: { error },
    field: fieldProps,
  } = useController({ name });

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel id={`field-label-${name}`} htmlFor={`field-${name}`} required>
        {label}
      </FormLabel>
      <OutlinedInput
        autoComplete="true"
        id={`field-${name}`}
        aria-describedby={`field-label-${name}`}
        type={type || 'text'}
        aria-label={label}
        aria-labelledby={`field-label-${name}`}
        {...field}
        {...fieldProps}
        placeholder={placeholder}
      />
      <Grow in={!!error} unmountOnExit>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </Grow>
    </FormGrid>
  );
}

export default FormInput;
