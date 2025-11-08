import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import { useTranslation } from 'react-i18next';

export default function MainLayout() {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <AppBar position="static" className="bg-blue-200" elevation={0}>
        <Toolbar className="gap-2">
          <Typography className="text-blue-950" sx={{ flexGrow: 1 }}>
            {t('app.title')}
          </Typography>
          <LanguageSwitcher />
        </Toolbar>
      </AppBar>
      <Container className="flex-1 py-6">
        <Outlet />
      </Container>
    </Box>
  );
}
