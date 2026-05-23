const frontRegions = [
  { key: 'Chest', x: 90, y: 90, width: 60, height: 48 },
  { key: 'Shoulders', x: 70, y: 70, width: 100, height: 22 },
  { key: 'Quads', x: 90, y: 170, width: 60, height: 88 },
  { key: 'Core', x: 96, y: 138, width: 48, height: 30 },
  { key: 'Biceps', x: 58, y: 100, width: 18, height: 58 },
  { key: 'Biceps', x: 164, y: 100, width: 18, height: 58 },
]

const backRegions = [
  { key: 'Back', x: 90, y: 90, width: 60, height: 60 },
  { key: 'Glutes', x: 92, y: 158, width: 56, height: 38 },
  { key: 'Hamstrings', x: 94, y: 200, width: 52, height: 72 },
  { key: 'Triceps', x: 58, y: 100, width: 18, height: 58 },
  { key: 'Triceps', x: 164, y: 100, width: 18, height: 58 },
]

function intensity(count) {
  return Math.min(0.2 + count * 0.12, 1)
}

export function BodyHeatmap({ counts }) {
  return (
    <div className="body-heatmap">
      {[{ label: 'Front', regions: frontRegions }, { label: 'Back', regions: backRegions }].map((figure) => (
        <div key={figure.label}>
          <p className="section-kicker">{figure.label}</p>
          <svg viewBox="0 0 240 320" className="body-svg" aria-label={`${figure.label} muscle heatmap`}>
            <circle cx="120" cy="44" r="26" className="body-outline" />
            <rect x="96" y="72" width="48" height="104" rx="24" className="body-outline" />
            <rect x="62" y="82" width="22" height="104" rx="11" className="body-outline" />
            <rect x="156" y="82" width="22" height="104" rx="11" className="body-outline" />
            <rect x="98" y="176" width="20" height="112" rx="10" className="body-outline" />
            <rect x="122" y="176" width="20" height="112" rx="10" className="body-outline" />
            {figure.regions.map((region, index) => (
              <rect
                key={`${region.key}-${index}`}
                x={region.x}
                y={region.y}
                width={region.width}
                height={region.height}
                rx="12"
                style={{ opacity: intensity(counts[region.key] || 0) }}
                className="heat-region"
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  )
}
