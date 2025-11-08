import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: { title: 'Form App' },
      nav: { home: 'Home', form: 'Form' },
      home: {
        welcome: 'Welcome to the starter!',
        counter: 'Counter value: {{value}}',
      },
      buttons: {
        increment: 'Increment',
        reset: 'Reset',
        next: 'Next',
        back: 'Previous',
        changeLang: 'Change Language',
        submit: 'Submit',
      },
      form: {
        title: 'Example Form',
        name: 'Name',
        email: 'Email',
        gender: 'Gender',
        nationalId: 'National ID',
        address: 'Address',
        dob: 'Date of Birth',
        country: 'Country',
        phone: 'Phone',
        required: 'This field is required',
        emailInvalid: 'Enter a valid email',
        sent: 'Form submitted!',
        submit: 'Submit',
      },
      notFound: {
        title: 'Page not found',
        goHome: 'Go Home',
      },
    },
  },
  hi: {
    translation: {
      app: { title: 'फॉर्म ऐप' },
      nav: { home: 'मुखपृष्ठ', form: 'फॉर्म' },
      home: {
        welcome: 'स्टार्टर में आपका स्वागत है!',
        counter: 'काउंटर मूल्य: {{value}}',
      },
      buttons: {
        increment: 'बढ़ाएं',
        reset: 'रीसेट',
        changeLang: 'भाषा बदलें',
        submit: 'जमा करें',
      },
      form: {
        title: 'उदाहरण फॉर्म',
        name: 'नाम',
        email: 'ईमेल',
        country: 'देश',
        required: 'यह फ़ील्ड आवश्यक है',
        emailInvalid: 'मान्य ईमेल दर्ज करें',
        sent: 'फॉर्म जमा हो गया!',
      },
      notFound: {
        title: 'पृष्ठ नहीं मिला',
        goHome: 'मुखपृष्ठ पर जाएं',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
