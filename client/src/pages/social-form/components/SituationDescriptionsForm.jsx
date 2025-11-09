import React from 'react';
import FormInput from '../../../components/FormInput';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import FormTextareaInput from '../../../components/FormTextAreaInput';

function SituationDescriptionsForm() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <FormTextareaInput
        name="currentFinancialSituation"
        label={t('form.currentFinancialSituation')}
      />
      <FormTextareaInput
        name="employementCircumstances"
        label={t('form.employementCircumstances')}
      />
      <FormTextareaInput name="reason" label={t('form.reason')} />
    </Grid>
  );
}

export default SituationDescriptionsForm;
