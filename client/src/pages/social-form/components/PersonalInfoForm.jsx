import React from 'react';
import FormInput from '../../../components/FormInput';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import FormDateInput from '../../../components/FormDateInput';
import FormSelectInput from '../../../components/FormSelectInput';
import AutoComplete from '../../../components/AutoComplete';
import CountryStateCity from './FormCountryStateCityInput';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

function PersonalInfoForm() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <FormInput name="name" label={t('form.name')} />
      <FormInput name="nationalId" label={t('form.nationalId')} />
      <FormDateInput name="dob" label={t('form.dob')} datePickerProps={{ disableFuture: true }} />
      <FormSelectInput name="gender" label={t('form.gender')} options={genderOptions} />
      <FormInput name="address" label={t('form.address')} field={{ multiline: true }} />
      <FormInput name="phone" label={t('form.phone')} field={{ multiline: true }} />
      <FormInput name="email" label={t('form.email')} />
      <CountryStateCity />
      {/* <FormInput name="Country" label={t('form.email')} /> */}
    </Grid>
  );
}

export default PersonalInfoForm;
