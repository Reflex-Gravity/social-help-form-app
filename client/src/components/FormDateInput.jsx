import { FormHelperText, FormLabel, Grow } from '@mui/material';
import { Controller, useController } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGrid from './FormGrid';
import dayjs from 'dayjs';
import { DATE_FORMAT, STORAGE_FORMAT } from '../lib/constants';

/**
 *
 *
 * @param {{label: string, name: string, datePickerProps: DatePickerProps }} { label, name, datePickerProps }
 * @return {*}
 */
function FormDateInput({ label, name, datePickerProps, required }) {
  const {
    fieldState: { error },
    field,
  } = useController({ name });

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel id={`field-label-${name}`} htmlFor={`field-${name}`} required={required}>
        {label}
      </FormLabel>

      <DatePicker
        {...field}
        format={DATE_FORMAT}
        value={field.value ? dayjs(field.value) : null}
        onChange={(newValue) => {
          // Convert to string for form value, or null if invalid
          const stringValue =
            newValue && dayjs(newValue).isValid() ? dayjs(newValue).format(STORAGE_FORMAT) : null;
          field.onChange(stringValue);
        }}
        enableAccessibleFieldDOMStructure={false}
        slotProps={{
          openPickerButton: { className: 'border-0 bg-transparent' },
        }}
        {...datePickerProps}
      />
      <Grow in={!!error} unmountOnExit>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </Grow>
    </FormGrid>
  );
}

export default FormDateInput;
