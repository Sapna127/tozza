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
    <div
      className="cursor-pointer overflow-hidden  transition-transform duration-500 hover:-translate-y-2 w-full md:w-72 h-44 bg-neutral-50 rounded-lg shadow-lg flex flex-row items-center justify-between p-8 gap-4 before:absolute before:w-full hover:before:top-0 before:duration-500 before:-top-1 before:h-1 before:bg-green-200 align-middle"
    >
      <svg
        className="stroke-green-400 shrink-0"
        height="50"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 100 100"
        width="50"
        xmlns="http://www.w3.org/2000/svg"
      />
      
      <div className="flex flex-col flex-grow">
        {/* Task Title and Controls */}
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg text-gray-800">{title}</span>
          <div className="flex items-center gap-2">
            {/* Toggle Complete Checkbox */}
            <label className="relative">
              <input
                type="checkbox"
                checked={completed}
                onChange={onToggleComplete}
                className="peer h-5 w-5 rounded-full cursor-pointer appearance-none border border-gray-300 transition-all checked:bg-green-500 checked:border-green-500"
              />
              {/* <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span> */}
            </label>
  
            {/* Edit Button */}
            <button
              className="flex items-center justify-center p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all duration-300 text-white"
              onClick={onEdit}
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5V3a1 1 0 011-1h1a1 1 0 011 1v1.5m1.5 0H12m-1 4.5a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1v-6z"
                />
              </svg> */}
              edit
            </button>
  
            <button
              className="flex items-center justify-center p-2 bg-red-500 rounded-full hover:bg-red-600 transition-all duration-300 text-white"
              onClick={onDelete}
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg> */}
              delete
            </button>
          </div>
        </div>
  
       
        <span className="bg-gray-200 rounded-xl w-auto px-2 py-1 text-xs text-green-600 mb-1">
          📅 Due: {formatDate(dueDate)}
        </span>
        <p className="line-clamp-3 text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
  
  
};

export default TaskCard;
