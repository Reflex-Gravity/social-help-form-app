/* eslint-env jest */
import { jest, describe, test, expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEventLib from '@testing-library/user-event';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../src/i18n/index.js';

// Mock MUI components to avoid ESM transpile issues in Jest
jest.mock('@mui/material', () => ({
  Button: ({ onClick, children }) => (
    // minimal stub to simulate a clickable button
    <button onClick={onClick}>{children}</button>
  ),
  Icon: ({ children }) => <span>{children}</span>,
}));

import LanguageSwitcher from '../src/components/LanguageSwitcher.jsx';

const userEvent = userEventLib.setup();

function NavHomeLabel() {
  const { t } = useTranslation();
  return <div data-testid="nav-home">{t('nav.home')}</div>;
}

function TestHarness() {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageSwitcher />
      <NavHomeLabel />
    </I18nextProvider>
  );
}

describe('LanguageSwitcher', () => {
  test('toggles between English and Arabic and updates dir/localStorage/i18n', async () => {
    // initial state prepared by setupTests: en + ltr
    render(<TestHarness />);

    // Button label reflects the next language choice
    // If current language is 'en', the button shows 'Arabic'
    expect(screen.getByRole('button', { name: 'Arabic' })).toBeInTheDocument();
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
    expect(document.documentElement.dir).toBe('ltr');

    // Toggle to Arabic
    await userEvent.click(screen.getByRole('button', { name: 'Arabic' }));

    // Button should now invite switching back to English
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument(),
    );

    // Direction and localStorage updated
    expect(document.documentElement.dir).toBe('rtl');
    expect(localStorage.getItem('lang')).toBe('ar');

    // i18n language and translated UI text updated
    expect(i18n.language).toBe('ar');
    await waitFor(() => expect(screen.getByTestId('nav-home')).toHaveTextContent('الرئيسية'));

    // Toggle back to English
    await userEvent.click(screen.getByRole('button', { name: 'English' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Arabic' })).toBeInTheDocument());
    expect(document.documentElement.dir).toBe('ltr');
    expect(i18n.language).toBe('en');
    await waitFor(() => expect(screen.getByTestId('nav-home')).toHaveTextContent('Home'));
  });
});
