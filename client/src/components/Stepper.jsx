import { useMemo } from 'react';
import { Box, Stack, Step, StepLabel, Stepper, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

function StepperWrapper({ activeStep }) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const { t } = useTranslation();
  const steps = useMemo(
    () => [
      t('form.personalInformation'),
      t('form.familyFinancialInfo'),
      t('form.situationDescription'),
    ],
    [t],
  );

  return (
    <Box flexGrow={0.8} className="border-dashed border-neutral-300 border-2 p-4 rounded-xl">
      {isDesktop ? (
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Stack flexDirection={'row'} alignItems={'center'}>
          <span className="flex h-3 w-3 rounded-full bg-amber-800" />
          <Typography fontSize={{ xs: 14, sm: 20 }} marginLeft={1} className="font-bold">
            {steps[activeStep]}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default StepperWrapper;
