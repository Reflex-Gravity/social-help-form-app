# Client Architecture (form-app-penta)

This document outlines the high-level architecture of the React client, including routing, providers, state management, UI composition, and service interactions.

## Overview

- React + Vite app with MUI, Router, Redux, i18n, and MUI X Date pickers.
- Providers set up global styling, theming, localization, and routing.
- Pages routed via App.jsx; social-form page composes form components.
- Notifications are handled via a Redux slice + Notifications component.
- API access centralized via lib/fetchController.js with Axios interceptors, custom rate limiter, and logging.

## Architecture Diagram

```mermaid
flowchart TB
  %% Entry
  index[(index.html)] --> main[main.jsx]

  %% Providers stack
  subgraph Providers
    styled[StyledEngineProvider]
    global[GlobalStyles "@layer theme, base, mui, components, utilities;"]
    css[CssBaseline]
    theme[AppTheme / ThemeProvider]
    loc[LocalizationProvider (AdapterDayjs)]
    router[BrowserRouter]
    redux[Redux Provider]
  end

  main --> styled --> global --> redux --> theme --> loc --> css --> router --> app[App.jsx]

  %% Routing and pages
  subgraph Routing_and_Pages["Routing & Pages"]
    routes[react-router Routes]
    mainLayout[layouts/MainLayout.jsx]
    home[pages/Home.jsx]
    formLegacy[pages/Form.jsx]
    socialMainForm[pages/social-form/MainForm.jsx]
    notFound[pages/NotFound.jsx]
  end

  app --> routes
  routes --> mainLayout
  routes --> home
  routes --> formLegacy
  routes --> socialMainForm
  routes --> notFound

  %% Social form components
  subgraph Social_Form
    addressForm[pages/social-form/AddressForm.jsx]
    sInfo[pages/social-form/components/PersonalInfoForm.jsx]
    fInfo[pages/social-form/components/FamilyFinancialInfoForm.jsx]
    sDesc[pages/social-form/components/SituationDescriptionsForm.jsx]
    errAlert[pages/social-form/components/ErrorAlert.jsx]
    aiTextarea[pages/social-form/components/FormTextareaWithAI.jsx]
  end
  socialMainForm --> addressForm
  socialMainForm --> sInfo
  socialMainForm --> fInfo
  socialMainForm --> sDesc
  sDesc --> aiTextarea
  socialMainForm --> errAlert

  %% State & Notifications
  subgraph State_Store["State / Store"]
    store[store/store.js]
    notifSlice[store/notificationSlice.js]
    notificationsComp[components/Notifications.jsx]
  end
  redux --> store
  notificationsComp --> store
  app --> notificationsComp

  %% Services & Infra
  subgraph Services_Infra["Services & Infra"]
    fetchController[lib/fetchController.js]
    rateLimiter[services/rateLimitter.service.js]
    logger[services/logger.service.js]
    i18n[i18n/ (language config)]
    themeDir[theme/ (AppTheme, inputCustomizations)]
  end

  aiTextarea --> apiGen[pages/social-form/api/socialform.api.js]
  apiGen --> fetchController
  fetchController --> rateLimiter
  fetchController --> logger
  fetchController --> server[(Server /api)]
  apiGen --> store

  %% Cross-cutting
  app -. localStorage lang, i18n.changeLanguage() .-> i18n
  main -. imports .-> i18n
```

## Key interactions

- main.jsx composes Providers (StyledEngineProvider, GlobalStyles, Redux Provider, AppTheme/ThemeProvider, LocalizationProvider, CssBaseline, BrowserRouter) and renders App + Notifications.
- App.jsx sets up routes to Home, Form, social-form/MainForm, and NotFound. It pre-selects language using localStorage and i18n.
- social-form/MainForm.jsx orchestrates multi-step UI and composes child components (AddressForm, PersonalInfoForm, FamilyFinancialInfoForm, SituationDescriptionsForm, ErrorAlert).
- FormTextareaWithAI.jsx calls generateDescription() (pages/social-form/api/socialform.api.js), which uses fetchController() to POST to /api/generate. It dispatches Redux notifications on failures.
- fetchController.js wraps Axios with request/response interceptors: adds auth (if present), timestamps, online checks, enforces per-endpoint rate limits (services/rateLimitter.service.js), and logs slow/error events (services/logger.service.js).
- Redux store holds notificationCenter slice; components/Notifications.jsx subscribes and renders snackbars.
