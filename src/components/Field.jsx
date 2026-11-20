// Roman Urdu: File frontend/src/components/Field.jsx ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
/** Labelled input/textarea/select used by every public form. Shows its own error text. */
export default function Field({ label, name, value, onChange, type = 'text', as = 'input', options, error, required, ...rest }) {
  const id = `f-${name}`
  const props = { id, name, value, onChange, required, 'aria-invalid': !!error, className: 'az-input', ...rest }
  return (
    <div className="az-field">
      <label htmlFor={id}>{label}{required ? '' : ' (optional)'}</label>
      {as === 'textarea' ? <textarea {...props} rows={5} style={{ padding: 12, minHeight: 120 }} />
        : as === 'select' ? <select {...props}>{options.map((o) => <option key={o}>{o}</option>)}</select>
        : <input type={type} {...props} />}
      {error && <p className="az-error">{error}</p>}
    </div>
  )
}
