// Roman Urdu: File frontend/src/pages/admin/AdminProducts.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Admin se product add, edit, delete aur images upload karne ka code yahan hai.
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api, { errMsg } from '../../api'
import { rs } from '../../config'
import { imageUrl } from '../../imageUrl'
import { prepareProductImage } from '../../utils/prepareProductImage'
import { Loading, useAdminList } from './shared'

const list = (s) => s.split(/[\n,]/).map((x) => x.trim()).filter(Boolean)

/** Product CRUD. Images are URLs or /images/... paths, one per line; the first is the main photo. */
export default function AdminProducts() {
  const { rows, status, error, load } = useAdminList('/admin/products')
  const [cats, setCats] = useState([])
  const [edit, setEdit] = useState(null)
  const [msg, setMsg] = useState('')
  const [uploading, setUploading] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [search, setSearch] = useState('')
  const [params,setParams]=useSearchParams()
  const group = params.get('category') || ''
  const subGroup = params.get('subCategory') || ''
  const setFilters=(category,subCategory='')=>{
    const next=new URLSearchParams()
    if(category)next.set('category',category)
    if(subCategory)next.set('subCategory',subCategory)
    setParams(next)
  }
  const visibleRows = useMemo(()=>rows.filter(product=>
    (!group || product.category === group) &&
    (!subGroup || product.subCategory === subGroup) &&
    `${product.productNumber||''} ${product.name} ${product.category} ${product.subCategory||''}`.toLowerCase().includes(search.toLowerCase())
  ).sort((a,b)=>`${a.category}/${a.subCategory}`.localeCompare(`${b.category}/${b.subCategory}`)),[rows,group,subGroup,search])
  const [categoryError, setCategoryError] = useState('')
  useEffect(() => { api.get('/categories').then((r) => { setCats(r.data); setCategoryError('') }).catch((e) => setCategoryError(errMsg(e))) }, [])

  const blank = { _id: '', name: '', description: '', price: '', salePrice: '', category: '', subCategory: '', images: '', sizes: '', colors: '', stock: 5, inStock: true, isNewArrival: false, badge: '' }
  const start = (p) => { setNewImageUrl(''); setMsg(''); setEdit(p ? { ...p, stock: p.stock ?? 0, price: p.price, salePrice: p.salePrice ?? '', images: (p.images || []).join('\n'), sizes: (p.sizes || []).join(', '), colors: (p.colors || []).join(', ') } : { ...blank, category: group || cats[0]?.name || '', subCategory: subGroup || '' }) }
  const addImageUrl = () => {
    const url = newImageUrl.trim()
    if (!/^https:\/\/[^\s]+$/i.test(url) && !/^\/images\/[^\s]+$/i.test(url)) {
      setMsg('Valid HTTPS image URL paste karein (https://...) ya /images/ path. Google search results page ka URL image nahi hota.')
      return
    }
    setEdit(prev => ({ ...prev, images: [...list(prev.images), url].join('\n') }))
    setNewImageUrl('')
    setMsg('Image URL added. Preview check karke Save product karein.')
  }
  const set = (k) => (e) => setEdit({ ...edit, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value, ...(k === 'category' ? { subCategory: '' } : {}) })
  const subs = cats.find((c) => c.name === edit?.category)?.subCategories || []

  const uploadImages = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true); setMsg('')
    try {
      const paths = []
      for (const file of files) {
        if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error('Choose JPG, PNG, WebP or GIF files under 5 MB each.')
        const optimized = await prepareProductImage(file)
        const { data } = await api.post('/admin/upload', optimized, { headers: { 'Content-Type': optimized.type } })
        paths.push(data.url)
      }
      setEdit((prev) => ({ ...prev, images: [prev.images, ...paths].filter(Boolean).join('\n') }))
    } catch (err) { setMsg(err.response?.data?.message || err.message || errMsg(err)) }
    finally { setUploading(false); e.target.value = '' }
  }
  const save = async (e) => {
    e.preventDefault(); if (uploading) return; setMsg('')
    if (!edit.category || !cats.some((c) => c.name === edit.category)) { setMsg('Pehle Categories section se category add karein.'); return }
    if (!edit.subCategory || !cats.find(c=>c.name===edit.category)?.subCategories.some(s=>s.name===edit.subCategory)) {setMsg('Selected category ki valid subcategory select karein.');return}
    if (list(edit.images).some(src => !/^https:\/\/[^\s]+$/i.test(src) && !/^\/(?:uploads|images)\/[^\s]+$/i.test(src))) { setMsg('Image list mein invalid URL hai. HTTPS image URLs ya uploaded paths hi use karein.'); return }
    const body = { name: edit.name, description: edit.description, price: Number(edit.price), salePrice: edit.salePrice === '' ? null : Number(edit.salePrice), category: edit.category, subCategory: edit.subCategory,
      images: list(edit.images), sizes: list(edit.sizes).length ? list(edit.sizes) : ['One Size'], colors: list(edit.colors).length ? list(edit.colors) : ['Default'], stock: edit.badge === 'Out of Stock' ? 0 : Number(edit.stock), inStock: edit.badge !== 'Out of Stock' && edit.inStock && Number(edit.stock) > 0, isNewArrival: edit.isNewArrival, badge: edit.badge || '' }
    try { edit._id ? await api.put(`/admin/products/${edit._id}`, body) : await api.post('/admin/products', body); setEdit(null); load() } catch (er) { setMsg(errMsg(er)) }
  }
  const del = async (p) => { if (!confirm(`Delete ${p.name}?`)) return; try { await api.delete(`/admin/products/${p._id}`); load() } catch (er) { alert(errMsg(er)) } }

  return (
    <><div className="admin-page-head"><div><p className="admin-eyebrow">CATALOG MANAGEMENT</p><h1>Products</h1><p className="admin-subtitle">Manage your collections, pricing, inventory and product photography.</p></div><button className="admin-btn" onClick={() => start(null)}>+ Add product</button></div><Loading status={status} error={error} />
      {categoryError && <p className="admin-error">Categories load nahi hui: {categoryError}</p>}
      {!cats.length && !categoryError && <div className="admin-notice">No categories found. <a href="/admin/categories">Create a category first</a>, or run <code>npm run seed:categories</code> in backend.</div>}
      <div className="admin-toolbar"><input aria-label="Search products" placeholder="Search product number, name, category or subcategory..." value={search} onChange={(e) => setSearch(e.target.value)}/><select aria-label="Filter category" value={group} onChange={e=>setFilters(e.target.value)}><option value="">All categories</option>{cats.map(c=><option key={c._id} value={c.name}>{c.name}</option>)}</select><select aria-label="Filter subcategory" value={subGroup} onChange={e=>setFilters(group,e.target.value)} disabled={!group}><option value="">All subcategories</option>{(cats.find(c=>c.name===group)?.subCategories||[]).map(sub=><option key={sub.name} value={sub.name}>{sub.name}</option>)}</select><span>{visibleRows.length} / {rows.length} products</span></div>
      {edit && <form className="admin-card admin-form" onSubmit={save}>
        <label>Name<input required value={edit.name} onChange={set('name')} /></label>
        <label>Description<textarea rows="3" value={edit.description} onChange={set('description')} /></label>
        <div className="admin-two"><label>Price (Rs.)<input type="number" min="0" required value={edit.price} onChange={set('price')} /></label><label>Sale price (optional)<input type="number" min="0" value={edit.salePrice} onChange={set('salePrice')} /></label></div>
        <div className="admin-two"><label>Category<select required value={edit.category} onChange={set('category')}><option value="">Select category</option>{cats.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}</select></label>
          <label>Subcategory<select required value={edit.subCategory} onChange={set('subCategory')}><option value="">Select subcategory</option>{subs.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}</select></label></div>
        <div className="admin-image-options" style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))'}}>
          <div><strong>Option 1: Upload from Computer</strong><p className="admin-help">Downloads/Desktop ya kisi bhi folder se JPG, PNG, WebP ya GIF select karein. JPG/PNG automatic WebP mein convert honge.</p><input aria-label="Upload photos from computer" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={uploadImages} disabled={uploading} /></div>
          <div><strong>Option 2: Add Direct Image URL</strong><p className="admin-help">Image ka direct HTTPS link paste karein. Google search page link ke bajaye actual image link use karein.</p><div style={{display:'flex',gap:8,flexWrap:'wrap'}}><input aria-label="Direct image URL" type="url" placeholder="https://example.com/photo.webp" value={newImageUrl} onChange={e=>setNewImageUrl(e.target.value)} style={{flex:'1 1 180px',minWidth:0}}/><button type="button" className="admin-btn admin-btn--ghost" onClick={addImageUrl}>Add URL</button></div></div>
        </div>
        {uploading && <p role="status">Converting image to WebP and uploading...</p>}
        <label>Selected product images (one URL per line, edit/remove as needed)<textarea rows="4" value={edit.images} onChange={set('images')} /></label>
        <p className="admin-help">Photo upload hone ke baad preview check karein, phir <strong>Save product</strong> dabayein. Pehli photo main image hai; doosri hover par dikhegi. Agar saved image production mein gayab ho, backend persistent storage configure karna hoga.</p>
        {edit.images && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{list(edit.images).map((src, i) => <img key={`${src}-${i}`} src={imageUrl(src)} alt={`Product photo ${i + 1}`} width="65" height="80" style={{ objectFit: 'contain' }} />)}</div>}
        <div className="admin-two"><label>Stock quantity<input type="number" min="0" required value={edit.stock} onChange={set('stock')} /></label><label>Inventory status<span className="admin-help">Stock 0 = Sold out. Set quantity above 0 to enable checkout.</span></label></div>
        <div className="admin-two"><label>Sizes (comma separated)<input value={edit.sizes} onChange={set('sizes')} /></label><label>Colours (comma separated)<input value={edit.colors} onChange={set('colors')} /></label></div>
        <label className="admin-check"><input type="checkbox" checked={edit.inStock} onChange={set('inStock')} /> In stock</label>
        <label className="admin-check"><input type="checkbox" checked={Boolean(edit.isNewArrival)} onChange={set('isNewArrival')} /> Show in New Arrivals (Eastern / Western Wear only)</label>
        <label>Product label (optional)<select value={edit.badge || ''} onChange={set('badge')}><option value="">No label</option><option value="New">New</option><option value="Sold Out">Sold Out</option><option value="Out of Stock">Out of Stock</option></select></label>
        <p className="admin-help">Roman Urdu: New Arrivals checkbox tick hoga tabhi Eastern/Western product New Arrivals mein aayega. Out of Stock label select karne se stock automatically 0 aur checkout disabled hoga.</p>
        {msg && <p className="admin-help" role="status">{msg}</p>}
        <div><button className="admin-btn" disabled={uploading}>Save product</button> <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setEdit(null)}>Cancel</button></div></form>}
      <div className="admin-product-groups">
        <button type="button" className={!group?'is-selected':''} onClick={()=>setFilters('')}>All products <strong>{rows.length}</strong></button>
        {cats.map(c=><button type="button" key={c._id} className={group===c.name?'is-selected':''} onClick={()=>setFilters(c.name)}>{c.name} <strong>{rows.filter(p=>p.category===c.name).length}</strong></button>)}
      </div>
      {group && <div className="admin-filter-context"><strong>{group}</strong>{subGroup && <span> / {subGroup}</span>} <button type="button" className="admin-btn admin-btn--ghost" onClick={()=>setFilters('')}>Show all categories</button></div>}
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th /><th>Product no.</th><th>Name</th><th>Category / Subcategory</th><th>Price</th><th>Flags</th><th /></tr></thead><tbody>
        {visibleRows.map((p) => <tr key={p._id}><td>{(p.images?.[0] || p.image) && <img src={imageUrl(p.images?.[0] || p.image)} alt="" width="44" height="55" style={{ objectFit: 'contain' }} />}</td><td><strong>{p.productNumber||'Legacy'}</strong></td><td>{p.name}</td><td>{p.category}{p.subCategory && ` / ${p.subCategory}`}</td>
          <td>{p.salePrice ? <><s>{rs(p.price)}</s> {rs(p.salePrice)}</> : rs(p.price)}</td><td><span className={`admin-pill ${p.inStock && p.stock > 0 ? 'admin-pill--good' : 'admin-pill--bad'}`}>{p.inStock && p.stock > 0 ? `${p.stock} in stock` : 'Sold out'}</span>{p.isNewArrival && <span className="admin-pill">New</span>}</td>
          <td><button className="admin-btn admin-btn--ghost" onClick={() => start(p)}>Edit</button> <button className="admin-btn admin-btn--ghost" onClick={() => del(p)}>Delete</button></td></tr>)}
      </tbody></table></div></>
  )
}
