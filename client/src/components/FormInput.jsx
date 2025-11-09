import React from 'react';
import { FormHelperText, FormLabel, OutlinedInput } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import FormGrid from './FormGrid';

function FormInput({ field, label, name, placeholder }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor={name} required>
        {label}
      </FormLabel>
      <OutlinedInput {...field} {...register(name)} placeholder={placeholder} />
      <FormHelperText error={!!errors[name]}>{errors?.[name]?.message}</FormHelperText>
    </FormGrid>
  );
}

export default FormInput;
