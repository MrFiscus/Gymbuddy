import { useEffect, useMemo, useState } from 'react'

function beep() {
  const context = new window.AudioContext()
  const oscillator = context.createOscillator()
  oscillator.connect(context.destination)
  oscillator.frequency.value = 880
  oscillator.start()
  oscillator.stop(context.currentTime + 0.2)
}

export function useRestTimer() {
  const [secondsLeft, setSecondsLeft] = useState(90)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return undefined
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setRunning(false)
          beep()
          navigator.vibrate?.([200, 100, 200])
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [running])

  const formatted = useMemo(() => {
    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
    const seconds = String(secondsLeft % 60).padStart(2, '0')
    return `${minutes}:${seconds}`
  }, [secondsLeft])

  return {
    running,
    secondsLeft,
    formatted,
    setSecondsLeft,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    reset: (next = 90) => {
      setSecondsLeft(next)
      setRunning(false)
    },
  }
}
