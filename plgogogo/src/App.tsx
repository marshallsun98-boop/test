import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './stores/appStore'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Climbing from './pages/Climbing'
import RecordComplete from './pages/RecordComplete'
import Leaderboard from './pages/Leaderboard'
import History from './pages/History'
import Achievements from './pages/Achievements'
import Profile from './pages/Profile'
import Import from './pages/Import'

function App() {
  const profile = useAppStore((s) => s.profile)

  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/import" element={<Import />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/climbing" element={<Climbing />} />
      <Route path="/record-complete" element={<RecordComplete />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
