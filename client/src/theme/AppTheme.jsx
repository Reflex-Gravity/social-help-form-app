import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { inputsCustomizations } from './inputCustomizations.jsx';
import { navigationCustomizations } from './navigationCustomization.jsx';

import { shape } from './themePrimitives.js';
import { useSelector } from 'react-redux';
import { getLanguageDir } from '../lib/library.functions.js';

function AppTheme({ children }) {
  const lang = useSelector(({ app }) => app.lang);

  const theme = useMemo(() => {
    return createTheme({
      shape,
      direction: getLanguageDir(lang),
      components: {
        ...inputsCustomizations,
        ...navigationCustomizations,
      },
    });
  }, [lang]);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
