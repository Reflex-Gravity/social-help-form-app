import { Stack, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Stack spacing={2} alignItems="center" className="py-10">
      <Typography variant="h4" component="h1">
        {t('notFound.title')}
      </Typography>
      <Button variant="contained" component={RouterLink} to="/" className="!normal-case">
        {t('notFound.goHome')}
      </Button>
    </Stack>
  );
}
