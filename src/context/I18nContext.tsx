import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS } from '../config/storageKeys'
import { dictionaries, interpolate, type TranslationDict, type UiLocale } from '../locales'

interface I18nContextValue {
  locale: UiLocale
  setLocale: (locale: UiLocale) => void
  t: TranslationDict
  format: (template: string, vars: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function loadLocale(): UiLocale {
  const stored = localStorage.getItem(STORAGE_KEYS.locale)
  if (stored === 'ru' || stored === 'en') return stored
  const nav = navigator.language.toLowerCase()
  return nav.startsWith('ru') ? 'ru' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<UiLocale>(() => loadLocale())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.locale, locale)
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: UiLocale) => {
    setLocaleState(next)
  }, [])

  const t = dictionaries[locale]

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      format: interpolate,
    }),
    [locale, setLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
