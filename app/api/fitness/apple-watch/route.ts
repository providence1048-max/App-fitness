import { NextRequest, NextResponse } from 'next/server';
import { FitnessData, HealthMetrics, WorkoutSession } from '@/types/fitness';

// In-memory storage (use database in production)
const fitnessDataStore: { [userId: string]: FitnessData } = {};

const generateMockFitnessData = (): FitnessData => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayMetrics: HealthMetrics = {
    steps: 8234,
    distance: 5.2,
    calories: 2450,
    activeEnergy: 340,
    restingEnergy: 1650,
    averageHeartRate: 72,
    minHeartRate: 58,
    maxHeartRate: 156,
    bloodOxygen: 98,
    date: today,
  };

  const workouts: WorkoutSession[] = [
    {
      id: '1',
      type: 'Running',
      startDate: new Date(today.getTime() + 6 * 60 * 60 * 1000),
      endDate: new Date(today.getTime() + 7 * 60 * 60 * 1000),
      duration: 45,
      distance: 7.2,
      calories: 680,
      averageHeartRate: 156,
      maxHeartRate: 178,
    },
    {
      id: '2',
      type: 'Gym',
      startDate: new Date(today.getTime() + 17 * 60 * 60 * 1000),
      endDate: new Date(today.getTime() + 18 * 60 * 60 * 1000),
      duration: 60,
      calories: 520,
      averageHeartRate: 128,
      maxHeartRate: 145,
    },
  ];

  const weeklyMetrics: HealthMetrics[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    weeklyMetrics.push({
      steps: Math.floor(Math.random() * 5000) + 5000,
      distance: Math.random() * 8 + 3,
      calories: Math.floor(Math.random() * 1500) + 1500,
      activeEnergy: Math.floor(Math.random() * 400) + 200,
      restingEnergy: 1650,
      averageHeartRate: Math.floor(Math.random() * 20) + 65,
      date,
    });
  }

  return {
    workouts,
    todayMetrics,
    weeklyMetrics,
    lastUpdated: new Date(),
    isConnected: true,
  };
};

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId') || 'default-user';
    
    // Return stored data or generate mock data
    const fitnessData = fitnessDataStore[userId] || generateMockFitnessData();
    
    return NextResponse.json(fitnessData);
  } catch (error) {
    console.error('Fitness API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fitness data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId = 'default-user', data } = body;

    if (action === 'connect') {
      // Initialize Apple Watch connection
      fitnessDataStore[userId] = generateMockFitnessData();
      return NextResponse.json({ 
        status: 'connected', 
        message: 'Apple Watch connected and syncing',
        data: fitnessDataStore[userId]
      });
    } 
    else if (action === 'disconnect') {
      // Disconnect Apple Watch
      delete fitnessDataStore[userId];
      return NextResponse.json({ 
        status: 'disconnected', 
        message: 'Apple Watch disconnected' 
      });
    } 
    else if (action === 'sync') {
      // Sync latest data from Apple Watch
      const updatedData = generateMockFitnessData();
      fitnessDataStore[userId] = updatedData;
      return NextResponse.json({ 
        status: 'synced', 
        message: 'Apple Watch data synced successfully',
        data: updatedData 
      });
    }
    else if (action === 'add-workout') {
      // Add a new workout from Apple Watch
      if (!fitnessDataStore[userId]) {
        fitnessDataStore[userId] = generateMockFitnessData();
      }
      
      const newWorkout: WorkoutSession = {
        id: Date.now().toString(),
        ...data.workout
      };
      
      fitnessDataStore[userId].workouts.push(newWorkout);
      fitnessDataStore[userId].lastUpdated = new Date();
      
      return NextResponse.json({ 
        status: 'workout-added', 
        message: 'Workout added from Apple Watch',
        data: fitnessDataStore[userId] 
      });
    }
    else if (action === 'update-metrics') {
      // Update daily metrics from Apple Watch
      if (!fitnessDataStore[userId]) {
        fitnessDataStore[userId] = generateMockFitnessData();
      }
      
      fitnessDataStore[userId].todayMetrics = {
        ...fitnessDataStore[userId].todayMetrics,
        ...data.metrics
      };
      fitnessDataStore[userId].lastUpdated = new Date();
      
      return NextResponse.json({ 
        status: 'metrics-updated', 
        message: 'Daily metrics updated from Apple Watch',
        data: fitnessDataStore[userId] 
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Fitness API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
