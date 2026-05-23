export const exerciseLibrary = [
  {
    id: 'back-squat',
    name: 'Back Squat',
    muscleGroups: ['Quads', 'Glutes', 'Core'],
    equipment: 'Barbell',
    instructions: [
      'Brace your core before each rep.',
      'Sit between the hips and keep the chest proud.',
      'Drive through the mid-foot to stand tall.',
    ],
    idealRanges: { knee: [70, 110], hip: [45, 95], shoulder: [20, 70] },
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    muscleGroups: ['Hamstrings', 'Glutes', 'Back'],
    equipment: 'Barbell',
    instructions: [
      'Keep the bar close to the body.',
      'Hinge from the hips with a neutral spine.',
      'Lock out by squeezing glutes, not leaning back.',
    ],
    idealRanges: { knee: [145, 175], hip: [40, 80], shoulder: [10, 45] },
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    muscleGroups: ['Chest', 'Front Delts', 'Triceps'],
    equipment: 'Barbell',
    instructions: [
      'Pull shoulder blades down and back.',
      'Lower to the mid chest under control.',
      'Press up while keeping wrists stacked.',
    ],
    idealRanges: { elbow: [65, 110], shoulder: [35, 75] },
  },
  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    muscleGroups: ['Biceps', 'Forearms'],
    equipment: 'Dumbbells',
    instructions: [
      'Pin elbows near the ribs.',
      'Curl without swinging the torso.',
      'Lower slowly to full extension.',
    ],
    idealRanges: { elbow: [35, 155], shoulder: [0, 25] },
  },
  {
    id: 'push-up',
    name: 'Push-Up',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    equipment: 'Bodyweight',
    instructions: [
      'Maintain a straight line from head to heel.',
      'Lower until elbows reach roughly 90 degrees.',
      'Press up without hips sagging.',
    ],
    idealRanges: { elbow: [65, 110], hip: [160, 180], shoulder: [25, 70] },
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    muscleGroups: ['Shoulders', 'Triceps', 'Upper Back'],
    equipment: 'Barbell',
    instructions: [
      'Brace glutes and ribs down.',
      'Press in a vertical bar path.',
      'Finish with biceps near the ears.',
    ],
    idealRanges: { elbow: [70, 165], shoulder: [60, 175] },
  },
]
