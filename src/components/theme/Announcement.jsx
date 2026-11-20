// Roman Urdu: File frontend/src/components/theme/Announcement.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { Link } from 'react-router-dom'
import { announcement } from '../../content/copy'

/** Slim black bar above the header. Text and link come from content/copy.js. */
export default function Announcement({ text = announcement.text, link = announcement.link }) {
  return (
    <div className="az-announce" role="region" aria-label="Announcement">
      {text}
      {link && <Link to={link.to}>{link.label}</Link>}
    </div>
  )
}
