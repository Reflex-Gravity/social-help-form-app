/* eslint-env browser */
import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import i18n from '../src/i18n/index.js';
import useSocialFormSchema from '../src/pages/social-form/useSocialFormSchema.js';
import I18nProvider from '../src/i18n/I18nProvider.js';

const wrapper = ({ children }) => <I18nProvider>{children}</I18nProvider>;

describe('useSocialFormSchema validations', () => {
  test('english error messages', async () => {
    await i18n.changeLanguage('en');

    const { result } = renderHook(() => useSocialFormSchema(3), { wrapper });
    const formSchema = result.current;

    await expect(formSchema.validateAt('name', { name: 'A' })).rejects.toMatchObject({
      errors: ['Enter a valid name'],
    });

    await expect(formSchema.validateAt('name', { name: 'Samuel' })).resolves.toMatchObject({});

    await expect(formSchema.validateAt('nationalId', { nationalId: '***' })).rejects.toMatchObject({
      errors: ['National ID must be at least 4 characters'],
    });

    const future = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await expect(formSchema.validateAt('dob', { dob: future })).rejects.toMatchObject({
      errors: ['Date of birth cannot be in the future'],
    });

    await expect(formSchema.validateAt('email', { email: 'bad' })).rejects.toMatchObject({
      errors: ['Enter a valid email address'],
    });

    await expect(formSchema.validateAt('dependants', { dependants: 'abc' })).rejects.toMatchObject({
      errors: ['Dependants is not valid'],
    });

    await expect(
      formSchema.validateAt('monthlyIncome', { monthlyIncome: -1 }),
    ).rejects.toMatchObject({
      errors: ['Monthly income cannot be negative'],
    });
  });

  test('arabic error messages', async () => {
    await i18n.changeLanguage('ar');

    const { result } = renderHook(() => useSocialFormSchema(3), { wrapper });
    const formSchema = result.current;

    await expect(formSchema.validateAt('name', { name: 'A' })).rejects.toMatchObject({
      errors: ['أدخل اسمًا صالحًا'],
    });

    await expect(
      formSchema.validateAt('monthlyIncome', { monthlyIncome: -1 }),
    ).rejects.toMatchObject({ errors: ['لا يمكن أن يكون الدخل الشهري سالبًا'] });
  });
});
