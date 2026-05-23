import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { muscleDefinitions, musclePaths } from '../data/muscleMap'

function normalizeGroup(pathId) {
  return pathId.replace(/-(left|right|upper|lower|back-left|back-right)$/, '')
}

export function MuscleMap({ selectedMuscle, onSelectMuscle }) {
  const [side, setSide] = useState('front')
  const [hovered, setHovered] = useState(null)

  function handleSelect(group) {
    onSelectMuscle(selectedMuscle === group ? null : group)
  }

  return (
    <div className="muscle-map-shell">
      <div className="section-row">
        <div>
          <p className="metric-caption">Interactive Muscle Map</p>
          <h3 className="behance-title">Tap a body region</h3>
        </div>
        <button className="ghost-button slim-button" type="button" onClick={() => setSide(side === 'front' ? 'back' : 'front')}>
          <RotateCcw size={14} />
          {side === 'front' ? 'Back View' : 'Front View'}
        </button>
      </div>

      <div className="muscle-stage">
        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="muscleGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <div className={`body-flip-card ${side === 'back' ? 'is-back' : ''}`}>
          {['front', 'back'].map((view) => (
            <div key={view} className={`body-face body-face-${view}`}>
              <div className={`body-reference-frame body-reference-frame-${view}`} aria-hidden="true">
                <img
                  src="/male-front-back-base.svg"
                  alt=""
                  className={`body-reference-asset body-reference-asset-${view}`}
                  draggable="false"
                />
              </div>

              <svg viewBox="0 0 340 520" className="muscle-svg" role="img" aria-label={`${view} body muscles`}>
                {musclePaths[view].map((segment) => {
                  const group = segment.group || normalizeGroup(segment.id)
                  const active = selectedMuscle === group
                  const glowing = hovered === group || active
                  return (
                    <path
                      key={segment.id}
                      id={segment.id}
                      d={segment.d}
                      className={`muscle-path ${glowing ? 'is-hovered' : ''} ${active ? 'is-active' : ''}`}
                      filter={glowing ? 'url(#muscleGlow)' : undefined}
                      onMouseEnter={() => setHovered(group)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => handleSelect(group)}
                      onTouchStart={() => setHovered(group)}
                    />
                  )
                })}
              </svg>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {hovered && muscleDefinitions[hovered] ? (
            <motion.div
              key={hovered}
              className="muscle-tooltip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              style={{ left: muscleDefinitions[hovered].x, top: muscleDefinitions[hovered].y }}
            >
              {muscleDefinitions[hovered].label}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
