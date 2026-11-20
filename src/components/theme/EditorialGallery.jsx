// Roman Urdu: File frontend/src/components/theme/EditorialGallery.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useState } from 'react'
import {imageUrl} from '../../imageUrl'
import { Link } from 'react-router-dom'
import './editorial-gallery.css'

// Roman Urdu: Gallery ki images frontend/src/data/homeImages.js se aati hain.
// Image change karni ho to public/images folder mein file replace kar dein.
export default function EditorialGallery({ images = [] }) {
  const [active, setActive] = useState(-1)
  const items = images.filter(Boolean)
  if (!items.length) return null
  return (
    <section className="az-section az-editorial" aria-labelledby="editorial-title">
      <div className="az-container">
        <div className="az-sechead">
          <div className="az-sechead__text">
            <p className="az-editorial__eyebrow">THE AURANGZAIB EDIT</p>
            <h2 id="editorial-title">A closer look at the craft.</h2>
            <p className="az-muted">Details, textures and timeless silhouettes from our menswear collection.</p>
          </div>
          <Link className="az-link" to="/gallery">Explore gallery</Link>
        </div>
        <div className="az-editorial__grid">
          {items.slice(0, 4).map((src, i) => (
            <button type="button" key={src} className={`az-editorial__tile az-editorial__tile--${i+1}`} onClick={() => setActive(i)} aria-label={`View gallery image ${i+1}`}>
              <img src={imageUrl(src)} alt={['Signature occasion wear','Refined menswear','Modern tailoring','The finishing details'][i]} loading="lazy" />
              <span className="az-editorial__tile-label">{['01 / SIGNATURE','02 / COLLECTION','03 / TAILORING','04 / DETAILS'][i]}</span>
            </button>
          ))}
        </div>
      </div>
      {active >= 0 && <div className="az-editorial__lightbox" role="dialog" aria-modal="true" aria-label="Gallery preview" onClick={() => setActive(-1)}>
        <button className="az-editorial__close" type="button" aria-label="Close image" onClick={() => setActive(-1)}>×</button>
        <button type="button" aria-label="Previous image" onClick={(e) => {e.stopPropagation();setActive((active+items.length-1)%items.length)}}>‹</button>
        <img src={imageUrl(items[active])} alt={`Gallery image ${active+1}`} onClick={(e) => e.stopPropagation()}/>
        <button type="button" aria-label="Next image" onClick={(e) => {e.stopPropagation();setActive((active+1)%items.length)}}>›</button>
      </div>}
    </section>
  )
}
