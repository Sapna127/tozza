import prisma from '../../../../lib/prisma';

export default async function handler(req:any, res:any) {
  const users = await prisma.user.findMany({
    orderBy: { points: 'desc' }, 
    select: {
      id: true,
      name: true,
      points: true, 
    },
  });

  res.json(users.map((user, index) => ({
    userId: user.id,
    username: user.name,
    rank: index + 1,
    points: user.points,
  })));
}
