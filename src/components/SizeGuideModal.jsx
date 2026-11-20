// Roman Urdu: File frontend/src/components/SizeGuideModal.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { sizeChartFor } from '../data/sizeCharts'
export default function SizeGuideModal({ open, onClose, product }) {
  const [unit,setUnit] = useState('cm')
  useEffect(() => {
    if (!open) return
    const k = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown',k)
    return () => document.removeEventListener('keydown',k)
  },[open,onClose])
  if (!open) return null
  const chart = sizeChartFor(product)
  const convert = (n) => unit === 'cm' ? String(n) : (n/2.54).toFixed(1)
  return <div className="az-modal-scrim" onClick={onClose}>
    <div className="az-modal az-size-modal" role="dialog" aria-modal="true" aria-label="Size chart" onClick={e=>e.stopPropagation()}>
      <button type="button" className="az-modal__close" onClick={onClose} aria-label="Close size chart"><X size={20}/></button>
      <h2>Size Guide</h2><p className="az-muted">{product?.subCategory || product?.category || product?.name || 'Garment measurements'}</p>
      {chart ? <>
        <p className="az-size-disclaimer">{chart.note || 'Reference garment measurements only. Confirm Aurangzaib sizing before ordering.'}</p>
        <div className="az-size-units"><button type="button" className={unit==='cm'?'is-active':''} onClick={()=>setUnit('cm')}>CM</button><span>|</span><button type="button" className={unit==='in'?'is-active':''} onClick={()=>setUnit('in')}>INCHES</button></div>
        {chart.tables.map(table=><div className="az-size-table" key={table.title}><h3>{table.title}</h3><div className="az-size-scroll"><table className="az-table"><thead><tr>{table.columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{table.rows.map(r=><tr key={r[0]}>{r.map((v,i)=><td key={i}>{i===0?v:convert(v)}</td>)}</tr>)}</tbody></table></div></div>)}
        <p className="az-muted">Measure chest around the fullest part, shoulder from seam to seam, and sleeves from shoulder to wrist.</p>
      </> : <><p>Measurements for <strong>{product?.subCategory || product?.category || 'this category'}</strong> have not yet been verified.</p><p className="az-muted">Please contact the store for the exact size chart before ordering. Different clothing categories require different garment measurements.</p></>}
    </div>
  </div>
}
