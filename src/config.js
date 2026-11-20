// Roman Urdu: File frontend/src/config.js ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Yahan frontend ka API address set hota hai. Backend ka URL badalna ho to yahan dekhein.
export const DELIVERY_FEE = 250 // must match backend/src/config.js
export const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || ''
export const rs = (n) => `Rs. ${Number(n || 0).toLocaleString('en-PK')}`
