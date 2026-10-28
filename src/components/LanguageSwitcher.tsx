import { useI18n } from '../context/I18nContext'
import type { UiLocale } from '../locales'

const options: UiLocale[] = ['ru', 'en']

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      className="inline-flex rounded-xl border border-border bg-card p-0.5"
      role="group"
      aria-label={t.language.label}
    >
      {options.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            locale === code
              ? 'bg-accent text-white shadow-sm'
              : 'text-muted hover:text-fg'
          }`}
        >
          {code === 'ru' ? t.language.ru : t.language.en}
        </button>
      ))}
    </div>
  )
}
