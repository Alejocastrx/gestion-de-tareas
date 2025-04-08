// Importamos useState para manejar valores que pueden cambiar (como los campos del formulario)
import { useState } from 'react';

// Este componente recibe una tarea (si se está editando) y una función para guardar
function TaskForm({ task, onSave }) {
  // Creamos dos variables: una para el título y otra para la descripción
  // Si estamos editando, usamos los valores existentes; si no, los dejamos vacíos
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');

  // Esta función se ejecuta cuando el usuario envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    // Llama a la función que guarda la tarea, enviando el título y la descripción actualizados
    onSave({ ...task, title, description });
  };

  // Lo que se muestra en pantalla: un formulario con campos para escribir
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Campo para escribir el título de la tarea */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Actualiza el título cuando el usuario escribe
        placeholder="Título"
        className="border p-2 mb-2 w-full"
      />
      {/* Campo para escribir la descripción de la tarea */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Actualiza la descripción al escribir
        placeholder="Descripción"
        className="border p-2 mb-2 w-full"
      />
      {/* Botón para guardar la tarea */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
        Guardar
      </button>
    </form>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes del proyecto
export default TaskForm;
