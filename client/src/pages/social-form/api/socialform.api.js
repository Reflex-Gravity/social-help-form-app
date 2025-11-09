import { logEvent, LogLevel } from '../../../services/logger.service';
import { fetchController } from '../../../lib/fetchController';
import store from '../../../store/store';
import { showNotification } from '../../../store/notificationSlice';

const API_BASE = import.meta.env.DEV ? 'http://localhost:3000' : '';

export async function generateDescription({ field, lang }) {
  try {
    const url = `${API_BASE}/api/generate`;

    const response = await fetchController(url, { data: { prompt: field, lang } });

    if (response.status === 'success' && typeof response.message === 'string') {
      return response.message;
    } else {
      store.dispatch(showNotification({ message: response.message, severity: 'error' }));
      throw new Error('Error in response');
    }
  } catch (error) {
    store.dispatch(showNotification({ message: error.message, severity: 'error' }));
    logEvent(LogLevel.error, 'generateDescription failed', error);
    throw new Error('Error in response');
  }
}
