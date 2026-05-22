'use client';

import { useState } from 'react';

interface AppleWatchIntegrationProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export default function AppleWatchIntegration({
  onConnect,
  onDisconnect,
}: AppleWatchIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fitness/apple-watch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'connect' }),
      });

      if (response.ok) {
        setIsConnected(true);
        onConnect?.();
      }
    } catch (error) {
      console.error('Failed to connect Apple Watch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fitness/apple-watch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'disconnect' }),
      });

      if (response.ok) {
        setIsConnected(false);
        onDisconnect?.();
      }
    } catch (error) {
      console.error('Failed to disconnect Apple Watch:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⌚</span>
          <div>
            <h3 className="text-xl font-bold">Apple Watch</h3>
            <p className="text-blue-100">
              {isConnected ? '✅ Connected' : '❌ Not Connected'}
            </p>
          </div>
        </div>
        <button
          onClick={isConnected ? handleDisconnect : handleConnect}
          disabled={loading}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            isConnected
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? '...' : isConnected ? '🔗 Disconnect' : '🔗 Connect'}
        </button>
      </div>
    </div>
  );
}
