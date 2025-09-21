export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 8,
      padding: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ fontWeight: 600 }}>
          {task.done ? '✅ ' : '⬜ '} {task.title}
        </div>
        {task.description && (
          <div style={{ color: '#6b7280', marginTop: 4 }}>{task.description}</div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onToggle(task)}>{task.done ? 'Marcar pendiente' : 'Marcar hecha'}</button>
        <button onClick={() => onDelete(task)} style={{ color: '#b91c1c' }}>Eliminar</button>
      </div>
    </div>
  )
}
