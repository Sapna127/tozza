'use client'; 

import { updateTask } from '@/lib/taskController';
import { useEffect, useState } from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [userId, setUserId] = useState('ed5eac21-c7ae-4108-8907-730653ecef72'); 

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/tasks?userId=${userId}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(data.error || 'Failed to fetch tasks');
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
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title,
          description,
          dueDate,
        }),
      });
      const newTask = await res.json();
      if (!res.ok) throw new Error(newTask.error || 'Failed to create task');
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const markComplete = async(taskId: string)=>{
    try{
        const res = await fetch(`/api/tasks/${taskId}`, {method:'PATCH'});
        const updatedTask = await res.json();
        if(!res.ok) throw new Error('failed to mark complete');
        setTasks((prevTaks)=> prevTaks.map((task)=>task.id === taskId ?{...task, completed:updatedTask.completed}:task))
    }catch(error){
        console.error(error);
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input"
        />
        <button
          onClick={handleCreateTask}
          className="btn"
        >
          Create Task
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-4 p-4 border">
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate || 'No due date'}</p>
            <button onClick={()=> markComplete(task.id)}>mark completed</button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
