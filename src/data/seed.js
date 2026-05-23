import { formatISO, subDays } from 'date-fns'

export const demoLogs = [
  {
    id: 'session-1',
    date: formatISO(subDays(new Date(), 3), { representation: 'date' }),
    name: 'Lower Power',
    exercises: [
      {
        name: 'Back Squat',
        muscleGroups: ['Quads', 'Glutes', 'Core'],
        sets: [
          { reps: 5, weight: 225 },
          { reps: 5, weight: 235 },
          { reps: 4, weight: 245 },
        ],
      },
    ],
  },
  {
    id: 'session-2',
    date: formatISO(subDays(new Date(), 1), { representation: 'date' }),
    name: 'Upper Push',
    exercises: [
      {
        name: 'Bench Press',
        muscleGroups: ['Chest', 'Front Delts', 'Triceps'],
        sets: [
          { reps: 8, weight: 155 },
          { reps: 7, weight: 165 },
          { reps: 6, weight: 175 },
        ],
      },
      {
        name: 'Overhead Press',
        muscleGroups: ['Shoulders', 'Triceps'],
        sets: [
          { reps: 8, weight: 95 },
          { reps: 8, weight: 95 },
          { reps: 6, weight: 105 },
        ],
      },
    ],
  },
]

export const initialData = {
  workoutLogs: demoLogs,
  customPlans: [],
  queuedExercises: [],
  bodyMetrics: [
    { date: formatISO(subDays(new Date(), 5), { representation: 'date' }), weight: 198, waist: 34, chest: 43 },
    { date: formatISO(new Date(), { representation: 'date' }), weight: 196, waist: 33.6, chest: 43.5 },
  ],
}
