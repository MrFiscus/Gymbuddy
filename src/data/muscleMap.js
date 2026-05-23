export const muscleDefinitions = {
  chest: { label: 'Chest', side: 'front', slug: 'chest', x: 170, y: 135 },
  shoulders: { label: 'Shoulders', side: 'front', slug: 'shoulders', x: 110, y: 112 },
  biceps: { label: 'Biceps', side: 'front', slug: 'biceps', x: 96, y: 176 },
  forearms: { label: 'Forearms', side: 'front', slug: 'forearms', x: 95, y: 242 },
  abs: { label: 'Abs', side: 'front', slug: 'abs', x: 170, y: 215 },
  quads: { label: 'Quads', side: 'front', slug: 'quads', x: 170, y: 315 },
  calves: { label: 'Calves', side: 'front', slug: 'calves', x: 170, y: 438 },
  traps: { label: 'Traps', side: 'back', slug: 'traps', x: 170, y: 114 },
  lats: { label: 'Lats', side: 'back', slug: 'back', x: 170, y: 170 },
  triceps: { label: 'Triceps', side: 'back', slug: 'triceps', x: 96, y: 184 },
  glutes: { label: 'Glutes', side: 'back', slug: 'glutes', x: 170, y: 272 },
  hamstrings: { label: 'Hamstrings', side: 'back', slug: 'hamstrings', x: 170, y: 350 },
}

export const muscleOverlayTransforms = {
  front: { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 },
  back: { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 },
}

export const musclePaths = {
  front: [
    { id: 'shoulders-left', group: 'shoulders', d: 'M116 112C102 116 92 128 90 145c11 7 24 12 38 15 7-18 10-33 10-50-8-1-14-1-22 2z' },
    { id: 'shoulders-right', group: 'shoulders', d: 'M224 112c14 4 24 16 26 33-11 7-24 12-38 15-7-18-10-33-10-50 8-1 14-1 22 2z' },
    { id: 'chest-left', group: 'chest', d: 'M140 140c-14 8-22 21-24 39 18 7 33 10 49 9 2-19-3-34-16-48-3-1-5-1-9 0z' },
    { id: 'chest-right', group: 'chest', d: 'M200 140c14 8 22 21 24 39-18 7-33 10-49 9-2-19 3-34 16-48 3-1 5-1 9 0z' },
    { id: 'biceps-left', group: 'biceps', d: 'M101 169c-8 13-10 27-8 44 8 7 17 12 27 14 7-17 9-32 8-48-8-4-16-7-27-10z' },
    { id: 'biceps-right', group: 'biceps', d: 'M239 169c8 13 10 27 8 44-8 7-17 12-27 14-7-17-9-32-8-48 8-4 16-7 27-10z' },
    { id: 'forearms-left', group: 'forearms', d: 'M102 229c-8 18-8 39-3 61 7 5 13 8 20 10 8-19 10-38 6-59-6-4-13-8-23-12z' },
    { id: 'forearms-right', group: 'forearms', d: 'M238 229c8 18 8 39 3 61-7 5-13 8-20 10-8-19-10-38-6-59 6-4 13-8 23-12z' },
    { id: 'abs-left', group: 'abs', d: 'M149 191c-9 8-13 24-12 51 8 7 16 11 27 14l1-66c-6-1-11-1-16 1z' },
    { id: 'abs-right', group: 'abs', d: 'M191 191c9 8 13 24 12 51-8 7-16 11-27 14l-1-66c6-1 11-1 16 1z' },
    { id: 'quads-left', group: 'quads', d: 'M145 265c-12 18-16 48-12 88 7 10 16 18 27 23 10-30 12-61 8-94-7-5-14-10-23-17z' },
    { id: 'quads-right', group: 'quads', d: 'M195 265c12 18 16 48 12 88-7 10-16 18-27 23-10-30-12-61-8-94 7-5 14-10 23-17z' },
    { id: 'calves-left', group: 'calves', d: 'M151 387c-8 17-10 39-8 70 4 7 9 13 16 18 8-24 11-49 9-74-5-5-10-9-17-14z' },
    { id: 'calves-right', group: 'calves', d: 'M189 387c8 17 10 39 8 70-4 7-9 13-16 18-8-24-11-49-9-74 5-5 10-9 17-14z' },
  ],
  back: [
    { id: 'traps-left', group: 'traps', d: 'M141 116c-13 5-22 15-28 30 11 6 22 10 35 12 7-14 14-26 23-36-9-4-18-6-30-6z' },
    { id: 'traps-right', group: 'traps', d: 'M199 116c13 5 22 15 28 30-11 6-22 10-35 12-7-14-14-26-23-36 9-4 18-6 30-6z' },
    { id: 'triceps-left', group: 'triceps', d: 'M101 175c-7 13-9 29-7 47 7 6 16 10 25 12 7-17 8-32 6-48-7-3-14-7-24-11z' },
    { id: 'triceps-right', group: 'triceps', d: 'M239 175c7 13 9 29 7 47-7 6-16 10-25 12-7-17-8-32-6-48 7-3 14-7 24-11z' },
    { id: 'lats-left', group: 'lats', d: 'M132 157c-15 13-23 34-24 66 11 10 24 16 41 19 12-25 14-52 8-82-8-2-15-3-25-3z' },
    { id: 'lats-right', group: 'lats', d: 'M208 157c15 13 23 34 24 66-11 10-24 16-41 19-12-25-14-52-8-82 8-2 15-3 25-3z' },
    { id: 'glutes-left', group: 'glutes', d: 'M145 252c-11 10-16 26-15 44 11 8 24 12 39 13 0-21-5-38-17-54-3-1-5-2-7-3z' },
    { id: 'glutes-right', group: 'glutes', d: 'M195 252c11 10 16 26 15 44-11 8-24 12-39 13 0-21 5-38 17-54 3-1 5-2 7-3z' },
    { id: 'hamstrings-left', group: 'hamstrings', d: 'M147 312c-11 17-15 43-12 79 7 10 15 18 25 24 9-28 11-57 9-87-6-5-13-10-22-16z' },
    { id: 'hamstrings-right', group: 'hamstrings', d: 'M193 312c11 17 15 43 12 79-7 10-15 18-25 24-9-28-11-57-9-87 6-5 13-10 22-16z' },
    { id: 'calves-back-left', group: 'calves', d: 'M154 389c-7 16-9 37-7 66 4 7 8 12 14 18 7-22 10-45 8-68-4-5-8-10-15-16z' },
    { id: 'calves-back-right', group: 'calves', d: 'M186 389c7 16 9 37 7 66-4 7-8 12-14 18-7-22-10-45-8-68 4-5 8-10 15-16z' }
  ]
}
