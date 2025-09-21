import { useEffect, useState } from 'react'
import api from '../services/api.js'
import TaskForm from '../components/TaskForm.jsx'
import TaskItem from '../components/TaskItem.jsx'

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const { data } = await api.get('/tasks')
      setTasks(data)
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar tareas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const createTask = async (payload) => {
    try {
      const { data } = await api.post('/tasks', payload)
      setTasks((prev) => [...prev, data])
    } catch (err) {
      alert(err?.response?.data?.message || 'Error al crear')
    }
  }

  const toggleTask = async (task) => {
    try {
      const { data } = await api.patch(`/tasks/${task.id}`, { done: !task.done })
      setTasks((prev) => prev.map(t => t.id === task.id ? data : t))
    } catch {
      alert('Error al actualizar')
    }
  }

  const deleteTask = async (task) => {
    if (!confirm('¿Eliminar tarea?')) return
    try {
      await api.delete(`/tasks/${task.id}`)
      setTasks((prev) => prev.filter(t => t.id !== task.id))
    } catch {
      alert('Error al eliminar')
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: 16 }}>
      <h1>Tareas</h1>

      <TaskForm onCreate={createTask} />

      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
      {!loading && !tasks.length && <div>No hay tareas todavía.</div>}

      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  )
}
