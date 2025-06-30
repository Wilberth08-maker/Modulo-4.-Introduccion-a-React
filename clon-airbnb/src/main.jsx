import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeProvider } from './styles/DarkModeContent.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <StrictMode>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </StrictMode>, 
  </BrowserRouter>
  
)
