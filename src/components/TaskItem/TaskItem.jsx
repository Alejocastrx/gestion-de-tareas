// Importamos React y useState para poder manejar cambios dentro del componente
import React, { useState } from 'react';

// Este componente representa una sola tarea en la lista
const TaskItem = ({ task, onTaskUpdate, onTaskDelete }) => {
  // Variable para saber si estamos editando el texto de la tarea
  const [isEditing, setIsEditing] = useState(false);
  // Variable para guardar el texto editado de la tarea
  const [editedText, setEditedText] = useState(task.text);

  // Se ejecuta cuando marcamos o desmarcamos la casilla de completado
  const handleCheckboxChange = (e) => {
    onTaskUpdate({ ...task, completed: e.target.checked });
  };

  // Cuando se hace clic en "Editar", activamos el modo de edición
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Cuando se hace clic en "Guardar", se actualiza el texto de la tarea y se sale del modo edición
  const handleSaveClick = () => {
    onTaskUpdate({ ...task, text: editedText });
    setIsEditing(false);
  };

  // Cuando se hace clic en "Eliminar", se borra la tarea
  const handleDeleteClick = () => {
    onTaskDelete(task.id);
  };

  // Lo que se muestra en pantalla
  return (
    <li className="flex items-center justify-between p-2 border rounded">
      {/* Si se está editando, mostramos un campo de texto */}
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)} // Actualiza el texto mientras se escribe
          className="flex-grow p-1 border rounded mr-2"
        />
      ) : (
        // Si no estamos editando, mostramos el texto con una casilla de completado
        <div className="flex items-center flex-grow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange} // Marca o desmarca la tarea como completada
            className="mr-2"
          />
          <span className={task.completed ? 'line-through' : ''}>
            {task.text}
          </span>
        </div>
      )}
      
      {/* Botones para editar, guardar o eliminar */}
      <div>
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded mr-1"
          >
            Editar
          </button>
        )}
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

// Exportamos este componente para usarlo en otros lugares
export default TaskItem;
