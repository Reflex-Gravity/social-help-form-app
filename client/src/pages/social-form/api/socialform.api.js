import { logEvent, LogLevel } from '../../../services/logger.service';
import { fetchController } from '../../../lib/fetchController';
import store from '../../../store/store';
import { showNotification } from '../../../store/notificationSlice';
import i18n from '../../../i18n';

const API_BASE = import.meta.env.DEV ? import.meta.env.SERVER_URL : import.meta.env.SERVER_URL;

export async function generateDescription({ field, lang, userPrompt }) {
  try {
    const url = `${API_BASE}/api/generate`;

    const response = await fetchController(url, {
      data: { field, prompt: userPrompt, lang },
    });

    if (response.status === 'success' && typeof response.message === 'string') {
      return response.message;
    } else {
      store.dispatch(showNotification({ message: response.message, severity: 'error' }));
      throw new Error('Error in response');
    }
  } catch (error) {
    store.dispatch(
      showNotification({
        title: i18n.t('apiErrors.generic'),
        message: error.errorCode,
        severity: 'error',
      }),
    );
    logEvent(LogLevel.error, 'generateDescription failed', error);
    throw new Error('Error in response');
  }
}

export async function socialFormSubmitApi({ formData }) {
  try {
    const url = `${API_BASE}/api/form-submit`;
    if (!formData) {
      throw new Error('Fill the necessary details');
    }

    const response = await fetchController(url, { data: { formData } });

    if (response.status === 'success' && typeof response.message === 'string') {
      return response.message;
    } else {
      store.dispatch(
        showNotification({
          title: i18n.t('form.errors.formSubmitFailed'),
          message: response.message,
          severity: 'error',
        }),
      );
      throw new Error('Error in response');
    }
  } catch (error) {
    store.dispatch(
      showNotification({
        title: i18n.t('form.errors.formSubmitFailed'),
        message: error.errorCode,
        severity: 'error',
      }),
    );
    logEvent(LogLevel.error, 'socialFormSubmitApi failed', error);
    throw new Error('Error in response');
  }
}
