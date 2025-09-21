import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) =>
    location.pathname === path ? { fontWeight: 'bold', textDecoration: 'underline' } : {}

  return (
    <nav style={{
      display: 'flex', gap: 16, padding: 12, borderBottom: '1px solid #e5e7eb'
    }}>
      <Link to="/login" style={isActive('/login')}>Login</Link>
      <Link to="/register" style={isActive('/register')}>Registro</Link>
      {isAuthenticated && <Link to="/tasks" style={isActive('/tasks')}>Tareas</Link>}
      <div style={{ marginLeft: 'auto' }}>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Cerrar sesión</button>
        ) : (
          <span>Invitado</span>
        )}
      </div>
    </nav>
  )
}
