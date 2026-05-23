import { useMemo } from 'react'
import { ChevronRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { muscleDefinitions } from '../data/muscleMap'

export function MuscleExercisePanel({ muscle, exercises, onClose }) {
  const title = useMemo(() => (muscle && muscleDefinitions[muscle] ? muscleDefinitions[muscle].label : 'Exercises'), [muscle])

  if (!muscle) return null

  return (
    <aside className="muscle-panel">
      <div className="muscle-panel-header">
        <div>
          <p className="metric-caption">Exercise Library</p>
          <h2 className="muscle-panel-title">{title}</h2>
        </div>
        <button className="mini-icon-button" type="button" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="muscle-panel-list">
        {exercises.map((exercise) => (
          <Link key={exercise.id} className="exercise-card exercise-card-link" to={`/library/${exercise.id}?muscle=${muscle}`}>
            <div className="exercise-card-head">
              <div className="exercise-head-copy">
                <strong>{exercise.name}</strong>
                <p className="exercise-preview-copy">{exercise.instructions[0]}</p>
                <div className="exercise-chip-row">
                  <span className="exercise-chip difficulty-chip">{exercise.difficulty}</span>
                  <span className="exercise-chip equipment-chip">{exercise.equipment}</span>
                  {exercise.secondaryMuscles.slice(0, 2).map((secondary) => (
                    <span key={secondary} className="exercise-chip muted-chip">{secondary}</span>
                  ))}
                </div>
              </div>
              <span className="exercise-link-arrow">
                <ChevronRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
