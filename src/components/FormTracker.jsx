import { useEffect, useMemo, useRef, useState } from 'react'
import { exerciseLibrary } from '../data/exercises'

const POSE_CONNECTIONS = [
  [11, 13], [13, 15], [12, 14], [14, 16], [11, 12],
  [23, 24], [11, 23], [12, 24], [23, 25], [25, 27],
  [24, 26], [26, 28],
]

function angle(a, b, c) {
  if (!a || !b || !c) return 180
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) -
    Math.atan2(a.y - b.y, a.x - b.x)
  let degrees = Math.abs((radians * 180) / Math.PI)
  if (degrees > 180) degrees = 360 - degrees
  return degrees
}

function getRangeScore(value, [min, max]) {
  if (value >= min && value <= max) return 100
  const nearest = value < min ? min : max
  const delta = Math.abs(nearest - value)
  return Math.max(0, 100 - delta * 2.2)
}

function analyzePose(landmarks, exerciseId) {
  const bySide = {
    left: {
      shoulder: landmarks[11], elbow: landmarks[13], wrist: landmarks[15], hip: landmarks[23], knee: landmarks[25], ankle: landmarks[27],
    },
    right: {
      shoulder: landmarks[12], elbow: landmarks[14], wrist: landmarks[16], hip: landmarks[24], knee: landmarks[26], ankle: landmarks[28],
    },
  }
  const side = bySide.left
  const selected = exerciseLibrary.find((exercise) => exercise.id === exerciseId) || exerciseLibrary[0]
  const metrics = {
    elbow: angle(side.shoulder, side.elbow, side.wrist),
    shoulder: angle(side.elbow, side.shoulder, side.hip),
    hip: angle(side.shoulder, side.hip, side.knee),
    knee: angle(side.hip, side.knee, side.ankle),
  }

  const scores = Object.entries(selected.idealRanges).map(([joint, range]) => getRangeScore(metrics[joint], range))
  const score = Math.round(scores.reduce((sum, entry) => sum + entry, 0) / Math.max(scores.length, 1))

  const cues = []
  if (exerciseId === 'back-squat') {
    if (metrics.knee > 118) cues.push('Go deeper for stronger squat depth.')
    if (metrics.hip < 42) cues.push('Chest too high. Sit back into the hips.')
    if (metrics.knee < 58) cues.push('Good depth!')
  }
  if (exerciseId === 'deadlift' && metrics.shoulder > 45) cues.push('Keep the bar closer to your body.')
  if (exerciseId === 'bench-press' && metrics.elbow < 55) cues.push('Control the descent before pressing.')
  if (exerciseId === 'bicep-curl' && metrics.shoulder > 28) cues.push('Reduce torso swing and pin elbows in.')
  if (exerciseId === 'push-up' && metrics.hip < 150) cues.push('Brace harder. Hips are sagging.')
  if (exerciseId === 'overhead-press' && metrics.shoulder < 120) cues.push('Finish taller with biceps by the ears.')
  if (!cues.length) cues.push('Positions look solid. Keep moving smoothly.')

  return { metrics, score, cues }
}

export function FormTracker() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const cameraRef = useRef(null)
  const [selectedExercise, setSelectedExercise] = useState('back-squat')
  const [analysis, setAnalysis] = useState({ score: 0, cues: ['Camera starting...'], metrics: {} })
  const [repCount, setRepCount] = useState(0)
  const [phase, setPhase] = useState('up')
  const [active, setActive] = useState(false)
  const phaseRef = useRef('up')

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return undefined

    const ctx = canvas.getContext('2d')
    const PoseConstructor = window.Pose
    const CameraConstructor = window.Camera
    const drawConnectors = window.drawConnectors
    const drawLandmarks = window.drawLandmarks
    if (!PoseConstructor || !CameraConstructor || !drawConnectors || !drawLandmarks) {
      console.error('MediaPipe assets failed to load.')
      return undefined
    }

    const pose = new PoseConstructor({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    })

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    pose.onResults((results) => {
      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)

      if (results.poseLandmarks) {
        drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#f5c400', lineWidth: 3 })
        drawLandmarks(ctx, results.poseLandmarks, { color: '#111', fillColor: '#f5c400', radius: 4 })
        const nextAnalysis = analyzePose(results.poseLandmarks, selectedExercise)
        setAnalysis(nextAnalysis)

        const knee = nextAnalysis.metrics.knee || 180
        const elbow = nextAnalysis.metrics.elbow || 180
        const driver = ['bench-press', 'bicep-curl', 'push-up', 'overhead-press'].includes(selectedExercise) ? elbow : knee
        const downThreshold = ['back-squat', 'push-up'].includes(selectedExercise) ? 95 : 85
        const upThreshold = ['deadlift', 'overhead-press'].includes(selectedExercise) ? 150 : 145

        if (driver < downThreshold && phaseRef.current !== 'down') {
          phaseRef.current = 'down'
          setPhase('down')
        } else if (driver > upThreshold && phaseRef.current === 'down') {
          phaseRef.current = 'up'
          setPhase('up')
          setRepCount((current) => current + 1)
        }
      }
      ctx.restore()
    })

    async function startCamera() {
      try {
        cameraRef.current = new CameraConstructor(video, {
          onFrame: async () => {
            await pose.send({ image: video })
          },
          width: 640,
          height: 480,
        })
        await cameraRef.current.start()
        setActive(true)
      } catch {
        setAnalysis({ score: 0, cues: ['Camera access was blocked.'], metrics: {} })
      }
    }

    startCamera()

    return () => {
      setActive(false)
      pose.close?.()
      const stream = video.srcObject
      stream?.getTracks?.().forEach((track) => track.stop())
    }
  }, [selectedExercise])

  const metricRows = useMemo(
    () =>
      Object.entries(analysis.metrics || {}).map(([joint, value]) => ({
        joint,
        value: `${Math.round(value)} deg`,
      })),
    [analysis.metrics],
  )

  return (
    <section className="panel-grid form-layout">
      <article className="hero-panel live-panel">
        <div className="camera-stack">
          <video ref={videoRef} className="tracker-video" playsInline muted hidden />
          <canvas ref={canvasRef} className="tracker-canvas" width="640" height="480" />
          <div className="tracker-overlay">
            <div>
              <p className="section-kicker">Live Form Score</p>
              <strong className="score-pill">{analysis.score}%</strong>
            </div>
            <div className="rep-badge">
              <span>Reps</span>
              <strong>{repCount}</strong>
              <small>{phase.toUpperCase()}</small>
            </div>
          </div>
        </div>
      </article>
      <article className="panel">
        <div className="panel-header">
          <div>
            <p className="section-kicker">Exercise</p>
            <h2>Live Form Tracker</h2>
          </div>
          <span className={`status-dot ${active ? 'status-dot-live' : ''}`}>{active ? 'Live' : 'Offline'}</span>
        </div>
        <select value={selectedExercise} onChange={(event) => setSelectedExercise(event.target.value)} className="input">
          {exerciseLibrary.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <div className="cue-list">
          {analysis.cues.map((cue) => (
            <div key={cue} className="cue-card">
              {cue}
            </div>
          ))}
        </div>
        <div className="metric-grid">
          {metricRows.map((item) => (
            <div key={item.joint} className="metric-card">
              <span>{item.joint}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
