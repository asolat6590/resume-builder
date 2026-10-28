import { useState } from 'react'
import { useI18n } from '../context/I18nContext'
import { useResume } from '../context/ResumeContext'
import { exportResumePdf } from '../lib/exportPdf'
import { btnPrimary, btnSecondary } from './Form/fieldStyles'

export function ActionsBar() {
  const { data, generateSummary, generating } = useResume()
  const { t } = useI18n()
  const [exporting, setExporting] = useState(false)

  const handlePdf = async () => {
    if (!data.personal.fullName.trim()) {
      alert(t.alerts.nameRequiredPdf)
      return
    }
    if (!data.generated.summary.trim()) {
      const ok = confirm(t.alerts.confirmPdfNoSummary)
      if (!ok) return
    }
    setExporting(true)
    try {
      const safeName = data.personal.fullName.replace(/\s+/g, '_')
      await exportResumePdf('resume-print-root', `resume_${safeName}.pdf`)
    } catch (e) {
      console.error(e)
      alert(t.alerts.pdfFailed)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 justify-stretch sm:justify-end">
      <button
        type="button"
        disabled={generating}
        onClick={() => generateSummary()}
        className={`${btnPrimary} w-full sm:w-auto`}
      >
        {generating ? t.actions.generating : t.actions.generate}
      </button>
      <button
        type="button"
        disabled={exporting}
        onClick={handlePdf}
        className={`${btnSecondary} w-full sm:w-auto`}
      >
        {exporting ? t.actions.exporting : t.actions.downloadPdf}
      </button>
    </div>
  )
}
