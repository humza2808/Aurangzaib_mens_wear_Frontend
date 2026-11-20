// Roman Urdu: File frontend/src/components/theme/CollectionGrid.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'

/**
 * Used for BOTH "Wedding season" and "Casual and formal essentials".
 * Same component, same spacing: the .az-section + .az-section rule in base.css removes the
 * doubled gap between consecutive white sections.
 * tiles: [{ title, cta, to, image }]. `ratio` controls the image crop, e.g. '3 / 4' or '4 / 3'.
 */
export default function CollectionGrid({ title, body, tiles = [], ratio = '3 / 4', sectionClass = '' }) {
  // Roman Urdu: Wedding tile image 900x1200 (3:4); essentials tile 1000x1000 (1:1).
  const id = 'az-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-') // valid, space-free id
  return (
    <section className={`az-section ${sectionClass}`.trim()} aria-labelledby={id}>
      <div className="az-container">
        <SectionHeading id={id} title={title} body={body} />
        <div className="az-tiles" style={{ '--cols': tiles.length, '--ratio': ratio }}>
          {tiles.map((t) => (
            <Link key={t.title} to={t.to} className="az-tile">
              {/* Roman Urdu: Tile mein photo CSS object-fit contain se full dikhegi, crop nahi. */}
              <div className="az-tile__media">{t.image && <img src={t.image} alt="" loading="lazy" width="900" height="1200" />}</div>
              <div className="az-tile__caption">
                <h3>{t.title}</h3>
                {/* <span className="az-link">{t.cta}</span> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
