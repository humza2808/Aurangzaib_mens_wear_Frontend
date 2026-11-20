// Roman Urdu: File frontend/src/components/SmoothScroll.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { ReactLenis } from 'lenis/react'
/** Lenis smooth scroll for the public storefront only. Skipped when the OS asks for reduced motion. */
export default function SmoothScroll({ children }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return children
  return <ReactLenis root options={{ lerp: 0.12, syncTouch: false }}>{children}</ReactLenis>
}
