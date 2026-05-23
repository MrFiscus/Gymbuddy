import { ExternalLink, X } from 'lucide-react'

export function ExerciseModal({ exercise, onClose }) {
  if (!exercise) return null

  return (
    <div className="video-sheet-backdrop" onClick={onClose} role="presentation">
      <div className="video-sheet" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="section-row">
          <div>
            <p className="metric-caption">Watch Guide</p>
            <h3 className="behance-title">{exercise.name}</h3>
          </div>
          <button className="mini-icon-button" type="button" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="video-embed-wrap">
          <iframe title={exercise.name} src={exercise.muscleAndStrengthUrl} className="video-embed" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
        </div>
        <a className="primary-button video-link-button" href={exercise.muscleAndStrengthUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          Open in new tab
        </a>
      </div>
    </div>
  )
}
