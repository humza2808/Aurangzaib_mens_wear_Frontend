// Roman Urdu: File frontend/src/pages/ProductDetails.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Single product ka naam, price, images aur options yahan show hote hain.
import { imageUrl } from '../imageUrl'
import { ChevronLeft, ChevronRight, ZoomIn, X, Ruler } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'
import { useCart } from '../context/CartContext'
import { rs } from '../config'
import { states } from '../content/copy'
import SizeGuideModal from '../components/SizeGuideModal'

export default function ProductDetails() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [p, setP] = useState(null)
  const [status, setStatus] = useState('loading')
  const [img, setImg] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [qty, setQty] = useState(1)
  const [warn, setWarn] = useState('')
  const [guide, setGuide] = useState(false)
  const [ratingBusy,setRatingBusy]=useState(false)
  const [ratingMessage,setRatingMessage]=useState('')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [shippingOpen, setShippingOpen] = useState(false)

  useEffect(() => {
    setStatus('loading'); setImg(0); setSize(''); setColor(''); setQty(1)
    api.get(`/products/${id}`).then((r) => { setP(r.data.product || r.data); setColor((r.data.product || r.data).colors?.length === 1 ? (r.data.product || r.data).colors[0] : ''); setStatus('ready') }).catch((e) => setStatus(e.response?.status === 404 ? 'missing' : 'error'))
  }, [id])

  useEffect(() => {
    if (!zoomOpen) return
    const onKey = e => { if(e.key==='Escape')setZoomOpen(false); if(e.key==='ArrowRight')setImg(i=>(i+1)%Math.max(p?.images?.length||1,1)); if(e.key==='ArrowLeft')setImg(i=>(i-1+Math.max(p?.images?.length||1,1))%Math.max(p?.images?.length||1,1)) }
    window.addEventListener('keydown',onKey)
    return ()=>window.removeEventListener('keydown',onKey)
  },[zoomOpen,p?.images?.length])

  if (status === 'loading') return <div className="az-container az-section"><div className="az-skeleton" style={{ maxWidth: 480 }} /></div>
  if (status !== 'ready') return <div className="az-container az-section az-state"><p>{status === 'missing' ? 'This product is no longer available.' : states.error}</p><Link to="/shop" className="az-btn">{states.continueShopping}</Link></div>

  const available = p.inStock !== false && (typeof p.stock !== 'number' || p.stock > 0)
  const onSale = p.salePrice && p.salePrice < p.price
  const submitRating = async (value) => {
    if(ratingBusy) return
    // Roman Urdu: Same browser se ek product par ek rating allow hai.
    const key=`awm-rating-${p._id}`
    if(localStorage.getItem(key)){setRatingMessage('You already rated this product.');return}
    setRatingBusy(true);setRatingMessage('')
    try {
      const {data}=await api.post(`/products/${p._id}/rating`,{rating:value})
      setP(old=>({...old,ratingCount:data.ratingCount,ratingTotal:data.ratingAverage*data.ratingCount}))
      localStorage.setItem(key,'1');setRatingMessage('Thank you for your rating!')
    } catch {setRatingMessage('Could not save rating. Please try again.')}
    finally {setRatingBusy(false)}
  }
  const add = () => {
    if (!available || qty > (p.stock ?? Infinity)) { setWarn('Requested quantity is not available.'); return }
    if (p.sizes?.length && !size) { setWarn(states.chooseSize); return }
    setWarn(''); addItem(p, { size, color }, qty)
  }
  return (
    <section className="az-section">
      <div className="az-container az-pdp">
        <div className="az-pdp__gallery">
          <div className="az-pdp__main az-pdp__viewer">
            {p.images?.[img] && <img src={imageUrl(p.images[img])} alt={`${p.name}, view ${img+1}`} />}
            {p.images?.length>1 && <><button type="button" className="az-gallery-arrow az-gallery-arrow--left" aria-label="Previous photo" onClick={()=>setImg(i=>(i+p.images.length-1)%p.images.length)}><ChevronLeft/></button><button type="button" className="az-gallery-arrow az-gallery-arrow--right" aria-label="Next photo" onClick={()=>setImg(i=>(i+1)%p.images.length)}><ChevronRight/></button></>}
            <button type="button" className="az-gallery-zoom" aria-label="Zoom product image" onClick={()=>setZoomOpen(true)}><ZoomIn size={19}/></button>
            {p.images?.length>1 && <span className="az-gallery-count">{img+1} / {p.images.length}</span>}
          </div>
          {p.images?.length > 1 && <div className="az-pdp__thumbs">{p.images.map((src, i) => (
            <button key={src} type="button" className={i === img ? 'is-on' : ''} onClick={() => setImg(i)} aria-label={`Show photo ${i + 1}`} aria-pressed={i === img}><img src={imageUrl(src)} alt="" /></button>))}</div>}
        </div>
        <div className="az-pdp__info">
          <p className="az-muted az-small"><Link to={`/shop?category=${encodeURIComponent(p.category)}`} className="az-link">{p.category}</Link></p>
          {p.isNewArrival && <span className="az-pdp__badge">New arrival</span>}<h1>{p.name}</h1><div className="az-pdp__reviews"><span className="az-rating-stars" aria-label="Rate this product">{[1,2,3,4,5].map(star=><button key={star} type="button" disabled={ratingBusy} onClick={()=>submitRating(star)} aria-label={`Rate ${star} stars`} title={`Rate ${star} stars`}>{star<=Math.round((p.ratingTotal||0)/(p.ratingCount||1))?'★':'☆'}</button>)}</span><span className="az-rating-note">{p.ratingCount ? `${(p.ratingTotal/p.ratingCount).toFixed(1)} / 5 (${p.ratingCount} ratings)`:'Be the first to rate'}</span>{ratingMessage&&<span role="status" className="az-rating-note">{ratingMessage}</span>}</div>
          <p className="az-pdp__price">{onSale ? <><strong>{rs(p.price)}</strong><s className="az-muted">{rs(p.salePrice)}</s></> : <strong>{rs(p.price)}</strong>}</p>
          
          {p.colors?.length > 0 && <fieldset className="az-opts"><legend>Colour{color ? `: ${color}` : ''}</legend>
            {p.colors.map((c) => <button key={c} type="button" className={`az-chip ${color === c ? 'is-on' : ''}`} aria-pressed={color === c} onClick={() => setColor(c)}>{c}</button>)}</fieldset>}
          {p.sizes?.length > 0 && <fieldset className="az-opts"><legend className="az-sr-only">Size options</legend><div className="az-pdp__size-row"><span>Size{size ? `: ${size}` : ''}</span><button type="button" className="az-size-guide-link" onClick={() => setGuide(true)}><Ruler size={17}/> Size guide</button></div>
            {p.sizes.map((s) => <button key={s} type="button" className={`az-chip ${size === s ? 'is-on' : ''}`} aria-pressed={size === s} onClick={() => { setSize(s); setWarn('') }}>{s}</button>)}</fieldset>}
          {available && <p className="az-product-availability">{p.stock > 0 ? `${p.stock} Available` : 'Available'}</p>}
          {available && p.stock>0 && p.stock<=5 && <div className="az-pdp__urgency">Only {p.stock} left in stock<div><span style={{width:`${Math.min(100,p.stock*18)}%`}}/></div></div>}
          <div className="az-pdp__buy"><div className="az-qty az-qty--lg"><button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button><span aria-live="polite">{qty}</span><button type="button" onClick={() => setQty((q) => Math.min(p.stock ?? 9999, q + 1))} aria-label="Increase quantity">+</button></div>
          {warn && <p className="az-error" role="alert">{warn}</p>}
          <button type="button" className="az-btn az-pdp__cart-btn" onClick={add} disabled={!available}>{available ? 'Add To Cart' : states.soldOut}</button></div>
          <div className="az-pdp__accordions">
            <button type="button" onClick={() => setDetailsOpen(!detailsOpen)} aria-expanded={detailsOpen}>DESCRIPTION <span>{detailsOpen ? '−' : '+'}</span></button>
            {detailsOpen && <p>{p.description || 'Premium quality menswear, thoughtfully designed for a refined fit.'}</p>}
            <button type="button" onClick={() => setShippingOpen(!shippingOpen)} aria-expanded={shippingOpen}>SHIPPING INFORMATION <span>{shippingOpen ? '−' : '+'}</span></button>
            {shippingOpen && <p>Cash on delivery is available. Shipping charges and the final total are displayed at checkout.</p>}
          </div>
          <div className="az-pdp__note"><strong>Made for your style</strong><p>Need custom sizing? Contact our team to discuss your requirements before ordering.</p></div>
        </div>
      </div>
      {zoomOpen && <div className="az-image-lightbox" role="dialog" aria-modal="true" aria-label="Product image zoom" onClick={()=>setZoomOpen(false)}>
        <button type="button" className="az-image-lightbox__close" onClick={()=>setZoomOpen(false)} aria-label="Close zoom"><X/></button>
        {p.images?.length>1 && <button type="button" className="az-image-lightbox__prev" aria-label="Previous image" onClick={e=>{e.stopPropagation();setImg(i=>(i+p.images.length-1)%p.images.length)}}><ChevronLeft/></button>}
        <img src={imageUrl(p.images?.[img])} alt={`${p.name} enlarged`} onClick={e=>e.stopPropagation()} />
        {p.images?.length>1 && <button type="button" className="az-image-lightbox__next" aria-label="Next image" onClick={e=>{e.stopPropagation();setImg(i=>(i+1)%p.images.length)}}><ChevronRight/></button>}
      </div>}
      <SizeGuideModal open={guide} onClose={() => setGuide(false)} product={p} />
    </section>
  )
}
