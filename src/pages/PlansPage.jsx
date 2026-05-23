import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { useAppContext } from '../context/AppContext'

function suggestWorkout(goal) {
  if (goal.toLowerCase().includes('strength')) return 'AI suggestion: Run a heavy top set, then 3 back-off sets at 88% with 2 accessory supersets.'
  if (goal.toLowerCase().includes('fat loss')) return 'AI suggestion: Use a 5-exercise circuit with short rests and finish with loaded carries.'
  return 'AI suggestion: Start with a compound lift, pair push/pull accessories, and keep weekly volume progressive.'
}

export function PlansPage() {
  const { builtInPlans, customPlans, addCustomPlan } = useAppContext()
  const [planName, setPlanName] = useState('')
  const [goal, setGoal] = useState('')

  function createPlan() {
    if (!planName.trim()) return
    addCustomPlan({
      id: crypto.randomUUID(),
      name: planName,
      goal,
      days: [{ label: 'Day 1', exercises: ['Choose primary lift', 'Add assistance', 'Finish conditioning'] }],
    })
    setPlanName('')
    setGoal('')
  }

  return (
    <div className="page-stack">
      <PageHeader eyebrow="Programming" title="PLANS" ghost="BLK" meta="Prebuilt splits, custom blocks, and quick AI-style training prompts." />
      <section className="panel-grid">
        <Reveal as="article" className="panel" delay={0.04}>
          <p className="section-kicker">Pre-built plans</p>
          <h2>Templates ready to run</h2>
          <div className="plan-list">
            {builtInPlans.map((plan) => (
              <div key={plan.id} className="plan-card">
                <strong>{plan.name}</strong>
                <p>{plan.goal}</p>
                {plan.days.map((day) => (
                  <div key={day.label} className="day-row">
                    <span>{day.label}</span>
                    <small>{day.exercises.join(' • ')}</small>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="article" className="panel" delay={0.08}>
          <p className="section-kicker">Custom plans</p>
          <h3>Build your own block</h3>
          <input className="input" value={planName} onChange={(event) => setPlanName(event.target.value)} placeholder="Plan name" />
          <textarea className="input textarea" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="Goal, split, intensity notes" />
          <button className="primary-button" type="button" onClick={createPlan}>Save Plan</button>
          <div className="alert-banner">{suggestWorkout(goal || 'general fitness')}</div>
          <div className="plan-list">
            {customPlans.map((plan) => (
              <div key={plan.id} className="plan-card">
                <strong>{plan.name}</strong>
                <p>{plan.goal}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
