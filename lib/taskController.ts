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



// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await prisma.task.delete({ where: { id: taskId } });
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};

// mark task as completed 
export const completeTask = async  (taskId:string,data: Partial<{ title: string; description: string; dueDate: string; completed: boolean }>):Promise<Task> =>{
  try{
   const task = await prisma.task.findUnique({
    where:{id:taskId},
    include:{user:true},
   });

   if(!task) {
    throw new Error("Task not found");
   }

   if(task.completed){
    throw new Error("Task already completed");
   }

   const currDate = new Date();
   const dueDate = task.dueDate ? new Date(task.dueDate) : null;
   let pointsChange = 0;

   if(dueDate){
    if(currDate<=dueDate){
        pointsChange = 10;
    }else{
      const daysLate = Math.ceil(
        (currDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      pointsChange = -daysLate;
    }
   }else{
     pointsChange=2;
   }

   const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...data,
      completed: true,
    },
  });

  await prisma.user.update({
    where: { id: task.userId },
    data: {
      points: {
        increment: pointsChange,
      },
    },
  });

  return updatedTask;
  }catch(error){
    console.log(error);
    throw new Error('error completing the task as true');
  }
}