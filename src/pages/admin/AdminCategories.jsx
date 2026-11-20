// Roman Urdu: File frontend/src/pages/admin/AdminCategories.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu Guide: Admin ki categories yahan manage hoti hain.
import { useEffect, useMemo, useState } from 'react'
import api, { errMsg } from '../../api'
import {imageUrl} from '../../imageUrl'
import { Loading, useAdminList } from './shared'

/** Categories feed the storefront navigation. Subcategories are typed as a comma-separated list. */
export default function AdminCategories() {
  const { rows, status, error, load } = useAdminList('/categories')
  const [edit, setEdit] = useState(null)
  const [msg, setMsg] = useState('')
  const [subName,setSubName]=useState('')
  const [products,setProducts]=useState([])
  const [productError,setProductError]=useState('')
  const [expanded,setExpanded]=useState({})
  const refreshCounts = () => api.get('/admin/products').then(r=>{setProducts(r.data);setProductError('')}).catch(e=>setProductError(errMsg(e)))
  useEffect(()=>{refreshCounts()},[])
  // Roman Urdu: Category aur subcategory ke products database ki list se count hote hain.
  const countFor = (category, subcategory) => products.filter(product =>
    product.category?.trim().toLowerCase() === category.trim().toLowerCase() &&
    (!subcategory || product.subCategory?.trim().toLowerCase() === subcategory.trim().toLowerCase())
  ).length
  const total = useMemo(()=>rows.reduce((sum,c)=>sum+countFor(c.name),0),[rows,products])
  const blank = { _id: '', name: '', order: 0, subs: '', subImages: {} }
  const start = (c) => {setSubName('');setEdit(c ? { _id: c._id, name: c.name, order: c.order, subs: c.subCategories.map((s) => s.name).join(', '),subImages:Object.fromEntries(c.subCategories.map(s=>[s.name,s.image||''])) } : blank)}
  const save = async (e) => {
    e.preventDefault(); setMsg('')
    const body = { name: edit.name, order: Number(edit.order) || 0, subCategories: edit.subs.split(',').map((s) => s.trim()).filter(Boolean).map((name) => ({ name,image:edit.subImages?.[name]||'' })) }
    try { edit._id ? await api.put(`/admin/categories/${edit._id}`, body) : await api.post('/admin/categories', body); setEdit(null); load(); refreshCounts() } catch (er) { setMsg(errMsg(er)) }
  }
  // Roman Urdu: Subcategory ki photo admin upload endpoint se aati hai.
  const uploadSub=async(name,file)=>{if(!file)return;try{if(file.size>5*1024*1024||!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type))throw Error('Only JPG, PNG, WebP or GIF up to 5MB');const {data}=await api.post('/admin/upload',file,{headers:{'Content-Type':file.type}});setEdit(v=>({...v,subImages:{...v.subImages,[name]:data.url}}))}catch(e){setMsg(e.response?.data?.message||e.message)}}
  const del = async (c) => { if (!confirm(`Delete ${c.name}? ${countFor(c.name)} products are assigned to this category. Deleting it will remove it from navigation but will NOT delete products. Continue?`)) return; try { await api.delete(`/admin/categories/${c._id}`); load(); refreshCounts() } catch (er) { alert(errMsg(er)) } }
  return (
    <><div className="admin-page-head"><div><p className="admin-eyebrow">CATALOG STRUCTURE</p><h1>Categories</h1><p className="admin-subtitle">Create categories before assigning them to products.</p></div><button className="admin-btn" onClick={() => start(null)}>+ Add category</button></div><Loading status={status} error={error} />

      <div className="admin-category-summary"><div><strong>{rows.length}</strong><span>Categories</span></div><div><strong>{rows.reduce((n,c)=>n+(c.subCategories||[]).length,0)}</strong><span>Subcategories</span></div><div><strong>{total}</strong><span>Assigned products</span></div></div>
      {productError && <p className="admin-error">Product counts load nahi hue: {productError}</p>}
      <p className="admin-help">Har category ke andar subcategories aur unke product counts hain. Category open karke list dekhein. Nayi category ya subcategory isi page se add kar sakte hain.</p>
      {edit && <form className="admin-card admin-form" onSubmit={save}>
        <label>Name<input required value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></label>
        <label>Order<input type="number" value={edit.order} onChange={(e) => setEdit({ ...edit, order: e.target.value })} /></label>
        <label>Subcategories</label><p className="admin-help">Each subcategory can have its own menu hover picture. Save category after uploading.</p><div className="admin-sub-chips">{edit.subs.split(',').map(x=>x.trim()).filter(Boolean).map(name=><span key={name}>{name}<button type="button" aria-label={`Remove ${name}`} onClick={()=>setEdit({...edit,subs:edit.subs.split(',').map(x=>x.trim()).filter(x=>x&&x!==name).join(', ')})}>×</button></span>)}</div><div className="admin-sub-photos">{edit.subs.split(',').map(x=>x.trim()).filter(Boolean).map(name=><div key={name}><span>{name}</span>{edit.subImages?.[name]&&<img src={imageUrl(edit.subImages[name])} alt={name}/>}<input aria-label={`Upload image for ${name}`} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e=>uploadSub(name,e.target.files?.[0])}/></div>)}</div><div className="admin-two"><input placeholder="New subcategory name" value={subName} onChange={e=>setSubName(e.target.value)}/><button type="button" className="admin-btn admin-btn--ghost" onClick={()=>{if(subName.trim()){setEdit({...edit,subs:[...edit.subs.split(',').map(x=>x.trim()).filter(Boolean),subName.trim()].join(', ')});setSubName('')}}}>+ Add subcategory</button></div>
        {msg && <p className="admin-error">{msg}</p>}
        <div><button className="admin-btn">Save</button> <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setEdit(null)}>Cancel</button></div></form>}
      <div className="admin-category-grid">
        {rows.map(c=><section key={c._id} className="admin-category-card">
          <div className="admin-category-card__head">
            <button type="button" className="admin-category-card__toggle" aria-expanded={expanded[c._id] !== false} onClick={()=>setExpanded(v=>({...v,[c._id]:v[c._id]===false}))}>
              <span className="admin-category-card__icon">{c.name.slice(0,1)}</span>
              <span><strong>{c.name}</strong><small>{(c.subCategories||[]).length} subcategories · {countFor(c.name)} products</small></span>
              <span>{expanded[c._id]===false?'＋':'−'}</span>
            </button>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={()=>start(c)}>Manage</button>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={()=>del(c)}>Delete</button>
          </div>
          {expanded[c._id]!==false && <div className="admin-category-card__subs">
            {(c.subCategories||[]).map(sub=><div className="admin-category-card__sub" key={sub.name}>
              <span className="admin-category-card__sub-name">{sub.image && <img src={imageUrl(sub.image)} alt="" />}{sub.name}</span>
              <span className="admin-pill">{countFor(c.name,sub.name)} products</span>
              <a href={`/admin/products?category=${encodeURIComponent(c.name)}&subCategory=${encodeURIComponent(sub.name)}`}>View products</a>
            </div>)}
            {!(c.subCategories||[]).length && <p className="admin-help">No subcategories yet. Manage par click karke add karein.</p>}
            <button type="button" className="admin-category-card__add" onClick={()=>{start(c);window.scrollTo({top:0,behavior:'smooth'})}}>+ Add subcategory to {c.name}</button>
          </div>}
        </section>)}
      </div>
    </>
  )
}
