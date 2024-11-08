import prisma from './prisma';

export const getLeaderboard = async () => {
  try {
    return await prisma.user.findMany({
      orderBy: { points: 'desc' },
      select: {
        id: true,
        name: true,
        points: true,
      },
    });
  } catch (error) {
    throw new Error('Failed to fetch leaderboard');
  }
};

export const sendFriendInvite = async (inviterId: string, inviteeEmail: string) => {
  try {
    const invitee = await prisma.user.findUnique({
      where: { email: inviteeEmail },
    });

    if (!invitee) {
      throw new Error('Invitee not found');
    }

    const existingInvite = await prisma.friendInvite.findFirst({
      where: {
        senderId: inviterId,
        receiverId: invitee.id,
      },
    });

    if (existingInvite) {
      throw new Error('Invite already sent');
    }

    const invite = await prisma.friendInvite.create({
      data: {
        senderId: inviterId,
        receiverId: invitee.id,
      },
    });

    console.log('invite', invite)
    return invite;
  } catch (error) {
    throw new Error('Failed to send invite');
  }
};
