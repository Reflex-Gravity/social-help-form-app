import { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import SuspenseWrapper from './components/SuspenseWrapper.jsx';
import i18n from './i18n/index.js';
import { useSelector } from 'react-redux';
import { getLanguageDir } from './lib/library.functions.js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { arSA } from './i18n/dateLocale.js';
import dayjs from 'dayjs';

const FormPage = lazy(() => import('./pages/Form.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  const lang = useSelector(({ app }) => app.lang);

  // preselect the language
  useEffect(() => {
    async function setLanguageConfig() {
      const direction = getLanguageDir(lang);
      document.documentElement.dir = direction;
      document.dir = direction;
      document.documentElement.setAttribute('dir', direction);

      // set arabic locale support for date pickers
      if (lang === 'ar') {
        dayjs.locale('ar');
        await import('dayjs/locale/ar');
      } else {
        dayjs.locale('en');
      }
      i18n.changeLanguage(lang);
    }

    // configure language
    setLanguageConfig();
  }, [lang]);

  console.log('arSA', arSA);

  return (
    <ErrorBoundary>
      <SuspenseWrapper>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ar"
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
      </SuspenseWrapper>
    </ErrorBoundary>
  );
}

export default App;
