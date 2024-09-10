import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { userId, rewardId } = req.body;

  const reward = await prisma.reward.update({
    where: { id: rewardId },
    data: { claimed: true },
  });

  res.json(reward);
}
