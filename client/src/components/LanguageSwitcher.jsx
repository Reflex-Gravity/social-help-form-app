import { Button, Icon, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLang } from '../store/store';
import { useCallback } from 'react';

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const toggle = useCallback(() => {
    dispatch(setLang());
  }, [dispatch]);

  return (
    <Tooltip title={t('app.changeLanguage')}>
      <Button
        color="primary"
        onClick={toggle}
        variant="text"
        role="button"
        className="font-bold text-amber-950 noto-kufi-arabic"
        startIcon={<Icon>language</Icon>}
      >
        {i18n.language === 'en' ? 'العربية' : 'English'}
      </Button>
    </Tooltip>
  );
}
