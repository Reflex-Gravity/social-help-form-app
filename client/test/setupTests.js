/* eslint-env jest */
import { beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';
import i18n from '../src/i18n/index.js';

beforeEach(async () => {
  // Reset language and DOM direction before each test
  localStorage.clear();
  document.documentElement.dir = 'ltr';
  if (i18n.language !== 'en') {
    await i18n.changeLanguage('en');
  }
});
