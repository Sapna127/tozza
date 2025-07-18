import { NextResponse } from 'next/server';
import { getTaskById, updateTask, deleteTask } from '../../../../lib/taskController';
export const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: { taskId: string } }) {
  const { taskId } = params;

  try {
    const task = await getTaskById(taskId);
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { taskId: string } }) {
  const { taskId } = params;

  try {
    const body = await req.json();
    const { title, description, dueDate, completed } = body;

    const updatedTask = await updateTask(taskId, {
      title,
      description,
      dueDate,
      completed,
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { taskId: string } }) {
  const { taskId } = params;

  try {
    await deleteTask(taskId);
    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
