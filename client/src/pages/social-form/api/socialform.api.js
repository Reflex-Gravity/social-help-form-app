import { logEvent, LogLevel } from '../../../services/logger.service';
import { fetchController } from '../../../lib/axios';

export async function generateDescription({ field }) {
  try {
    const url = 'http://localhost:3000/api/generate';

    const response = await fetchController(url, { data: { prompt: field } });

    if (response.status === 'success') {
      return response.data;
    } else {
      return 'Error';
    }
  } catch (error) {
    logEvent(LogLevel.error, 'generateDescription failed', error);
    return 'Error';
  }
}
