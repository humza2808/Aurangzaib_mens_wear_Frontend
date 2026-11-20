// Roman Urdu: File frontend/src/pages/admin/shared.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
import { useCallback, useEffect, useState } from 'react'
import api, { errMsg } from '../../api'

/** Loads an admin collection and exposes reload/update helpers with visible error state. */
export function useAdminList(path) {
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const load = useCallback(() => {
    api.get(path).then((r) => { setRows(r.data); setStatus('ready') }).catch((e) => { setError(errMsg(e)); setStatus('error') })
  }, [path])
  useEffect(() => { load() }, [load])
  return { rows, setRows, status, error, load }
}

export const fmtDate = (d) => new Date(d).toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' })

export function StatusSelect({ id, value, options, path, onChanged }) {
  const [busy, setBusy] = useState(false)
  const change = async (e) => {
    setBusy(true)
    try { const { data } = await api.patch(`${path}/${id}/status`, { status: e.target.value }); onChanged(data.order || data.appointment || data.request || data) }
    catch (err) { alert(errMsg(err)) } finally { setBusy(false) }
  }
  return <select value={value} onChange={change} disabled={busy} aria-label="Status">{options.map((o) => <option key={o}>{o}</option>)}</select>
}

export function Loading({ status, error }) {
  if (status === 'loading') return <p>Loading</p>
  if (status === 'error') return <p className="admin-error">{error}</p>
  return null
}
