// Roman Urdu: File frontend/src/pages/Gallery.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { imageUrl } from '../imageUrl'
import {useEffect,useState} from 'react'
import api from '../api'

export default function Gallery() {
  const [gallery,setGallery]=useState(null)
  useEffect(()=>{api.get('/gallery').then(r=>setGallery(Array.isArray(r.data?.images)?r.data.images:[])).catch(()=>setGallery([]))},[])
  // Roman Urdu: Gallery page par sirf admin se upload ki hui images dikhengi, products nahi.
  const imgs = gallery || []
  return (
    <section className="az-section"><div className="az-container">
      <div className="az-sechead"><div className="az-sechead__text"><h1>Gallery</h1><p className="az-muted">A look at the collection.</p></div></div>
      <div className="az-gallery">{imgs.map((src, i) => <img key={src + i} src={imageUrl(src)} alt="" loading="lazy" />)}</div>
    </div></section>
  )
}
