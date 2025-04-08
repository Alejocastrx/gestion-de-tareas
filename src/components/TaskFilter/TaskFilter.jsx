// Importamos React ya que es necesario para definir el componente
import React from 'react';

// Este componente sirve para filtrar las tareas según su estado: todas, activas o completadas
const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    // Contenedor con botones centrados y con espacio entre ellos
    <div className="flex justify-center space-x-2 mb-4">
      {/* Botón para ver todas las tareas */}
      <button
        // Si el filtro actual es 'all', se pinta el botón de azul, si no, en gris claro
        className={`px-4 py-2 rounded ${
          filter === 'all'
            ? 'bg-blue-500 text-white'  // Botón activo
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'  // Botón inactivo
        }`}
        onClick={() => onFilterChange('all')} // Cambia el filtro al hacer clic
      >
        Todas
      </button>

      {/* Botón para ver solo las tareas activas (no completadas) */}
      <button
        className={`px-4 py-2 rounded ${
          filter === 'active'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('active')}
      >
        Activas
      </button>

      {/* Botón para ver solo las tareas completadas */}
      <button
        className={`px-4 py-2 rounded ${
          filter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onFilterChange('completed')}
      >
        Completadas
      </button>
    </div>
  );
};

// Exportamos el componente para poder usarlo en App.jsx u otros archivos
export default TaskFilter;
