import prisma from '../../../../lib/prisma'

export default async function handler(req:any, res:any) {
  const { inviterId, inviteeEmail } = req.body;

  const invitee = await prisma.user.findUnique({
    where: { email: inviteeEmail },
  });

  if (!invitee) {
    return res.status(404).json({ error: 'Invitee not found' });
  }

  const invite = await prisma.friendInvite.create({
    data: {
      senderId: inviterId,
      receiverId: invitee.id,
    },
  });

  res.json(invite);
}
