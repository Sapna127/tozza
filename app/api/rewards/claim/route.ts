import { NextResponse } from 'next/server';
import { claimReward } from '../../../../lib/rewardController'
import prisma from '../../../../lib/prisma';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rewardId, userId } = body;

    // Validate the input
    if (!rewardId || !userId) {
      return NextResponse.json({ error: 'rewardId and userId are required' }, { status: 400 });
    }

    // Find the reward by ID and ensure it belongs to the user
    const reward = await prisma.reward.findFirst({
      where: {
        id: rewardId,
        userId: userId, // Ensure the reward belongs to the user
      },
    });

    // Check if reward exists
    if (!reward) {
      return NextResponse.json({ error: 'Reward not found or does not belong to the user' }, { status: 404 });
    }

    // Check if reward is already claimed
    if (reward.claimed) {
      return NextResponse.json({ error: 'Reward has already been claimed' }, { status: 400 });
    }

    // Mark reward as claimed
    const claimedReward = await prisma.reward.update({
      where: { id: rewardId },
      data: { claimed: true },
    });

    // Return the updated reward
    return NextResponse.json(claimedReward, { status: 200 });
  } catch (error:any) {
    console.error('Error claiming reward:', error.message);
    return NextResponse.json({ error: 'Failed to claim reward' }, { status: 500 });
  }
}
