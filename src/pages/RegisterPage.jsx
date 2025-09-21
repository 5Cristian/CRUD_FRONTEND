import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setOk('')
    setLoading(true)
    try {
      await register(form.username, form.password)
      setOk('Usuario registrado. Ahora puedes iniciar sesión.')
      setTimeout(() => navigate('/login'), 900)
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '24px auto', padding: 16 }}>
      <h1>Registro</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, marginTop: 12 }}>
        <input name="username" placeholder="Usuario" value={form.username} onChange={onChange} />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={onChange} />
        <button disabled={loading}>{loading ? 'Registrando...' : 'Registrar'}</button>
        {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
        {ok && <div style={{ color: '#15803d' }}>{ok}</div>}
      </form>
      <p style={{ marginTop: 8 }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  )
}