import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import FormTextareaWithAI from './FormTextareaWithAI';

function SituationDescriptionsForm() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <FormTextareaWithAI
        name="currentFinancialSituation"
        label={t('form.currentFinancialSituation')}
      />
      <FormTextareaWithAI
        name="employementCircumstances"
        label={t('form.employementCircumstances')}
      />
      <FormTextareaWithAI name="reason" label={t('form.reason')} />
      {/* <FormTextareaWithAI
        name="description"
        label="Description"
        placeholder="Enter description..."
        onGenerateAI={async () => {
          // Your AI generation logic
          const response = await fetch('/api/generate', { method: 'POST' });
          const data = await response.json();
          return data.content;
        }}
      /> */}
    </Grid>
  );
}

export default SituationDescriptionsForm;
