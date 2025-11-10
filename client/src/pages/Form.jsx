import { lazy, useCallback, useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Alert, Box, Button, Grid, MobileStepper, Paper, Stack, useTheme } from '@mui/material';
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
import useSocialFormSchema from './social-form/useSocialFormSchema.js';
import { socialFormSubmitApi } from './social-form/api/socialform.api.js';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';

const FormLeft = lazy(() => import('./social-form/FormLeft.jsx'));
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
  const formSchema = useSocialFormSchema(activeStep);

  const form = useForm({
    resolver: yupResolver(formSchema), // attach defined schema here
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
      const isValid = await form.trigger(); // validates all fields

      if (isValid) {
        const formData = form.getValues();

        await socialFormSubmitApi({ formData });
        setSubmitted(true);
        reset();
        setActiveStep(0);
      }
    } catch {
      //
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
    <ErrorBoundary>
      <SuspenseWrapper>
        <Grid container columns={16} height="100vh" spacing={0}>
          <FormLeft />
          <Grid size={11} className="bg-gray-100" padding={5} spacing={3}>
            <Stack direction={'row'}>
              <div className="flex flex-1">
                {submitted && <Alert severity="success">{t('form.sent')}</Alert>}
              </div>
              <LanguageSwitcher />
            </Stack>

            <Stepper activeStep={activeStep} />

            <Paper className="p-4 border mt-10 border-gray-100 relative" elevation={0}>
              <FormProvider {...form}>
                <ErrorAlert />
                <form onSubmit={onSubmit} onReset={handleReset} className="grid gap-4">
                  <Grid container direction={'column'} spacing={3}>
                    <Box className="min-h-120">
                      <ErrorBoundary>
                        <SuspenseWrapper>{getStepContent(activeStep)}</SuspenseWrapper>
                      </ErrorBoundary>
                    </Box>

                    <Box
                      sx={[
                        {
                          display: { xs: 'none', md: 'flex' },
                          flexDirection: { xs: 'column-reverse', sm: 'row' },
                          alignItems: 'end',
                          position: 'sticky',
                          bottom: 0,
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
                      <Stack direction="row">
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
                            {loading ? t('buttons.submitting') : t('buttons.submit')}
                          </Button>
                        )}
                      </Stack>
                    </Box>

                    <Box sx={{ display: { md: 'none' } }}>
                      <MobileStepper
                        variant="text"
                        steps={3}
                        position="sticky"
                        activeStep={activeStep}
                        nextButton={
                          <Button size="small" onClick={handleNext} disabled={activeStep === 3 - 1}>
                            {t('buttons.next')}
                            {theme.direction === 'rtl' ? (
                              <KeyboardArrowLeft />
                            ) : (
                              <KeyboardArrowRight />
                            )}
                          </Button>
                        }
                        backButton={
                          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                              <KeyboardArrowRight />
                            ) : (
                              <KeyboardArrowLeft />
                            )}
                            {t('buttons.back')}
                          </Button>
                        }
                      />
                    </Box>
                  </Grid>
                </form>
              </FormProvider>
            </Paper>
          </Grid>
        </Grid>
      </SuspenseWrapper>
    </ErrorBoundary>
  );
}
