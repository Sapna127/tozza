import prisma from '../../../../lib/prisma'

export default async function handler(req:any, res:any) {
  const { userId } = req.query;
  const achievements = await prisma.achievement.findMany({
    where: { userId },
  });
  res.json(achievements);
}
