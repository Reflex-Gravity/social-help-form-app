import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { inputsCustomizations } from './inputCustomizations.jsx';
import { navigationCustomizations } from './navigationCustomization.jsx';

import { shape } from './themePrimitives.js';

function AppTheme({ children }) {
  const theme = useMemo(() => {
    return createTheme({
      shape,
      components: {
        ...inputsCustomizations,
        ...navigationCustomizations,
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
