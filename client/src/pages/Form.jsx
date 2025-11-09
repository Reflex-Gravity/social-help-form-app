import { lazy, useCallback, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import Stepper from '../components/Stepper.jsx';
import SuspenseWrapper from '../components/SuspenseWrapper.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import { useFormPersist } from '../hooks/useFormPersist.jsx';
import ErrorAlert from './social-form/components/ErrorAlert.jsx';
import formSchema from './social-form/useSocialFormSchema.js';

const SituationDescriptionsForm = lazy(
  () => import('./social-form/components/SituationDescriptionsForm.jsx'),
);
const PersonalInfoForm = lazy(() => import('./social-form/components/PersonalInfoForm.jsx'));
const FamilyFinancialInfoForm = lazy(
  () => import('./social-form/components/FamilyFinancialInfoForm.jsx'),
);

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalInfoForm />;
    case 1:
      return <FamilyFinancialInfoForm />;
    case 2:
      return <SituationDescriptionsForm />;
    default:
      throw new Error('Unknown step');
  }
}

export default function FormPage() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const form = useForm({
    resolver: yupResolver(formSchema[activeStep]), // attach defined schema here
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      country: '',
      gender: '',
      address: '',
      city: '',
      dob: '',
      nationalId: '',
      phone: '',
      state: '',
      maritalStatus: '',
      dependants: '',
      employmentStatus: '',
      monthlyIncome: '',
      housingStatus: '',
      currentFinancialSituation: '',
      employementCircumstances: '',
      reason: '',
    },
  });

  const { reset, handleSubmit } = form;

  useFormPersist('social-form', form.watch, form.setValue);

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

  const handleNext = async () => {
    const isValid = await form.trigger(); // validates all fields
    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = useCallback(() => {
    form.clearErrors();
    form.reset();
  }, [form]);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" component="h1">
        {t('form.title')}
      </Typography>

      {submitted && <Alert severity="success">{t('form.sent')}</Alert>}

      <Stepper activeStep={activeStep} />

      <Paper className="p-4 pt-0" elevation={0}>
        <FormProvider {...form}>
          <ErrorAlert />
          <form onSubmit={onSubmit} onReset={handleReset} className="grid gap-4">
            <Grid container direction={'column'} spacing={3}>
              <ErrorBoundary>
                <SuspenseWrapper>{getStepContent(activeStep)}</SuspenseWrapper>
              </ErrorBoundary>
              <Box
                sx={[
                  {
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    alignItems: 'end',
                    flexGrow: 1,
                    gap: 1,
                    justifyContent: 'space-between',
                  },
                ]}
              >
                <Button
                  type="reset"
                  color="inherit"
                  variant="contained"
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  {t('buttons.reset')}
                </Button>
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
