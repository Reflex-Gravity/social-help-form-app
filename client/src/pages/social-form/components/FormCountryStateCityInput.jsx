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
  uae: {
    states: {
      abu_dhabi: ['abu_dhabi', 'al_ain', 'madinat_zayed'],
      dubai: ['dubai', 'jebel_ali', 'hatta'],
      sharjah: ['sharjah', 'khor_fakkan', 'kalba'],
      ras_al_khaimah: ['ras_al_khaimah'],
      fujairah: ['fujairah', 'dibba_al_fujairah'],
      ajman: ['ajman', 'masfout', 'manama'],
      umm_al_quwain: ['umm_al_quwain'],
    },
  },
  india: {
    states: {
      maharashtra: ['mumbai', 'pune', 'nagpur'],
      karnataka: ['bangalore', 'mysore', 'mangalore'],
      tamil_nadu: ['chennai', 'coimbatore', 'madurai'],
    },
  },
  uk: {
    states: {
      england: ['london', 'manchester', 'birmingham'],
      scotland: ['edinburgh', 'glasgow', 'aberdeen'],
    },
  },
  usa: {
    states: {
      california: ['los_angeles', 'san_francisco', 'san_diego'],
      texas: ['houston', 'dallas', 'austin'],
      new_york: ['new_york_city', 'buffalo', 'albany'],
    },
  },
};

export default function CountryStateCity() {
  const { t } = useTranslation();
  const { watch, setValue } = useFormContext();

  const selectedCountry = watch('country');
  const selectedState = watch('state');

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
        autoCompleteProps={{
          getOptionLabel: (_optionLabel) =>
            _optionLabel ? t(`countryStateCity.${_optionLabel}`) : '',
        }}
        name="country"
        onChange={(_, newValue) => setValue('country', handleCountryChange(newValue))}
      />
      <AutoComplete
        label={t('form.state')}
        placeholder={t('form.chooseState')}
        options={states}
        required
        name="state"
        autoCompleteProps={{
          getOptionLabel: (_optionLabel) =>
            _optionLabel ? t(`countryStateCity.${_optionLabel}`) : '',
        }}
        onChange={(_, newValue) => setValue('state', handleStateChange(newValue))}
      />
      <AutoComplete
        label={t('form.city')}
        placeholder={t('form.chooseCity')}
        options={cities}
        required
        name="city"
        autoCompleteProps={{
          getOptionLabel: (_optionLabel) =>
            _optionLabel ? t(`countryStateCity.${_optionLabel}`) : '',
        }}
        onChange={(_, newValue) => setValue('city', newValue)}
      />
    </>
  );
}
