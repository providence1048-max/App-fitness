'use client';

import { useState, useEffect } from 'react';
import AppleWatchIntegration from '@/components/AppleWatchIntegration';
import FitnessStats from '@/components/FitnessStats';
import { FitnessData } from '@/types/fitness';

export default function FitnessPage() {
  const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFitnessData();
  }, []);

  const fetchFitnessData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fitness/apple-watch');
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

  const handleSync = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fitness/apple-watch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync' }),
      });

      if (response.ok) {
        const result = await response.json();
        setFitnessData(result.data);
      }
    } catch (error) {
      console.error('Failed to sync fitness data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            💪 Fitness Dashboard
          </h1>
          <p className="text-green-100">Track your workouts and health metrics from your Apple Watch</p>
        </div>

        {/* Apple Watch Integration */}
        <AppleWatchIntegration onConnect={fetchFitnessData} onDisconnect={() => {}} />

        {/* Sync Button */}
        <div className="mt-6 mb-6">
          <button
            onClick={handleSync}
            disabled={loading}
            className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Syncing...' : '🔄 Sync Now'}
          </button>
        </div>

        {/* Loading State */}
        {loading && !fitnessData && (
          <div className="text-center text-white mt-12">
            <p className="text-xl">Loading your fitness data...</p>
          </div>
        )}

        {/* Fitness Stats */}
        {fitnessData && <FitnessStats data={fitnessData} />}
      </div>
    </main>
  );
}
