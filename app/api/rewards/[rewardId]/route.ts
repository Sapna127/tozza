import { NextResponse } from 'next/server';
import { claimReward } from '../../../../lib/rewardController';
// PATCH: Claim a specific reward by ID
export async function PATCH(req: Request, { params }: { params: { rewardId: string } }) {
  const { rewardId } = params;

  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const reward = await claimReward(rewardId, userId);
    return NextResponse.json(reward, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
