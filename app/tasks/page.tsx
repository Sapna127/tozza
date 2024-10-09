'use client';

import { useEffect, useState } from 'react';
import TaskCard from '@/components/TaskCard';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB').format(date); // dd/mm/yyyy format
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [userId] = useState('ed5eac21-c7ae-4108-8907-730653ecef72');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const handleCreateTask = async () => {
    if (!title || !description || !dueDate) return; // Ensure all fields are filled
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title, description, dueDate }),
      });
      if (!res.ok) throw new Error('Failed to create task');
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setEditTaskId(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const markComplete = async (taskId: string, completed: boolean) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }), // Toggle completion
      });
      if (!res.ok) throw new Error('Failed to mark complete');
      const updatedTask = await res.json();
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    setDueDate(task.dueDate || '');
  };

  const handleSaveTask = async (taskId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updatedTask = await res.json();
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? updatedTask : task)));
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Tasks</h1>

      {/* Task creation inputs */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input p-3 border border-gray-300 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input p-3 border border-gray-300 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input p-3 border border-gray-300 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
        <button
          onClick={handleCreateTask}
          className="btn bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-150 w-full md:w-auto"
        >
          Create Task
        </button>
      </div>

      {/* Task cards */}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tasks.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input p-3 border border-gray-300 rounded-lg w-full mb-4"
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input p-3 border border-gray-300 rounded-lg w-full mb-4"
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input p-3 border border-gray-300 rounded-lg w-full mb-4"
                />
                <button
                  onClick={() => handleSaveTask(task.id)}
                  className="btn bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-150"
                >
                  Save
                </button>
              </div>
            ) : (
              <TaskCard
                title={task.title}
                description={task.description || ''}
                dueDate={formatDate(task.dueDate)}
                completed={task.completed}
                onToggleComplete={() => markComplete(task.id, task.completed || false)} // Pass current completed status
                onDelete={() => handleDeleteTask(task.id)}
                onEdit={() => handleEditTask(task)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
