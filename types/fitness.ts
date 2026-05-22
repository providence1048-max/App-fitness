export interface WorkoutSession {
  id: string;
  type: 'Running' | 'Cycling' | 'Swimming' | 'Yoga' | 'Gym' | 'Walking' | 'Hiking';
  startDate: Date;
  endDate: Date;
  duration: number; // in minutes
  distance?: number; // in kilometers
  calories: number;
  averageHeartRate?: number;
  maxHeartRate?: number;
}

export interface HealthMetrics {
  steps: number;
  distance: number; // in kilometers
  calories: number;
  activeEnergy: number;
  restingEnergy: number;
  averageHeartRate?: number;
  minHeartRate?: number;
  maxHeartRate?: number;
  bloodOxygen?: number;
  date: Date;
}

export interface FitnessData {
  workouts: WorkoutSession[];
  todayMetrics: HealthMetrics;
  weeklyMetrics: HealthMetrics[];
  lastUpdated: Date;
  isConnected: boolean;
}
