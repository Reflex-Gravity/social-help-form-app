import React from 'react';
import { FormLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGrid from './FormGrid';
import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YYYY';
const STORAGE_FORMAT = 'YYYY-MM-DD';

/**
 *
 *
 * @param {{label: string, name: string, datePickerProps: DatePickerProps }} { label, name, datePickerProps }
 * @return {*}
 */
function FormDateInput({ label, name, datePickerProps }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor={name} required>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            format={DATE_FORMAT}
            value={field.value ? dayjs(field.value) : null}
            onChange={(newValue) => {
              // Convert to string for form value, or null if invalid
              const stringValue =
                newValue && dayjs(newValue).isValid()
                  ? dayjs(newValue).format(STORAGE_FORMAT)
                  : null;
              field.onChange(stringValue);
            }}
            enableAccessibleFieldDOMStructure={false}
            slotProps={{
              textField: {
                helperText: errors?.[name]?.message,
                error: !!errors[name],
              },
              openPickerButton: { className: 'border-0 bg-transparent' },
            }}
            {...datePickerProps}
          />
        )}
      />
    </FormGrid>
  );
}

export default FormDateInput;
