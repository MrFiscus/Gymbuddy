import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { formatISO } from 'date-fns'
import { ArrowLeft, Download, Pause, Play, TimerReset, X } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { exportCsv, exportWorkoutPdf } from '../utils/export'
import { generateWarmupSets } from '../utils/fitness'
import { useRestTimer } from '../hooks/useRestTimer'

const blankExercise = { name: '', muscleGroups: [], sets: [{ reps: 8, weight: 95 }] }

export function WorkoutPage() {
  const { exerciseLibrary, addWorkoutLog, getPrAlert, workoutLogs, queuedExercises, removeQueuedExercise } = useAppContext()
  const [sessionName, setSessionName] = useState('Home Chest Workout')
  const [selectedExercise, setSelectedExercise] = useState(queuedExercises[0]?.id || exerciseLibrary[0].id)
  const [sets, setSets] = useState([{ reps: 8, weight: 95 }])
  const [supersetMode, setSupersetMode] = useState(false)
  const [prMessage, setPrMessage] = useState('')
  const timer = useRestTimer()

  const workoutOptions = useMemo(() => {
    const queued = queuedExercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
      muscleGroups: [exercise.muscle, ...exercise.secondaryMuscles],
      equipment: exercise.equipment,
      instructions: exercise.instructions,
    }))
    const seen = new Set()
    return [...queued, ...exerciseLibrary].filter((exercise) => {
      if (seen.has(exercise.id)) return false
      seen.add(exercise.id)
      return true
    })
  }, [queuedExercises, exerciseLibrary])

  const activeExerciseId = workoutOptions.some((exercise) => exercise.id === selectedExercise)
    ? selectedExercise
    : workoutOptions[0]?.id || ''
  const chosen = workoutOptions.find((exercise) => exercise.id === activeExerciseId) || workoutOptions[0]
  const warmups = generateWarmupSets(Number(sets[0]?.weight || 95))

  function updateSet(index, key, value) {
    setSets((current) => current.map((set, setIndex) => (setIndex === index ? { ...set, [key]: Number(value) } : set)))
  }

  function addSet() {
    setSets((current) => [...current, { reps: 8, weight: sets.at(-1)?.weight || 95 }])
  }

  function saveWorkout() {
    const session = {
      id: crypto.randomUUID(),
      date: formatISO(new Date(), { representation: 'date' }),
      name: sessionName,
      exercises: [
        {
          ...blankExercise,
          name: chosen.name,
          muscleGroups: chosen.muscleGroups,
          sets,
          style: supersetMode ? 'Superset / Circuit' : 'Straight Sets',
        },
      ],
    }
    const bestSet = sets.reduce(
      (best, set) => {
        const orm = Number(set.weight) * (1 + Number(set.reps) / 30)
        return orm > best.oneRepMax ? { oneRepMax: Math.round(orm), weight: set.weight, reps: set.reps } : best
      },
      { oneRepMax: 0, weight: 0, reps: 0 },
    )
    setPrMessage(getPrAlert(chosen.name, bestSet.weight, bestSet.reps))
    addWorkoutLog(session)
  }

  return (
    <div className="page-stack page-stack-tight">
      <section className="detail-hero">
        <div className="detail-hero-image">
          <button className="mini-icon-button back-overlay" type="button">
            <ArrowLeft size={16} />
          </button>
          <div className="detail-overlay-content">
            <div className="pill-row">
              <span className="info-pill">45 min</span>
              <span className="info-pill">381 cal</span>
            </div>
            <h1>{sessionName}</h1>
          </div>
        </div>
      </section>

      <section className="behance-card behance-card-padded">
        <div className="section-row">
          <div>
            <p className="metric-caption">About</p>
            <h3 className="behance-title">{chosen.name}</h3>
          </div>
          <button
            className="ghost-button slim-button"
            type="button"
            onClick={() => exportCsv(workoutLogs.map((log) => ({ date: log.date, name: log.name })), 'gymbuddy-history.csv')}
          >
            <Download size={14} />
            Export
          </button>
        </div>
        <p className="body-copy">
          Build chest muscles doesn&apos;t have to be complicated. Use controlled reps, progressive overload, and the rest timer below to keep intensity high.
        </p>
        <div className="summary-grid">
          <div><span>Level</span><strong>AAA Hard</strong></div>
          <div><span>Progress</span><strong>0%</strong></div>
          <div><span>Focus Area</span><strong>Chest</strong></div>
        </div>
      </section>

      <section className="behance-card behance-card-padded">
        <div className="section-row">
          <div>
            <p className="metric-caption">Logger</p>
            <h3 className="behance-title">Track your sets</h3>
          </div>
          <label className="toggle-inline">
            <input type="checkbox" checked={supersetMode} onChange={(event) => setSupersetMode(event.target.checked)} />
            <span>Superset</span>
          </label>
        </div>
        {queuedExercises.length ? (
          <div className="queued-exercises">
            {queuedExercises.map((exercise) => (
              <button
                key={exercise.id}
                className={`queued-exercise-chip ${selectedExercise === exercise.id ? 'is-active' : ''}`}
                type="button"
                onClick={() => setSelectedExercise(exercise.id)}
              >
                <span>{exercise.name}</span>
                <button
                  className="queued-remove"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    removeQueuedExercise(exercise.id)
                    if (selectedExercise === exercise.id) {
                      setSelectedExercise(exerciseLibrary[0]?.id || '')
                    }
                  }}
                >
                  <X size={12} />
                </button>
              </button>
            ))}
          </div>
        ) : null}
        <input className="input" value={sessionName} onChange={(event) => setSessionName(event.target.value)} placeholder="Session name" />
        <select className="input" value={activeExerciseId} onChange={(event) => setSelectedExercise(event.target.value)}>
          {workoutOptions.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
          ))}
        </select>
        <div className="set-stack">
          {sets.map((set, index) => (
            <div key={index} className="set-card">
              <div className="set-card-label">Set {index + 1}</div>
              <div className="set-card-inputs">
                <input className="input" type="number" value={set.weight} onChange={(event) => updateSet(index, 'weight', event.target.value)} />
                <input className="input" type="number" value={set.reps} onChange={(event) => updateSet(index, 'reps', event.target.value)} />
              </div>
            </div>
          ))}
        </div>
        <div className="button-row">
          <button className="ghost-button slim-button" type="button" onClick={addSet}>Add set</button>
          <button className="primary-button" type="button" onClick={saveWorkout}>Save workout</button>
        </div>
        {prMessage ? <div className="success-banner">{prMessage}</div> : null}
      </section>

      <section className="dashboard-grid">
        <article className="behance-card behance-card-padded">
          <p className="metric-caption">Rest Timer</p>
          <div className="timer-row">
            <motion.strong
              key={timer.formatted}
              className="timer-hero-value"
              initial={{ scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.18 }}
            >
              {timer.formatted}
            </motion.strong>
            <div className="timer-actions">
              <button className="timer-action-button" type="button" onClick={timer.running ? timer.pause : timer.start}>
                {timer.running ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button className="timer-action-button" type="button" onClick={() => timer.reset(90)}>
                <TimerReset size={16} />
              </button>
            </div>
          </div>
          <input className="input" type="number" min="10" value={timer.secondsLeft} onChange={(event) => timer.setSecondsLeft(Number(event.target.value))} />
        </article>

        <article className="behance-card behance-card-padded">
          <p className="metric-caption">Warm up</p>
          <div className="warmup-stack">
            {warmups.map((set, index) => (
              <div key={index} className="warmup-behance-row">
                <span>Warm up {index + 1}</span>
                <strong>{set.weight} lb x {set.reps}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="behance-card behance-card-padded">
        <div className="section-row">
          <div>
            <p className="metric-caption">History</p>
            <h3 className="behance-title">Recent sessions</h3>
          </div>
        </div>
        <div className="workout-feed">
          {workoutLogs.map((log) => (
            <div key={log.id} className="workout-feed-row">
              <div className="workout-feed-copy">
                <strong>{log.name}</strong>
                <span>{log.date}</span>
              </div>
              <button className="see-all-button" type="button" onClick={() => exportWorkoutPdf(log)}>
                PDF
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
