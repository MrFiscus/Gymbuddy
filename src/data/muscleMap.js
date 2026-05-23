export const muscleDefinitions = {
  chest: { label: 'Chest', side: 'front', slug: 'chest', x: 170, y: 118 },
  shoulders: { label: 'Shoulders', side: 'front', slug: 'shoulders', x: 96, y: 98 },
  biceps: { label: 'Biceps', side: 'front', slug: 'biceps', x: 78, y: 142 },
  forearms: { label: 'Forearms', side: 'front', slug: 'forearms', x: 62, y: 206 },
  abs: { label: 'Abs', side: 'front', slug: 'abs', x: 170, y: 176 },
  quads: { label: 'Quads', side: 'front', slug: 'quads', x: 168, y: 286 },
  calves: { label: 'Calves', side: 'front', slug: 'calves', x: 170, y: 418 },
  traps: { label: 'Traps', side: 'back', slug: 'traps', x: 170, y: 92 },
  lats: { label: 'Lats', side: 'back', slug: 'back', x: 170, y: 154 },
  triceps: { label: 'Triceps', side: 'back', slug: 'triceps', x: 80, y: 152 },
  glutes: { label: 'Glutes', side: 'back', slug: 'glutes', x: 170, y: 246 },
  hamstrings: { label: 'Hamstrings', side: 'back', slug: 'hamstrings', x: 170, y: 334 },
}

export const musclePaths = {
  front: [
    { id: 'shoulders-left', group: 'shoulders', d: 'M95 98c-18 9-30 24-34 49 8 6 20 12 38 16 11-22 17-42 20-66-8-2-15-1-24 1z' },
    { id: 'shoulders-right', group: 'shoulders', d: 'M245 98c18 9 30 24 34 49-8 6-20 12-38 16-11-22-17-42-20-66 8-2 15-1 24 1z' },
    { id: 'chest-left', group: 'chest', d: 'M126 119c-17 10-25 28-24 49 17 8 39 12 61 11 0-24-8-45-24-61-5-1-8-1-13 1z' },
    { id: 'chest-right', group: 'chest', d: 'M214 119c17 10 25 28 24 49-17 8-39 12-61 11 0-24 8-45 24-61 5-1 8-1 13 1z' },
    { id: 'biceps-left', group: 'biceps', d: 'M84 148c-10 18-14 36-12 59 9 8 21 14 35 18 7-22 10-43 9-66-10-4-20-8-32-11z' },
    { id: 'biceps-right', group: 'biceps', d: 'M256 148c10 18 14 36 12 59-9 8-21 14-35 18-7-22-10-43-9-66 10-4 20-8 32-11z' },
    { id: 'forearms-left', group: 'forearms', d: 'M77 220c-8 20-11 43-8 70 8 8 17 14 29 18 11-23 13-49 10-73-10-5-20-10-31-15z' },
    { id: 'forearms-right', group: 'forearms', d: 'M263 220c8 20 11 43 8 70-8 8-17 14-29 18-11-23-13-49-10-73 10-5 20-10 31-15z' },
    { id: 'abs-left', group: 'abs', d: 'M146 177c-11 11-15 34-13 76 9 8 20 13 34 16l1-95c-9-1-15 0-22 3z' },
    { id: 'abs-right', group: 'abs', d: 'M194 177c11 11 15 34 13 76-9 8-20 13-34 16l-1-95c9-1 15 0 22 3z' },
    { id: 'quads-left', group: 'quads', d: 'M135 270c-17 18-27 47-28 93 10 10 24 18 42 24 14-38 18-74 13-113-10-1-18-2-27-4z' },
    { id: 'quads-right', group: 'quads', d: 'M205 270c17 18 27 47 28 93-10 10-24 18-42 24-14-38-18-74-13-113 10-1 18-2 27-4z' },
    { id: 'calves-left', group: 'calves', d: 'M148 389c-12 19-17 46-15 84 8 10 17 17 28 22 9-29 13-61 10-93-7-5-14-9-23-13z' },
    { id: 'calves-right', group: 'calves', d: 'M192 389c12 19 17 46 15 84-8 10-17 17-28 22-9-29-13-61-10-93 7-5 14-9 23-13z' },
  ],
  back: [
    { id: 'traps-left', group: 'traps', d: 'M129 88c-20 8-34 24-42 49 11 9 25 14 42 17 8-23 18-42 33-61-11-4-22-6-33-5z' },
    { id: 'traps-right', group: 'traps', d: 'M211 88c20 8 34 24 42 49-11 9-25 14-42 17-8-23-18-42-33-61 11-4 22-6 33-5z' },
    { id: 'triceps-left', group: 'triceps', d: 'M90 144c-10 16-14 35-13 58 9 8 20 14 33 17 8-21 11-42 10-63-10-4-19-8-30-12z' },
    { id: 'triceps-right', group: 'triceps', d: 'M250 144c10 16 14 35 13 58-9 8-20 14-33 17-8-21-11-42-10-63 10-4 19-8 30-12z' },
    { id: 'lats-left', group: 'lats', d: 'M121 145c-23 18-35 43-37 80 15 15 35 22 61 24 16-32 19-67 9-103-11-2-21-2-33-1z' },
    { id: 'lats-right', group: 'lats', d: 'M219 145c23 18 35 43 37 80-15 15-35 22-61 24-16-32-19-67-9-103 11-2 21-2 33-1z' },
    { id: 'glutes-left', group: 'glutes', d: 'M132 248c-14 13-21 33-20 56 17 10 35 15 56 16-1-27-8-50-25-71-4-1-8-1-11-1z' },
    { id: 'glutes-right', group: 'glutes', d: 'M208 248c14 13 21 33 20 56-17 10-35 15-56 16 1-27 8-50 25-71 4-1 8-1 11-1z' },
    { id: 'hamstrings-left', group: 'hamstrings', d: 'M135 321c-15 20-23 49-22 92 10 11 22 18 37 23 14-35 19-72 15-108-9-1-19-4-30-7z' },
    { id: 'hamstrings-right', group: 'hamstrings', d: 'M205 321c15 20 23 49 22 92-10 11-22 18-37 23-14-35-19-72-15-108 9-1 19-4 30-7z' },
    { id: 'calves-back-left', group: 'calves', d: 'M148 404c-11 18-16 43-14 80 8 10 16 17 27 22 9-28 14-58 11-88-7-5-14-9-24-14z' },
    { id: 'calves-back-right', group: 'calves', d: 'M192 404c11 18 16 43 14 80-8 10-16 17-27 22-9-28-14-58-11-88 7-5 14-9 24-14z' }
  ]
}
