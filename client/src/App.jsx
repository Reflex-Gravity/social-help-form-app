import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import SuspenseWrapper from './components/SuspenseWrapper.jsx';

import { useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { arSA } from './i18n/dateLocale.js';
import I18nProvider from './i18n/I18nProvider.js';

const FormPage = lazy(() => import('./pages/Form.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  const lang = useSelector(({ app }) => app.lang);

  return (
    <ErrorBoundary>
      <SuspenseWrapper>
        <I18nProvider>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={lang}
            localeText={
              lang === 'ar' ? arSA.components.MuiLocalizationProvider.defaultProps.localeText : null
            }
          >
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<FormPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </LocalizationProvider>
        </I18nProvider>
      </SuspenseWrapper>
    </ErrorBoundary>
  );
}

export default App;
