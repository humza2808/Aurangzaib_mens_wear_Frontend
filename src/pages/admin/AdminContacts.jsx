// Roman Urdu: File frontend/src/pages/admin/AdminContacts.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { fmtDate, Loading, StatusSelect, useAdminList } from './shared'
const STATUSES = ['New', 'Contacted', 'Resolved']
export default function AdminContacts() {
  const { rows, setRows, status, error } = useAdminList('/admin/contact-requests')
  return (
    <><h1>Contact requests</h1><Loading status={status} error={error} />
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Received</th><th>From</th><th>Subject</th><th>Message</th><th>Status</th></tr></thead><tbody>
        {rows.map((c) => <tr key={c._id}><td>{fmtDate(c.createdAt)}</td><td>{c.fullName}<br />{c.email}{c.phone && <><br />{c.phone}</>}</td><td>{c.subject}</td><td>{c.message}</td>
          <td><StatusSelect id={c._id} value={c.status} options={STATUSES} path="/admin/contact-requests" onChanged={(d) => setRows((r) => r.map((x) => (x._id === d._id ? d : x)))} /></td></tr>)}
      </tbody></table></div></>
  )
}
