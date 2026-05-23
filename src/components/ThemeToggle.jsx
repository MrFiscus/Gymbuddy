import { Moon, SunMedium } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export function ThemeToggle() {
  const { theme, setTheme } = useAppContext()
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
      <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
    </button>
  )
}
