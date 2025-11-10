import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import FormBanner from '../assets/form_banner.png';

function FormLeft() {
  const { t, i18n } = useTranslation();
  return (
    <Grid size={5} className="bg-mild-orange items-center">
      <Stack
        direction={'column'}
        spacing={2}
        height={'100vh'}
        sx={{
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Stack alignItems="center" justifyContent="space-between">
          <Typography
            variant="h4"
            className={clsx(
              'text-lg font-black sm:text-4xl text-center',
              i18n.language === 'ar' ? 'alexandria' : '',
            )}
            component="h2"
          >
            {t('form.title')}
          </Typography>
          <Typography
            className={clsx(
              'text-md font-black text-amber-900 sm:text-xl',
              i18n.language === 'ar' ? 'alexandria' : '',
            )}
          >
            {t('form.subtitle')}
          </Typography>
        </Stack>
        <img className="p-3" src={FormBanner} alt={t('form.imageAlt')} loading="lazy" />
      </Stack>
    </Grid>
  );
}

export default FormLeft;
