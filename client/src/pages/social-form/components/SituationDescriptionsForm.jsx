import React from 'react';
import FormInput from '../../../components/FormInput';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

function SituationDescriptionsForm() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <FormInput name="currentFinancialSituation" label={t('form.currentFinancialSituation')} />
      <FormInput name="employementCircumstances" label={t('form.employementCircumstances')} />
      <FormInput name="reason" label={t('form.reason')} />
    </Grid>
  );
}

export default SituationDescriptionsForm;
