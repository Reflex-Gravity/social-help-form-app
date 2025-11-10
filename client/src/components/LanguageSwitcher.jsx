import { Button, Icon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLang } from '../store/store';

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const toggle = () => {
    dispatch(setLang());
  };

  return (
    <Button
      color="primary"
      onClick={toggle}
      variant="text"
      className="font-bold border text-blue-950"
      startIcon={<Icon>language</Icon>}
    >
      {i18n.language === 'en' ? 'Arabic' : 'English'}
    </Button>
  );
}
