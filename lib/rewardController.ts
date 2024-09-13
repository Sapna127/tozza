import { Reward } from '@prisma/client';
import prisma from './prisma';

// Fetch all claimed rewards for a user
export const getClaimedRewards = async (userId: string): Promise<Reward[]> => {
  try {
    return await prisma.reward.findMany({
      where: {
        userId,
        claimed: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    throw new Error('Failed to fetch claimed rewards');
  }
};

// Claim a reward
export async function claimReward(userId: string, rewardId: string) {
  // Find the reward
  const reward = await prisma.reward.findUnique({
    where: { id: rewardId },
  });

  if (!reward) {
    throw new Error('Reward not found');
  }

  // Check if the reward is already claimed
  if (reward.claimed) {
    throw new Error('Reward already claimed');
  }

  // Fetch the user to check their points
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if the user has enough points
  if (user.points < reward.points) {
    throw new Error('Not enough points to claim this reward');
  }

  // Update user points and mark the reward as claimed
  await prisma.user.update({
    where: { id: userId },
    data: {
      points: user.points - reward.points,
    },
  });

  const claimedReward = await prisma.reward.update({
    where: { id: rewardId },
    data: { claimed: true },
  });

  return claimedReward;
}

export async function createReward(data: { name: string; points: number; userId: string }) {
  try {
    const newReward = await prisma.reward.create({
      data: {
        name: data.name,
        points: data.points,
        userId: data.userId,
        claimed: false, 
      },
    });
    return newReward;
  } catch (error) {
    throw new Error('Failed to create reward');
  }
}