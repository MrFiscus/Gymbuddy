import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AppProvider, useAppContext } from './context/AppContext'
import { AppShell } from './components/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { WorkoutPage } from './pages/WorkoutPage'
import { PlansPage } from './pages/PlansPage'
import { LibraryPage } from './pages/LibraryPage'
import { ExerciseDetailPage } from './pages/ExerciseDetailPage'
import { FormTracker } from './components/FormTracker'
import { ToolsPage } from './pages/ToolsPage'

function ThemedApp() {
  const { theme } = useAppContext()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
      >
        <Routes location={location}>
          <Route element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="/workouts" element={<WorkoutPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/:exerciseId" element={<ExerciseDetailPage />} />
            <Route path="/form-tracker" element={<FormTracker />} />
            <Route path="/tools" element={<ToolsPage />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ThemedApp />
      </BrowserRouter>
    </AppProvider>
  )
}
