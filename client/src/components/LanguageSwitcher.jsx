import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggle = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en';
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', next);

    i18n.changeLanguage(next);
  };

  return (
    <Button color="inherit" onClick={toggle} className="!normal-case">
      {t('buttons.changeLang')}
    </Button>
  );
}
