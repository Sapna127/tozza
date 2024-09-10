import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export default async function handler(req:any, res:any) {
  const { userId } = req.query;

  const rewards = await prisma.reward.findMany({
    where: { userId },
  });
  res.json(rewards);
}
