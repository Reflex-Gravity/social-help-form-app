import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { getLanguageDir } from '../lib/library.functions';
import i18n from '.';

function I18nProvider({ children }) {
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

  return children;
}

export default I18nProvider;
