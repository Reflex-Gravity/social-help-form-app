import { Box, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const steps = ['Personal Information', 'Family & Financial Info', 'Situation Descriptions'];

function StepperWrapper({ activeStep }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { sm: 'space-between', md: 'flex-end' },
        alignItems: 'center',
        width: '100%',
        maxWidth: { sm: '100%', md: 600 },
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexGrow: 1,
        }}
      >
        <Stepper id="desktop-stepper" activeStep={activeStep} sx={{ width: '100%', height: 40 }}>
          {steps.map((label) => (
            <Step sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }} key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}

export default StepperWrapper;
