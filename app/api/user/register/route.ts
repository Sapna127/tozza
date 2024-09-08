import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(req: NextRequest) {
  console.log('Received POST request');
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json({ message: 'User registered successfully', user }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  console.log('Received GET request');
  return NextResponse.json({ message: 'Only POST requests are allowed' }, { status: 405 });
}
