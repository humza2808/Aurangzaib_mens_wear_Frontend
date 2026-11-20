// Roman Urdu: File frontend/src/pages/Contact.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useState } from 'react'
import api, { errMsg } from '../api'
import Field from '../components/Field'

/** Contact form. `website` is a hidden honeypot field that real people never fill in. */
export default function Contact() {
  const blank = { fullName: '', email: '', phone: '', subject: '', message: '', website: '' }
  const [f, setF] = useState(blank)
  const [state, setState] = useState({ busy: false, done: false, error: '' })
  const on = (e) => setF({ ...f, [e.target.name]: e.target.value })
  const submit = async (e) => {
    e.preventDefault(); setState({ busy: true, done: false, error: '' })
    try { await api.post('/contact', f); setF(blank); setState({ busy: false, done: true, error: '' }) }
    catch (err) { setState({ busy: false, done: false, error: errMsg(err) }) }
  }
  return (
    <section className="az-section az-service-page"><div className="az-container az-service-grid"><aside className="az-service-intro"><p className="az-editorial__eyebrow">WE ARE HERE TO HELP</p><h1>Let’s talk.</h1><p>Have a question about sizing, an order, or your next special occasion? Our team is happy to help.</p><div className="az-service-points"><p><strong>Visit our store</strong><br/>Shop #2, Plot 22D, Sunset Lane 1, DHA Phase II Extension, Karachi</p><p><strong>Call us</strong><br/><a href="tel:+923443022668">+92 344 3022668</a></p><p><strong>Email</strong><br/><a href="mailto:menswear@gmail.com">menswear@gmail.com</a></p></div></aside><div className="az-service-form">
      <div className="az-sechead"><div className="az-sechead__text"><h2>Send an enquiry</h2><p className="az-muted">Questions about an order, a fabric or a fitting? Send a message.</p></div></div>
      {state.done ? <div className="az-state" role="status"><h2>Message sent</h2><p>Thank you. We will reply by email or phone.</p></div> : (
        <form className="az-form" onSubmit={submit} noValidate>
          <Field label="Full name" name="fullName" value={f.fullName} onChange={on} required autoComplete="name" />
          <Field label="Email" name="email" type="email" inputMode="email" value={f.email} onChange={on} required autoComplete="email" />
          <Field label="Phone" name="phone" type="tel" inputMode="tel" value={f.phone} onChange={on} autoComplete="tel" />
          <Field label="Subject" name="subject" value={f.subject} onChange={on} required />
          <Field label="Message" name="message" as="textarea" value={f.message} onChange={on} required />
          <div aria-hidden="true" style={{ position: 'absolute', left: -9999 }}><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={on} /></label></div>
          {state.error && <p className="az-error" role="alert">{state.error}</p>}
          <button className="az-btn" type="submit" disabled={state.busy}>{state.busy ? 'Sending' : 'Send message'}</button>
        </form>)}
    </div></div></section>
  )
}
