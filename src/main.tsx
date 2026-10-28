import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { applyThemeToDocument, loadStoredTheme } from './config/theme'
import './index.css'

applyThemeToDocument(loadStoredTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
