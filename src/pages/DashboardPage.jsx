import { motion } from 'motion/react'
import { Award, ChevronRight, Flame, Footprints, HeartPulse, Play, Trophy } from 'lucide-react'
import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useAppContext } from '../context/AppContext'
import { buildPrData, buildWeeklyVolume } from '../utils/fitness'

export function DashboardPage() {
  const { workoutLogs, bodyMetrics } = useAppContext()
  const weeklyVolume = buildWeeklyVolume(workoutLogs)
  const todayWorkout = workoutLogs[0]
  const prData = buildPrData(workoutLogs).slice(0, 3)
  const latestWeight = bodyMetrics[0]?.weight || 196
  const activityRings = [
    { name: 'Steps', value: 72, fill: '#d5ff5f' },
    { name: 'Calories', value: 61, fill: '#b8ef48' },
    { name: 'Water', value: 48, fill: '#92bd3f' },
  ]

  const workoutFeed = [
    { label: todayWorkout?.name || 'Indoor Walk', metric: `${Math.round(weeklyVolume.at(-1)?.volume || 2400)} lbs`, tag: 'Today' },
    { label: 'Morning Running', metric: '3.8 km', tag: '7:30 AM' },
    { label: 'Mobility Session', metric: '18 min', tag: 'Recovery' },
  ]

  return (
    <div className="page-stack page-stack-tight">
      <section className="dashboard-hero">
        <div className="dashboard-greeting">
          <div className="avatar-badge">L</div>
          <div>
            <p className="dashboard-hello">Hello Lester!</p>
            <p className="dashboard-subtle">Let&apos;s start your day</p>
          </div>
          <button className="floating-trophy" type="button">
            <Trophy size={14} />
          </button>
        </div>

        <div className="steps-panel">
          <div>
            <p className="metric-caption">Steps</p>
            <div className="steps-value">11 000<span>/16 000</span></div>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: '68%' }}
              transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
            />
          </div>
        </div>
      </section>

      <section className="behance-card behance-card-padded">
        <div className="section-row">
          <div>
            <p className="metric-caption">Daily Activity</p>
            <div className="activity-triple">
              <div><strong>11 000</strong><span>Steps</span></div>
              <div><strong>440</strong><span>Calories</span></div>
              <div><strong>1,8</strong><span>Water</span></div>
            </div>
          </div>
          <button className="see-all-button" type="button">See all</button>
        </div>

        <div className="activity-main">
          <div className="activity-list">
            <div><Footprints size={16} /><span>Distance while active</span><strong>2.44 km</strong></div>
            <div><Flame size={16} /><span>Total burnt calories</span><strong>440 kcal</strong></div>
            <div><HeartPulse size={16} /><span>Current bodyweight</span><strong>{latestWeight} lbs</strong></div>
          </div>
          <div className="rings-wrap">
            <ResponsiveContainer width="100%" height={150}>
              <RadialBarChart innerRadius="20%" outerRadius="100%" data={activityRings} startAngle={90} endAngle={-270}>
                <Tooltip />
                <RadialBar background dataKey="value" cornerRadius={14} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="behance-card behance-card-padded">
        <div className="section-row">
          <div>
            <p className="metric-caption">Workouts</p>
            <h3 className="behance-title">Ready to train</h3>
          </div>
          <button className="see-all-button" type="button">See all</button>
        </div>
        <div className="workout-feed">
          {workoutFeed.map((item, index) => (
            <motion.div
              key={item.label}
              className="workout-feed-row"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.04, duration: 0.2 }}
            >
              <div className="workout-feed-icon"><Play size={14} /></div>
              <div className="workout-feed-copy">
                <strong>{item.label}</strong>
                <span>{item.metric}</span>
              </div>
              <div className="workout-feed-tag">{item.tag}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="behance-card behance-card-padded">
          <div className="section-row">
            <div>
              <p className="metric-caption">Personal Records</p>
              <h3 className="behance-title">Progress</h3>
            </div>
            <Award size={16} className="accent-icon" />
          </div>
          <div className="mini-pr-list">
            {prData.map((row) => (
              <div key={row.exercise} className="mini-pr-row">
                <div>
                  <strong>{row.exercise}</strong>
                  <span>Estimated 1RM</span>
                </div>
                <div className="mini-pr-value">{row.max}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="behance-card lime-highlight">
          <div className="lime-inner">
            <p className="lime-caption">Today&apos;s Focus</p>
            <h3>Explosive Push Ups</h3>
            <div className="lime-number">10</div>
            <div className="lime-progress"><span /></div>
            <button className="lime-button" type="button">
              Start Now <ChevronRight size={14} />
            </button>
          </div>
        </article>
      </section>
    </div>
  )
}
