import * as yup from 'yup';
import {
  employmentStatusOptions,
  genderOptions,
  housingStatusOptions,
  maritialStatusOptions,
} from '../../lib/constants';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const getValFunc = (option) => option.value;

// Allowed values from the select components
const genderValues = genderOptions.map(getValFunc);
const maritalStatusValues = maritialStatusOptions.map(getValFunc);
const employmentStatusValues = employmentStatusOptions.map(getValFunc);
const housingStatusValues = housingStatusOptions.map(getValFunc);

// Helper for validating date-like values possibly coming from MUI DatePicker (Dayjs/Date)
function toJsDate(val) {
  if (!val) return null;
  if (val instanceof Date) return val;
  if (typeof val?.toDate === 'function') return val.toDate(); // Dayjs
  if (val?.$d) return new Date(val.$d); // Some adapters expose internal date
  return null;
}

export default function useSocialFormSchema() {
  const { t } = useTranslation();

  const formSchema = useMemo(() => {
    console.log('re-render formSchema');

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
        .mixed()
        .required(t('form.errors.dobRequired'))
        .test('not-in-future', t('form.errors.dobNotFuture'), (val) => {
          const d = toJsDate(val);
          if (!d) return true;
          const today = new Date();
          d.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          return d.getTime() <= today.getTime();
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
        .trim()
        .matches(/^[0-9+()\s-]{7,20}$/, t('form.errors.validPhone'))
        .required(t('form.errors.phoneRequired')),
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
    return [personalInfoSchema, familyFinancialSchema, situationalDescSchema];
  }, [t]);

  return formSchema;
}
