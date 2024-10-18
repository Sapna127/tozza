'use client';
import { useState } from 'react';

interface LeaderboardUser {
  userId: string;
  username: string;
  rank: number;
  points: number;
}

interface LeaderboardClientProps {
  leaderboard: LeaderboardUser[];
}

const LeaderboardClient: React.FC<LeaderboardClientProps> = ({ leaderboard }) => {
  const [sortedLeaderboard, setSortedLeaderboard] = useState(leaderboard);

  const handleSort = () => {
    const sorted = [...sortedLeaderboard].sort((a, b) => b.points - a.points);
    setSortedLeaderboard(sorted);
  };

  return (
    <div>
      <button onClick={handleSort}>Sort by Points</button>
      <ul>
        {sortedLeaderboard.map((user) => (
          <li key={user.userId}>
            {user.rank}. {user.username} - {user.points} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderboardClient;