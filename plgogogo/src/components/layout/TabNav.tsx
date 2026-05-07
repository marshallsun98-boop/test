import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Trophy, History, Award, User } from 'lucide-react'

const tabs = [
  { path: '/', label: '首页', icon: Home },
  { path: '/leaderboard', label: '排行', icon: Trophy },
  { path: '/history', label: '历史', icon: History },
  { path: '/achievements', label: '成就', icon: Award },
  { path: '/profile', label: '我的', icon: User },
]

export const TabNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-primary-500' : 'text-gray-400'
              }`
            }
          >
            <tab.icon size={20} />
            <span className="text-xs mt-0.5">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default TabNav
