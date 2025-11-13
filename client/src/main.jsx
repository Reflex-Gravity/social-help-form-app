import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import './i18n';
import App from './App.jsx';
import store from './store/store.js';
import './index.css';
import AppTheme from './theme/AppTheme.jsx';
import Notifications from './components/Notifications.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppTheme>
        <CssBaseline />
        <BrowserRouter>
          <App />
          <Notifications />
        </BrowserRouter>
      </AppTheme>
    </Provider>
  </StrictMode>,
);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch((err) => console.error('SW registration failed', err));
  });
}
