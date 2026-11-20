// Roman Urdu: File frontend/src/components/theme/Hero.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { homeImages } from '../../data/homeImages'
import { hero, trust } from '../../content/copy'

/** Roman Urdu: 3 looks ka hero slider. Photo 1200x1200 WebP rakhein; full-bleed cover hai, ratio match ho to crop nahi hota. */
export default function Hero({ image, alt = '', content = hero }) {
  const configuredSlides = homeImages.heroSlides || []
  const slides = configuredSlides.length
    ? configuredSlides
    : [{ src: content.image || image || homeImages.hero, alt: alt || 'Aurangzaib menswear campaign' }]
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return undefined
    const timer = window.setInterval(() => {
      setSlide((previous) => (previous + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <>
      <section className="az-hero" aria-label="Featured">
        <div className="az-hero__copy">
          <h1 className="az-hero__title">
            {content.lines.map((line, i) => (
              <span className="az-hero__line" key={line}>
                <span style={{ '--i': i }}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="az-hero__body">{content.body}</p>
          <div className="az-hero__cta">
            <Link to={content.primary.to} className="az-btn">{content.primary.label}</Link>
            <Link to={content.secondary.to} className="az-btn az-btn--ghost">{content.secondary.label}</Link>
          </div>
        </div>
        <div className="az-hero__media az-slideshow" aria-label="Featured menswear looks">
          {/* Roman Urdu: Hero ke liye 1200x1200 (1:1) WebP use karein; image ka ratio mismatch ho to halka crop ho sakta hai. */}
          {slides.map((item, i) => (
            <img
              key={`${item.src}-${i}`}
              className={`az-slide-img ${slide === i ? 'is-active' : ''}`}
              src={item.src}
              alt={item.alt || alt}
              width="1200"
              height="1200"
              fetchPriority={i === 0 ? 'high' : undefined}
              loading={i === 0 ? 'eager' : 'lazy'}
              aria-hidden={slide !== i}
            />
          ))}
          {slides.length > 1 && (
            <div className="az-slide-dots" aria-label="Select featured look">
              {/* Roman Urdu: Hero ke liye 1200x1200 (1:1) WebP use karein; image ka ratio mismatch ho to halka crop ho sakta hai. */}
          {slides.map((item, i) => (
                <button
                  key={`${item.src}-${i}`}
                  type="button"
                  aria-label={`Show look ${i + 1}`}
                  aria-current={slide === i ? 'true' : undefined}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <TrustStrip />
    </>
  )
}

export function TrustStrip({ items = trust }) {
  return (
    <div className="az-trust">
      <div className="az-container">
        <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  )
}
