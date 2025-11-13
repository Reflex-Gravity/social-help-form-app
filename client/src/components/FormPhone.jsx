import { FormHelperText, FormLabel, Grow, OutlinedInput } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import FormGrid from './FormGrid';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { useTranslation } from 'react-i18next';
import ar from 'react-phone-number-input/locale/ar.json';
import en from 'react-phone-number-input/locale/en.json';
import { forwardRef } from 'react';

const PhoneInputComponent = forwardRef((props, ref) => <OutlinedInput {...props} inputRef={ref} />);

function FormPhone({ label, name, required }) {
  const { i18n } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext({ name });

  const error = errors[name];

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel id={`field-label-${name}`} htmlFor={`field-${name}`} required>
        {label}
      </FormLabel>
      <PhoneInputWithCountry
        autoComplete="true"
        name={name}
        labels={i18n.language === 'ar' ? ar : en}
        defaultCountry="AE"
        rules={{ required: required }}
        international
        id={`field-${name}`}
        aria-describedby={`field-label-${name}`}
        aria-label={label}
        inputProps={{ dir: i18n.language === 'ar' ? 'rtl' : null }}
        aria-labelledby={`field-label-${name}`}
        inputComponent={PhoneInputComponent}
      />
      <Grow in={!!error} unmountOnExit>
        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      </Grow>
    </FormGrid>
  );
}

export default FormPhone;
