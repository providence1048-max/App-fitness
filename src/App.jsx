import React, { useState } from 'react';

// Progressive Web App (PWA) Ready
// Users can save the web app directly to an iPhone home screen:
// Safari > Share Button > Add to Home Screen
// The app will behave like a native mobile app.

// IMPORTANT:
// The previous URL was only an example placeholder.
// A 404 DEPLOYMENT_NOT_FOUND error means the app has NOT been deployed yet.
//
// To fix this:
//
// 1. Create a free Vercel account:
//    https://vercel.com
//
// 2. Upload this React project to GitHub.
//
// 3. In Vercel:
//    - Click 'Add New Project'
//    - Import the GitHub repository
//    - Click Deploy
//
// 4. Vercel will generate a REAL live URL like:
//    https://fittrack-ph-app.vercel.app
//
// 5. Open the URL on iPhone Safari:
//    Share -> Add to Home Screen
//
// Optional Vercel Configuration (vercel.json):
// {
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/"
//     }
//   ]
// }
//
// PWA Branding:
// - Black background
// - White PH logo
// - Installable on iPhone + Android
//
// Deployment Notes:
// - Deploy to Vercel, Netlify, or Firebase Hosting
// - Enable HTTPS
// - Add a manifest.json + service worker for offline support
// - Compatible with iPhone and Android home screen installation

export default function FitTrackApp() {
  const goals = [
    'Lose Fat',
    'Build Muscle',
    'Maintain Weight',
    'Increase Strength',
  ];

  const workouts = [
    {
      day: 'Monday',
      focus: 'Upper Body Strength',
      exercises: ['Bench Press', 'Pull-Ups', 'Shoulder Press', 'Rows'],
    },
    {
      day: 'Tuesday',
      focus: 'Cardio + Core',
      exercises: ['HIIT', 'Planks', 'Mountain Climbers', 'Cycling'],
    },
    {
      day: 'Wednesday',
      focus: 'Lower Body',
      exercises: ['Squats', 'Deadlifts', 'Lunges', 'Leg Press'],
    },
  ];

  const mealPlans = {
    'Lose Fat': {
      calories: '2,000 Calories',
      meals: [
        'Egg whites & oatmeal',
        'Chicken salad with avocado',
        'Greek yogurt & berries',
        'Salmon with vegetables',
      ],
    },
    'Build Muscle': {
      calories: '3,000 Calories',
      meals: [
        'Eggs, toast & turkey bacon',
        'Steak, rice & broccoli',
        'Protein shake & banana',
        'Chicken pasta bowl',
      ],
    },
    'Maintain Weight': {
      calories: '2,400 Calories',
      meals: [
        'Protein smoothie',
        'Turkey wrap & fruit',
        'Mixed nuts & yogurt',
        'Grilled chicken with rice',
      ],
    },
    'Increase Strength': {
      calories: '2,800 Calories',
      meals: [
        'Oats with protein',
        'Chicken & sweet potatoes',
        'Protein bar & fruit',
        'Lean beef with vegetables',
      ],
    },
  };

  const [selectedGoal, setSelectedGoal] = useState('Lose Fat');
  const [weight, setWeight] = useState(180);
  const [bodyFat, setBodyFat] = useState(20);
  const [muscleMass, setMuscleMass] = useState(140);

  const activeMealPlan = mealPlans[selectedGoal];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-black text-white rounded-2xl p-4 mb-6 text-center shadow-lg">
        <h2 className="text-xl font-bold">Install FitTrack on Your Phone</h2>
        <p className="text-sm mt-2">
          iPhone: Safari → Share → Add to Home Screen
        </p>
        <p className="text-sm">
          Android: Chrome → Menu → Add to Home Screen
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">PH</span>
                </div>

                <div>
                  <h1 className="text-4xl font-bold">FitTrack</h1>
                </div>
              </div>
              <p className="text-gray-600">
                AI-powered body composition, workouts, and nutrition tracking.
              </p>
            </div>

            <button className="bg-black text-white px-5 py-3 rounded-2xl shadow-lg hover:opacity-90 transition">
              Sync Mobile App
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Body Composition</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Body Fat %
                </label>
                <input
                  type="number"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(Number(e.target.value))}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Muscle Mass (lbs)
                </label>
                <input
                  type="number"
                  value={muscleMass}
                  onChange={(e) => setMuscleMass(Number(e.target.value))}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Goals & Meal Plan
            </h2>

            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full border rounded-xl p-3 mb-4"
            >
              {goals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>

            <div className="bg-gray-50 rounded-2xl p-4">
              <h3 className="text-xl font-semibold mb-2">
                Recommended Intake
              </h3>

              <p className="text-lg mb-4">{activeMealPlan.calories}</p>

              <ul className="space-y-2">
                {activeMealPlan.meals.map((meal) => (
                  <li
                    key={meal}
                    className="bg-white rounded-xl px-4 py-2 shadow-sm"
                  >
                    {meal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Workout Schedule</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {workouts.map((workout) => (
              <div
                key={workout.day}
                className="border rounded-2xl p-4 bg-gray-50"
              >
                <h3 className="text-xl font-bold">{workout.day}</h3>
                <p className="text-gray-600 mb-3">{workout.focus}</p>

                <ul className="space-y-2">
                  {workout.exercises.map((exercise) => (
                    <li
                      key={exercise}
                      className="bg-white rounded-lg px-3 py-2 shadow-sm"
                    >
                      {exercise}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Mobile App Features
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <FeatureCard
              title="iPhone + Android Ready"
              description="Install directly to your home screen and use like a native app."
            />

            <FeatureCard
              title="Cloud Sync"
              description="Securely sync workouts, body composition, and nutrition data."
            />

            <FeatureCard
              title="Apple Health + Google Fit"
              description="Automatically sync calories, workouts, sleep, and steps."
            />

            <FeatureCard
              title="AI Meal Planning"
              description="Generate personalized meal plans based on your fitness goals."
            />
          </div>

          <h2 className="text-2xl font-semibold mb-4">Progress Summary</h2>

          <div className="grid md:grid-cols-3 gap-4 text-center">
            <StatCard label="Current Weight" value={`${weight} lbs`} />
            <StatCard label="Body Fat" value={`${bodyFat}%`} />
            <StatCard label="Muscle Mass" value={`${muscleMass} lbs`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}