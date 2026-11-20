// Roman Urdu: File frontend/src/pages/Appointment.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useState } from 'react'
import api, { errMsg } from '../api'
import Field from '../components/Field'

/** Tailoring appointment. POSTs to /api/appointments; shows up in admin. */
export default function Appointment() {
  const blank = { fullName:'',phone:'',email:'',address:'',city:'',preferredDate:'',item:'Sherwani',quantity:1,notes:'' }
  const [f, setF] = useState(blank)
  const [state, setState] = useState({ busy: false, done: false, error: '' })
  const on = (e) => setF({ ...f, [e.target.name]: e.target.value })
  const submit = async (e) => {
    e.preventDefault(); setState({ busy: true, done: false, error: '' })
    try { await api.post('/appointments', { ...f, items:[{name:f.item,quantity:Number(f.quantity)}] }); setF(blank); setState({ busy: false, done: true, error: '' }) }
    catch (err) { setState({ busy: false, done: false, error: errMsg(err) }) }
  }
  return (
    <section className="az-section az-service-page"><div className="az-container az-service-grid"><aside className="az-service-intro"><p className="az-editorial__eyebrow">PERSONAL TAILORING</p><h1>Book your fitting.</h1><p>From your first consultation to the final finishing touch, our team helps you find the right fit for every occasion.</p><div className="az-service-points"><p>01 / Tell us what you need</p><p>02 / Choose your preferred date</p><p>03 / We will confirm your appointment</p></div></aside><div className="az-service-form">
      <div className="az-sechead"><div className="az-sechead__text"><h2>Appointment request</h2><p className="az-muted">Complete the details below and our team will contact you to confirm.</p></div></div>
      {state.done ? <div className="az-state" role="status"><h2>Request received</h2><p>We will contact you to confirm your appointment.</p><button className="az-btn" onClick={() => setState({ busy: false, done: false, error: '' })}>Book another</button></div> : (
        <form className="az-form" onSubmit={submit} noValidate>
          <Field label="Full name" name="fullName" value={f.fullName} onChange={on} required autoComplete="name" />
          <Field label="Phone" name="phone" type="tel" inputMode="tel" value={f.phone} onChange={on} required autoComplete="tel" />
          <Field label="Email" name="email" type="email" required value={f.email} onChange={on} autoComplete="email" />
          <div className="az-two"><Field label="City" name="city" value={f.city} onChange={on} required /><Field label="Preferred date" name="preferredDate" type="date" value={f.preferredDate} onChange={on}/></div>
          <Field label="Complete address" name="address" value={f.address} onChange={on} required />
          <div className="az-two"><Field label="Stitching item" name="item" as="select" options={['Kameez Shalwar','Kurta Pajama','Sherwani','Waistcoat','Prince Coat','Casual Shirt','Formal Shirt','Coat Pant','Pants']} value={f.item} onChange={on}/><Field label="Quantity" name="quantity" type="number" min="1" value={f.quantity} onChange={on}/></div>
          <Field label="What would you like made?" name="notes" as="textarea" value={f.notes} onChange={on} />
          {state.error && <p className="az-error" role="alert">{state.error}</p>}
          <button className="az-btn" type="submit" disabled={state.busy}>{state.busy ? 'Sending' : 'Request appointment'}</button>
        </form>)}
    </div></div></section>
  )
}
