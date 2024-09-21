"use client"
import { useEffect, useState } from 'react';

interface LeaderboardUser {
  userId: string;
  username: string;
  rank: number;
  points: number;
}

const SocialPage = () => {
//   const leaderboard = await getLeaderboard();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/socials/leaderboard');
        if (response.ok) {
          const data: LeaderboardUser[] = await response.json();
          setLeaderboard(data);
        } else {
          setError('Failed to fetch leaderboard');
        }
      } catch (error) {
        setError('Error occurred while fetching data');
      }
    };

    fetchLeaderboard();
  }, []); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
   <>
    <div>
      <h1>Leaderboard</h1>
      {leaderboard.length > 0 ? (
        <ul>
          {leaderboard.map((user) => (
            <li key={user.userId}>
              {user.rank}. {user.username} - {user.points} points
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading leaderboard...</p>
      )}
    </div>
    <div>
        <h1>Friends</h1>
        <button>Send invite</button>
    </div>
   </>
  );
};

export default SocialPage;
