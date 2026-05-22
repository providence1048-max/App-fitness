'use client';

import { FitnessData } from '@/types/fitness';

interface FitnessStatsProps {
  data: FitnessData;
}

const getWorkoutEmoji = (type: string): string => {
  const emojiMap: { [key: string]: string } = {
    Running: '🏃',
    Cycling: '🚴',
    Swimming: '🏊',
    Yoga: '🧘',
    Gym: '🏋️',
    Walking: '🚶',
    Hiking: '⛰️',
  };
  return emojiMap[type] || '💪';
};

export default function FitnessStats({ data }: FitnessStatsProps) {
  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Today's Metrics */}
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">📊 Today's Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-500 bg-opacity-30 rounded-lg p-4">
            <p className="text-blue-100 text-sm">Steps</p>
            <p className="text-3xl font-bold">{data.todayMetrics.steps}</p>
          </div>
          <div className="bg-green-500 bg-opacity-30 rounded-lg p-4">
            <p className="text-green-100 text-sm">Distance</p>
            <p className="text-3xl font-bold">{data.todayMetrics.distance}km</p>
          </div>
          <div className="bg-red-500 bg-opacity-30 rounded-lg p-4">
            <p className="text-red-100 text-sm">Calories</p>
            <p className="text-3xl font-bold">{data.todayMetrics.calories}</p>
          </div>
          <div className="bg-purple-500 bg-opacity-30 rounded-lg p-4">
            <p className="text-purple-100 text-sm">Avg Heart Rate</p>
            <p className="text-3xl font-bold">{data.todayMetrics.averageHeartRate} bpm</p>
          </div>
          <div className="bg-yellow-500 bg-opacity-30 rounded-lg p-4">
            <p className="text-yellow-100 text-sm">Active Energy</p>
            <p className="text-3xl font-bold">{data.todayMetrics.activeEnergy}</p>
          </div>
          <div className="bg-cyan-500 bg-opacity-30 rounded-lg p-4">
            <p className="text-cyan-100 text-sm">O₂ Level</p>
            <p className="text-3xl font-bold">{data.todayMetrics.bloodOxygen}%</p>
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">🏃 Recent Workouts</h2>
        <div className="space-y-3">
          {data.workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white bg-opacity-10 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getWorkoutEmoji(workout.type)}</span>
                <div>
                  <p className="font-semibold">{workout.type}</p>
                  <p className="text-blue-100 text-sm">
                    {formatTime(workout.startDate)} - {formatTime(workout.endDate)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatDuration(workout.duration)}</p>
                <p className="text-blue-100 text-sm">{workout.calories} kcal</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">📈 Weekly Summary</h2>
        <div className="space-y-2">
          {data.weeklyMetrics.map((metric, index) => {
            const date = new Date(metric.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            return (
              <div key={index} className="flex items-center justify-between">
                <span className="text-blue-100">{dayName}</span>
                <div className="flex gap-4 text-sm">
                  <span>{metric.steps.toLocaleString()} steps</span>
                  <span>{metric.distance.toFixed(1)}km</span>
                  <span>{metric.calories} kcal</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
