import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as loginApi, register as registerApi } from '../services/api.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const isAuthenticated = !!token

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const login = async (username, password) => {
    const { data } = await loginApi({ username, password })
    setToken(data.access_token)
  }

  const register = async (username, password) => {
    await registerApi({ username, password })
  }

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
  }

  const value = useMemo(
    () => ({ token, isAuthenticated, login, register, logout }),
    [token, isAuthenticated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
