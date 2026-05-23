import { muscleDefinitions } from '../data/muscleMap'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MuscleMap } from '../components/MuscleMap'
import { MuscleExercisePanel } from '../components/MuscleExercisePanel'
import { useAppContext } from '../context/AppContext'

export function LibraryPage() {
  const { exerciseDatabase } = useAppContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedMuscle = searchParams.get('muscle')
  const selectedSlug = selectedMuscle ? muscleDefinitions[selectedMuscle]?.slug || selectedMuscle : null

  const exercises = useMemo(
    () => exerciseDatabase.filter((exercise) => exercise.muscle === selectedSlug || exercise.secondaryMuscles.includes(selectedSlug)),
    [exerciseDatabase, selectedSlug],
  )

  function handleSelectMuscle(muscle) {
    setSearchParams(muscle ? { muscle } : {})
  }

  return (
    <div className="page-stack page-stack-tight">
      <section className="behance-card behance-card-padded muscle-library-layout">
        <div className="muscle-library-copy">
          <p className="metric-caption">Movement Database</p>
          <h1 className="page-title">Interactive Muscle Map</h1>
          <p className="body-copy">
            Hover or tap a muscle group to browse exercises, then open any lift into its own full guide page with an inline movement demo.
          </p>
        </div>

        <div className="muscle-library-content">
          <MuscleMap selectedMuscle={selectedMuscle} onSelectMuscle={handleSelectMuscle} />
          <MuscleExercisePanel muscle={selectedMuscle} exercises={exercises} onClose={() => handleSelectMuscle(null)} />
        </div>
      </section>
    </div>
  )
}
