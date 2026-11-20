// Roman Urdu: File frontend/src/pages/admin/AdminLogin.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { errMsg } from '../../api'

export default function AdminLogin() {
  const nav = useNavigate()
  const [f, setF] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError('')
    try { const { data } = await api.post('/admin/auth/login', f); localStorage.setItem('awm-admin-token', data.token); nav('/admin', { replace: true }) }
    catch (err) { setError(errMsg(err)); setBusy(false) }
  }
  return (
    <div className="admin admin-login">
      <form onSubmit={submit} className="admin-card">
        <div className="admin-login-brand">AURANGZAIB <span>MEN'S WEAR</span></div><p className="admin-eyebrow">PRIVATE ADMIN ACCESS</p><h1>Welcome back</h1><p className="admin-subtitle">Sign in to manage your store.</p>
        <label>Email<input type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoComplete="username" /></label>
        <label>Password<input type="password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} autoComplete="current-password" /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-btn" disabled={busy}>{busy ? 'Signing in' : 'Sign in'}</button>
      </form>
    </div>
  )
}
