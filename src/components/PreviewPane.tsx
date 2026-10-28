import { useI18n } from '../context/I18nContext'
import { useResume } from '../context/ResumeContext'
import { ResumeTemplateView } from '../templates'
import { TemplatePicker } from './TemplatePicker'

export function PreviewPane() {
  const { data } = useResume()
  const { t } = useI18n()

  return (
    <div className="flex flex-col h-full min-h-0 flex-1">
      <div className="flex flex-col gap-3 mb-3 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-semibold text-fg text-lg">{t.preview.title}</h2>
          <TemplatePicker />
        </div>
        <p className="text-xs text-muted lg:hidden">{t.preview.mobileHint}</p>
      </div>
      <div className="flex-1 overflow-auto rounded-2xl border border-border bg-slate-200/50 dark:bg-black/30 p-2 sm:p-4">
        <div className="mx-auto w-full max-w-[210mm] overflow-x-auto">
          <div
            id="resume-print-root"
            className="resume-document mx-auto shadow-xl ring-1 ring-black/5 min-h-[297mm] w-[210mm] shrink-0"
          >
            <ResumeTemplateView data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
