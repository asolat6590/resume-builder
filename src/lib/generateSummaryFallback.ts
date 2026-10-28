import type { EducationItem, ExperienceItem, LanguageItem } from '../types/resume'

const LEVEL_LABELS: Record<string, string> = {
  native: 'родной',
  c2: 'C2',
  c1: 'C1',
  b2: 'B2',
  b1: 'B1',
  a2: 'A2',
  a1: 'A1',
}

export interface SummaryPayload {
  position: string
  experience: ExperienceItem[]
  skills: string[]
  education: EducationItem[]
  languages: LanguageItem[]
}

export function generateSummaryFallback(payload: SummaryPayload) {
  const { position, experience, skills, education, languages } = payload
  const pos = position.trim() || 'специалист'
  const skillList = skills.filter(Boolean)
  const expCount = experience.filter((e) => e.company || e.role).length
  const edu = education.filter((e) => e.school).map((e) => e.school)
  const langStr = languages
    .filter((l) => l.name)
    .map((l) => `${l.name} (${LEVEL_LABELS[l.level] || l.level})`)
    .join(', ')

  const parts: string[] = []
  parts.push(
    `${pos} с практическим опытом${expCount ? ` в ${expCount} ${expCount === 1 ? 'организации' : 'организациях'}` : ''}.`,
  )
  if (skillList.length) {
    parts.push(
      `Ключевые компетенции: ${skillList.slice(0, 6).join(', ')}${skillList.length > 6 ? ' и др.' : ''}.`,
    )
  }
  if (edu.length) parts.push(`Образование: ${edu.join('; ')}.`)
  if (langStr) parts.push(`Языки: ${langStr}.`)
  parts.push('Ориентирован(а) на результат, готов(а) к новым задачам и профессиональному росту.')

  const strengths: string[] = []
  if (skillList.length >= 3) {
    strengths.push(`Сильный набор навыков: ${skillList.slice(0, 3).join(', ')}`)
  } else if (skillList.length) {
    strengths.push(`Владение: ${skillList.join(', ')}`)
  }
  if (expCount) {
    const latest = experience.find((e) => e.company || e.role)
    if (latest?.role) {
      strengths.push(`Опыт в роли «${latest.role}»${latest.company ? ` (${latest.company})` : ''}`)
    } else {
      strengths.push(`Опыт работы в ${expCount} ${expCount === 1 ? 'компании' : 'компаниях'}`)
    }
  }
  if (edu.length) strengths.push(`Профильное образование (${edu[0]})`)
  if (languages.some((l) => ['c1', 'c2', 'native'].includes(l.level))) {
    strengths.push('Свободное владение иностранными языками')
  }
  if (strengths.length < 3) {
    strengths.push('Ответственность и внимание к деталям')
    strengths.push('Умение работать в команде')
  }

  return {
    summary: parts.join(' '),
    strengths: strengths.slice(0, 5),
    source: 'fallback' as const,
  }
}
