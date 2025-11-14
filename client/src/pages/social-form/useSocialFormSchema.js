import * as yup from 'yup';
import {
  employmentStatusOptions,
  genderOptions,
  housingStatusOptions,
  maritialStatusOptions,
  STORAGE_FORMAT,
} from '../../lib/constants';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { isValidPhoneNumber } from 'react-phone-number-input';

const getValFunc = (option) => option.value;

// Allowed values from the select components
const genderValues = genderOptions.map(getValFunc);
const maritalStatusValues = maritialStatusOptions.map(getValFunc);
const employmentStatusValues = employmentStatusOptions.map(getValFunc);
const housingStatusValues = housingStatusOptions.map(getValFunc);

/**
 * Social Form Schema
 *
 * @export
 * @param {number} activeStep
 * @return {yup.ObjectSchema}
 */
export default function useSocialFormSchema(activeStep) {
  const { t } = useTranslation();

  const formSchema = useMemo(() => {
    const personalInfoSchema = yup.object({
      // PersonalInfoForm
      name: yup
        .string()
        .trim()
        .min(2, t('form.errors.validName'))
        .max(100, t('form.errors.maxNameChar'))
        .required(t('form.errors.nameRequired')),
      nationalId: yup
        .string()
        .trim()
        .min(4, t('form.errors.minNationalId'))
        .max(30, t('form.errors.maxNationalId'))
        .matches(/^[A-Za-z0-9-]+$/, t('form.errors.alphanumericNationalId'))
        .required(t('form.errors.nationalIdRequired')),
      dob: yup
        .date()
        .transform(function (value, originalValue) {
          if (this.isType(value)) {
            return value;
          }
          const result = dayjs(originalValue, STORAGE_FORMAT, new Date());
          return result;
        })
        .typeError(t('form.errors.validDob'))
        .required(t('form.errors.dobRequired'))
        .test('not-in-future', t('form.errors.dobNotFuture'), (val) => {
          return dayjs(val).isBefore(dayjs());
        }),
      gender: yup
        .string()
        .oneOf(genderValues, t('form.errors.validGender'))
        .required(t('form.errors.genderRequired')),
      address: yup
        .string()
        .trim()
        .min(5, t('form.errors.minAddress'))
        .max(255, t('form.errors.maxAddress'))
        .required(t('form.errors.addressRequired')),
      phone: yup
        .string()
        .required(t('form.errors.phoneRequired'))
        .trim()
        .test('is-valid-phone', t('form.errors.validPhone'), function (value) {
          return value ? isValidPhoneNumber(value) : false;
        }),
      email: yup
        .string()
        .trim()
        .email(t('form.errors.validEmail'))
        .max(255, t('form.errors.maxEmail'))
        .required(t('form.errors.emailRequired')),

      // Country/State/City (FormCountryStateCityInput)
      country: yup.string().required(t('form.errors.countryRequired')),
      state: yup.string().required(t('form.errors.stateRequired')),
      city: yup.string().required(t('form.errors.cityRequired')),
    });

    const familyFinancialSchema = yup.object({
      // FamilyFinancialInfoForm
      maritalStatus: yup
        .string()
        .oneOf(maritalStatusValues, t('form.errors.validMaritalStatus'))
        .required(t('form.errors.maritalStatusRequired')),
      dependants: yup
        .number()
        .required(t('form.errors.dependantsRequired'))
        .typeError(t('form.errors.dependantsNotValid'))
        .integer(t('form.errors.dependantsNotValid'))
        .min(0, t('form.errors.dependantsNotValid'))
        .max(20, t('form.errors.maxDependants')),
      employmentStatus: yup
        .string()
        .oneOf(employmentStatusValues, t('form.errors.validEmploymentStatus'))
        .required(t('form.errors.employmentStatusRequired')),
      monthlyIncome: yup
        .number()
        .typeError(t('form.errors.monthlyIncomeNumber'))
        .min(0, t('form.errors.monthlyIncomeNotNegative'))
        .required(t('form.errors.monthlyIncomeRequired')),
      housingStatus: yup
        .string()
        .oneOf(housingStatusValues, t('form.errors.validHousingStatus'))
        .required(t('form.errors.housingStatusRequired')),
    });

    const situationalDescSchema = yup.object({
      currentFinancialSituation: yup
        .string()
        .trim()
        .min(10, t('form.errors.provideMoreDetails'))
        .required(t('form.errors.currentFinancialSituationRequired')),
      employementCircumstances: yup
        .string()
        .trim()
        .min(10, t('form.errors.provideMoreDetails'))
        .required(t('form.errors.employmentCircumstancesRequired')),
      reason: yup
        .string()
        .trim()
        .min(10, t('form.errors.provideMoreDetails'))
        .required(t('form.errors.reasonRequired')),
    });

    // For step-wise schema validations
    const schemas = [personalInfoSchema, familyFinancialSchema, situationalDescSchema].filter(
      (a, schemaIndex) => schemaIndex <= activeStep,
    );

    return schemas.reduce((acc, curr) => acc.concat(curr), yup.object({}));
  }, [t, activeStep]);

  return formSchema;
}
