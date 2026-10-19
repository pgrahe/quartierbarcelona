import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/tokens.css'
import './styles/base.css'

import { LanguageProvider } from './i18n/LanguageContext'
import { RouteProvider } from './router/RouteContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouteProvider>
        <App />
      </RouteProvider>
    </LanguageProvider>
  </StrictMode>,
)
