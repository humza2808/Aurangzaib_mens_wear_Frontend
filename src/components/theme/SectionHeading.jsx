// Roman Urdu: File frontend/src/components/theme/SectionHeading.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { Link } from 'react-router-dom'

/**
 * Consistent heading block for every home section.
 * `level` keeps the document outline correct (home page: one h1 in the hero, h2 here).
 */
export default function SectionHeading({ title, body, cta, align = 'left', as: Tag = 'h2', id }) {
  return (
    <div className={`az-sechead ${align === 'center' ? 'az-sechead--center' : ''}`}>
      <div className="az-sechead__text">
        <Tag id={id}>{title}</Tag>
        {body && <p className="az-muted">{body}</p>}
      </div>
      {cta && <Link to={cta.to} className="az-link">{cta.label}</Link>}
    </div>
  )
}
