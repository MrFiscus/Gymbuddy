import { format, isSameDay, parseISO, startOfWeek, subDays } from 'date-fns'

export function calculateOneRepMax(weight, reps) {
  if (!weight || !reps) return 0
  return Math.round(weight * (1 + reps / 30))
}

export function calculateSessionVolume(session) {
  return session.exercises.reduce(
    (total, exercise) =>
      total +
      exercise.sets.reduce((setTotal, set) => setTotal + Number(set.reps || 0) * Number(set.weight || 0), 0),
    0,
  )
}

export function buildWeeklyVolume(logs) {
  const totals = new Map()
  logs.forEach((session) => {
    const weekLabel = format(startOfWeek(parseISO(session.date), { weekStartsOn: 1 }), 'MMM d')
    totals.set(weekLabel, (totals.get(weekLabel) || 0) + calculateSessionVolume(session))
  })
  return [...totals.entries()].map(([week, volume]) => ({ week, volume }))
}

export function buildFrequency(logs) {
  return Array.from({ length: 7 }).map((_, index) => {
    const day = subDays(new Date(), 6 - index)
    const count = logs.filter((session) => isSameDay(parseISO(session.date), day)).length
    return { day: format(day, 'EEE'), sessions: count }
  })
}

export function buildPrData(logs) {
  const prs = {}
  logs.forEach((session) => {
    session.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        const orm = calculateOneRepMax(Number(set.weight || 0), Number(set.reps || 0))
        prs[exercise.name] = Math.max(prs[exercise.name] || 0, orm)
      })
    })
  })
  return Object.entries(prs)
    .slice(0, 6)
    .map(([exercise, max]) => ({ exercise, max }))
}

export function detectNewPr(logs, candidate) {
  const previous = logs.flatMap((session) => session.exercises).find((exercise) => exercise.name === candidate.name)
  const previousMax = previous
    ? Math.max(...previous.sets.map((set) => calculateOneRepMax(Number(set.weight || 0), Number(set.reps || 0))))
    : 0
  return candidate.oneRepMax > previousMax
}

export function generateWarmupSets(targetWeight) {
  const weights = [0.4, 0.55, 0.7, 0.82].map((ratio) => Math.max(5, Math.round(targetWeight * ratio / 5) * 5))
  return [
    { reps: 10, weight: weights[0] },
    { reps: 8, weight: weights[1] },
    { reps: 5, weight: weights[2] },
    { reps: 3, weight: weights[3] },
  ]
}

export function buildHeatmap(logs) {
  const groups = {}
  logs.forEach((session) => {
    session.exercises.forEach((exercise) => {
      exercise.muscleGroups.forEach((group) => {
        groups[group] = (groups[group] || 0) + 1
      })
    })
  })
  return groups
}

export function calculatePlateBreakdown(targetWeight, barWeight = 45) {
  const plates = [45, 35, 25, 10, 5, 2.5]
  let remaining = Math.max(targetWeight - barWeight, 0) / 2
  return plates.flatMap((plate) => {
    const count = Math.floor(remaining / plate)
    remaining = Number((remaining - count * plate).toFixed(2))
    return count ? [{ plate, count }] : []
  })
}
