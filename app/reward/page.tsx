'use client'

import Sidebar from '@/components/Sidebar';
import { useEffect, useState } from 'react';

type Reward = {
  id: string;
  name: string;
  points: number;
  claimed: boolean;
  createdAt: string;
};

type Props = {
  userId: string;
};

const RewardsPage = ({ userId }: Props) => {
  const [claimedRewards, setClaimedRewards] = useState<Reward[]>([]);
  const [unclaimedRewards, setUnclaimedRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch claimed and unclaimed rewards
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        setLoading(true);

        // Fetch claimed rewards
        const claimedResponse = await fetch(`/api/rewards?userId=${userId}`);
        const claimedData = await claimedResponse.json();
        if (!claimedResponse.ok) throw new Error(claimedData.error || 'Failed to fetch claimed rewards');

        // Fetch unclaimed rewards
        const unclaimedResponse = await fetch(`/api/rewards?userId=${userId}`);
        const unclaimedData = await unclaimedResponse.json();
        if (!unclaimedResponse.ok) throw new Error(unclaimedData.error || 'Failed to fetch unclaimed rewards');

        setClaimedRewards(claimedData.rewards || []);
        setUnclaimedRewards(unclaimedData.rewards || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [userId]);

  if (loading) return <p>Loading rewards...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Rewards</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Claimed Rewards</h2>
        {claimedRewards.length > 0 ? (
          <ul className="list-disc pl-5">
            {claimedRewards.map((reward) => (
              <li key={reward.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <span>{reward.name}</span>
                  <span className="text-sm text-green-500">Claimed</span>
                </div>
                <p className="text-gray-500">Points: {reward.points}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No claimed rewards yet.</p>
        )}
      </section>

      {/* Unclaimed Rewards Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Unclaimed Rewards</h2>
        {unclaimedRewards.length > 0 ? (
          <ul className="list-disc pl-5">
            {unclaimedRewards.map((reward) => (
              <li key={reward.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <span>{reward.name}</span>
                  <span className="text-sm text-red-500">Unclaimed</span>
                </div>
                <p className="text-gray-500">Points: {reward.points}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No unclaimed rewards available.</p>
        )}
      </section>
    </div>
    </>
  );
};

export default RewardsPage;
