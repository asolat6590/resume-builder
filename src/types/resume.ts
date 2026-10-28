export type LanguageLevel = 'native' | 'c2' | 'c1' | 'b2' | 'b1' | 'a2' | 'a1'

export interface ExperienceItem {
  id: string
  company: string
  role: string
  start: string
  end: string
  bullets: string[]
}

export interface EducationItem {
  id: string
  school: string
  specialty: string
  year: string
}

export interface LanguageItem {
  id: string
  name: string
  level: LanguageLevel
}

export interface Contacts {
  email: string
  phone: string
  city: string
  telegram: string
  linkedin: string
}

export interface Personal {
  photo: string
  fullName: string
  position: string
  birthDate: string
}

export interface Generated {
  summary: string
  strengths: string[]
  source?: 'ai' | 'fallback'
}

export type TemplateId = 'classic' | 'modern' | 'portfolio'

export interface ResumeData {
  personal: Personal
  contacts: Contacts
  experience: ExperienceItem[]
  skills: string[]
  education: EducationItem[]
  languages: LanguageItem[]
  generated: Generated
  templateId: TemplateId
}

export const LANGUAGE_OPTIONS: { value: LanguageLevel; label: string }[] = [
  { value: 'native', label: 'Родной' },
  { value: 'c2', label: 'C2' },
  { value: 'c1', label: 'C1' },
  { value: 'b2', label: 'B2' },
  { value: 'b1', label: 'B1' },
  { value: 'a2', label: 'A2' },
  { value: 'a1', label: 'A1' },
]

export function createId(): string {
  return crypto.randomUUID()
}

export function createEmptyResume(): ResumeData {
  return {
    personal: {
      photo: '',
      fullName: '',
      position: '',
      birthDate: '',
    },
    contacts: {
      email: '',
      phone: '',
      city: '',
      telegram: '',
      linkedin: '',
    },
    experience: [
      {
        id: createId(),
        company: '',
        role: '',
        start: '',
        end: '',
        bullets: [''],
      },
    ],
    skills: [],
    education: [
      {
        id: createId(),
        school: '',
        specialty: '',
        year: '',
      },
    ],
    languages: [{ id: createId(), name: '', level: 'b2' }],
    generated: {
      summary: '',
      strengths: [],
    },
    templateId: 'classic',
  }
}
