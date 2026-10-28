import { useRef, useState } from 'react'
import { useI18n } from '../../context/I18nContext'
import { useResume } from '../../context/ResumeContext'
import type { LanguageLevel } from '../../types/resume'
import { AccordionSection } from './AccordionSection'
import {
  btnDanger,
  btnGhost,
  btnPrimary,
  cardInnerClass,
  inputClass,
  labelClass,
} from './fieldStyles'

const CONTACT_KEYS = ['email', 'phone', 'city', 'telegram', 'linkedin'] as const

export function ResumeForm() {
  const { data, dispatch } = useResume()
  const { t, format } = useI18n()
  const fileRef = useRef<HTMLInputElement>(null)
  const [skillInput, setSkillInput] = useState('')

  const contactLabels: Record<(typeof CONTACT_KEYS)[number], string> = {
    email: t.form.email,
    phone: t.form.phone,
    city: t.form.city,
    telegram: t.form.telegram,
    linkedin: t.form.linkedin,
  }

  const levelOptions: LanguageLevel[] = ['native', 'c2', 'c1', 'b2', 'b1', 'a2', 'a1']

  const addSkill = () => {
    const s = skillInput.trim()
    if (!s || data.skills.includes(s)) return
    dispatch({ type: 'SET_SKILLS', payload: [...data.skills, s] })
    setSkillInput('')
  }

  const onPhotoChange = (file: File | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      dispatch({ type: 'SET_PERSONAL', payload: { photo: String(reader.result) } })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-4">
      <AccordionSection title={t.form.personal}>
        <div>
          <label className={labelClass}>{t.form.photo}</label>
          <div className="flex items-center gap-3">
            {data.personal.photo && (
              <img
                src={data.personal.photo}
                alt=""
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-border"
              />
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-accent-soft file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent"
              onChange={(e) => onPhotoChange(e.target.files?.[0])}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>{t.form.fullName}</label>
          <input
            className={inputClass}
            value={data.personal.fullName}
            onChange={(e) =>
              dispatch({ type: 'SET_PERSONAL', payload: { fullName: e.target.value } })
            }
            placeholder={t.placeholders.fullName}
          />
        </div>
        <div>
          <label className={labelClass}>{t.form.position}</label>
          <input
            className={inputClass}
            value={data.personal.position}
            onChange={(e) =>
              dispatch({ type: 'SET_PERSONAL', payload: { position: e.target.value } })
            }
            placeholder={t.placeholders.position}
          />
        </div>
        <div>
          <label className={labelClass}>{t.form.birthDate}</label>
          <input
            type="date"
            className={inputClass}
            value={data.personal.birthDate}
            onChange={(e) =>
              dispatch({ type: 'SET_PERSONAL', payload: { birthDate: e.target.value } })
            }
          />
        </div>
      </AccordionSection>

      <AccordionSection title={t.form.contacts}>
        {CONTACT_KEYS.map((key) => (
          <div key={key}>
            <label className={labelClass}>{contactLabels[key]}</label>
            <input
              className={inputClass}
              value={data.contacts[key]}
              onChange={(e) =>
                dispatch({ type: 'SET_CONTACTS', payload: { [key]: e.target.value } })
              }
            />
          </div>
        ))}
      </AccordionSection>

      <AccordionSection title={t.form.experience}>
        {data.experience.map((exp, idx) => (
          <div key={exp.id} className={cardInnerClass}>
            {data.experience.length > 1 && (
              <button
                type="button"
                className={`absolute top-3 right-3 ${btnDanger}`}
                onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', payload: exp.id })}
              >
                {t.form.remove}
              </button>
            )}
            <p className="text-xs font-semibold text-muted">
              {format(t.form.placeN, { n: idx + 1 })}
            </p>
            <input
              className={inputClass}
              placeholder={t.form.company}
              value={exp.company}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_EXPERIENCE',
                  payload: { ...exp, company: e.target.value },
                })
              }
            />
            <input
              className={inputClass}
              placeholder={t.form.role}
              value={exp.role}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_EXPERIENCE',
                  payload: { ...exp, role: e.target.value },
                })
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                className={inputClass}
                placeholder={t.form.start}
                value={exp.start}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_EXPERIENCE',
                    payload: { ...exp, start: e.target.value },
                  })
                }
              />
              <input
                className={inputClass}
                placeholder={t.form.end}
                value={exp.end}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_EXPERIENCE',
                    payload: { ...exp, end: e.target.value },
                  })
                }
              />
            </div>
            {exp.bullets.map((b, bi) => (
              <input
                key={bi}
                className={inputClass}
                placeholder={t.form.achievement}
                value={b}
                onChange={(e) => {
                  const bullets = [...exp.bullets]
                  bullets[bi] = e.target.value
                  dispatch({
                    type: 'UPDATE_EXPERIENCE',
                    payload: { ...exp, bullets },
                  })
                }}
              />
            ))}
            <button
              type="button"
              className={btnGhost}
              onClick={() =>
                dispatch({
                  type: 'UPDATE_EXPERIENCE',
                  payload: { ...exp, bullets: [...exp.bullets, ''] },
                })
              }
            >
              {t.form.addBullet}
            </button>
          </div>
        ))}
        <button type="button" className={btnGhost} onClick={() => dispatch({ type: 'ADD_EXPERIENCE' })}>
          {t.form.addExperience}
        </button>
      </AccordionSection>

      <AccordionSection title={t.form.skills}>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            className={inputClass}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            placeholder={t.form.skillPlaceholder}
          />
          <button type="button" onClick={addSkill} className={`${btnPrimary} shrink-0 sm:px-6`}>
            {t.form.addSkill}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 bg-accent-soft text-accent text-sm px-2.5 py-1 rounded-full font-medium"
            >
              {s}
              <button
                type="button"
                className="hover:opacity-70"
                onClick={() =>
                  dispatch({
                    type: 'SET_SKILLS',
                    payload: data.skills.filter((x) => x !== s),
                  })
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title={t.form.education}>
        {data.education.map((edu, idx) => (
          <div key={edu.id} className={cardInnerClass}>
            {data.education.length > 1 && (
              <button
                type="button"
                className={`absolute top-3 right-3 ${btnDanger}`}
                onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: edu.id })}
              >
                {t.form.remove}
              </button>
            )}
            <p className="text-xs font-semibold text-muted">
              {format(t.form.recordN, { n: idx + 1 })}
            </p>
            <input
              className={inputClass}
              placeholder={t.form.school}
              value={edu.school}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_EDUCATION',
                  payload: { ...edu, school: e.target.value },
                })
              }
            />
            <input
              className={inputClass}
              placeholder={t.form.specialty}
              value={edu.specialty}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_EDUCATION',
                  payload: { ...edu, specialty: e.target.value },
                })
              }
            />
            <input
              className={inputClass}
              placeholder={t.form.gradYear}
              value={edu.year}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_EDUCATION',
                  payload: { ...edu, year: e.target.value },
                })
              }
            />
          </div>
        ))}
        <button type="button" className={btnGhost} onClick={() => dispatch({ type: 'ADD_EDUCATION' })}>
          {t.form.addEducation}
        </button>
      </AccordionSection>

      <AccordionSection title={t.form.languages}>
        {data.languages.map((lang) => (
          <div key={lang.id} className="flex flex-col sm:flex-row gap-2 sm:items-end">
            <div className="flex-1">
              <label className={labelClass}>{t.form.languageName}</label>
              <input
                className={inputClass}
                value={lang.name}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_LANGUAGE',
                    payload: { ...lang, name: e.target.value },
                  })
                }
                placeholder={t.placeholders.languageName}
              />
            </div>
            <div className="w-full sm:w-32">
              <label className={labelClass}>{t.form.level}</label>
              <select
                className={inputClass}
                value={lang.level}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_LANGUAGE',
                    payload: { ...lang, level: e.target.value as LanguageLevel },
                  })
                }
              >
                {levelOptions.map((value) => (
                  <option key={value} value={value}>{t.languageLevels[value]}</option>
                ))}
              </select>
            </div>
            {data.languages.length > 1 && (
              <button
                type="button"
                className={`${btnDanger} sm:pb-2`}
                onClick={() => dispatch({ type: 'REMOVE_LANGUAGE', payload: lang.id })}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" className={btnGhost} onClick={() => dispatch({ type: 'ADD_LANGUAGE' })}>
          {t.form.addLanguage}
        </button>
      </AccordionSection>

      {data.generated.summary && (
        <AccordionSection title={t.form.generated} defaultOpen={false}>
          <p className="text-sm text-fg/90 leading-relaxed">{data.generated.summary}</p>
          {data.generated.source && (
            <p className="text-xs text-muted mt-2">
              {t.form.sourceLabel}:{' '}
              {data.generated.source === 'ai' ? t.form.sourceAi : t.form.sourceTemplate}
            </p>
          )}
        </AccordionSection>
      )}
    </div>
  )
}
