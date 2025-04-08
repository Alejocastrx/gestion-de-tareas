// Importamos funciones necesarias de React
import { useState, useEffect } from 'react';
// Importamos una herramienta para generar identificadores únicos
import { v4 as uuidv4 } from 'uuid';

// Importamos los componentes de la app
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import TaskStats from './components/TaskStats/TaskStats';

// Creamos una tarea inicial para mostrar como ejemplo
const initialTasks = [
  {
    id: uuidv4(),
    title: "Aprender React",
    description: "Estudiar los fundamentos de React",
    completed: false,
    createdAt: new Date().toISOString() // Fecha actual
  }
];

function App() {
  // Guardamos la lista de tareas en el estado
  const [tasks, setTasks] = useState(() => {
    try {
      // Intentamos cargar las tareas guardadas en el navegador
      const savedTasks = localStorage.getItem('tasks');
      // Si hay tareas guardadas, las usamos. Si no, usamos la tarea inicial
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    } catch (error) {
      console.error("Error al cargar las tareas desde localStorage", error);
      return initialTasks;
    }
  });

  // Estado para filtrar las tareas (todas, activas o completadas)
  const [filter, setFilter] = useState('all');

  // Estado para saber si se está editando una tarea
  const [editingTask, setEditingTask] = useState(null);

  // Cada vez que cambie la lista de tareas, la guardamos en el navegador
  useEffect(() => {
    try {
      console.log("Guardando tareas en localStorage", tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Error al guardar las tareas en localStorage", error);
    }
  }, [tasks]);

  // Esta función permite agregar una nueva tarea o actualizar una existente
  const addOrUpdateTask = (task) => {
    setTasks(prevTasks => {
      let updatedTasks;
      if (task.id) {
        // Si la tarea tiene ID, significa que ya existe y la actualizamos
        updatedTasks = prevTasks.map(t => t.id === task.id ? task : t);
      } else {
        // Si no tiene ID, es una nueva tarea y la agregamos
        updatedTasks = [...prevTasks, { 
          ...task, 
          id: uuidv4(), 
          completed: false, 
          createdAt: new Date().toISOString() 
        }];
      }
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    // Después de guardar, salimos del modo de edición
    setEditingTask(null);
  };

  // Esta función elimina una tarea
  const deleteTask = (taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Esta función se usa para actualizar una tarea existente (por ejemplo, cambiar si está completada o no)
  const updateTask = (updatedTask) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // Lo que se muestra en pantalla
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">Lista de Tareas</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Formulario para agregar o editar una tarea */}
        <TaskForm 
          task={editingTask} 
          onSave={addOrUpdateTask} 
          onCancel={() => setEditingTask(null)} 
        />
        
        {/* Componente para cambiar el filtro de tareas */}
        <TaskFilter 
          filter={filter} 
          onFilterChange={setFilter} 
        />
        
        {/* Muestra estadísticas (cuántas tareas hay, cuántas completadas, etc.) */}
        <TaskStats tasks={tasks} />
        
        {/* Muestra la lista de tareas según el filtro */}
        <TaskList 
          tasks={tasks} 
          filter={filter} 
          onTaskUpdate={updateTask} 
          onTaskDelete={deleteTask} 
        />
      </div>
    </div>
  );
}

export default App;
