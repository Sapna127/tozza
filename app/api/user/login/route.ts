import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt, { compare } from 'bcrypt';
import { use } from 'react';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user.password != password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Sign-in successful', user: { id: user.id, name: user.name, email: user.email } }, { status: 200 });

  } catch (error) {
    console.error('Error during sign-in:', error);
    return NextResponse.json({ error: 'Something went wrong during sign-in' }, { status: 500 });
  }
}
