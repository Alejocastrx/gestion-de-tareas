
import React from 'react';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="flex justify-between p-4 bg-gray-100 rounded">
      <div>
        <p className="text-lg font-semibold">Tareas Pendientes:</p>
        <p className="text-2xl font-bold text-blue-600">{pendingTasks}</p>
      </div>
      <div>
        <p className="text-lg font-semibold">Total de Tareas:</p>
        <p className="text-2xl font-bold text-gray-700">{totalTasks}</p>
      </div>
    </div>
  );
};

export default TaskStats;