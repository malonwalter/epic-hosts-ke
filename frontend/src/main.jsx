import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminLogin from './pages/AdminLogin.jsx'

const path = window.location.pathname

let Root

if (path === '/admin/login') {
  Root = AdminLogin
} else if (path === '/admin') {
  Root = AdminDashboard
} else {
  Root = App
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)