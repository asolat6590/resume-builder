import { en } from './en'
import { ru } from './ru'
import type { TranslationDict, UiLocale } from './types'

export const dictionaries: Record<UiLocale, TranslationDict> = { ru, en }

export type { TranslationDict, UiLocale }

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ''))
}
