import { useResumeLabels } from '../hooks/useResumeLabels'
import type { ResumeData } from '../types/resume'
import { contactLines, formatPeriod } from './shared'

export function PortfolioTemplate({ data }: { data: ResumeData }) {
  const { sections, placeholders, meta, levelLabel } = useResumeLabels()
  const { personal, experience, skills, education, languages, generated } = data
  const contacts = contactLines(data, meta.birthDate)
  const periodLabels = { present: meta.present, presentShort: meta.presentShort }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white text-slate-800 min-h-full text-[10.5pt]">
      <header className="bg-indigo-700 text-white px-8 py-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
        {personal.photo && (
          <img
            src={personal.photo}
            alt=""
            className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white/30 shrink-0"
          />
        )}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-bold">{personal.fullName || placeholders.yourName}</h1>
          <p className="text-indigo-200 text-lg mt-1">{personal.position || placeholders.position}</p>
          {generated.summary && (
            <p className="mt-4 text-indigo-100 text-sm leading-relaxed max-w-2xl">{generated.summary}</p>
          )}
          {contacts.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 text-sm text-indigo-200">
              {contacts.map((c) => (
                <span key={c} className="bg-white/10 px-2 py-1 rounded">{c}</span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="p-6 space-y-5">
        {generated.strengths.length > 0 && (
          <section className="grid sm:grid-cols-2 gap-3">
            {generated.strengths.map((s) => (
              <div
                key={s}
                className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4 text-sm font-medium text-indigo-900"
              >
                {s}
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section className="bg-white rounded-xl shadow-sm border p-5">
            <h2 className="text-indigo-700 font-bold text-lg mb-3">{sections.skills}</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {experience.some((e) => e.company || e.role) && (
          <section className="bg-white rounded-xl shadow-sm border p-5">
            <h2 className="text-indigo-700 font-bold text-lg mb-4">{sections.experience}</h2>
            <div className="space-y-4">
              {experience.map((exp) => {
                if (!exp.company && !exp.role) return null
                return (
                  <div key={exp.id} className="border-l-4 border-indigo-400 pl-4">
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm text-slate-500">
                      {exp.company} · {formatPeriod(exp.start, exp.end, periodLabels)}
                    </p>
                    <ul className="mt-2 text-sm list-disc list-inside">
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          {education.some((e) => e.school) && (
            <section className="bg-white rounded-xl shadow-sm border p-5">
              <h2 className="text-indigo-700 font-bold text-lg mb-3">{sections.education}</h2>
              {education.map((edu) => {
                if (!edu.school) return null
                return (
                  <div key={edu.id} className="mb-2 text-sm">
                    <p className="font-semibold">{edu.school}</p>
                    <p className="text-slate-500">{edu.specialty}{edu.year ? `, ${edu.year}` : ''}</p>
                  </div>
                )
              })}
            </section>
          )}

          {languages.some((l) => l.name) && (
            <section className="bg-white rounded-xl shadow-sm border p-5">
              <h2 className="text-indigo-700 font-bold text-lg mb-3">{sections.languages}</h2>
              <ul className="space-y-1 text-sm">
                {languages
                  .filter((l) => l.name)
                  .map((l) => (
                    <li key={l.id} className="flex justify-between">
                      <span>{l.name}</span>
                      <span className="text-slate-500">{levelLabel(l.level)}</span>
                    </li>
                  ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
