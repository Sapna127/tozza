import { NextApiRequest, NextApiResponse } from 'next';
import { createTask, getTasks } from '../../../lib/taskController'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await createTask(req, res);  
      break;
    case 'GET':
      await getTasks(req, res);    
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
