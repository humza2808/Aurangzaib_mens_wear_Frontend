// Roman Urdu: File frontend/src/data/homeImages.js ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
/**
 * Roman Urdu: Is file mein homepage ki tamam tasveeron ke paths hain.
 * Tasveer frontend/public/images/ folder mein rakhein, behtar format WebP hai.
 * Hero: 1200x1200 (1:1). Full slider: 1920x1080 (16:9).
 * Wedding: 900x1200 (3:4). Essentials: 1000x1000 (1:1).
 * Made to measure: 1080x1350 (4:5). Gallery: 900x1125 (4:5).
 * Product cards: 960x1200 (4:5), frontend/public/images/products/ mein.
 * Note: Choti original photo resize se asli detail mein increase nahi hoti.
 */
export const homeImages = {
  // Roman Urdu: Primary hero image, 1200x1200 WebP.
  hero: '/images/hero.svg.webp',
  // Roman Urdu: In teen image files ko isi ratio ki nayi tasveeron se replace kar sakte hain.
  heroSlides: [
    { src: '/images/hero.svg.webp', alt: 'Model wearing a tailored formal suit' },
    { src: '/images/hero-kameez.webp', alt: 'Same model wearing a smart-fit kameez shalwar' },
    { src: '/images/hero-prince-coat.webp', alt: 'Same model wearing a wedding prince coat' },
  ],
  // Roman Urdu: Full screen slider 1920x1080 (16:9), har slide mein poora model visible.
  editorialSlides: [
    { src: '/images/editorial-1.webp', title: 'Wedding Collection', subtitle: 'Designed for every celebration', to: '/shop?category=Eastern%20Wear' },
    { src: '/images/editorial-2.webp', title: 'Eastern Elegance', subtitle: 'Tradition, refined', to: '/shop?category=Eastern%20Wear' },
    { src: '/images/editorial-3.webp', title: 'The Occasion Edit', subtitle: 'Discover the collection', to: '/shop' },
  ],
  // Roman Urdu: Wedding product tiles, 3:4 portrait ratio.
  wedding: ['/images/wedding-1.webp', '/images/wedding-2.webp', '/images/wedding-3.webp'],
  // Roman Urdu: Essentials 1:1 square tiles.
  essentials: ['/images/essentials-1.webp', '/images/essentials-2.webp'],
  // Roman Urdu: Tailoring section 4:5 photo ratio.
  madeToMeasure: ['/images/mtm-1.webp', '/images/mtm-2.webp'],
  // Roman Urdu: Gallery ke photos 4:5 portrait ratio mein.
  gallery: ['/images/gallery-1.webp', '/images/gallery-2.webp', '/images/gallery-3.webp', '/images/gallery-4.webp'],
}
