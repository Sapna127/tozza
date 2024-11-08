import { NextResponse } from 'next/server';
import { sendFriendInvite } from '../../../../lib/socialController';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { inviterId, inviteeEmail } = body;

    if (!inviterId || !inviteeEmail) {
      return NextResponse.json({ error: 'Inviter ID and Invitee Email are required' }, { status: 400 });
    }

    const invite = await sendFriendInvite(inviterId, inviteeEmail);
    
    return NextResponse.json({
      inviteId: invite.id,
      status: 'sent',
      sentAt: invite.createdAt,
    }, { status: 201 });
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
