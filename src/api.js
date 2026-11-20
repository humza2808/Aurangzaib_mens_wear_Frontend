// Roman Urdu: File frontend/src/api.js ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import axios from 'axios'
/** Single Axios instance. Base URL comes from VITE_API_URL; cookies are sent for admin auth. */
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api', withCredentials: true })
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem('awm-admin-token')
  if (t) cfg.headers.Authorization = `Bearer ${t}`
  return cfg
})
export const errMsg = (e, fallback = 'Something went wrong. Try again.') => e?.response?.data?.message || fallback
export default api

// Roman Urdu: Naye backend ke {products:[]} response ko purane UI ke array format mein convert karte hain.
api.interceptors.response.use((response) => {
 const path = response.config.url?.split('?')[0] || ''
 const data = response.data
 if (path === '/products' && data?.products) response.data = data.products
 else if (path.startsWith('/products/') && data?.product) response.data = data.product
 else if (path === '/categories' && data?.categories) response.data = data.categories
 else if (path === '/admin/products' && data?.products) response.data = data.products
 else if (path === '/orders' && data?.order) response.data = data.order
 else if (path === '/admin/orders' && data?.orders) response.data = data.orders
 else if (path === '/admin/appointments' && data?.appointments) response.data = data.appointments
 else if (path === '/admin/contact-requests' && data?.requests) response.data = data.requests
 else if (path === '/admin/subscribers' && data?.subscribers) response.data = data.subscribers
 return response
})
