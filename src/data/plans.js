export const builtInPlans = [
  {
    id: 'strength-4-day',
    name: '4-Day Strength Split',
    goal: 'Build strength with high-quality compounds.',
    days: [
      {
        label: 'Lower A',
        exercises: ['Back Squat', 'Romanian Deadlift', 'Walking Lunges', 'Calf Raise'],
      },
      {
        label: 'Upper A',
        exercises: ['Bench Press', 'Barbell Row', 'Incline Dumbbell Press', 'Pull-Up'],
      },
      {
        label: 'Lower B',
        exercises: ['Deadlift', 'Front Squat', 'Hamstring Curl', 'Leg Press'],
      },
      {
        label: 'Upper B',
        exercises: ['Overhead Press', 'Lat Pulldown', 'Dips', 'Face Pull'],
      },
    ],
  },
  {
    id: 'hypertrophy-push-pull-legs',
    name: 'Push Pull Legs',
    goal: 'High-volume hypertrophy with supersets baked in.',
    days: [
      { label: 'Push', exercises: ['Bench Press', 'Shoulder Press', 'Lateral Raise', 'Tricep Pressdown'] },
      { label: 'Pull', exercises: ['Deadlift', 'Chest Supported Row', 'Bicep Curl', 'Rear Delt Fly'] },
      { label: 'Legs', exercises: ['Back Squat', 'Leg Press', 'Hamstring Curl', 'Bulgarian Split Squat'] },
    ],
  },
]
