// Roman Urdu: File frontend/src/pages/admin/AdminOrders.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu: Order filter, status colors aur har item ke remarks yahan handle hote hain.
import { Fragment, useState } from 'react'
import api, { errMsg } from '../../api'
import { fmtDate, Loading, useAdminList } from './shared'
import { rs } from '../../config'
import { imageUrl } from '../../imageUrl'

const STATUSES = ['Pending', 'Confirmed', 'In Stitching', 'Shipped', 'Out for Delivery', 'Delivered', 'Returned', 'Cancelled']
const LEGACY = ['Processing', 'Packed']
const statusClass = (status) => 'admin-order-status--' + String(status || '').toLowerCase().replace(/[^a-z]+/g, '-')

export default function AdminOrders() {
  const { rows, setRows, status, error } = useAdminList('/admin/orders')
  const [open, setOpen] = useState(null)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')
  const [drafts, setDrafts] = useState({})

  const updateOrder = (updated) => setRows(current => current.map(order => order._id === updated._id ? updated : order))
  const [statusDrafts,setStatusDrafts]=useState({})
  const saveReview=async(order)=>{
    const selected=statusDrafts[order._id]??order.status
    const remarks=order.items.map((item,index)=>drafts[`${order._id}:${index}`]??item.remarks??'')
    if(selected!==order.status&&remarks.some(r=>!r.trim())){setMessage('Status change se pehle har product ke remarks likhein.');return}
    setBusy(order._id);setMessage('')
    try{const {data}=await api.patch(`/admin/orders/${order._id}/review`,{status:selected,remarks});updateOrder(data.order);setMessage('Order status and product remarks saved successfully.')}
    catch(e){setMessage(errMsg(e))}finally{setBusy('')}
  }
  const filtered = rows.filter(order => {
    const matchStatus = filter === 'All' || order.status === filter
    const text = `${order.orderNumber} ${order.customer?.fullName || ''} ${order.customer?.phone || ''} ${order.items?.map(i => i.name).join(' ') || ''}`.toLowerCase()
    return matchStatus && text.includes(search.trim().toLowerCase())
  })
  const counts = statuses => statuses.map(value => ({ value, count: value === 'All' ? rows.length : rows.filter(order => order.status === value).length }))
  const filterOptions = counts(['All', ...STATUSES, ...LEGACY.filter(value => rows.some(order => order.status === value))])
  return <>
    <div className="admin-page-head"><div><p className="admin-eyebrow">ORDER MANAGEMENT</p><h1>Orders</h1><p className="admin-subtitle">Track orders, update fulfillment and add notes for each product.</p></div></div>
    <Loading status={status} error={error} />
    {message && <p className="admin-notice" role="status">{message}</p>}
    <div className="admin-order-filters" aria-label="Filter orders by status">
      {filterOptions.map(({ value, count }) => <button key={value} type="button" className={filter === value ? 'is-selected' : ''} onClick={() => setFilter(value)}>{value} <strong>{count}</strong></button>)}
    </div>
    <div className="admin-toolbar"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search order number, customer or product" aria-label="Search orders"/><span>{filtered.length} of {rows.length} orders</span></div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Order</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th><th>Details</th></tr></thead><tbody>
      {filtered.map(order => <Fragment key={order._id}>
        <tr><td><strong>{order.orderNumber}</strong></td><td>{fmtDate(order.createdAt)}</td><td>{order.customer?.fullName}<br/><span className="admin-help">{order.customer?.phone}</span></td><td>{rs(order.total)}</td>
          <td><select className={`admin-order-status ${statusClass(order.status)}`} value={statusDrafts[order._id]??order.status} disabled={busy===order._id} onChange={e => {setStatusDrafts(v=>({...v,[order._id]:e.target.value}));setOpen(order._id)}} aria-label={`Status for ${order.orderNumber}`}>
            {[...new Set([...STATUSES, ...(LEGACY.includes(order.status) ? [order.status] : [])])].map(value => <option key={value} value={value}>{value}</option>)}
          </select></td>
          <td><button type="button" className="admin-btn admin-btn--ghost" aria-expanded={open === order._id} onClick={() => setOpen(open === order._id ? null : order._id)}>{open === order._id ? 'Close' : 'View details'}</button></td></tr>
        {open === order._id && <tr className="admin-order-expanded"><td colSpan="6">
          <div className="admin-order-details">
            <div className="admin-order-detail-card"><h3>Customer & delivery</h3><p><strong>Name:</strong> {order.customer?.fullName}</p><p><strong>Phone:</strong> {order.customer?.phone}</p><p><strong>Email:</strong> {order.customer?.email || 'Not provided'}</p><p><strong>Address:</strong> {order.customer?.address}, {order.customer?.city}</p><p><strong>Instructions:</strong> {order.customer?.instructions || 'None'}</p></div>
            <div className="admin-order-detail-card"><h3>Order summary</h3><p><strong>Order:</strong> {order.orderNumber}</p><p><strong>Payment:</strong> {order.paymentMethod} · {order.paymentStatus}</p><p><strong>Subtotal:</strong> {rs(order.subtotal)}</p><p><strong>Shipping:</strong> {rs(order.shipping)}</p><p><strong>Discount:</strong> {rs(order.discount || 0)}</p><p><strong>Total:</strong> {rs(order.total)}</p><p><strong>Status:</strong> <span className={`admin-order-badge ${statusClass(order.status)}`}>{order.status}</span></p></div>
          </div>
          <h3 className="admin-order-items-title">Products in this order ({order.items.length})</h3>
          <div className="admin-order-product-grid">{order.items.map((item, index) => {
            const key = `${order._id}:${index}`
            return <section key={key} className="admin-order-product-card">
              <div className="admin-order-product-top">{item.image ? <img src={imageUrl(item.image)} alt={item.name}/> : <div className="admin-order-no-image">No image</div>}
                <div><h4>{item.name}</h4><p><strong>Product number:</strong> {item.sku || 'N/A'}</p><p><strong>Category:</strong> {item.category || 'N/A'}</p><p><strong>Subcategory:</strong> {item.subCategory || 'N/A'}</p><p><strong>Size:</strong> {item.size || 'N/A'} · <strong>Colour:</strong> {item.color || 'N/A'}</p><p><strong>Quantity:</strong> {item.quantity} · <strong>Unit price:</strong> {rs(item.price)}</p><strong>Total: {rs(item.price * item.quantity)}</strong></div>
              </div>
              <label className="admin-order-remarks-label" htmlFor={`remarks-${key}`}>Product remarks</label>
              <textarea id={`remarks-${key}`} maxLength={2000} rows={3} placeholder="Stitching instructions, size adjustments, dispatch notes..." value={drafts[key] ?? item.remarks ?? ''} onChange={e => setDrafts(old => ({ ...old, [key]: e.target.value }))}/>
              
            </section>
          })}</div><div className="admin-order-status-save"><label>Order status<select value={statusDrafts[order._id]??order.status} onChange={e=>setStatusDrafts(v=>({...v,[order._id]:e.target.value}))}>{[...new Set([...STATUSES,order.status])].map(value=><option key={value}>{value}</option>)}</select></label><button type="button" className="admin-inline-save" disabled={busy===order._id} onClick={()=>saveReview(order)}>{busy===order._id?'Saving...':'Save Status & Remarks'}</button></div>
        </td></tr>}
      </Fragment>)}
      {!filtered.length && <tr><td colSpan="6" className="admin-order-empty">No orders match this status or search.</td></tr>}
    </tbody></table></div>
  </>
}
