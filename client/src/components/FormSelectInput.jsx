import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';
import { FormHelperText, FormLabel, Grow } from '@mui/material';
import FormGrid from './FormGrid';

/**
 * @param {{
 *   label: string,
 *   name: string,
 *   options: Array<{value: string | number, label: string}>,
 *   placeholder?: string,
 *   required: boolean,
 *   selectProps?: import('@mui/material').SelectProps
 * }} props
 */
export default function FormSelectInput({ name, placeholder, label, required, options }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel required={required} id={`field-label-${name}`} htmlFor={`field-${name}`}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            id={`field-${name}`}
            labelId={`field-label-${name}`}
            aria-describedby={`field-label-${name}`}
            aria-label={label}
            aria-labelledby={`field-label-${name}`}
            {...field}
            value={field.value}
            error={!!errors[name]}
            displayEmpty
          >
            {placeholder && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Grow in={!!errors[name]} unmountOnExit>
        <FormHelperText error={!!errors[name]}>{errors?.[name]?.message}</FormHelperText>
      </Grow>
    </FormGrid>
  );
}
