import { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  FormLabel,
  Grid,
  MenuItem,
  MobileStepper,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { AppContext } from '../context/context.js';
import Stepper from './social-form/components/Stepper.jsx';
import FormField from '../components/FormInput.jsx';
import AutoComplete from '../components/AutoComplete.jsx';
import PersonalInfoForm from './social-form/components/PersonalInfoForm.jsx';
import PaymentForm from './social-form/components/PaymentForm.jsx';
import Review from './social-form/components/Review.jsx';
import schema from './form-schema.js';
import ErrorBoundary from '../components/ErrorBoundary.jsx';

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
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const form = useForm({
    resolver: yupResolver(schema), // attach defined schema here

    defaultValues: {
      name: '',
      email: '',
      country: '',
    },
  });

  const { reset, handleSubmit } = form;

  const onSubmit = handleSubmit(async () => {
    setSubmitted(false);
    setLoading(true);
    try {
      // Example API call (adjust baseURL in .env as VITE_API_BASE_URL if needed)
      // await api.post('/submit', data);
      console.log(form.getValues());
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

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">
        {t('form.title')}
      </Typography>

      {submitted && <Alert severity="success">{t('form.sent')}</Alert>}

      <Stepper activeStep={activeStep} />

      <Paper className="p-4" elevation={0}>
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="grid gap-4">
            <Grid container direction={'column'} spacing={3}>
              <ErrorBoundary>{getStepContent(activeStep)}</ErrorBoundary>
              <Box
                sx={[
                  {
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    alignItems: 'end',
                    flexGrow: 1,
                    gap: 1,
                  },
                  activeStep !== 0
                    ? { justifyContent: 'space-between' }
                    : { justifyContent: 'flex-end' },
                ]}
              >
                {activeStep !== 0 && (
                  <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={handleBack}
                    variant="text"
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                  >
                    {t('buttons.back')}
                  </Button>
                )}
                {activeStep !== 2 && (
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {t('buttons.next')}
                  </Button>
                )}
                {activeStep === 2 && (
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {t('buttons.submit')}
                  </Button>
                )}
              </Box>

              <Box sx={{ display: { md: 'none' } }}>
                <MobileStepper
                  variant="text"
                  steps={3}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 3 - 1}>
                      {t('buttons.next')}
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      {t('buttons.back')}
                    </Button>
                  }
                />
              </Box>
            </Grid>
          </form>
        </FormProvider>
      </Paper>
    </Stack>
  );
}
