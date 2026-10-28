import { Layout } from './components/Layout'
import { I18nProvider } from './context/I18nContext'
import { ResumeProvider } from './context/ResumeContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ResumeProvider>
          <Layout />
        </ResumeProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App
