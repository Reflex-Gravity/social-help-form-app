/* eslint-env browser */
import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import i18n from '../src/i18n/index.js';
import useSocialFormSchema from '../src/pages/social-form/useSocialFormSchema.js';
import TestWrapper from './TestWrapper.jsx';

const wrapper = ({ children }) => <TestWrapper>{children}</TestWrapper>;

describe('useSocialFormSchema validations', () => {
  test('english error messages', async () => {
    await i18n.changeLanguage('en');

    const { result } = renderHook(() => useSocialFormSchema(3), { wrapper });
    const formSchema = result.current;

    await expect(formSchema.validateAt('name', { name: 'A' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.validName')],
    });

    await expect(formSchema.validateAt('name', { name: 'Samuel' })).resolves.toMatchObject({});

    await expect(formSchema.validateAt('nationalId', { nationalId: 'YAT' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.minNationalId')],
    });

    // max nationalId
    await expect(
      formSchema.validateAt('nationalId', {
        nationalId: 'YAT78913781479YAT78913781479YAT78913781479',
      }),
    ).rejects.toMatchObject({
      errors: [i18n.t('form.errors.maxNationalId')],
    });
    // min national id
    await expect(formSchema.validateAt('nationalId', { nationalId: 'YAT' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.minNationalId')],
    });

    const future = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await expect(formSchema.validateAt('dob', { dob: future })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.dobNotFuture')],
    });

    await expect(formSchema.validateAt('email', { email: 'bad' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.validEmail')],
    });
    await expect(formSchema.validateAt('email', { email: 'company.com' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.validEmail')],
    });
    await expect(formSchema.validateAt('email', { email: '@company.com' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.validEmail')],
    });

    // validate correct email
    await expect(
      formSchema.validateAt('email', { email: 'test@gmail.com' }),
    ).resolves.toMatchObject('test@gmail.com');

    await expect(formSchema.validateAt('dependants', { dependants: 'abc' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.dependantsNotValid')],
    });
    await expect(formSchema.validateAt('dependants', { dependants: 21 })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.maxDependants')],
    });

    await expect(
      formSchema.validateAt('monthlyIncome', { monthlyIncome: -1 }),
    ).rejects.toMatchObject({
      errors: [i18n.t('form.errors.monthlyIncomeNotNegative')],
    });
  });

  test('arabic error messages', async () => {
    await i18n.changeLanguage('ar');

    const { result } = renderHook(() => useSocialFormSchema(3), { wrapper });
    const formSchema = result.current;

    await expect(formSchema.validateAt('name', { name: 'A' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.validName')],
    });

    await expect(formSchema.validateAt('email', { email: 'adak.com' })).rejects.toMatchObject({
      errors: [i18n.t('form.errors.validEmail')],
    });

    await expect(
      formSchema.validateAt('monthlyIncome', { monthlyIncome: -1 }),
    ).rejects.toMatchObject({ errors: [i18n.t('form.errors.monthlyIncomeNotNegative')] });
  });
});
