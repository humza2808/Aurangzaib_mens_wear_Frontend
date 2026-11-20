// Roman Urdu: File frontend/src/components/theme/FullBleedSlider.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { homeImages } from '../../data/homeImages'
/** Roman Urdu: Wedding ke baad full-screen slide. 1920x1080 (16:9) WebP recommended hai. */
export default function FullBleedSlider() {
  const slides = homeImages.editorialSlides
  const [active, setActive] = useState(0)
  useEffect(() => { const id = window.setInterval(() => setActive(i => (i+1)%slides.length), 5000); return () => window.clearInterval(id) }, [slides.length])
  return <section className="az-full-slider" aria-label="Featured collections">
    {/* Roman Urdu: Slide 16:9 canvas ke andar model center mein hota hai; face ya kapre crop nahi honge. */}
    {slides.map((s,i)=><div key={s.src} className={`az-full-slide ${active===i?'is-active':''}`} aria-hidden={active!==i}>
      <img src={s.src} alt="" loading="lazy" />
      <div className="az-full-overlay"><p>{s.subtitle}</p><h2>{s.title}</h2><Link className="az-full-cta" to={s.to} tabIndex={active===i?0:-1}>SHOP NOW</Link></div>
    </div>)}
    <button className="az-full-prev" type="button" aria-label="Previous collection" onClick={()=>setActive(i=>(i+slides.length-1)%slides.length)}>‹</button>
    <button className="az-full-next" type="button" aria-label="Next collection" onClick={()=>setActive(i=>(i+1)%slides.length)}>›</button>
    <div className="az-full-pagination">{slides.map((s,i)=><button type="button" key={s.src} aria-label={`Go to collection ${i+1}`} aria-current={active===i?'true':undefined} onClick={()=>setActive(i)} />)}</div>
  </section>
}
