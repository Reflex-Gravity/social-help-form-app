import { Box, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const steps = ['Personal Information', 'Family & Financial Info', 'Situation Descriptions'];

function StepperWrapper({ activeStep }) {
  return (
    <Box>
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}

export default StepperWrapper;
