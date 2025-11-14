import FormInput from '../../../components/FormInput';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import FormSelectInput from '../../../components/FormSelectInput';
import {
  employmentStatusOptions,
  housingStatusOptions,
  maritialStatusOptions,
} from '../../../lib/constants';

function FamilyFinancialInfoForm() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <FormSelectInput
        name="maritalStatus"
        label={t('form.maritalStatus')}
        labelRenderer={(option) => t(`maritalStatus.${option.value}`)}
        options={maritialStatusOptions}
        required
      />
      <FormInput field={{ type: 'number' }} name="dependants" label={t('form.dependants')} />
      <FormSelectInput
        name="employmentStatus"
        label={t('form.employementStatus')}
        labelRenderer={(option) => t(`employmentStatus.${option.value}`)}
        required
        options={employmentStatusOptions}
      />
      <FormInput name="monthlyIncome" label={t('form.monthlyIncome')} />
      <FormSelectInput
        name="housingStatus"
        required
        labelRenderer={(option) => t(`housingStatus.${option.value}`)}
        label={t('form.housingStatus')}
        options={housingStatusOptions}
      />

      {/* <FormInput name="Country" label={t('form.email')} /> */}
    </Grid>
  );
}

export default FamilyFinancialInfoForm;
