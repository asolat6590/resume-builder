import { useResumeLabels } from '../hooks/useResumeLabels'
import type { ResumeData } from '../types/resume'
import { contactLines, formatPeriod } from './shared'

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { sections, placeholders, meta, levelLabel } = useResumeLabels()
  const { personal, experience, skills, education, languages, generated } = data
  const contacts = contactLines(data, meta.birthDate)
  const periodLabels = { present: meta.present, presentShort: meta.presentShort }

  return (
    <div className="bg-white text-slate-800 min-h-full flex text-[10.5pt]">
      <aside className="w-[34%] bg-slate-800 text-slate-100 p-6 shrink-0">
        {personal.photo ? (
          <img
            src={personal.photo}
            alt=""
            className="w-full aspect-square object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full aspect-square bg-slate-700 rounded-lg mb-4 flex items-center justify-center text-slate-400 text-sm">
            {placeholders.photo}
          </div>
        )}
        <h1 className="text-xl font-bold leading-tight">{personal.fullName || placeholders.fullName}</h1>
        <p className="text-teal-300 text-sm mt-1 mb-4">{personal.position || placeholders.position}</p>

        {contacts.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">{sections.contacts}</h3>
            <ul className="text-sm space-y-1 break-all">
              {contacts.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-5">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">{sections.skills}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <li key={s} className="text-xs bg-slate-700 px-2 py-0.5 rounded">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {languages.some((l) => l.name) && (
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">{sections.languages}</h3>
            <ul className="text-sm space-y-1">
              {languages
                .filter((l) => l.name)
                .map((l) => (
                  <li key={l.id}>
                    {l.name} — {levelLabel(l.level)}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="flex-1 p-6">
        {generated.summary && (
          <section className="mb-6">
            <h2 className="text-teal-700 font-bold text-lg mb-2">{sections.profile}</h2>
            <p className="text-slate-600 leading-relaxed">{generated.summary}</p>
            {generated.strengths.length > 0 && (
              <div className="mt-3 grid gap-1">
                {generated.strengths.map((s) => (
                  <div key={s} className="flex gap-2 text-sm">
                    <span className="text-teal-600">▸</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {experience.some((e) => e.company || e.role) && (
          <section className="mb-6">
            <h2 className="text-teal-700 font-bold text-lg mb-3">{sections.workExperience}</h2>
            {experience.map((exp) => {
              if (!exp.company && !exp.role) return null
              return (
                <div key={exp.id} className="mb-4 border-l-2 border-teal-200 pl-3">
                  <p className="font-semibold">{exp.role}</p>
                  <p className="text-sm text-slate-500">
                    {exp.company} · {formatPeriod(exp.start, exp.end, periodLabels)}
                  </p>
                  <ul className="mt-1 text-sm list-disc list-inside text-slate-700">
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </section>
        )}

        {education.some((e) => e.school) && (
          <section>
            <h2 className="text-teal-700 font-bold text-lg mb-3">{sections.education}</h2>
            {education.map((edu) => {
              if (!edu.school) return null
              return (
                <div key={edu.id} className="mb-2">
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-sm text-slate-500">
                    {edu.specialty}
                    {edu.year ? ` · ${edu.year}` : ''}
                  </p>
                </div>
              )
            })}
          </section>
        )}
      </main>
    </div>
  )
}
