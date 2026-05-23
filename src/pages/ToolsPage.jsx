import { useMemo, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { useAppContext } from '../context/AppContext'
import { calculateOneRepMax, calculatePlateBreakdown } from '../utils/fitness'

export function ToolsPage() {
  const { bodyMetrics, addBodyMetric } = useAppContext()
  const [weight, setWeight] = useState(185)
  const [reps, setReps] = useState(5)
  const [bodyWeight, setBodyWeight] = useState(195)
  const [waist, setWaist] = useState(33.5)
  const [chest, setChest] = useState(43)

  const orm = calculateOneRepMax(weight, reps)
  const plates = useMemo(() => calculatePlateBreakdown(weight), [weight])

  function saveMetric() {
    addBodyMetric({
      date: new Date().toISOString().slice(0, 10),
      weight: bodyWeight,
      waist,
      chest,
    })
  }

  return (
    <div className="page-stack">
      <PageHeader eyebrow="Utility Bay" title="TOOLS" ghost="AUX" meta="Quick calculators and body metrics, tuned to the same amber telemetry style." />
      <section className="panel-grid">
        <Reveal as="article" className="panel" delay={0.04}>
          <p className="section-kicker">1RM calculator</p>
          <h2>{orm} lb</h2>
          <div className="set-row">
            <input className="input" type="number" value={weight} onChange={(event) => setWeight(Number(event.target.value))} />
            <input className="input" type="number" value={reps} onChange={(event) => setReps(Number(event.target.value))} />
          </div>
          <p className="muted-copy">Uses the Epley formula and feeds PR alerts in the logger.</p>

          <p className="section-kicker section-break">Plate calculator</p>
          <div className="plate-list">
            {plates.map((plate) => (
              <div key={plate.plate} className="warmup-row">
                <span>{plate.plate} lb plates</span>
                <strong>{plate.count} per side</strong>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="article" className="panel" delay={0.08}>
          <p className="section-kicker">Body metrics</p>
          <h3>Weight and measurements</h3>
          <div className="metric-form">
            <input className="input" type="number" value={bodyWeight} onChange={(event) => setBodyWeight(Number(event.target.value))} placeholder="Bodyweight" />
            <input className="input" type="number" value={waist} onChange={(event) => setWaist(Number(event.target.value))} placeholder="Waist" />
            <input className="input" type="number" value={chest} onChange={(event) => setChest(Number(event.target.value))} placeholder="Chest" />
            <button className="primary-button" type="button" onClick={saveMetric}>Save Metrics</button>
          </div>
          <div className="history-list">
            {bodyMetrics.map((metric) => (
              <div key={metric.date} className="history-row">
                <div>
                  <strong>{metric.date}</strong>
                  <p>{metric.weight} lb</p>
                </div>
                <div>
                  <span>Waist {metric.waist}"</span>
                  <span>Chest {metric.chest}"</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
