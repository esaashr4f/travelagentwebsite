import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { transition } from '@/lib/transition'

// Stamped on <html> so CSS can reshape the scenes for the chosen transition.
document.documentElement.dataset.transition = transition

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
