import React from 'react';
import { FormLabel } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGrid from './FormGrid';

/**
 *
 *
 * @param {{label: string, name: string, datePickerProps: DatePickerProps }} { label, name, datePickerProps }
 * @return {*}
 */
function FormDateInput({ label, name, datePickerProps }) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor={name} required>
        {label}
      </FormLabel>
      <DatePicker
        {...register(name)}
        format="DD/MM/YYYY"
        onChange={(newValue) => setValue(name, newValue)}
        enableAccessibleFieldDOMStructure={false}
        slotProps={{
          textField: { helperText: errors?.[name]?.message },
          openPickerButton: { className: 'border-0 bg-transparent' },
        }}
        {...datePickerProps}
      />
    </FormGrid>
  );
}

export default FormDateInput;
