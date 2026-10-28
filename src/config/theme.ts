import { STORAGE_KEYS } from './storageKeys'

export type ThemeMode = 'light' | 'dark'

export function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function loadStoredTheme(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEYS.theme)
  if (stored === 'light' || stored === 'dark') return stored
  return getSystemTheme()
}

export function saveTheme(mode: ThemeMode): void {
  localStorage.setItem(STORAGE_KEYS.theme, mode)
}

export function applyThemeToDocument(mode: ThemeMode): void {
  document.documentElement.classList.toggle('dark', mode === 'dark')
  document.documentElement.style.colorScheme = mode
}
