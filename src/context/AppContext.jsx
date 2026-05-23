/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react'
import { builtInPlans } from '../data/plans'
import { exerciseLibrary } from '../data/exercises'
import exerciseDatabase from '../data/exerciseLibrary.json'
import { initialData } from '../data/seed'
import { useLocalStorageState } from '../hooks/useLocalStorage'
import { storageKeys } from '../utils/storage'
import { calculateOneRepMax } from '../utils/fitness'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState(storageKeys.theme, 'dark')
  const [data, setData] = useLocalStorageState(storageKeys.data, initialData)

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      exerciseLibrary,
      exerciseDatabase,
      builtInPlans,
      workoutLogs: data.workoutLogs,
      bodyMetrics: data.bodyMetrics,
      customPlans: data.customPlans,
      queuedExercises: data.queuedExercises || [],
      addWorkoutLog: (session) =>
        setData((current) => ({
          ...current,
          workoutLogs: [session, ...current.workoutLogs],
          queuedExercises: [],
        })),
      queueExerciseForWorkout: (exercise) =>
        setData((current) => ({
          ...current,
          queuedExercises: current.queuedExercises?.some((item) => item.id === exercise.id)
            ? current.queuedExercises
            : [...(current.queuedExercises || []), exercise],
        })),
      removeQueuedExercise: (exerciseId) =>
        setData((current) => ({
          ...current,
          queuedExercises: (current.queuedExercises || []).filter((exercise) => exercise.id !== exerciseId),
        })),
      addBodyMetric: (metric) =>
        setData((current) => ({
          ...current,
          bodyMetrics: [metric, ...current.bodyMetrics],
        })),
      addCustomPlan: (plan) =>
        setData((current) => ({
          ...current,
          customPlans: [plan, ...current.customPlans],
        })),
      getPrAlert: (exerciseName, weight, reps) => {
        const currentOrm = calculateOneRepMax(weight, reps)
        const priorBest = data.workoutLogs
          .flatMap((session) => session.exercises)
          .filter((exercise) => exercise.name === exerciseName)
          .flatMap((exercise) => exercise.sets)
          .reduce((best, set) => Math.max(best, calculateOneRepMax(Number(set.weight), Number(set.reps))), 0)
        return currentOrm > priorBest ? `New PR! Estimated 1RM ${currentOrm} lb.` : ''
      },
    }),
    [theme, setTheme, data, setData],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
