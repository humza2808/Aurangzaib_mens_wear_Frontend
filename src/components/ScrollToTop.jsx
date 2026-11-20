// Roman Urdu: File frontend/src/components/ScrollToTop.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
/** Force top of document after navigation, including when Lenis owns scrolling. */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()
  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) { el.scrollIntoView({behavior:'instant'}); return }
    }
    window.lenis?.scrollTo?.(0, { immediate: true, force: true })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo({top:0,left:0,behavior:'instant'})
    requestAnimationFrame(() => window.scrollTo(0,0))
  }, [pathname,search,hash])
  return null
}
