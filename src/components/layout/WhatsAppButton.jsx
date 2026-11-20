// Roman Urdu: File frontend/src/components/layout/WhatsAppButton.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { MessageCircle } from 'lucide-react'
import { WHATSAPP } from '../../config'
/** Renders only when VITE_WHATSAPP_NUMBER is set, so no number is ever invented. */
export default function WhatsAppButton() {
  if (!WHATSAPP) return null
  return <a className="az-whatsapp" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={24} /></a>
}
