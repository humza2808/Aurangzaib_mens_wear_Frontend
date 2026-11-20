// Roman Urdu: File frontend/src/components/theme/MadeToMeasure.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { Link } from 'react-router-dom'
import { madeToMeasure } from '../../content/copy'

/**
 * WHITE two-row editorial. Row 1: copy left, fabric photo right. Row 2 is mirrored.
 * Images are supplied via props (local /images/... paths). CTA routes to the live /appointment form.
 * Headings are h3 under the section's h2 and are never italic.
 */
export default function MadeToMeasure({ content = madeToMeasure, images = [] }) {
  return (
    <section className="az-section" aria-labelledby="az-mtm">
      <div className="az-container">
        <div className="az-sechead"><h2 id="az-mtm">{content.title}</h2></div>
        {content.rows.map((row, i) => (
          <div key={row.heading} className={`az-mtm__row ${i % 2 ? 'az-mtm__row--flip' : ''}`}>
            <div className="az-mtm__text">
              <h3>{row.heading}</h3>
              <p>{row.body}</p>
              {row.cta && (
                <div className="az-mtm__cta">
                  <Link to={row.cta.to} className="az-btn">{row.cta.label}</Link>
                  {row.secondary && <Link to={row.secondary.to} className="az-btn az-btn--ghost">{row.secondary.label}</Link>}
                </div>
              )}
            </div>
            <div className="az-mtm__media">
              {(images[i] || row.image) && <img src={images[i] || row.image} alt={row.alt} loading="lazy" width="1200" height="900" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
