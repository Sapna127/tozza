import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    const achievements = await prisma.achievement.findMany({
      where: { userId },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch achievements..' }, { status: 500 });
  }
};
