// Importamos React y useState para manejar estados locales
import React, { useState } from 'react';

// TaskList recibe props: lista de tareas, filtro activo, y funciones para actualizar y eliminar tareas
function TaskList({ tasks, filter, onTaskUpdate, onTaskDelete }) {
  // Estado para saber qué tarea se está editando actualmente
  const [editingTaskId, setEditingTaskId] = useState(null);
  // Estados para los campos que se pueden editar (título y descripción)
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  // Filtramos las tareas según el filtro seleccionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed; // Solo tareas activas
    if (filter === 'completed') return task.completed; // Solo completadas
    return true; // Todas las tareas
  });

  // Cuando se hace clic en editar, se cargan los datos de la tarea en los inputs
  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  // Al guardar, se actualiza la tarea y se cierra el modo edición
  const handleSaveEdit = (task) => {
    onTaskUpdate({ ...task, title: editedTitle, description: editedDescription });
    setEditingTaskId(null);
  };

  return (
    <div>
      {filteredTasks.map(task => (
        <div key={task.id} className="border p-2 mb-2">
          {editingTaskId === task.id ? (
            // Si la tarea está en modo edición
            <div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="border p-1 mb-1 w-full"
                  style={{ flex: 1, textAlign: 'center' }}
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="border p-1 mb-1 w-full"
                  style={{ flex: 1, textAlign: 'center' }}
                />
              </div>
              <div>
                <button
                  onClick={() => handleSaveEdit(task)}
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingTaskId(null)}
                  className="bg-gray-300 p-1 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            // Vista normal (no en edición)
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button
                onClick={() => onTaskUpdate({ ...task, completed: !task.completed })}
                className="bg-green-500 text-white p-1 rounded mr-2"
              >
                {task.completed ? 'Desmarcar' : 'Completar'}
              </button>
              <button
                onClick={() => handleEdit(task)}
                className="bg-blue-500 text-white p-1 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onTaskDelete(task.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Exportamos el componente para usarlo en App.jsx
export default TaskList;
