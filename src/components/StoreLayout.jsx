// Roman Urdu: File frontend/src/components/StoreLayout.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import api, { errMsg } from '../api'
import { useCart } from '../context/CartContext'
import { fallbackCategories } from '../data/fallbackProducts'
import Announcement from './theme/Announcement'
import Header from './theme/Header'
import Footer from './theme/Footer'
import CartDrawer from './layout/CartDrawer'
import WhatsAppButton from './layout/WhatsAppButton'
import SmoothScroll from './SmoothScroll'
import ScrollToTop from './ScrollToTop'

/** Shared shell for every public page. Loads categories and products once for the mega menu. */
export default function StoreLayout() {
  const { count, openCart } = useCart()
  const [categories, setCategories] = useState(fallbackCategories)
  const [products, setProducts] = useState([])
  useEffect(() => {
    api.get('/categories').then((r) => r.data.length && setCategories(r.data)).catch(() => {})
    api.get('/products').then((r) => setProducts(r.data)).catch(() => {})
  }, [])
  const subscribe = async (email) => { try { await api.post('/subscribers', { email }) } catch (e) { throw new Error(errMsg(e)) } }
  return (
    <SmoothScroll>
      <div className="az-store">
        <a href="#main" className="az-sr-only">Skip to content</a>
        <ScrollToTop />
        <Announcement />
        <Header categories={categories} products={products} cartCount={count} onOpenCart={openCart} />
        <main id="main"><Outlet context={{ products }} /></main>
        <Footer onSubscribe={subscribe} contact={[
          { label: 'Shop#2 plot 22D, Sunset Lane 1, D.H.A Phase II Extension Phase 2 Commercial Area Defence Housing Authority, Karachi, 75500', href: 'https://www.google.com/maps/search/?api=1&query=Shop%232+plot+22D+Sunset+Lane+1+DHA+Phase+II+Extension+Karachi' },
          { label: '+92 344 3022668', href: 'tel:+923443022668' },
          { label: 'menswear@gmail.com', href: 'mailto:menswear@gmail.com' },
        ]} />
        <CartDrawer />
        <WhatsAppButton />
      </div>
    </SmoothScroll>
  )
}
