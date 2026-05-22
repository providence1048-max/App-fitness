'use client';

import { useState, useEffect } from 'react';

interface AppleWatchIntegrationProps {
  userId?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onSync?: () => void;
}

export default function AppleWatchIntegration({
  userId = 'default-user',
  onConnect,
  onDisconnect,
  onSync,
}: AppleWatchIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [autoSync, setAutoSync] = useState(true);

  // Auto-sync every 5 minutes when connected
  useEffect(() => {
    if (!isConnected || !autoSync) return;

    const syncInterval = setInterval(() => {
      handleSync();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(syncInterval);
  }, [isConnected, autoSync]);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fitness/apple-watch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'connect',
          userId
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setIsConnected(true);
        setLastSync(new Date());
        setSyncStatus('✅ Connected to Apple Watch');
        onConnect?.();
        
        // Clear status after 3 seconds
        setTimeout(() => setSyncStatus(null), 3000);
      }
    } catch (error) {
      console.error('Failed to connect Apple Watch:', error);
      setSyncStatus('❌ Connection failed');
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
        body: JSON.stringify({ 
          action: 'disconnect',
          userId
        }),
      });

      if (response.ok) {
        setIsConnected(false);
        setSyncStatus('✅ Apple Watch disconnected');
        setLastSync(null);
        onDisconnect?.();
        
        setTimeout(() => setSyncStatus(null), 3000);
      }
    } catch (error) {
      console.error('Failed to disconnect Apple Watch:', error);
      setSyncStatus('❌ Disconnect failed');
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
        body: JSON.stringify({ 
          action: 'sync',
          userId
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setLastSync(new Date());
        setSyncStatus('✅ Data synced with Apple Watch');
        onSync?.();
        
        setTimeout(() => setSyncStatus(null), 3000);
      }
    } catch (error) {
      console.error('Failed to sync Apple Watch data:', error);
      setSyncStatus('❌ Sync failed');
    } finally {
      setLoading(false);
    }
  };

  const formatLastSync = () => {
    if (!lastSync) return 'Never';
    const now = new Date();
    const diffMs = now.getTime() - lastSync.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⌚</span>
          <div>
            <h3 className="text-xl font-bold">Apple Watch Connection</h3>
            <p className="text-blue-100">
              {isConnected ? '✅ Connected & Syncing' : '❌ Not Connected'}
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
          {loading ? '⏳ ...' : isConnected ? '🔗 Disconnect' : '🔗 Connect'}
        </button>
      </div>

      {/* Status Message */}
      {syncStatus && (
        <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3 text-sm font-semibold">
          {syncStatus}
        </div>
      )}

      {/* Last Sync Info */}
      {isConnected && (
        <div className="bg-white bg-opacity-10 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-100">Last Sync:</span>
            <span className="font-semibold">{formatLastSync()}</span>
          </div>
          
          {/* Auto-Sync Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Auto-sync every 5 minutes</span>
          </label>

          {/* Manual Sync Button */}
          <button
            onClick={handleSync}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-all text-sm mt-2"
          >
            {loading ? '⏳ Syncing...' : '🔄 Sync Now'}
          </button>
        </div>
      )}

      {/* Connection Instructions */}
      {!isConnected && (
        <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-3 text-sm text-yellow-100">
          <p className="font-semibold mb-2">📱 How to Connect:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Wear your Apple Watch</li>
            <li>Have Apple Health app with fitness data</li>
            <li>Click Connect button above</li>
            <li>Data will sync automatically every 5 minutes</li>
          </ul>
        </div>
      )}
    </div>
  );
}
