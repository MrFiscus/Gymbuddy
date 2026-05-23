import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, RefreshCcw } from 'lucide-react'
import { getVectorFitLibraryUrl, resolveVectorFitAnimation } from '../utils/vectorFit'

export function ExerciseAnimationPlayer({ exercise }) {
  const [state, setState] = useState({ status: 'loading', match: null })

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!exercise) return

      setState({ status: 'loading', match: null })

      try {
        const match = await resolveVectorFitAnimation(exercise)
        if (cancelled) return

        if (!match) {
          setState({ status: 'missing', match: null })
          return
        }
        setState({ status: 'ready', match })
      } catch (error) {
        console.error('Exercise preview failed to load', error)
        if (!cancelled) {
          setState((current) => ({ status: 'error', match: current.match }))
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [exercise])

  const iframeSrc = useMemo(() => {
    if (!state.match) return ''
    return `/vectorfit-player.html?src=${encodeURIComponent(state.match.url)}&speed=0.9`
  }, [state.match])

  return (
    <section className="exercise-motion-card">
      <div className="section-row">
        <div>
          <p className="metric-caption">Movement Demo</p>
          <h2 className="behance-title">How it should move</h2>
        </div>
        <a className="ghost-button slim-button" href={getVectorFitLibraryUrl()} target="_blank" rel="noreferrer">
          <ExternalLink size={14} />
          VectorFit
        </a>
      </div>

      <div className={`exercise-motion-stage is-${state.status}`}>
        {state.match ? (
          <iframe
            key={state.match.url}
            className="exercise-motion-iframe"
            title={`${exercise.name} movement preview`}
            src={iframeSrc}
            loading="lazy"
          />
        ) : null}

        {state.status === 'loading' ? (
          <div className="exercise-motion-overlay">
            <div className="loading-dot" />
            <span>Loading motion preview...</span>
          </div>
        ) : null}

        {state.status === 'missing' ? (
          <div className="exercise-motion-overlay">
            <RefreshCcw size={18} />
            <span>Motion preview unavailable for this lift yet.</span>
          </div>
        ) : null}

        {state.status === 'error' ? (
          <div className="exercise-motion-overlay">
            <RefreshCcw size={18} />
            <span>Couldn&apos;t load the preview right now.</span>
          </div>
        ) : null}
      </div>

      <div className="exercise-motion-meta">
        <span className="exercise-chip">
          {state.match ? state.match.title : 'Preview library reference'}
        </span>
        <span className="exercise-chip muted-chip">
          {state.match ? `Source: ${state.match.equipment} / ${state.match.muscle}` : 'Remote preview'}
        </span>
      </div>
    </section>
  )
}
