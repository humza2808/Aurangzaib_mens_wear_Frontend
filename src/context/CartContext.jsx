// Roman Urdu: File frontend/src/context/CartContext.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Yahan cart ka data aur add/remove product ka logic hai.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const KEY = 'awm-cart' // localStorage key, kept from the original project

const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)
  const [drawerOpen, setDrawerOpen] = useState(false)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* storage full or blocked */ } }, [items])

  /** addItem(product, { size, color }, quantity) */
  const addItem = useCallback((product, variant = {}, quantity = 1) => {
    const id = product._id || product.id
    const key = `${id}-${variant.size || ''}-${variant.color || ''}`
    const price = product.salePrice && product.salePrice < product.price ? product.salePrice : product.price
    setItems((prev) => {
      const hit = prev.find((i) => i.key === key)
      if (hit) return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i))
      return [...prev, { key, productId: id, name: product.name, price, image: product.images?.[0] || '', size: variant.size || '', color: variant.color || '', quantity }]
    })
    setDrawerOpen(true)
  }, [])
  const updateQuantity = useCallback((key, quantity) => setItems((p) => (quantity < 1 ? p.filter((i) => i.key !== key) : p.map((i) => (i.key === key ? { ...i, quantity } : i)))), [])
  const removeItem = useCallback((key) => setItems((p) => p.filter((i) => i.key !== key)), [])
  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo(() => ({
    items, addItem, updateQuantity, removeItem, clearCart,
    total: items.reduce((s, i) => s + i.price * i.quantity, 0),
    count: items.reduce((s, i) => s + i.quantity, 0),
    drawerOpen, openCart: () => setDrawerOpen(true), closeCart: () => setDrawerOpen(false),
  }), [items, drawerOpen, addItem, updateQuantity, removeItem, clearCart])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext)
