// Roman Urdu: File frontend/src/pages/StoreInfo.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { Link, useParams } from 'react-router-dom'
import { infoPages } from '../data/infoPages'
export default function StoreInfo() {
  const page = infoPages[useParams().slug]
  if (!page) return <section className="az-section"><div className="az-container az-state"><p>We couldn’t find that page.</p><Link to="/" className="az-btn">Back to home</Link></div></section>
  return <section className="az-section"><div className="az-container az-narrow"><h1>{page.title}</h1><div className="az-prose">{page.body.map((t) => <p key={t}>{t}</p>)}</div></div></section>
}
