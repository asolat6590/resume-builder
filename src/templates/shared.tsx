import type { LanguageLevel, ResumeData } from '../types/resume'

export interface ResumeLabelHelpers {
  birthDateLabel: string
  present: string
  presentShort: string
  levelLabel: (level: LanguageLevel) => string
}

export function formatPeriod(
  start: string,
  end: string,
  labels: Pick<ResumeLabelHelpers, 'present' | 'presentShort'>,
): string {
  if (!start && !end) return ''
  const endLower = end.toLowerCase()
  const isPresent =
    !end ||
    endLower === labels.present.toLowerCase() ||
    endLower === 'настоящее время' ||
    endLower === 'present' ||
    endLower.includes('наст')
  if (isPresent) return `${start} — ${labels.presentShort}`
  return `${start} — ${end}`
}

export function contactLines(data: ResumeData, birthDateLabel: string): string[] {
  const { contacts, personal } = data
  const lines: string[] = []
  if (contacts.email) lines.push(contacts.email)
  if (contacts.phone) lines.push(contacts.phone)
  if (contacts.city) lines.push(contacts.city)
  if (personal.birthDate) lines.push(`${birthDateLabel}: ${personal.birthDate}`)
  if (contacts.telegram) lines.push(contacts.telegram)
  if (contacts.linkedin) lines.push(contacts.linkedin)
  return lines
}
