import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { createReward,getClaimedRewards } from '../../../lib/rewardController';

// POST: Create a new reward
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Request Body:', body);
    const { name, points, userId } = body;

    if (!name || !points || !userId) {
      return NextResponse.json({ error: 'All fields (name, points, userId) are required' }, { status: 400 });
    }

    const newReward = await createReward({ name, points, userId });

    return NextResponse.json(newReward, { status: 201 });
  } catch (error) {
    // console.error('Error creating reward:', error.message);
    return NextResponse.json({ error: 'Failed to create reward' }, { status: 500 });
  }
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const rewards = await getClaimedRewards(userId);
    return NextResponse.json(rewards, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch claimed rewards' }, { status: 500 });
  }
}
