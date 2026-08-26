import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/tokens.css'
import './styles/base.css'

import { LanguageProvider } from './i18n/LanguageContext'
import { RouteProvider } from './router/RouteContext'
import { TicketsProvider } from './tickets/TicketsContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouteProvider>
        <TicketsProvider>
          <App />
        </TicketsProvider>
      </RouteProvider>
    </LanguageProvider>
  </StrictMode>,
)
