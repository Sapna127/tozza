import { NextRequest, NextResponse } from 'next/server';
import { createReward, claimReward, getUnclaimedRewards } from '../../../lib/rewardController';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, points, userId, rewardId } = body;

    if (name && points) {
      const newReward = await createReward({ name, points });
      return NextResponse.json({ success: true, reward: newReward }, { status: 201 });
    }

    if (rewardId && userId) {
      const claimedReward = await claimReward(rewardId, userId);
      return NextResponse.json({ success: true, claimedReward }, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message || 'Failed to handle request' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const rewards = await getUnclaimedRewards(userId);
    return NextResponse.json({ success: true, rewards }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch rewards' }, { status: 500 });
  }
}
