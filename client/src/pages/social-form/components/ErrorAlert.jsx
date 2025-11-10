import { Alert, Fade, Slide, Zoom } from '@mui/material';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function ErrorAlert() {
  const containerRef = useRef();
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext();

  if (!Object.keys(errors).length) {
    return null;
  }

  return (
    <div ref={containerRef}>
      <Slide in unmountOnExit container={containerRef.current}>
        <Alert severity="error" className="mb-3">
          {t('form.errors.generic')}
        </Alert>
      </Slide>
    </div>
  );
}

export default ErrorAlert;
