import * as yup from 'yup';

// Allowed values from the select components
const genderValues = ['male', 'female'];
const maritalStatusValues = ['single', 'Married', 'Divorced', 'widowed'];
const employmentStatusValues = [
  'full_time',
  'part_time',
  'self_employed',
  'freelancer',
  'unemployed',
  'student',
  'retired',
  'homemaker',
  'unable_to_work',
];
const housingStatusValues = [
  'self_own',
  'renting',
  'living_parents',
  'living_relatives',
  'employer_provided',
  'temporary',
];

// Helper for validating date-like values possibly coming from MUI DatePicker (Dayjs/Date)
function toJsDate(val) {
  if (!val) return null;
  if (val instanceof Date) return val;
  if (typeof val?.toDate === 'function') return val.toDate(); // Dayjs
  if (val?.$d) return new Date(val.$d); // Some adapters expose internal date
  return null;
}

const schema = yup.object({
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
    .test('valid-date', 'Invalid date of birth', (val) => !!toJsDate(val))
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

  // FamilyFinancialInfoForm
  maritalStatus: yup
    .string()
    .oneOf(maritalStatusValues, 'Select a valid marital status')
    .required('Marital status is required'),
  dependants: yup
    .number()
    .typeError('Dependants must be a number')
    .integer('Dependants must be an integer')
    .min(0, 'Dependants cannot be negative')
    .max(20, 'Dependants seems too high')
    .required('Dependants is required'),
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

  // SituationDescriptionsForm
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

export default schema;
