import { motion } from 'motion/react'
import { NavLink, Outlet } from 'react-router-dom'
import { Activity, BrainCircuit, Dumbbell, LayoutDashboard, Plus, Wrench } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useInstallPrompt } from '../hooks/useInstallPrompt'

const navItems = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/workouts', label: 'Workouts', icon: Dumbbell },
  { to: '/plans', label: 'Plans', icon: Plus, featured: true },
  { to: '/library', label: 'Library', icon: Activity },
  { to: '/tools', label: 'Tools', icon: Wrench },
]

export function AppShell() {
  const { canInstall, promptInstall } = useInstallPrompt()

  return (
    <div className="app-shell">
      <div className="reference-stage" />
      <div className="device-shell">
        <div className="device-frame">
          <div className="device-notch" />
          <header className="device-topbar">
            <div className="device-topmeta">
              <span className="device-clock">9:41</span>
              <span className="desktop-header-copy">Gym tracking and recovery dashboard</span>
            </div>
            <div className="device-actions">
              <button className="mini-icon-button" type="button" onClick={canInstall ? promptInstall : undefined}>
                <BrainCircuit size={16} />
              </button>
              <div className="theme-toggle-mobile">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="main-panel">
            <Outlet />
          </main>

          <nav className="desktop-bottom-nav">
            {navItems.map(({ to, label, icon: Icon, featured }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `desktop-bottom-link${isActive ? ' active' : ''}${featured ? ' desktop-bottom-link-featured' : ''}`}>
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.div
                        layoutId="desktop-bottom-indicator"
                        className="desktop-bottom-indicator"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    ) : null}
                    <div className="desktop-bottom-icon">
                      <Icon size={featured ? 22 : 20} />
                    </div>
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <nav className="mobile-tabs mobile-tabs-static">
            {navItems.map(({ to, label, icon: Icon, featured }) => (
              <NavLink key={to} className={({ isActive }) => `mobile-tab${isActive ? ' active' : ''}${featured ? ' mobile-tab-featured' : ''}`} to={to}>
                {({ isActive }) => (
                  <>
                    {!featured && isActive ? (
                      <motion.div
                        layoutId="mobile-nav-bar"
                        className="mobile-active-bar"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    ) : null}
                    <motion.div
                      className="mobile-tab-icon"
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.16 }}
                    >
                      <Icon size={featured ? 22 : 18} />
                    </motion.div>
                    {!featured ? <span>{label}</span> : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
