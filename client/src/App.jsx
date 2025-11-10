import { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import SuspenseWrapper from './components/SuspenseWrapper.jsx';
import i18n from './i18n/index.js';
import { useSelector } from 'react-redux';
import { getLanguageDir } from './lib/library.functions.js';

const FormPage = lazy(() => import('./pages/Form.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  const lang = useSelector(({ app }) => app.lang);

  // preselect the language
  useEffect(() => {
    const direction = getLanguageDir(lang);
    document.documentElement.dir = direction;
    document.dir = direction;
    document.documentElement.setAttribute('dir', direction);

    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <ErrorBoundary>
      <SuspenseWrapper>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<FormPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SuspenseWrapper>
    </ErrorBoundary>
  );
}

export default App;
