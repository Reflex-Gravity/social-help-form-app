import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './i18n';
import App from './App.jsx';
import store from './app/store.js';
import './index.css';
import AppTheme from './theme/AppTheme.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      {/* For tailwind precedence */}
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Provider store={store}>
        <AppTheme>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LocalizationProvider>
        </AppTheme>
      </Provider>
      {/* Your app */}
    </StyledEngineProvider>
  </StrictMode>,
);
