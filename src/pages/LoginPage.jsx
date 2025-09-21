import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      navigate('/tasks')
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '24px auto', padding: 16 }}>
      <h1>Iniciar sesión</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8, marginTop: 12 }}>
        <input name="username" placeholder="Usuario" value={form.username} onChange={onChange} />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={onChange} />
        <button disabled={loading}>{loading ? 'Ingresando...' : 'Entrar'}</button>
        {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
      </form>
      <p style={{ marginTop: 8 }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  )
}