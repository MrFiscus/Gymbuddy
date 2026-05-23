import { useEffect, useState } from 'react'

export function useInstallPrompt() {
  const [event, setEvent] = useState(null)

  useEffect(() => {
    function handlePrompt(e) {
      e.preventDefault()
      setEvent(e)
    }
    window.addEventListener('beforeinstallprompt', handlePrompt)
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt)
  }, [])

  async function promptInstall() {
    if (!event) return false
    await event.prompt()
    setEvent(null)
    return true
  }

  return { canInstall: Boolean(event), promptInstall }
}
