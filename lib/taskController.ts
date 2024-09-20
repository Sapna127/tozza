import { Task } from '@prisma/client';
import prisma from './prisma'

// Create a new task
export const createTask = async (
  title: string,
  description: string | null,
  dueDate: Date | null,
  userId: string
): Promise<Task> => {
  try {
    console.log("create task controller");
    return await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        userId,
      },
    });
  } catch (error) {
    throw new Error('Failed to create task');
  }
};

// Fetch all tasks for a user
export const getTasks = async (userId: string): Promise<Task[]> => {
  try {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

// Fetch a specific task by ID
export const getTaskById = async (taskId: string): Promise<Task | null> => {
  try {
    return await prisma.task.findUnique({ where: { id: taskId } });
  } catch (error) {
    throw new Error('Failed to fetch task');
  }
};

// Update a task
export const updateTask = async (
  taskId: string,
  data: Partial<{ title: string; description: string; dueDate: string; completed: boolean }>
): Promise<Task> => {
  try {
    return await prisma.task.update({
      where: { id: taskId },
      data: {
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await prisma.task.delete({ where: { id: taskId } });
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};
