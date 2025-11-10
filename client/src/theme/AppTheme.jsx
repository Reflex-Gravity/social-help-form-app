import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { inputsCustomizations } from './inputCustomizations.jsx';
import { navigationCustomizations } from './navigationCustomization.jsx';

import { shape } from './themePrimitives.js';
import { useSelector } from 'react-redux';
import { getLanguageDir } from '../lib/library.functions.js';

const cacheLtr = createCache({
  key: 'muiltr',
  prepend: true,
});

// use rtlPlugin to RTL mui components
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

function AppTheme({ children }) {
  const lang = useSelector(({ app }) => app.lang);

  const direction = getLanguageDir(lang);

  const theme = useMemo(() => {
    return createTheme({
      shape,
      direction,
      components: {
        ...inputsCustomizations,
        ...navigationCustomizations,
      },
    });
  }, [direction]);

  return (
    <StyledEngineProvider enableCssLayer>
      <CacheProvider value={direction === 'rtl' ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={theme} disableTransitionOnChange>
          <GlobalStyles styles={'@layer theme, base, mui, components, utilities;'} />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}

export default AppTheme;
