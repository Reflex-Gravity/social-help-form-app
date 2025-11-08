import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import SuspenseWrapper from './components/SuspenseWrapper.jsx';

const FormPage = lazy(() => import('./pages/Form.jsx'));
const MainForm = lazy(() => import('./pages/social-form/MainForm.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  return (
    <ErrorBoundary>
      <SuspenseWrapper>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="form" element={<FormPage />} />
            <Route path="form-new" element={<MainForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SuspenseWrapper>
    </ErrorBoundary>
  );
}

export default App;
