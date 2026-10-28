import { useI18n } from '../context/I18nContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { t } = useI18n()

  return (
    <header className="print:hidden border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-fg truncate">
            {t.header.title}
          </h1>
          <p className="text-sm text-muted mt-0.5 line-clamp-2">{t.header.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
