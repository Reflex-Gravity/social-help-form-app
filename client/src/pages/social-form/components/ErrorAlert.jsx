import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function ErrorAlert() {
  const {
    formState: { errors },
  } = useFormContext();

  if (!errors) {
    return null;
  }

  console.log('errors', errors);

  return Object.keys(errors).length > 0 ? (
    <Alert severity="error" className="mb-3">
      Please fill the required fields
      {/* <ul>
        {Object.entries(errors).map(([field, error]) => (
          <li key={field}>{error?.message}</li>
        ))}
      </ul> */}
    </Alert>
  ) : null;
}

export default ErrorAlert;
