import { useI18n } from '../context/I18nContext'
import { useResume } from '../context/ResumeContext'
import type { TemplateId } from '../types/resume'

const TEMPLATE_IDS: TemplateId[] = ['classic', 'modern', 'portfolio']

export function TemplatePicker() {
  const { data, dispatch } = useResume()
  const { t } = useI18n()

  const labels: Record<TemplateId, { label: string; description: string }> = {
    classic: { label: t.templates.classic, description: t.templates.classicDesc },
    modern: { label: t.templates.modern, description: t.templates.modernDesc },
    portfolio: { label: t.templates.portfolio, description: t.templates.portfolioDesc },
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TEMPLATE_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: id })}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
            data.templateId === id
              ? 'bg-accent text-white border-accent shadow-sm'
              : 'bg-card text-fg border-border hover:border-accent/50'
          }`}
          title={labels[id].description}
        >
          {labels[id].label}
        </button>
      ))}
    </div>
  )
}
