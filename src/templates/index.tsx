import type { ResumeData } from '../types/resume'
import { ClassicTemplate } from './ClassicTemplate'
import { ModernTemplate } from './ModernTemplate'
import { PortfolioTemplate } from './PortfolioTemplate'

export function ResumeTemplateView({ data }: { data: ResumeData }) {
  switch (data.templateId) {
    case 'modern':
      return <ModernTemplate data={data} />
    case 'portfolio':
      return <PortfolioTemplate data={data} />
    default:
      return <ClassicTemplate data={data} />
  }
}
