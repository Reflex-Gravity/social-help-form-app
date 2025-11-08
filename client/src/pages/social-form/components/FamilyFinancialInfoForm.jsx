import React from 'react';
import FormInput from '../../../components/FormInput';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import FormSelectInput from '../../../components/FormSelectInput';

const maritialStatusOptions = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'Married' },
  { label: 'Divorced', value: 'Divorced' },
  { label: 'Widowed', value: 'widowed' },
];

const employmentStatusOptions = [
  { label: 'Full-time Employed', value: 'full_time' },
  { label: 'Part-time Employed', value: 'part_time' },
  { label: 'Self-employed', value: 'self_employed' },
  { label: 'Freelancer/Contract', value: 'freelancer' },
  { label: 'Unemployed', value: 'unemployed' },
  { label: 'Student', value: 'student' },
  { label: 'Retired', value: 'retired' },
  { label: 'Homemaker', value: 'homemaker' },
  { label: 'Unable to Work', value: 'unable_to_work' },
];

const housingStatusOptions = [
  { label: 'Self Own', value: 'self_own' },
  { label: 'Renting', value: 'renting' },
  { label: 'Living with Parents', value: 'living_parents' },
  { label: 'Living with Relatives', value: 'living_relatives' },
  { label: 'Provided by Employer', value: 'employer_provided' },
  { label: 'Temporary/Transitional', value: 'temporary' },
];

function FamilyFinancialInfoForm() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <FormSelectInput
        name="maritalStatus"
        label={t('form.maritalStatus')}
        options={maritialStatusOptions}
      />
      <FormInput name="dependants" label={t('form.dependants')} />
      <FormSelectInput
        name="employmentStatus"
        label={t('form.employementStatus')}
        options={employmentStatusOptions}
      />
      <FormInput name="monthlyIncome" label={t('form.monthlyIncome')} />
      <FormSelectInput
        name="housingStatus"
        label={t('form.housingStatus')}
        options={housingStatusOptions}
      />

      {/* <FormInput name="Country" label={t('form.email')} /> */}
    </Grid>
  );
}

export default FamilyFinancialInfoForm;
