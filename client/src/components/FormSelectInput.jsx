import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormContext } from 'react-hook-form';
import { FormLabel } from '@mui/material';
import FormGrid from './FormGrid';

export default function FormSelectInput({ name, label, options }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor={name} required>
        {label}
      </FormLabel>
      <Select {...register(name)} error={!!errors[name]}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormGrid>
  );
}
