import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Plus } from 'lucide-react'
import { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { muscleDefinitions } from '../data/muscleMap'
import { ExerciseAnimationPlayer } from '../components/ExerciseAnimationPlayer'

function formatMuscleLabel(value) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function ExerciseDetailPage() {
  const { exerciseId } = useParams()
  const [searchParams] = useSearchParams()
  const { exerciseDatabase, queueExerciseForWorkout } = useAppContext()

  const exercise = useMemo(
    () => exerciseDatabase.find((entry) => entry.id === exerciseId),
    [exerciseDatabase, exerciseId],
  )

  const selectedMuscle = searchParams.get('muscle')
  const backHref = selectedMuscle ? `/library?muscle=${selectedMuscle}` : '/library'

  const relatedExercises = useMemo(() => {
    if (!exercise) return []
    return exerciseDatabase
      .filter((entry) => entry.id !== exercise.id && entry.muscle === exercise.muscle)
      .slice(0, 4)
  }, [exercise, exerciseDatabase])

  if (!exercise) {
    return <Navigate to="/library" replace />
  }

  const primaryLabel = muscleDefinitions[selectedMuscle]?.label || formatMuscleLabel(exercise.muscle)

  return (
    <div className="page-stack page-stack-tight">
      <section className="behance-card behance-card-padded exercise-detail-shell">
        <div className="exercise-detail-header">
          <Link className="ghost-button slim-button" to={backHref}>
            <ArrowLeft size={14} />
            Back to library
          </Link>
          <button className="primary-button" type="button" onClick={() => queueExerciseForWorkout(exercise)}>
            <Plus size={16} />
            Add to workout
          </button>
        </div>

        <div className="exercise-detail-grid">
          <div className="exercise-detail-main">
            <div className="exercise-hero-card">
              <p className="metric-caption">Exercise Guide</p>
              <h1 className="page-title exercise-detail-title">{exercise.name}</h1>
              <p className="body-copy">
                Use the live motion reference below for the movement pattern, then follow the setup and cues before loading the exercise.
              </p>
              <div className="exercise-chip-row">
                <span className="exercise-chip difficulty-chip">{exercise.difficulty}</span>
                <span className="exercise-chip equipment-chip">{exercise.equipment}</span>
                <span className="exercise-chip">{primaryLabel}</span>
                {exercise.secondaryMuscles.map((secondary) => (
                  <span key={secondary} className="exercise-chip muted-chip">
                    {formatMuscleLabel(secondary)}
                  </span>
                ))}
              </div>
            </div>

            <ExerciseAnimationPlayer exercise={exercise} />

            <section className="exercise-detail-section">
              <div className="section-row">
                <div>
                  <p className="metric-caption">Execution</p>
                  <h2 className="behance-title">Step by step</h2>
                </div>
              </div>
              <ol className="exercise-steps exercise-steps-detail">
                {exercise.instructions.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section className="exercise-detail-section">
              <div className="section-row">
                <div>
                  <p className="metric-caption">Coaching Cues</p>
                  <h2 className="behance-title">Pro tips</h2>
                </div>
                <a className="ghost-button slim-button" href={exercise.muscleAndStrengthUrl} target="_blank" rel="noreferrer">
                  <ExternalLink size={14} />
                  Full guide
                </a>
              </div>
              <div className="tips-strip tips-strip-detail">
                {exercise.tips.map((tip) => (
                  <span key={tip}>{tip}</span>
                ))}
              </div>
            </section>
          </div>

          <aside className="exercise-detail-sidebar">
            <section className="exercise-detail-section">
              <p className="metric-caption">Overview</p>
              <div className="exercise-fact-list">
                <div className="exercise-fact-row">
                  <span>Primary muscle</span>
                  <strong>{formatMuscleLabel(exercise.muscle)}</strong>
                </div>
                <div className="exercise-fact-row">
                  <span>Equipment</span>
                  <strong>{exercise.equipment}</strong>
                </div>
                <div className="exercise-fact-row">
                  <span>Difficulty</span>
                  <strong>{exercise.difficulty}</strong>
                </div>
                <div className="exercise-fact-row">
                  <span>Secondary muscles</span>
                  <strong>{exercise.secondaryMuscles.length ? exercise.secondaryMuscles.map(formatMuscleLabel).join(', ') : 'None'}</strong>
                </div>
              </div>
            </section>

            <section className="exercise-detail-section">
              <p className="metric-caption">Related</p>
              <h2 className="behance-title">Same muscle group</h2>
              <div className="exercise-related-list">
                {relatedExercises.map((entry) => (
                  <Link key={entry.id} className="exercise-related-card" to={`/library/${entry.id}?muscle=${selectedMuscle || exercise.muscle}`}>
                    <strong>{entry.name}</strong>
                    <span>{entry.equipment}</span>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </div>
  )
}
