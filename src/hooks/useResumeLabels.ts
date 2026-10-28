import { useI18n } from '../context/I18nContext'
import type { LanguageLevel } from '../types/resume'

export function useResumeLabels() {
  const { t } = useI18n()

  const levelLabel = (level: LanguageLevel) => t.languageLevels[level]

  return {
    sections: t.resumeSections,
    placeholders: t.resumePlaceholders,
    meta: t.resumeMeta,
    levelLabel,
  }
}
