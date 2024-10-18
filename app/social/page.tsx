"use client"
import { useEffect, useState } from 'react';

interface LeaderboardUser {
  userId: string;
  username: string;
  rank: number;
  points: number;
}

const SocialPage = () => {
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
      <div className="max-w-4xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Leaderboard</h1>
        {leaderboard.length > 0 ? (
          <ul className="space-y-4">
            {leaderboard.map((user) => (
              <li
                key={user.userId}
                className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {user.rank}. {user.username}
                </span>
                <span className="text-lg font-medium text-green-500">
                  {user.points} points
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-xl">Loading leaderboard...</p>
        )}
      </div>
  
      <div className="max-w-4xl mx-auto mt-8 p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Friends</h1>
        <div className="flex justify-center">
          <button
            type="button"
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-3 shadow-md transition transform hover:scale-105 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Send Invite
          </button>
        </div>
      </div>
    </>
  );
  
};

export default SocialPage;
