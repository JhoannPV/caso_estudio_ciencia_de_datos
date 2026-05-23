import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CasoEstudioApp from './CasoEstudioApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CasoEstudioApp />
  </StrictMode>,
)
