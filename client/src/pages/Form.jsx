import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Alert,
  Button,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/context.js';
import Stepper from './social-form/components/Stepper.jsx';
import FormField from '../components/FormField.jsx';
import AutoComplete from '../components/AutoComplete.jsx';
import PersonalInfoForm from './social-form/components/PersonalInfoForm.jsx';

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalInfoForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'DE', name: 'Germany' },
];

export default function FormPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      country: '',
    },
  });

  const onSubmit = handleSubmit(async () => {
    setSubmitted(false);
    setLoading(true);
    try {
      // Example API call (adjust baseURL in .env as VITE_API_BASE_URL if needed)
      // await api.post('/submit', data);
      await new Promise((res) => setTimeout(res, 600)); // mock
      setSubmitted(true);
      reset();
    } catch {
      // handle error globally/interceptor or show local error UI
      // console.error(err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">
        {t('form.title')}
      </Typography>

      {submitted && <Alert severity="success">{t('form.sent')}</Alert>}

      <Stepper />

      {getStepContent(activeStep)}
      <Paper className="p-4" elevation={0}>
        <form onSubmit={onSubmit} className="grid gap-4">
          <Grid container spacing={3}>
            <Controller
              name="name"
              control={control}
              rules={{ required: t('form.required') }}
              render={({ field }) => (
                <FormField
                  name="name"
                  label="Name"
                  field={
                    <OutlinedInput
                      {...field}
                      label={t('form.name')}
                      error={!!errors.name}
                      placeholder="Name"
                      helperText={errors.name?.message}
                    />
                  }
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: t('form.required'),
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: t('form.emailInvalid'),
                },
              }}
              render={({ field }) => (
                <FormField
                  name="email"
                  label="Email"
                  field={
                    <OutlinedInput
                      {...field}
                      label={t('form.email')}
                      error={!!errors.email}
                      placeholder="Email"
                      helperText={errors.email?.message}
                    />
                  }
                />
              )}
            />

            <Controller
              name="country"
              control={control}
              rules={{ required: t('form.required') }}
              render={({ field }) => (
                <FormField name="country" label="Country" field={<AutoComplete />} />
              )}
            />

            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || loading}
                className="!normal-case"
              >
                {t('buttons.submit')}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => reset()}
                disabled={isSubmitting || loading}
                className="!normal-case"
              >
                {t('buttons.reset')}
              </Button>
            </Stack>
          </Grid>
        </form>
      </Paper>
    </Stack>
  );
}
