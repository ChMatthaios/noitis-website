import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TermsPage } from './TermsPage'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TermsPage />
  </StrictMode>,
)
