// Roman Urdu: File frontend/src/components/theme/Footer.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Footer ka address, number aur email yahan edit kar sakte hain.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { brand, footer } from '../../content/copy'

/**
 * Black footer. Pass `onSubscribe(email)` that calls your existing /api/subscribers endpoint and
 * throws on failure. `contact` and `socials` come from your real data (never invented here).
 */
export default function Footer({ onSubscribe, contact = [], socials = [] }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | busy | done | error
  const n = footer.newsletter

  const submit = async (e) => {
    e.preventDefault()
    setStatus('busy')
    try { await onSubscribe?.(email); setStatus('done'); setEmail('') } catch { setStatus('error') }
  }

  return (
    <footer className="az-footer az-inverse">
      <div className="az-container">
        <div className="az-footer__grid">
          <div>
            <img className="az-footer__logo" src={brand.logo} alt={brand.logoAlt} />
            <p className="az-muted">{footer.about}</p>
            {contact.length > 0 && <ul style={{ marginTop: 16 }}>{contact.map((c) => <li key={c.label}><a href={c.href}>{c.label}</a></li>)}</ul>}
          </div>
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2>{col.title}</h2>
              <ul>{col.links.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
            </nav>
          ))}
          <form className="az-news" onSubmit={submit} noValidate>
            <h2>{n.title}</h2>
            <p className="az-muted">{n.body}</p>
            <div className="az-news__row">
              <label className="az-sr-only" htmlFor="az-news-email">{n.placeholder}</label>
              <input id="az-news-email" className="az-input" type="email" inputMode="email" autoComplete="email" required placeholder={n.placeholder} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={status === 'error'} />
              <button className="az-btn" type="submit" disabled={status === 'busy' || !email}>{n.button}</button>
            </div>
            <p aria-live="polite" className={status === 'error' ? 'az-error' : ''}>{status === 'done' ? n.success : status === 'error' ? n.error : ''}</p>
          </form>
        </div>
        <div className="az-footer__legal az-muted">
          <span>© {new Date().getFullYear()} {brand.name} {brand.descriptor}</span>
          {socials.map((s) => <a key={s.label} href={s.href} style={{ marginLeft: 16 }} rel="noopener noreferrer">{s.label}</a>)}
        </div>
      </div>
    </footer>
  )
}
