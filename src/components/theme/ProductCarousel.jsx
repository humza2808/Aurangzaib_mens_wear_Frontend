// Roman Urdu: File frontend/src/components/theme/ProductCarousel.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

/**
 * New Arrivals carousel. Pass ONLY Eastern/Western products (filter upstream with the
 * existing isClothingProduct helper). Shows at most `max` items, 4 per view on desktop.
 * Uses native scroll-snap so touch swipe is untouched and works alongside Lenis.
 */
export default function ProductCarousel({ products = [], max = 8, title, body, cta }) {
  const track = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const items = products.slice(0, max)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => { measure(); window.addEventListener('resize', measure); return () => window.removeEventListener('resize', measure) }, [measure, items.length])

  const page = (dir) => {
    const el = track.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }

  if (!items.length) return null
  return (
    <section className="az-section" aria-labelledby="az-new-arrivals">
      <div className="az-container">
        <div className="az-sechead">
          <div className="az-sechead__text">
            <h2 id="az-new-arrivals">{title}</h2>
            {body && <p className="az-muted">{body}</p>}
            {cta && <Link to={cta.to} className="az-link">{cta.label}</Link>}
          </div>
          <div className="az-carousel__controls">
            <button type="button" className="az-carousel__btn" onClick={() => page(-1)} disabled={edge.start} aria-label="Previous products"><ChevronLeft size={18} /></button>
            <button type="button" className="az-carousel__btn" onClick={() => page(1)} disabled={edge.end} aria-label="Next products"><ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="az-carousel">
          <div className="az-carousel__track" ref={track} onScroll={measure} tabIndex={0} aria-label={`${title} carousel`}>
            {items.map((p, i) => <ProductCard key={p._id || p.id || i} product={p} priority={i < 4} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
