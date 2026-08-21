import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TrademarkPage } from './TrademarkPage'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrademarkPage />
  </StrictMode>,
)
