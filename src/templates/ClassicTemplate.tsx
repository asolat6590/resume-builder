import { useResumeLabels } from '../hooks/useResumeLabels'
import type { ResumeData } from '../types/resume'
import { contactLines, formatPeriod } from './shared'

export function ClassicTemplate({ data }: { data: ResumeData }) {
  const { sections, placeholders, meta, levelLabel } = useResumeLabels()
  const { personal, experience, skills, education, languages, generated } = data
  const contacts = contactLines(data, meta.birthDate)
  const periodLabels = { present: meta.present, presentShort: meta.presentShort }

  return (
    <div className="bg-white text-slate-900 p-8 text-[11pt] leading-relaxed min-h-full">
      <header className="border-b-2 border-slate-800 pb-4 mb-4 text-center">
        {personal.photo && (
          <img
            src={personal.photo}
            alt=""
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
          />
        )}
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          {personal.fullName || placeholders.fullName}
        </h1>
        <p className="text-lg text-slate-600 mt-1">{personal.position || placeholders.position}</p>
        {contacts.length > 0 && (
          <p className="text-sm text-slate-500 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {contacts.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </p>
        )}
      </header>

      {generated.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">
            {sections.about}
          </h2>
          <p className="text-slate-700">{generated.summary}</p>
          {generated.strengths.length > 0 && (
            <ul className="mt-2 list-disc list-inside text-slate-600 text-sm">
              {generated.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {experience.some((e) => e.company || e.role) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">
            {sections.experience}
          </h2>
          {experience.map((exp) => {
            if (!exp.company && !exp.role) return null
            return (
              <div key={exp.id} className="mb-3">
                <div className="flex flex-wrap justify-between gap-1 font-semibold">
                  <span>{exp.role}{exp.company ? ` — ${exp.company}` : ''}</span>
                  <span className="text-sm font-normal text-slate-500">
                    {formatPeriod(exp.start, exp.end, periodLabels)}
                  </span>
                </div>
                <ul className="list-disc list-inside text-slate-700 text-sm mt-1">
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">
            {sections.skills}
          </h2>
          <p>{skills.join(' · ')}</p>
        </section>
      )}

      {education.some((e) => e.school) && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">
            {sections.education}
          </h2>
          {education.map((edu) => {
            if (!edu.school) return null
            return (
              <p key={edu.id} className="mb-1">
                <span className="font-semibold">{edu.school}</span>
                {edu.specialty ? ` — ${edu.specialty}` : ''}
                {edu.year ? ` (${edu.year})` : ''}
              </p>
            )
          })}
        </section>
      )}

      {languages.some((l) => l.name) && (
        <section>
          <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1 mb-2">
            {sections.languages}
          </h2>
          <p>
            {languages
              .filter((l) => l.name)
              .map((l) => `${l.name} (${levelLabel(l.level)})`)
              .join(' · ')}
          </p>
        </section>
      )}
    </div>
  )
}
