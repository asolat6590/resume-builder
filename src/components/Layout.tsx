import { useState } from 'react'
import { useI18n } from '../context/I18nContext'
import { ActionsBar } from './ActionsBar'
import { ResumeForm } from './Form/ResumeForm'
import { Header } from './Header'
import { PreviewPane } from './PreviewPane'

type MobileTab = 'form' | 'preview'

export function Layout() {
  const [tab, setTab] = useState<MobileTab>('form')
  const { t } = useI18n()

  return (
    <div className="min-h-screen flex flex-col bg-app">
      <Header />

      <div className="lg:hidden print:hidden flex border-b border-border bg-surface px-2 pt-1">
        {(['form', 'preview'] as const).map((key) => (
          <button
            key={key}
            type="button"
            className={`flex-1 py-3 text-sm font-semibold rounded-t-xl transition-colors ${
              tab === key
                ? 'text-accent border-b-2 border-accent bg-card'
                : 'text-muted'
            }`}
            onClick={() => setTab(key)}
          >
            {key === 'form' ? t.tabs.form : t.tabs.preview}
          </button>
        ))}
      </div>

      <main className="flex-1 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[1.1fr_0.9fr] gap-4 lg:gap-6 p-4 sm:p-6 max-w-[1600px] mx-auto w-full min-h-0">
        <div
          className={`overflow-y-auto pb-28 lg:pb-4 ${tab === 'form' ? 'block' : 'hidden lg:block'}`}
        >
          <ResumeForm />
        </div>
        <div
          className={`lg:sticky lg:top-[5.5rem] lg:self-start lg:max-h-[calc(100vh-6.5rem)] flex flex-col min-h-[55vh] ${
            tab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <PreviewPane />
          <div className="hidden lg:block mt-4 print:hidden">
            <ActionsBar />
          </div>
        </div>
      </main>

      <footer
        className="print:hidden fixed bottom-0 inset-x-0 border-t border-border bg-surface/95 backdrop-blur-md px-4 py-3 z-10 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      >
        <ActionsBar />
      </footer>
    </div>
  )
}
