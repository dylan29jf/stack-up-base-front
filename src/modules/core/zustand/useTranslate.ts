// useLanguageStore.ts
import { create } from 'zustand'
import i18n from '@core/i18next' // Importa la configuración de i18n

export type Language = 'en' | 'es' | 'pt'

interface LanguageStore {
  language: Language
  changeLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>(set => ({
  language: (localStorage.getItem('language') as Language) || 'en',
  changeLanguage: (language: Language) => {
    i18n.changeLanguage(language) // Cambia el idioma en i18next
    localStorage.setItem('language', language) // Guarda en localStorage
    set({ language }) // Actualiza el estado en Zustand
  },
}))
