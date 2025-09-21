import { useState } from 'react'

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onCreate({ title: title.trim(), description: description.trim(), done: false })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
      <input
        placeholder="Título (requerido)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <button type="submit">Crear tarea</button>
    </form>
  )
}
