// Roman Urdu: File frontend/src/pages/admin/AdminLayout.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import api from '../../api'
import {brand} from '../../content/copy'
import {LayoutDashboard,Package,ShoppingCart,Tags,Image,CalendarDays,Mail,Users,LogOut,ExternalLink} from 'lucide-react'

const icons = [LayoutDashboard,ShoppingCart,CalendarDays,Package,Tags,Mail,Users,Image]
const links = [['/admin', 'Dashboard', true], ['/admin/orders', 'Orders'], ['/admin/appointments', 'Appointments'], ['/admin/products', 'Products'], ['/admin/categories', 'Categories'], ['/admin/contact-requests', 'Contact requests'], ['/admin/subscribers', 'Subscribers'], ['/admin/gallery', 'Gallery']]

/** Route guard: no valid token = redirect to login. The server enforces auth again on every API call. */
export default function AdminLayout() {
  const nav = useNavigate()
  const [state, setState] = useState('checking')
  useEffect(() => { api.get('/admin/auth/me').then(() => setState('ok')).catch(() => { localStorage.removeItem('awm-admin-token'); setState('denied') }) }, [])
  if (state === 'denied') return <Navigate to="/admin/login" replace />
  if (state === 'checking') return <div className="admin"><p style={{ padding: 24 }}>Checking your session</p></div>
  const logout = async () => { try { await api.post('/admin/auth/logout') } catch { /* ignore */ } localStorage.removeItem('awm-admin-token'); nav('/admin/login') }
  return (
    <div className="admin admin-shell">
      <aside className="admin-side">
        <div className="admin-brand"><img src={brand.mark} alt="Aurangzaib logo"/><span>AURANGZAIB<small>COMMERCE STUDIO</small></span></div><p className="admin-nav-caption">WORKSPACE</p>
        <nav>{links.map(([to,label,end],i)=>{const Icon=icons[i];return <NavLink key={to} to={to} end={end}><Icon size={17}/>{label}</NavLink>})}</nav>
        <a href="/" className="admin-link"><ExternalLink size={16}/> View store</a>
        <button className="admin-btn admin-btn--ghost" onClick={logout}><LogOut size={16}/> Sign out</button>
      </aside>
      <main className="admin-main"><header className="admin-topbar"><div><span className="admin-topbar-dot"/> Store management <span className="admin-topbar-divider">/</span> Admin workspace</div><a href="/" target="_blank" rel="noreferrer">View live store ↗</a></header><div className="admin-content"><Outlet /></div></main>
    </div>
  )
}
