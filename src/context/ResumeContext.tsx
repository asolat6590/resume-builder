import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import { useI18n } from './I18nContext'
import { generateSummaryFallback } from '../lib/generateSummaryFallback'
import { loadResumeFromStorage, saveResumeToStorage } from '../lib/storage'
import {
  createEmptyResume,
  createId,
  type ExperienceItem,
  type ResumeData,
  type TemplateId,
} from '../types/resume'

type Action =
  | { type: 'HYDRATE'; payload: ResumeData }
  | { type: 'SET_PERSONAL'; payload: Partial<ResumeData['personal']> }
  | { type: 'SET_CONTACTS'; payload: Partial<ResumeData['contacts']> }
  | { type: 'SET_SKILLS'; payload: string[] }
  | { type: 'SET_TEMPLATE'; payload: TemplateId }
  | { type: 'SET_GENERATED'; payload: ResumeData['generated'] }
  | { type: 'UPDATE_EXPERIENCE'; payload: ExperienceItem }
  | { type: 'ADD_EXPERIENCE' }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'UPDATE_EDUCATION'; payload: ResumeData['education'][0] }
  | { type: 'ADD_EDUCATION' }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'UPDATE_LANGUAGE'; payload: ResumeData['languages'][0] }
  | { type: 'ADD_LANGUAGE' }
  | { type: 'REMOVE_LANGUAGE'; payload: string }
  | { type: 'RESET' }

function reducer(state: ResumeData, action: Action): ResumeData {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload
    case 'SET_PERSONAL':
      return { ...state, personal: { ...state.personal, ...action.payload } }
    case 'SET_CONTACTS':
      return { ...state, contacts: { ...state.contacts, ...action.payload } }
    case 'SET_SKILLS':
      return { ...state, skills: action.payload }
    case 'SET_TEMPLATE':
      return { ...state, templateId: action.payload }
    case 'SET_GENERATED':
      return { ...state, generated: action.payload }
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
      }
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [
          ...state.experience,
          { id: createId(), company: '', role: '', start: '', end: '', bullets: [''] },
        ],
      }
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((e) => e.id !== action.payload),
      }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
      }
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [
          ...state.education,
          { id: createId(), school: '', specialty: '', year: '' },
        ],
      }
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((e) => e.id !== action.payload),
      }
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map((l) =>
          l.id === action.payload.id ? action.payload : l,
        ),
      }
    case 'ADD_LANGUAGE':
      return {
        ...state,
        languages: [...state.languages, { id: createId(), name: '', level: 'b2' }],
      }
    case 'REMOVE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.filter((l) => l.id !== action.payload),
      }
    case 'RESET':
      return createEmptyResume()
    default:
      return state
  }
}

interface ResumeContextValue {
  data: ResumeData
  dispatch: React.Dispatch<Action>
  generateSummary: () => Promise<void>
  generating: boolean
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const { t, locale } = useI18n()
  const [data, dispatch] = useReducer(reducer, createEmptyResume())
  const [generating, setGenerating] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    dispatch({ type: 'HYDRATE', payload: loadResumeFromStorage() })
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveResumeToStorage(data)
  }, [data, hydrated])

  const generateSummary = useCallback(async () => {
    const { personal, experience, skills, education, languages } = data
    if (!personal.position.trim()) {
      alert(t.alerts.positionRequired)
      return
    }

    setGenerating(true)
    try {
      const body = {
        position: personal.position,
        experience,
        skills,
        education,
        languages,
        locale,
      }

      let result
      try {
        const res = await fetch('/api/generate-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.ok) {
          result = await res.json()
        } else {
          result = generateSummaryFallback(body)
        }
      } catch {
        result = generateSummaryFallback(body)
      }

      dispatch({
        type: 'SET_GENERATED',
        payload: {
          summary: result.summary,
          strengths: result.strengths,
          source: result.source,
        },
      })
    } finally {
      setGenerating(false)
    }
  }, [data, locale, t.alerts.positionRequired])

  const value = useMemo(
    () => ({
      data,
      dispatch,
      generateSummary,
      generating,
    }),
    [data, generateSummary, generating],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
