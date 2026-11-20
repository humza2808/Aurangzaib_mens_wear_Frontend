// Roman Urdu: File frontend/src/App.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Yahan website ke routes hain. Har URL ka page yahan connect hota hai.
import { Navigate, Route, Routes } from 'react-router-dom'
import StoreLayout from './components/StoreLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Gallery from './pages/Gallery'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'
import StoreInfo from './pages/StoreInfo'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminProducts from './pages/admin/AdminProducts'
import AdminCategories from './pages/admin/AdminCategories'
import AdminContacts from './pages/admin/AdminContacts'
import AdminSubscribers from './pages/admin/AdminSubscribers'
import AdminGallery from './pages/admin/AdminGallery'

/** ALL public and admin routes live here. */
export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/info/:slug" element={<StoreInfo />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="contact-requests" element={<AdminContacts />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
