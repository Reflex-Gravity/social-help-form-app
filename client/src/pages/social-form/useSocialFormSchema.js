import * as yup from 'yup';
import {
  employmentStatusOptions,
  genderOptions,
  housingStatusOptions,
  maritialStatusOptions,
} from '../../lib/constants';

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

const personalInfoSchema = yup.object({
  // PersonalInfoForm
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters')
    .required('Name is required'),
  nationalId: yup
    .string()
    .trim()
    .min(4, 'National ID must be at least 4 characters')
    .max(30, 'National ID must be at most 30 characters')
    .matches(/^[A-Za-z0-9-]+$/, 'National ID must be alphanumeric')
    .required('National ID is required'),
  dob: yup
    .mixed()
    .required('Date of birth is required')
    .test('not-in-future', 'Date of birth cannot be in the future', (val) => {
      const d = toJsDate(val);
      if (!d) return true;
      const today = new Date();
      // ignore time portion
      d.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      return d.getTime() <= today.getTime();
    }),
  gender: yup
    .string()
    .oneOf(genderValues, 'Please select a valid gender')
    .required('Gender is required'),
  address: yup
    .string()
    .trim()
    .min(5, 'Address must be at least 5 characters')
    .max(255, 'Address must be at most 255 characters')
    .required('Address is required'),
  phone: yup
    .string()
    .trim()
    .matches(/^[0-9+()\s-]{7,20}$/, 'Enter a valid phone number')
    .required('Phone is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email address')
    .max(255, 'Email must be at most 255 characters')
    .required('Email is required'),

  // Country/State/City (FormCountryStateCityInput)
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
});

const familyFinancialSchema = yup.object({
  // FamilyFinancialInfoForm
  maritalStatus: yup
    .string()
    .oneOf(maritalStatusValues, 'Select a valid marital status')
    .required('Marital status is required'),
  dependants: yup
    .number()
    .required('Dependants is required')
    .typeError('Dependants is not valid')
    .integer('Dependants is not valid')
    .min(0, 'Dependants is not valid')
    .max(20, 'Dependants cannot be more than 20'),
  employmentStatus: yup
    .string()
    .oneOf(employmentStatusValues, 'Select a valid employment status')
    .required('Employment status is required'),
  monthlyIncome: yup
    .number()
    .typeError('Monthly income must be a number')
    .min(0, 'Monthly income cannot be negative')
    .required('Monthly income is required'),
  housingStatus: yup
    .string()
    .oneOf(housingStatusValues, 'Select a valid housing status')
    .required('Housing status is required'),
});

const situationalDescSchema = yup.object({
  currentFinancialSituation: yup
    .string()
    .trim()
    .min(10, 'Please provide more details')
    .required('Current financial situation is required'),
  employementCircumstances: yup
    .string()
    .trim()
    .min(10, 'Please provide more details')
    .required('Employment circumstances are required'),
  reason: yup.string().trim().min(10, 'Please provide more details').required('Reason is required'),
});

// For step-wise schema validations
const formSchema = [personalInfoSchema, familyFinancialSchema, situationalDescSchema];

export default formSchema;
