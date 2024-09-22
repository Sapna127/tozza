import prisma from './prisma';

export async function createReward(data: { name: string; points: number }) {
  const { name, points } = data;
  if (!name || !points) {
    throw new Error('Name and points are required');
  }

  const newReward = await prisma.reward.create({
    data: {
      name,
      points,
      claimed: false,
    },
  });

  return newReward;
}

export async function claimReward(rewardId: string, userId: string) {
  if (!rewardId || !userId) {
    throw new Error('Reward ID and User ID are required');
  }

  const existingClaim = await prisma.claimedReward.findFirst({
    where: { rewardId, userId },
  });

  if (existingClaim) {
    throw new Error('Reward has already been claimed by this user');
  }

  const claimedReward = await prisma.claimedReward.create({
    data: {
      rewardId,
      userId,
    },
  });

  await prisma.reward.update({
    where: { id: rewardId },
    data: { claimed: true },
  });

  return claimedReward;
}

export async function getUnclaimedRewards(userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const unclaimedRewards = await prisma.reward.findMany({
    where: {
      claimed: false,
      claimedRewards: {
        none: { userId }, 
      },
    },
  });

  return unclaimedRewards;
}
