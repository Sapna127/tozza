import { Task } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma'

// Create a new task
export const createTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, dueDate, userId } = req.body as {
    title: string;
    description?: string;
    dueDate?: string;
    userId: string;
  };

  try {
    const task: Task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Fetch all tasks for a user
export const getTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query as { userId: string };

  try {
    const tasks: Task[] = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Fetch a specific task by ID
export const getTaskById = async (req: NextApiRequest, res: NextApiResponse, taskId: string) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

// Update a task
export const updateTask = async (req: NextApiRequest, res: NextApiResponse, taskId: string) => {
  const { title, description, dueDate, completed } = req.body as {
    title?: string;
    description?: string;
    dueDate?: string;
    completed?: boolean;
  };

  try {
    const updatedTask: Task = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        completed,
      },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
export const deleteTask = async (req: NextApiRequest, res: NextApiResponse, taskId: string) => {
  try {
    await prisma.task.delete({ where: { id: taskId } });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
