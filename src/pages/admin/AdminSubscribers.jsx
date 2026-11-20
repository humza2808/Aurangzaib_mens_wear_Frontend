// Roman Urdu: File frontend/src/pages/admin/AdminSubscribers.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import api, { errMsg } from '../../api'
import { fmtDate, Loading, useAdminList } from './shared'
export default function AdminSubscribers() {
  const { rows, setRows, status, error } = useAdminList('/admin/subscribers')
  const del = async (id) => { if (!confirm('Remove this subscriber?')) return; try { await api.delete(`/admin/subscribers/${id}`); setRows((r) => r.filter((x) => x._id !== id)) } catch (e) { alert(errMsg(e)) } }
  return (
    <><h1>Subscribers</h1><Loading status={status} error={error} />
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Email</th><th>Joined</th><th /></tr></thead><tbody>
        {rows.map((s) => <tr key={s._id}><td>{s.email}</td><td>{fmtDate(s.createdAt)}</td><td><button className="admin-btn admin-btn--ghost" onClick={() => del(s._id)}>Remove</button></td></tr>)}
      </tbody></table></div></>
  )
}
