// Roman Urdu: File frontend/src/imageUrl.js ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Yahan product image ka path theek hota hai, taa ke upload ki hui tasveer show ho.
// Local /uploads images are served by the API server; bundled /images remain on Vite.
export const imageUrl = (src) => {
  if (!src) return ''
  if (src.startsWith('/uploads/')) {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
    return `${api.replace(/\/api\/?$/, '')}${src}`
  }
  return src
}
