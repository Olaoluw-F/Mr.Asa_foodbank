import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.jsx'
import { legacyRedirect } from './lib/legacyRedirect'

// Old v1 links like /#food or /#africa: swap in the new URL before the router reads it.
const target = legacyRedirect(location.pathname, location.hash)
if (target) history.replaceState(null, '', target)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
