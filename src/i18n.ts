import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationAR from './locales/ar/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  ar: { translation: translationAR },
  en: { translation: translationEN },
};

const savedLang = (typeof window !== 'undefined' && localStorage.getItem('seyran_language')) || 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Automatically update HTML dir and lang attributes when language changes
if (typeof document !== 'undefined') {
  const updateDir = (lang: string) => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    localStorage.setItem('seyran_language', lang);
  };

  updateDir(i18n.language || 'ar');
  i18n.on('languageChanged', (lng) => {
    updateDir(lng);
  });
}

export default i18n;
