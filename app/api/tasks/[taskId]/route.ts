import { NextApiRequest, NextApiResponse } from 'next';
import { getTaskById, updateTask, deleteTask } from '@/lib/taskController'; // Adjust the path to your controller

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { taskId } = req.query as { taskId: string };

  switch (req.method) {
    case 'GET':
      await getTaskById(req, res, taskId);   // Fetch a specific task by ID
      break;
    case 'PATCH':
      await updateTask(req, res, taskId);    // Update a task by ID
      break;
    case 'DELETE':
      await deleteTask(req, res, taskId);    // Delete a task by ID
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
