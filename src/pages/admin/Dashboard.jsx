// Roman Urdu: File frontend/src/pages/admin/Dashboard.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useEffect, useState } from 'react'
import api, { errMsg } from '../../api'
import { rs } from '../../config'
export default function Dashboard() {
  const [s, setS] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { api.get('/admin/stats').then((r) => setS(r.data)).catch((e) => setError(errMsg(e))) }, [])
  if (error) return <p className="admin-error">{error}</p>
  if (!s) return <p>Loading</p>
  const cards = [['Orders', s.orders], ['Pending orders', s.pendingOrders], ['Revenue (excl. cancelled)', rs(s.revenue)], ['Products', s.products], ['New appointments', s.newAppointments], ['New contact requests', s.newContacts], ['Subscribers', s.subscribers]]
  return <><div className="admin-welcome"><div><span>YOUR STORE AT A GLANCE</span><h2>Welcome back!</h2><p>Manage your collection, customers and orders in one place.</p></div><div className="admin-welcome-art" aria-hidden="true">✦<br/>◆ ◉</div></div><div className="admin-page-head"><div><p className="admin-eyebrow">OVERVIEW</p><h1>Dashboard</h1><p className="admin-subtitle">Your store performance at a glance.</p></div></div><div className="admin-stats">{cards.map(([l, v]) => <div key={l} className="admin-card"><p>{l}</p><strong>{v}</strong></div>)}</div></>
}
