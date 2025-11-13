import React, { lazy } from 'react';
import FormInput from '../../../components/FormInput';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import FormDateInput from '../../../components/FormDateInput';
import FormSelectInput from '../../../components/FormSelectInput';
import { genderOptions } from '../../../lib/constants';
import FormPhone from '../../../components/FormPhone';

const CountryStateCity = lazy(() => import('./FormCountryStateCityInput'));

function PersonalInfoForm() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <FormInput name="name" label={t('form.name')} />
      <FormInput name="nationalId" label={t('form.nationalId')} />
      <FormDateInput
        name="dob"
        label={t('form.dob')}
        datePickerProps={{ disableFuture: true }}
        required
      />
      <FormSelectInput
        name="gender"
        label={t('form.gender')}
        options={genderOptions}
        required
        placeholder={t('form.selectGender')}
      />
      <FormInput name="address" label={t('form.address')} field={{ multiline: true }} />
      <FormPhone name="phone" label={t('form.phone')} required />
      <FormInput name="email" type="email" label={t('form.email')} />
      <CountryStateCity />
    </Grid>
  );
}

export default PersonalInfoForm;
