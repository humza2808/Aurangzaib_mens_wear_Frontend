// Roman Urdu: File frontend/src/pages/Cart.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { imageUrl } from '../imageUrl'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { rs } from '../config'
import { states } from '../content/copy'

export default function Cart() {
  const { items, total, updateQuantity, removeItem } = useCart()
  if (!items.length) return <section className="az-section"><div className="az-container az-state"><h1>Your bag</h1><p>{states.emptyBag}</p><Link to="/shop" className="az-btn">{states.continueShopping}</Link></div></section>
  return (
    <section className="az-section"><div className="az-container az-cart">
      <div><h1>Your bag</h1>
        <ul className="az-lines az-lines--page">{items.map((i) => (
          <li key={i.key} className="az-line-item">
            <div className="az-line-item__img">{i.image && <img src={imageUrl(i.image)} alt="" />}</div>
            <div><Link to={`/product/${i.productId}`} className="az-link">{i.name}</Link><p className="az-muted az-small">{[i.size, i.color].filter(Boolean).join(' · ')}</p>
              <div className="az-qty"><button type="button" onClick={() => updateQuantity(i.key, i.quantity - 1)} aria-label={`Decrease ${i.name}`}>−</button><span>{i.quantity}</span><button type="button" onClick={() => updateQuantity(i.key, i.quantity + 1)} aria-label={`Increase ${i.name}`}>+</button></div></div>
            <div className="az-line-item__end"><p>{rs(i.price * i.quantity)}</p><button type="button" className="az-link az-small" onClick={() => removeItem(i.key)}>Remove</button></div>
          </li>))}</ul></div>
      <aside className="az-summary"><h2>Summary</h2><p className="az-row"><span>Subtotal</span><span>{rs(total)}</span></p><p className="az-muted az-small">Delivery is added at checkout.</p><Link to="/checkout" className="az-btn">Checkout</Link></aside>
    </div></section>
  )
}
