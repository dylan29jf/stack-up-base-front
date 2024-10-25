// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import es from './es.json'
import pt from './pt.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    pt: { translation: pt },
  },
  lng:
    localStorage.getItem('language') ??
    navigator.language.split('-')[0] ??
    'en', // Idioma inicial
  fallbackLng: 'en', // Idioma de respaldo si no hay traducción
  interpolation: {
    escapeValue: false, // React ya escapa el contenido
  },
})

export default i18n
