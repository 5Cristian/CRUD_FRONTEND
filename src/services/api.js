import axios from 'axios'

// URL del backend
export const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:3000'

// Instancia base de axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const register = (data) => api.post('/auth/register', data)

export const login = async (data) => {
  const res = await api.post('/auth/login', data)
  const token = res.data?.access_token
  if (token) localStorage.setItem('token', token)
  return res
}

export const getTasks = () => api.get('/tasks')
export const createTask = (data) => api.post('/tasks', data)
export const updateTask = (id, data) => api.patch(`/tasks/${id}`, data)
export const deleteTask = (id) => api.delete(`/tasks/${id}`)

export default api
