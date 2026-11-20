// Roman Urdu: File frontend/src/main.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import App from './App'
/* Theme first, then page styles, then admin (admin is scoped under .admin) */
import './styles/theme/base.css'
import './styles/theme/components.css'
import './styles/pages.css'
import './styles/admin.css'

createRoot(document.getElementById('root')).render(
  <StrictMode><BrowserRouter><CartProvider><App /></CartProvider></BrowserRouter></StrictMode>
)
