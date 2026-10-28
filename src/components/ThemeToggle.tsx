import { useI18n } from '../context/I18nContext'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t.theme.toggle}
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-[4.25rem] items-center rounded-full border border-border bg-card px-1 transition-colors"
    >
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white text-sm shadow transition-transform ${
          isDark ? 'translate-x-[2.1rem]' : 'translate-x-0'
        }`}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
