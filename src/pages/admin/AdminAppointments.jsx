// Roman Urdu: File frontend/src/pages/admin/AdminAppointments.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
// Roman Urdu: Remarks aur status table mein hi edit/save honge.
import {useState} from 'react'
import api,{errMsg} from '../../api'
import {fmtDate,Loading,useAdminList} from './shared'
const STATUSES=['Pending','Visited','Cancelled']
export default function AdminAppointments(){
 const {rows,setRows,status,error}=useAdminList('/admin/appointments')
 const [drafts,setDrafts]=useState({}),[busy,setBusy]=useState(''),[message,setMessage]=useState('')
 const save=async(a)=>{const d=drafts[a._id]||{};setBusy(a._id);setMessage('');try{
  const {data}=await api.patch(`/admin/appointments/${a._id}/status`,{status:d.status||(['New','Contacted','Scheduled'].includes(a.status)?'Pending':a.status==='Completed'?'Visited':a.status),adminRemarks:d.adminRemarks??a.adminRemarks??''})
  setRows(v=>v.map(x=>x._id===a._id?data.appointment:x));setMessage('Appointment saved successfully.')
 }catch(e){setMessage(errMsg(e))}finally{setBusy('')}}
 return <><div className="admin-page-head"><div><p className="admin-eyebrow">APPOINTMENT MANAGEMENT</p><h1>Appointments</h1><p className="admin-subtitle">Edit remarks and status directly in the table.</p></div></div><Loading status={status} error={error}/>{message&&<p role="status" className="admin-notice">{message}</p>}
 <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Received</th><th>Customer</th><th>Visit</th><th>When</th><th>Customer Notes</th><th>Admin Remarks</th><th>Status / Save</th></tr></thead><tbody>
 {rows.map(a=>{const d=drafts[a._id]||{};const normalized=['New','Contacted','Scheduled'].includes(a.status)?'Pending':a.status==='Completed'?'Visited':a.status;return <tr key={a._id} className={`admin-appointment-row--${(d.status||normalized).toLowerCase()}`}><td>{fmtDate(a.createdAt)}</td><td>{a.fullName}<br/>{a.phone}<br/>{a.email}</td><td>{a.items?.map(i=>`${i.name} ×${i.quantity}`).join(', ')||a.type||'—'}</td><td>{a.preferredDate||a.date||'—'}</td><td>{a.notes||'—'}</td><td><textarea className="admin-appointment-remarks" aria-label={`Remarks for ${a.fullName}`} value={d.adminRemarks??a.adminRemarks??''} onChange={e=>setDrafts(v=>({...v,[a._id]:{...v[a._id],adminRemarks:e.target.value}}))} placeholder="Write appointment remarks..." maxLength={2000}/></td><td><div className="admin-appointment-actions"><select aria-label={`Appointment status for ${a.fullName}`} value={d.status||normalized} onChange={e=>setDrafts(v=>({...v,[a._id]:{...v[a._id],status:e.target.value}}))}>{STATUSES.map(x=><option key={x}>{x}</option>)}</select><button className="admin-inline-save" disabled={busy===a._id} onClick={()=>save(a)}>{busy===a._id?'Saving...':'Save remarks & status'}</button></div></td></tr>})}
 </tbody></table></div></>
}
