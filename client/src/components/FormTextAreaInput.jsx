import React from 'react';
import { FormLabel, TextareaAutosize, FormHelperText, Box } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import FormGrid from './FormGrid';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGrid size={{ xs: 12 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormLabel htmlFor={name} required>
          {label}
        </FormLabel>
        {aiButton}
      </Box>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <TextareaAutosize
              {...field}
              value={field.value ?? ''}
              id={name}
              minRows={minRows}
              maxRows={maxRows}
              placeholder={placeholder}
              style={{
                width: '100%',
                padding: '8px 14px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                borderRadius: '4px',
                border: errors[name] ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
                outline: 'none',
                resize: 'vertical',
              }}
              {...textareaProps}
            />
            {errors[name] && (
              <FormHelperText error>{t(`form.errors[${errors[name]?.message}]`)}</FormHelperText>
            )}
          </>
        )}
      />
    </FormGrid>
  );
}

export default FormTextareaInput;
