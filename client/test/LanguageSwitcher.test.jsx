/* eslint-env browser */
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEventLib from '@testing-library/user-event';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../src/components/LanguageSwitcher.jsx';
import TestWrapper from './TestWrapper.jsx';
import i18n from '../src/i18n/index.js';

// Mock MUI components to avoid ESM transpile issues in Jest
vi.mock('@mui/material', () => ({
  Button: ({ onClick, children }) => (
    // minimal stub to simulate a clickable button
    <button role="button" onClick={onClick}>
      {children}
    </button>
  ),
  Icon: ({ children }) => <span>{children}</span>,
  Tooltip: ({ children, title }) => (
    <div data-testid="tooltip" title={title}>
      {children}
    </div>
  ),
}));

const userEvent = userEventLib.setup();

function NavHomeLabel() {
  const { t } = useTranslation();
  return <div data-testid="nav-home">{t('nav.home')}</div>;
}

function RenderWrapper() {
  return (
    <TestWrapper>
      <LanguageSwitcher />
      <NavHomeLabel />
    </TestWrapper>
  );
}

describe('LanguageSwitcher', () => {
  test('toggles between English and Arabic and updates localStorage', async () => {
    // initial state prepared by setupTests: en + ltr
    render(<RenderWrapper />);

    // If current language is 'en', the button shows 'Arabic'
    expect(screen.getByRole('button', { name: 'العربية' })).toBeInTheDocument();
    expect(screen.getByTestId('nav-home')).toHaveTextContent('Home');
    expect(document.documentElement.dir).toBe('ltr');

    // Toggle to Arabic
    await userEvent.click(screen.getByRole('button', { name: 'العربية' }));

    // English Button should now be available
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    });

    // Direction and localStorage updated
    expect(document.documentElement.dir).toBe('rtl');
    expect(localStorage.getItem('lang')).toBe('ar');

    // i18n language and translated UI text updated
    expect(i18n.language).toBe('ar');
    await waitFor(() => expect(screen.getByTestId('nav-home')).toHaveTextContent('الرئيسية'));

    // Toggle back to English
    await userEvent.click(screen.getByRole('button', { name: 'English' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'العربية' })).toBeInTheDocument(),
    );
    expect(document.documentElement.dir).toBe('ltr');
    expect(i18n.language).toBe('en');
    await waitFor(() => expect(screen.getByTestId('nav-home')).toHaveTextContent('Home'));
  });
});
