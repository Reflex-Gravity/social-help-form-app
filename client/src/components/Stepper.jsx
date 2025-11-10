import { Box, Paper, Step, StepLabel, Stepper, Typography, useMediaQuery } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

function StepperWrapper({ activeStep }) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

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
    <Box className="mt-5 border-dashed border-neutral-300 border-2 p-4 rounded-xl">
      {isDesktop ? (
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Typography>{steps[activeStep]}</Typography>
      )}
    </Box>
  );
}

export default StepperWrapper;
