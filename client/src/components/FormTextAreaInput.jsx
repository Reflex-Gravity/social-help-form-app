import React from 'react';
import { FormLabel, TextareaAutosize, FormHelperText, Box, Grow } from '@mui/material';
import { useController } from 'react-hook-form';
import FormGrid from './FormGrid';

/**
 * @param {{
 *   label: string,
 *   name: string,
 *   placeholder?: string,
 *   minRows?: number,
 *   maxRows?: number,
 *   textareaProps?: React.ComponentProps<typeof TextareaAutosize>
 * }} props
 */
function FormTextareaInput({
  label,
  name,
  placeholder,
  minRows = 3,
  maxRows = 10,
  textareaProps,
  aiButton,
}) {
  const {
    fieldState: { error },
    field,
  } = useController({ name });

  return (
    <FormGrid size={{ xs: 12 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormLabel id={`field-label-${name}`} htmlFor={`field-${name}`} required>
          {label}
        </FormLabel>
        {aiButton}
      </Box>

      <TextareaAutosize
        id={`field-${name}`}
        aria-describedby={`field-label-${name}`}
        aria-label={label}
        aria-labelledby={`field-label-${name}`}
        {...field}
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px 14px',
          fontSize: '1rem',
          fontFamily: 'inherit',
          borderRadius: '4px',
          border: error ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
          resize: 'vertical',
        }}
        {...textareaProps}
      />
      <Grow in={!!error} unmountOnExit>
        <FormHelperText id={name} error={!!error}>
          {error?.message}
        </FormHelperText>
      </Grow>
    </FormGrid>
  );
}

export default FormTextareaInput;
