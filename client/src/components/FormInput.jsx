import { FormHelperText, FormLabel, Grow, OutlinedInput } from '@mui/material';
import { useController } from 'react-hook-form';
import FormGrid from './FormGrid';

function FormInput({ field, label, name, placeholder }) {
  const {
    fieldState: { error },
    field: fieldProps,
  } = useController({ name });

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor={name} required>
        {label}
      </FormLabel>
      <OutlinedInput aria-describedby={name} {...field} {...fieldProps} placeholder={placeholder} />
      <Grow in={!!error} unmountOnExit>
        <FormHelperText id={name} error={!!error}>
          {error?.message}
        </FormHelperText>
      </Grow>
    </FormGrid>
  );
}

export default FormInput;
