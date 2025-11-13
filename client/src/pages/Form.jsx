import { lazy, useCallback, useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  Grid,
  MobileStepper,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
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
import useSocialFormSchema from './social-form/useSocialFormSchema.js';
import { socialFormSubmitApi } from './social-form/api/socialform.api.js';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import clsx from 'clsx';

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
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(() =>
    // pre-fill saved active step
    Number(localStorage.getItem(`socialform-activeStep`) ?? 0),
  );
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const formSchema = useSocialFormSchema(activeStep);

  const form = useForm({
    resolver: yupResolver(formSchema),
    shouldFocusError: true,
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

  useFormPersist('social-form', form.watch, form.setValue);

  const { reset, handleSubmit } = form;

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      form.trigger();
    }
  }, [form, i18n.language]);

  const onSubmit = handleSubmit(async () => {
    setSubmitted(false);
    setLoading(true);
    try {
      // validates all fields
      const isValid = await form.trigger();

      if (isValid) {
        const formData = form.getValues();

        await socialFormSubmitApi({ formData });
        setSubmitted(true);
        reset();
        setActiveStep(0);
        localStorage.setItem(`socialform-activeStep`, 0);
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
      localStorage.setItem(`socialform-activeStep`, activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    localStorage.setItem(`socialform-activeStep`, activeStep - 1);
  };

  const handleReset = useCallback(() => {
    form.clearErrors();
    form.reset();
  }, [form]);

  return (
    <ErrorBoundary>
      <SuspenseWrapper>
        <Grid container columns={16} height="100vh" spacing={0}>
          {isDesktop && <FormLeft />}
          <Grid
            size={{ lg: 11, xs: 16 }}
            overflow={'scroll'}
            height={'100vh'}
            className="bg-gray-100"
            padding={3}
            paddingTop={1}
            paddingRight={{ xs: 1, lg: 5 }}
            paddingLeft={{ xs: 1, lg: 10 }}
            spacing={3}
          >
            <Stack
              direction={'row'}
              alignItems={'center'}
              marginTop={2}
              justifyItems={'center'}
              justifyContent={'space-between'}
            >
              <Stepper activeStep={activeStep} />
              <LanguageSwitcher />
            </Stack>

            <Typography
              marginTop={{ xs: 3, lg: 5 }}
              paddingLeft={1}
              fontSize={{ xs: 18, sm: 22 }}
              className={clsx('font-semibold', i18n.language === 'ar' ? 'alexandria' : '')}
            >
              {t('form.formInfo')}
            </Typography>

            <Paper className="p-4 border mt-5 border-gray-100 relative" elevation={0}>
              <FormProvider {...form}>
                <div className="flex flex-1">
                  {submitted && <Alert severity="success">{t('form.sent')}</Alert>}
                </div>
                <ErrorAlert />
                <form onSubmit={onSubmit} onReset={handleReset} className="grid gap-4">
                  <Grid container direction={'column'} spacing={2}>
                    <Box className="min-h-120" marginBottom={{ xs: 3, sm: 0 }}>
                      <ErrorBoundary>
                        <SuspenseWrapper>{getStepContent(activeStep)}</SuspenseWrapper>
                      </ErrorBoundary>
                    </Box>

                    <Box
                      sx={[
                        {
                          display: { xs: 'none', sm: 'flex' },
                          flexDirection: { xs: 'column-reverse', sm: 'row' },
                          alignItems: 'end',
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

                    <Box sx={{ display: { sm: 'none' } }}>
                      <Button
                        sx={{ marginBottom: { xs: 3, sm: 0 } }}
                        type="reset"
                        color="inherit"
                        variant="contained"
                      >
                        {t('buttons.reset')}
                      </Button>
                      <MobileStepper
                        variant="dots"
                        steps={3}
                        sx={{ display: { md: 'none' } }}
                        classes={{ dotActive: 'bg-amber-800' }}
                        position="bottom"
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
