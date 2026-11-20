// Roman Urdu: File frontend/src/components/theme/Header.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Website ka header, logo aur navigation yahan hain.
import { imageUrl } from '../../imageUrl'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-react'
import { brand, nav } from '../../content/copy'

const eq = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase()

/** Picks a real product photo for the hovered category/subcategory. Returns null if none matches,
 *  so we never show an unrelated image. Adjust field names (category, subCategory) to your Product model. */
export function pickImage(products, category, sub) {
  const match = products.find((p) => eq(p.category, category) && (!sub || eq(p.subCategory, sub)) && (p.images?.[0] || p.image))
  const img = match?.images?.[0] || match?.image
  return img ? (typeof img === 'string' ? img : img.url) : null
}

const defaultLink = (cat, sub) =>
  `/shop?category=${encodeURIComponent(cat)}${sub ? `&subCategory=${encodeURIComponent(sub)}` : ''}`

/**
 * Props
 *  categories: [{ name, subCategories: [{ name }] }]   (from /api/categories)
 *  products:   array from /api/products (used only to choose menu photos)
 *  cartCount:  number from CartContext
 *  onOpenCart: () => void  (CartContext.openCart)
 */
export default function Header({ categories = [], products = [], cartCount = 0, onOpenCart, buildLink = defaultLink }) {
  const [open, setOpen] = useState(null)       // name of the open mega menu
  const [hover, setHover] = useState(null)     // hovered subcategory name
  const [drawer, setDrawer] = useState(false)
  const [accordion, setAccordion] = useState(null)
  const timer = useRef(null)
  const { pathname, search } = useLocation()

  // Close everything on navigation
  useEffect(() => { setOpen(null); setDrawer(false) }, [pathname, search])

  // Escape closes; lock page scroll while the drawer is open
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); setDrawer(false) } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = drawer ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [drawer])

  const show = (name) => { clearTimeout(timer.current); setOpen(name); setHover(null) }
  const hide = () => { timer.current = setTimeout(() => setOpen(null), 140) } // small delay = forgiving mouse path

  return (
    <header className="az-header">
      <div className="az-container az-header__bar">
        <button type="button" className="az-header__menu-btn" onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer}><Menu size={22} /></button>

        <ul className="az-nav">
          {categories.map((cat) => {
            const subs = cat.subCategories || []
            const img = cat.subCategories?.find(s=>eq(s.name,hover))?.image || pickImage(products,cat.name,hover)
            const isOpen = open === cat.name
            return (
              <li key={cat.name} className="az-nav__item" onMouseEnter={() => show(cat.name)} onMouseLeave={hide}
                  onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(null) }}>
                <button type="button" className="az-nav__link" aria-expanded={isOpen} aria-controls={`mega-${cat.name}`} onClick={() => setOpen(isOpen ? null : cat.name)}>
                  {cat.name}<ChevronDown size={12} aria-hidden="true" />
                </button>
                {isOpen && (
                  <div id={`mega-${cat.name}`} className={`az-mega ${img ? '' : 'az-mega--list-only'}`}>
                    <div>
                      <p className="az-mega__title">{cat.name}</p>
                      <ul>
                        {subs.map((s) => (
                          <li key={s.name}><Link to={buildLink(cat.name, s.name)} onMouseEnter={() => setHover(s.name)} onFocus={() => setHover(s.name)}>{s.name}</Link></li>
                        ))}
                      </ul>
                      <Link to={buildLink(cat.name)} className="az-mega__all az-link">View all {cat.name.toLowerCase()}</Link>
                    </div>
                    {img && <div className="az-mega__media"><img src={imageUrl(img)} alt="" /></div>}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <Link to="/" className="az-header__logo" aria-label={`${brand.name} home`}>
          <img src={brand.mark} alt={brand.logoAlt} />
        </Link>

        <div className="az-actions">
          {nav.actions.map((a) => <Link key={a.to} to={a.to} className="az-actions__text">{a.label}</Link>)}
          <button type="button" className="az-nav__link az-bag" onClick={onOpenCart} aria-label={`Open bag, ${cartCount} items`}>
            <ShoppingBag size={20} aria-hidden="true" />
            <span className="az-bag__count">{cartCount}</span>
          </button>
        </div>
      </div>

      {drawer && (
        <>
          <div className="az-drawer-scrim" onClick={() => setDrawer(false)} />
          <nav className="az-drawer" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="az-drawer__head">
              <img src={brand.logo} alt={brand.logoAlt} style={{ height: 56 }} />
              <button type="button" onClick={() => setDrawer(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <ul>
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button type="button" className="az-drawer__row" aria-expanded={accordion === cat.name} onClick={() => setAccordion(accordion === cat.name ? null : cat.name)}>
                    {cat.name}<ChevronDown size={18} style={{ transform: accordion === cat.name ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
                  </button>
                  {accordion === cat.name && (
                    <div className="az-drawer__sub">
                      <Link to={buildLink(cat.name)}>View all</Link>
                      {(cat.subCategories || []).map((s) => <Link key={s.name} to={buildLink(cat.name, s.name)}>{s.name}</Link>)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="az-drawer__plain">
              {nav.actions.map((a) => <Link key={a.to} to={a.to}>{a.label}</Link>)}
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
