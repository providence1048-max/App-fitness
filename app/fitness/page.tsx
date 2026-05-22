'use client';

import { useState, useEffect } from 'react';
import AppleWatchIntegration from '@/components/AppleWatchIntegration';
import FitnessStats from '@/components/FitnessStats';
import { FitnessData } from '@/types/fitness';

export default function FitnessPage() {
  const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId] = useState('default-user');

  useEffect(() => {
    fetchFitnessData();
  }, [userId]);

  const fetchFitnessData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/fitness/apple-watch?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setFitnessData(data);
      }
    } catch (error) {
      console.error('Failed to fetch fitness data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    // Refresh data after connecting
    fetchFitnessData();
  };

  const handleSync = () => {
    // Refresh data after syncing
    fetchFitnessData();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            💪 Fitness Dashboard
          </h1>
          <p className="text-green-100">Apple Watch data syncs automatically every 5 minutes</p>
        </div>

        {/* Apple Watch Integration */}
        <AppleWatchIntegration 
          userId={userId}
          onConnect={handleConnect}
          onSync={handleSync}
        />

        {/* Loading State */}
        {loading && !fitnessData && (
          <div className="text-center text-white mt-12">
            <p className="text-xl">⏳ Loading your fitness data...</p>
          </div>
        )}

        {/* Fitness Stats */}
        {fitnessData && (
          <div className="mt-8">
            <FitnessStats data={fitnessData} />
          </div>
        )}
      </div>
    </main>
  );
}
