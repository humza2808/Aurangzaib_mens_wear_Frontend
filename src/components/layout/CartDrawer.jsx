// Roman Urdu: File frontend/src/components/layout/CartDrawer.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { imageUrl } from '../../imageUrl'
import { useEffect, useState } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { rs } from '../../config'
import { states } from '../../content/copy'

/** Slide-in bag. Closes on Escape or scrim click and locks page scroll while open. */
export default function CartDrawer() {
  const { items, total, drawerOpen, closeCart, updateQuantity, removeItem, addItem } = useCart()
  const [suggestions,setSuggestions]=useState([])
  const [selected,setSelected]=useState({})
  useEffect(()=>{if(drawerOpen){api.get('/products',{params:{limit:24}}).then(r=>setSuggestions((Array.isArray(r.data)?r.data:[]).filter(x=>x.inStock&&x.stock>0&&!items.some(i=>i.productId===x._id)).slice(0,4))).catch(()=>{})}},[drawerOpen,items.length])
  useEffect(() => {
    if (!drawerOpen) return
    const k = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', k)
    document.documentElement.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.documentElement.style.overflow = '' }
  }, [drawerOpen, closeCart])
  if (!drawerOpen) return null
  return (
    <>
      <div className="az-drawer-scrim" onClick={closeCart} />
      <aside className="az-bagdrawer" role="dialog" aria-modal="true" aria-label="Your bag">
        <div className="az-bagdrawer__head"><h2>My Selected Pieces <span>· {items.length}</span></h2><button type="button" onClick={closeCart} aria-label="Close bag"><X size={22} /></button></div>
        {items.length === 0 ? (
          <div className="az-state"><p>{states.emptyBag}</p><Link to="/shop" className="az-btn" onClick={closeCart}>{states.continueShopping}</Link></div>
        ) : (
          <>
            <ul className="az-lines">
              {items.map((i) => (
                <li key={i.key} className="az-line-item">
                  <div className="az-line-item__img">{i.image && <img src={imageUrl(i.image)} alt="" />}</div>
                  <div>
                    <p>{i.name}</p>
                    <p className="az-muted az-small">{[i.size, i.color].filter(Boolean).join(' · ')}</p>
                    <div className="az-qty">
                      <button type="button" onClick={() => updateQuantity(i.key, i.quantity - 1)} aria-label={`Decrease ${i.name}`}><Minus size={14} /></button>
                      <span aria-live="polite">{i.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(i.key, i.quantity + 1)} aria-label={`Increase ${i.name}`}><Plus size={14} /></button>
                    </div>
                  </div>
                  <div className="az-line-item__end"><p>{rs(i.price * i.quantity)}</p><button type="button" className="az-link az-small" onClick={() => removeItem(i.key)}>Remove</button></div>
                </li>
              ))}
            </ul>
            {suggestions.length>0&&<div className="az-bagdrawer__suggest"><h3>You May Also Like</h3>{suggestions.slice(0,2).map(p=><div key={p._id} className="az-bagdrawer__suggest-item"><img src={imageUrl(p.image||p.images?.[0])} alt=""/><div><strong>{p.name}</strong><p>{rs(p.salePrice||p.price)}</p><select aria-label={`Size for ${p.name}`} value={selected[p._id]||p.sizes?.[0]||''} onChange={e=>setSelected(v=>({...v,[p._id]:e.target.value}))}>{(p.sizes||[]).map(size=><option key={size}>{size}</option>)}</select></div><button className="az-btn" onClick={()=>addItem(p,{size:selected[p._id]||p.sizes?.[0]||'',color:p.colors?.[0]||''},1)}>Add</button></div>)}</div>}
            <div className="az-bagdrawer__foot"><div className="az-bagdrawer__delivery">Your order will be delivered in 3-5 working days.</div>
              <p className="az-row"><span>Subtotal</span><span>{rs(total)}</span></p>
              <p className="az-muted az-small">Shipping charges will be confirmed at checkout.</p>
              <Link to="/checkout" className="az-btn" onClick={closeCart}>Checkout · {rs(total)}</Link>
              <Link to="/cart" className="az-btn az-btn--ghost" onClick={closeCart}>View bag</Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
