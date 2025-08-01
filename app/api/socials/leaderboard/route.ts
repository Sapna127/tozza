export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/socialController';

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();

    const leaderboardWithRank = leaderboard.map((user, index) => ({
      userId: user.id,
      username: user.name,
      rank: index + 1,
      points: user.points,
    }));

    return NextResponse.json(leaderboardWithRank, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
