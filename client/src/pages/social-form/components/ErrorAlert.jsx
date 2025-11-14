import { Alert, Slide } from '@mui/material';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function ErrorAlert() {
  const containerRef = useRef();
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div ref={containerRef}>
      {Object.keys(errors).length ? (
        <Slide in unmountOnExit container={containerRef.current}>
          <Alert severity="error" className="mb-3">
            {t('form.errors.generic')}
          </Alert>
        </Slide>
      ) : null}
    </div>
  );
}

export default ErrorAlert;
