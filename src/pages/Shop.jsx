// Roman Urdu: File frontend/src/pages/Shop.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Shop page ki product listing aur filters ka code yahan hai.
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api'
import ProductCard from '../components/theme/ProductCard'
import { states } from '../content/copy'

/** Collection browsing. All filters live in the URL so links from the menu and back button just work. */
export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const [term, setTerm] = useState(params.get('search') || '')
  const category = params.get('category') || ''
  const subCategory = params.get('subCategory') || ''
  const newArrival = params.get('newArrival') === '1' ? '1' : ''
  const sort = params.get('sort') || 'newest'

  useEffect(() => {
    setStatus('loading')
    const q = { category, subCategory, newArrival, sort, search: params.get('search') || '' }
    api.get('/products', { params: Object.fromEntries(Object.entries(q).filter(([, v]) => v)) })
      .then((r) => { const rows = Array.isArray(r.data) ? r.data : (r.data?.products || []); setProducts(newArrival ? rows.filter((item) => item.isNewArrival === true && ['Eastern Wear','Western Wear'].includes(item.category)) : rows); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [category, subCategory, newArrival, sort, params, reloadKey])

  const set = (k, v) => { const n = new URLSearchParams(params); v ? n.set(k, v) : n.delete(k); setParams(n) }
  const title = newArrival === '1' ? 'New arrivals' : subCategory || category || 'All products'

  const clearFilters = () => { setTerm(''); setParams(newArrival === '1' ? { newArrival: '1' } : {}) }

  return (
    <section className="az-section az-shop">
      <div className="az-container">
        <div className="az-sechead">
          <div className="az-sechead__text"><h1>{title}</h1>{status === 'ready' && <p className="az-muted">{products.length} {products.length === 1 ? 'piece' : 'pieces'}</p>}</div>
        </div>
        <div className="az-toolbar">
          <form role="search" onSubmit={(e) => { e.preventDefault(); set('search', term.trim()) }} className="az-toolbar__search">
            <label className="az-sr-only" htmlFor="shop-search">Search products</label>
            <input id="shop-search" className="az-input" placeholder="Search products" value={term} onChange={(e) => setTerm(e.target.value)} />
            <button className="az-btn" type="submit">Search</button>
          </form>
          <div className="az-field">
            <label className="az-sr-only" htmlFor="shop-sort">Sort</label>
            <select id="shop-sort" className="az-input" value={sort} onChange={(e) => set('sort', e.target.value === 'newest' ? '' : e.target.value)}>
              <option value="newest">Newest</option><option value="price-asc">Price, low to high</option><option value="price-desc">Price, high to low</option>
            </select>
          </div>
        </div>
        {status === 'loading' && <div className="az-grid">{Array.from({ length: 8 }, (_, i) => <div key={i} className="az-skeleton" aria-hidden="true" />)}<p className="az-sr-only" role="status">{states.loading}</p></div>}
        {status === 'error' && <div className="az-state"><p>{states.error}</p><button className="az-btn" onClick={() => setReloadKey((k) => k + 1)}>{states.retry}</button></div>}
        {status === 'ready' && products.length === 0 && <div className="az-state"><p>{newArrival === '1' ? 'No new arrivals available yet. Products marked as New arrival in the admin panel will appear here.' : states.emptyShop}</p><button type="button" className="az-btn" onClick={clearFilters}>{states.clearFilters}</button></div>}
        {status === 'ready' && products.length > 0 && <div className="az-grid">{products.map((p, i) => <ProductCard key={p._id} product={p} priority={i < 4} />)}</div>}
      </div>
    </section>
  )
}
