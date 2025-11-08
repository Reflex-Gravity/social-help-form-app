import * as yup from 'yup';
// import yupFormSchemas from '../lib/schema-validations.js';

const schema = yup.object().shape({
  email: yup.string('Email', {
    required: true,
    min: 8,
    max: 255,
    // matches: regex.email,
    matchesMessage: 'Please enter a valid Gmail address',
  }),
  password: yup.string('Password', {
    required: true,
    min: 8,
    max: 255,
  }),
  confirmPassword: yup
    .string('Confirm Password', {
      required: true,
    })
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default schema;
