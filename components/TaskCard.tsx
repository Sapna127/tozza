'use client';

import { FC } from 'react';

interface TaskCardProps {
  title: string;
  description: string;
  dueDate?: string;
  completed?: boolean;
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: () => void; 
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'No due date';
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const TaskCard: FC<TaskCardProps> = ({ title, description, dueDate, completed, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 ${completed ? 'opacity-50' : ''}`}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-sm text-gray-500 mb-4">{formatDate(dueDate)}</p>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggleComplete}
          className="mr-2 h-5 w-5 border border-gray-300 rounded"
        />
        <button onClick={onEdit} className="text-blue-500 hover:underline mr-2">Edit</button>
        <button onClick={onDelete} className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
