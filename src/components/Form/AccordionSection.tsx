import { useState, type ReactNode } from 'react'

export function AccordionSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section
      className="border border-border rounded-2xl bg-card overflow-hidden shadow-[var(--shadow-card)]"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left font-semibold text-fg hover:bg-app/40 transition-colors"
      >
        {title}
        <span className="text-muted text-lg leading-none w-6 text-center">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-4">{children}</div>
      )}
    </section>
  )
}
