import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

function AppRoutes() {
  const profile = useAppStore((s) => s.profile)
  const location = useLocation()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // 等待 Zustand persist 从 localStorage 恢复数据
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  // 未就绪时显示加载中
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🏃‍♂️</div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  // 未创建角色且不在 onboarding/import 页面时，强制跳转
  const publicPaths = ['/onboarding', '/import']
  if (!profile && !publicPaths.includes(location.pathname)) {
    return <Navigate to="/onboarding" replace />
  }

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

export default AppRoutes
