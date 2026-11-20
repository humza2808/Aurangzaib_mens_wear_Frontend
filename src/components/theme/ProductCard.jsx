// Roman Urdu: File frontend/src/components/theme/ProductCard.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Product listing mein har product ka card yahan banta hai.
import { imageUrl } from '../../imageUrl'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { states } from '../../content/copy'

/** Accepts the API product shape tolerantly; adjust the field names here if yours differ. */
export function normalizeProduct(p = {}) {
  const imgs = Array.isArray(p.images) ? p.images : []
  const pick = (i) => (typeof imgs[i] === 'string' ? imgs[i] : imgs[i]?.url) || null
  return {
    id: p._id || p.id,
    name: p.name || p.title || '',
    image: pick(0) || p.image || null,
    altImage: pick(1),
    price: Number(p.price),
    salePrice: p.salePrice ? Number(p.salePrice) : null,
    soldOut: p.inStock === false || Number(p.stock) === 0,
    badge: p.badge || '',
    sizes: p.sizes || [],
    colors: p.colors || [],
    stock: p.stock,
  }
}

const rs = (n) => `Rs. ${Number(n).toLocaleString('en-PK')}`

/** Roman Urdu: Har product card ke liye 960x1200 WebP (4:5); second image hover par dikhegi, crop nahi hogi. */
export default function ProductCard({ product, priority = false }) {
  const p = normalizeProduct(product)
  const { addItem } = useCart()
  const [quickOpen, setQuickOpen] = useState(false)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const onSale = p.salePrice && p.salePrice < p.price
  // Roman Urdu: Quick Shop mein size aur colour select kar ke asli cart mein add hota hai.
  const quickAdd = () => {
    if (p.soldOut) return
    if (p.sizes.length && !size) { setError('Please select a size.'); return }
    if (p.colors.length && !color) { setError('Please select a colour.'); return }
    if (Number.isFinite(p.stock) && qty > p.stock) { setError('Not enough stock available.'); return }
    addItem(product, { size, color }, qty)
    setQuickOpen(false); setError('')
  }
  return (
    <article className="az-card">
      <div className="az-card__media">
        <Link to={`/product/${p.id}`} className="az-card__image-link">
          {/* Roman Urdu: Product photo ratio 4:5 (960x1200). Original model ko contain mode mein fit karein. */}
          {p.image && <img src={imageUrl(p.image)} alt={p.name} width="800" height="1000" loading={priority ? 'eager' : 'lazy'} />}
          {p.altImage && <img className="az-card__alt" src={imageUrl(p.altImage)} alt="" loading="lazy" />}
          {(p.soldOut || p.badge) && <span className="az-card__tag">{p.soldOut ? states.soldOut : p.badge}</span>}
        </Link>
        <button type="button" className="az-card__quick" onClick={() => { setSize(''); setColor(p.colors.length===1?p.colors[0]:''); setQty(1); setError(''); setQuickOpen(true) }} aria-label={`Quick shop ${p.name}`}>+ Quick shop</button>
      </div>
      <Link to={`/product/${p.id}`} className="az-card__link">
        <h3 className="az-card__title">{p.name}</h3>
        <p className="az-card__price">
          {onSale ? (<><span className="az-card__regular-price">{rs(p.price)}</span><s className="az-card__cut-price">{rs(p.salePrice)}</s></>) : rs(p.price)}
        </p>
      </Link>
      {quickOpen && <div className="az-quick__backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setQuickOpen(false)}}>
        <div className="az-quick__panel" role="dialog" aria-modal="true" aria-label={`Quick shop ${p.name}`}>
          <button type="button" className="az-quick__close" onClick={()=>setQuickOpen(false)} aria-label="Close quick shop">×</button>
          {/* Roman Urdu: Product photo ratio 4:5 (960x1200). Original model ko contain mode mein fit karein. */}
          {p.image && <img src={imageUrl(p.image)} alt={p.name} />}
          <div className="az-quick__content"><h2>{p.name}</h2><p>{rs(onSale?p.salePrice:p.price)}</p>
          {p.sizes.length>0 && <div><strong>Size</strong><div className="az-quick__options">{p.sizes.map(v=><button type="button" key={v} className={size===v?'is-on':''} onClick={()=>{setSize(v);setError('')}}>{v}</button>)}</div></div>}
          {p.colors.length>0 && <div><strong>Colour</strong><div className="az-quick__options">{p.colors.map(v=><button type="button" key={v} className={color===v?'is-on':''} onClick={()=>{setColor(v);setError('')}}>{v}</button>)}</div></div>}
          <div className="az-quick__qty"><button type="button" onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span>{qty}</span><button type="button" onClick={()=>setQty(Math.min(p.stock||1,qty+1))}>+</button></div>
          {error && <p role="alert" className="az-error">{error}</p>}
          <button type="button" className="az-btn" onClick={quickAdd} disabled={p.soldOut}>{p.soldOut?'Sold out':'Add to Cart'}</button>
          <Link to={`/product/${p.id}`} onClick={()=>setQuickOpen(false)}>View full details</Link></div>
        </div>
      </div>}
    </article>
  )
}
