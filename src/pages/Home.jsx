// Roman Urdu: File frontend/src/pages/Home.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import {useEffect,useState} from 'react'
import api from '../api'
import { useOutletContext } from 'react-router-dom'
import Hero from '../components/theme/Hero'
import FullBleedSlider from '../components/theme/FullBleedSlider'
import ProductCarousel from '../components/theme/ProductCarousel'
import CollectionGrid from '../components/theme/CollectionGrid'
import MadeToMeasure from '../components/theme/MadeToMeasure'
import EditorialGallery from '../components/theme/EditorialGallery'
import { homeImages } from '../data/homeImages'
import { newArrivals, wedding, essentials } from '../content/copy'

/** Only Eastern and Western wear appear in the New Arrivals carousel. */
export const isClothingProduct = (p) => ['eastern wear', 'western wear'].includes(String(p.category || '').toLowerCase())

const withImages = (tiles, imgs) => tiles.map((t, i) => ({ ...t, image: imgs[i] || t.image }))

export default function Home() {
  const { products } = useOutletContext()
  const [gallery,setGallery]=useState(null)
  useEffect(()=>{api.get('/gallery').then(r=>{
    // Roman Urdu: Sirf Admin Gallery mein saved images hi homepage par show hongi.
    setGallery(Array.isArray(r.data?.images) ? r.data.images : [])
  }).catch(()=>setGallery([]))},[])
  const clothing = products.filter(isClothingProduct)
  const flagged = clothing.filter((p) => p.isNewArrival)
  // Roman Urdu: New arrivals mein sirf admin se marked products dikhne chahiye. Fallback nahi.
  const arrivals = flagged.slice(0, 8)
  return (
    <>
      <Hero image={homeImages.hero} alt="Aurangzaib menswear campaign" />
      <ProductCarousel products={arrivals} max={8} {...newArrivals} />
      <CollectionGrid {...wedding} tiles={withImages(wedding.tiles, homeImages.wedding)} />
      <FullBleedSlider />
      {/* Roman Urdu: Eastern aur Western cards ko mobile par alag ratio diya gaya hai, desktop same rahega. */}
      <CollectionGrid {...essentials} tiles={withImages(essentials.tiles, homeImages.essentials)} ratio="4 / 3" sectionClass="az-essentials-section" />
      <EditorialGallery images={gallery || []} />
      <MadeToMeasure images={homeImages.madeToMeasure} />
    </>
  )
}
