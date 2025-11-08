import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggle = () => {
    const next = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <Button color="inherit" onClick={toggle} className="!normal-case">
      {t('buttons.changeLang')}
    </Button>
  );
}
