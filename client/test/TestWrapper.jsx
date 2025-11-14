import store from '../src/store/store.js';
import I18nProvider from '../src/i18n/I18nProvider';
import { Provider } from 'react-redux';

export default function TestWrapper({ children }) {
  return (
    <Provider store={store}>
      <I18nProvider>{children}</I18nProvider>
    </Provider>
  );
}
