import React, { useMemo, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormLabel } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import FormGrid from '../../../components/FormGrid';

// In production, use a package like 'country-state-city' or fetch from API
const countryData = {
  USA: {
    states: {
      California: ['Los Angeles', 'San Francisco', 'San Diego'],
      Texas: ['Houston', 'Dallas', 'Austin'],
      'New York': ['New York City', 'Buffalo', 'Albany'],
    },
  },
  India: {
    states: {
      Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
      Karnataka: ['Bangalore', 'Mysore', 'Mangalore'],
      'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    },
  },
  UK: {
    states: {
      England: ['London', 'Manchester', 'Birmingham'],
      Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen'],
    },
  },
};

export default function CountryStateCity() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedCountry = watch('country');
  const selectedState = watch('state');
  const selectedCity = watch('city');

  const countries = useMemo(() => Object.keys(countryData), []);

  const states = useMemo(() => {
    if (!selectedCountry) return [];
    return Object.keys(countryData?.[selectedCountry]?.states ?? {});
  }, [selectedCountry]);

  const cities = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];
    return countryData?.[selectedCountry]?.states?.[selectedState];
  }, [selectedCountry, selectedState]);

  const handleCountryChange = useCallback(
    (newValue) => {
      setValue('state', null);
      setValue('city', null);
      return newValue;
    },
    [setValue],
  );

  const handleStateChange = useCallback(
    (newValue) => {
      setValue('city', null);
      return newValue;
    },
    [setValue],
  );

  return (
    <>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel required>Country</FormLabel>

        <Autocomplete
          value={selectedCountry || null}
          onChange={(_, newValue) => setValue('country', handleCountryChange(newValue))}
          options={countries}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Choose a country"
              error={!!errors.country}
              helperText={errors.country?.message}
            />
          )}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel required>State</FormLabel>

        <Autocomplete
          value={selectedState || null}
          onChange={(_, newValue) => setValue('state', handleStateChange(newValue))}
          options={states}
          disabled={!selectedCountry}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Choose a state"
              error={!!errors.state}
              helperText={errors.state?.message}
            />
          )}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel required>City</FormLabel>
        <Autocomplete
          value={selectedCity || null}
          onChange={(_, newValue) => setValue('city', newValue)}
          options={cities}
          disabled={!selectedState}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Choose a city"
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          )}
        />
      </FormGrid>
    </>
  );
}
