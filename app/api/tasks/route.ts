import { NextResponse } from 'next/server';
import { createTask, getTasks } from '@/lib/taskController';

// POST: Create a new task
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, title, description, dueDate } = body;

    console.log("create task called..");

    // Convert dueDate to Date if it is a string
    const parsedDueDate = dueDate ? new Date(dueDate) : null;

    const task = await createTask(
      title,
      description || null,
      parsedDueDate,
      userId
    );

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error(error); // Added logging for better error diagnosis
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

// GET: Fetch tasks for a specific user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Reuse controller function to get tasks
    const tasks = await getTasks(userId);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error); // Added logging for better error diagnosis
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
