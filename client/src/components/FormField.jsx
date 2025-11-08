import React from 'react';
import { FormLabel, Grid, styled } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function FormField({ field, label, name }) {
  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor={name} required>
        {label}
      </FormLabel>
      {field}
    </FormGrid>
  );
}

export default FormField;
