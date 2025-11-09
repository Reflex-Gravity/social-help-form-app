/* eslint-env jest */
import { describe, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n/index.js';
import useSocialFormSchema from '../src/pages/social-form/useSocialFormSchema.js';

const wrapper = ({ children }) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;

describe('useSocialFormSchema validations', () => {
  test('english error messages', async () => {
    await i18n.changeLanguage('en');

    const { result } = renderHook(() => useSocialFormSchema(), { wrapper });
    const [personalInfoSchema, familyFinancialSchema] = result.current;

    await expect(personalInfoSchema.validateAt('name', { name: 'A' })).rejects.toMatchObject({
      errors: ['Enter a valid name'],
    });

    await expect(
      personalInfoSchema.validateAt('nationalId', { nationalId: '***' }),
    ).rejects.toMatchObject({ errors: ['National ID must be alphanumeric'] });

    const future = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await expect(personalInfoSchema.validateAt('dob', { dob: future })).rejects.toMatchObject({
      errors: ['Date of birth cannot be in the future'],
    });

    await expect(personalInfoSchema.validateAt('email', { email: 'bad' })).rejects.toMatchObject({
      errors: ['Enter a valid email address'],
    });

    await expect(
      familyFinancialSchema.validateAt('dependants', { dependants: 'abc' }),
    ).rejects.toMatchObject({ errors: ['Dependants is not valid'] });

    await expect(
      familyFinancialSchema.validateAt('monthlyIncome', { monthlyIncome: -1 }),
    ).rejects.toMatchObject({
      errors: ['Monthly income cannot be negative'],
    });
  });

  test('arabic error messages', async () => {
    await i18n.changeLanguage('ar');

    const { result } = renderHook(() => useSocialFormSchema(), { wrapper });
    const [personalInfoSchema, familyFinancialSchema] = result.current;

    await expect(personalInfoSchema.validateAt('name', { name: 'A' })).rejects.toMatchObject({
      errors: ['الرجاء إدخال اسم صالح'],
    });

    await expect(
      familyFinancialSchema.validateAt('monthlyIncome', { monthlyIncome: -1 }),
    ).rejects.toMatchObject({ errors: ['لا يمكن أن يكون الدخل الشهري سالبًا'] });
  });
});
