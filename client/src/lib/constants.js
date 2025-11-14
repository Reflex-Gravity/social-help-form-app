export const DATE_FORMAT = 'D MMM YYYY';
export const STORAGE_FORMAT = 'YYYY-MM-DD';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const maritialStatusOptions = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
  { label: 'Divorced', value: 'divorced' },
  { label: 'Widowed', value: 'widowed' },
];

const employmentStatusOptions = [
  { label: 'Full-time Employed', value: 'full_time' },
  { label: 'Part-time Employed', value: 'part_time' },
  { label: 'Self-employed', value: 'self_employed' },
  { label: 'Freelancer/Contract', value: 'freelancer' },
  { label: 'Unemployed', value: 'unemployed' },
  { label: 'Student', value: 'student' },
  { label: 'Retired', value: 'retired' },
  { label: 'Homemaker', value: 'homemaker' },
  { label: 'Unable to Work', value: 'unable_to_work' },
];

const housingStatusOptions = [
  { label: 'Self Own', value: 'self_own' },
  { label: 'Renting', value: 'renting' },
  { label: 'Living with Parents', value: 'living_parents' },
  { label: 'Living with Relatives', value: 'living_relatives' },
  { label: 'Provided by Employer', value: 'employer_provided' },
  { label: 'Temporary/Transitional', value: 'temporary' },
];

export { genderOptions, maritialStatusOptions, employmentStatusOptions, housingStatusOptions };
