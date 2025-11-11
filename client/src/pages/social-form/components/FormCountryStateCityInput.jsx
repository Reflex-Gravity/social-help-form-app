import React, { useMemo, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormLabel } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import FormGrid from '../../../components/FormGrid';
import AutoComplete from '../../../components/AutoComplete';
import { useTranslation } from 'react-i18next';

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
  'United Arab Emirates': {
    states: {
      'Abu Dhabi': ['Abu Dhabi', 'Al Ain', 'Madinat Zayed'],
      Dubai: ['Dubai', 'Jebel Ali', 'Hatta'],
      Sharjah: ['Sharjah', 'Khor Fakkan', 'Kalba'],
      'Ras Al Khaimah': ['Ras Al Khaimah'],
      Fujairah: ['Fujairah', 'Dibba Al-Fujairah'],
      Ajman: ['Ajman', 'Masfout', 'Manama'],
      'Umm Al Quwain': ['Umm Al Quwain'],
    },
  },
};

export default function CountryStateCity() {
  const { t } = useTranslation();
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
      <AutoComplete
        label={t('form.country')}
        placeholder={t('form.chooseCountry')}
        options={countries}
        required
        name="country"
        onChange={(_, newValue) => setValue('country', handleCountryChange(newValue))}
      />
      <AutoComplete
        label={t('form.state')}
        placeholder={t('form.chooseState')}
        options={states}
        required
        name="state"
        onChange={(_, newValue) => setValue('state', handleStateChange(newValue))}
      />
      <AutoComplete
        label={t('form.city')}
        placeholder={t('form.chooseCity')}
        options={cities}
        required
        name="city"
        onChange={(_, newValue) => setValue('city', newValue)}
      />
    </>
  );
}
