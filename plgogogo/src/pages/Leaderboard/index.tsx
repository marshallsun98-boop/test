import React, { useState, useMemo } from 'react'
import { useAppStore } from '@/stores/appStore'
import { PageHeader } from '@/components/layout/PageHeader'
import { LeaderboardTable } from '@/components/LeaderboardTable'
import type { LeaderboardType, LeaderboardEntry } from '@/types'

const TABS: { key: LeaderboardType; label: string; valueLabel: string }[] = [
  { key: 'totalLaps', label: '总趟数', valueLabel: '趟' },
  { key: 'totalFloors', label: '总层数', valueLabel: '层' },
  { key: 'speed', label: '速度', valueLabel: '秒/层' },
  { key: 'monthlyActive', label: '本月活跃', valueLabel: '天' },
]

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('totalLaps')
  const profile = useAppStore((s) => s.profile)
  const getAllRecords = useAppStore((s) => s.getAllRecords)
  const getAllUniqueUsers = useAppStore((s) => s.getAllUniqueUsers)

  const records = getAllRecords()
  const users = getAllUniqueUsers()

  const entries = useMemo<LeaderboardEntry[]>(() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    const userStats = users.map((user) => {
      const userRecords = records.filter((r) => r.userId === user.userId)

      let value = 0
      switch (activeTab) {
        case 'totalLaps':
          value = userRecords.reduce((sum, r) => sum + r.laps, 0)
          break
        case 'totalFloors':
          value = userRecords.reduce((sum, r) => sum + r.totalFloors, 0)
          break
        case 'speed':
          if (userRecords.length >= 3) {
            const totalDuration = userRecords.reduce((sum, r) => sum + r.duration, 0)
            const totalFloors = userRecords.reduce((sum, r) => sum + r.totalFloors, 0)
            value = totalFloors > 0 ? Math.round(totalDuration / totalFloors) : 0
          } else {
            value = Infinity
          }
          break
        case 'monthlyActive': {
          const monthRecords = userRecords.filter((r) => {
            const d = new Date(r.createdAt)
            return d.getFullYear() === currentYear && d.getMonth() === currentMonth
          })
          const days = new Set(monthRecords.map((r) => {
            const d = new Date(r.createdAt)
            return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
          }))
          value = days.size
          break
        }
      }

      return {
        userId: user.userId,
        nickname: user.nickname,
        avatar: user.avatar,
        value,
        rank: 0,
      }
    })

    const sorted = userStats
      .filter((u) => (activeTab === 'speed' ? u.value !== Infinity : u.value > 0))
      .sort((a, b) => {
        if (activeTab === 'speed') {
          return a.value - b.value
        }
        return b.value - a.value
      })

    return sorted.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))
  }, [activeTab, records, users])

  const currentUserId = profile?.id || ''
  const activeTabConfig = TABS.find((t) => t.key === activeTab)!

  return (
    <div>
      <PageHeader title="🏆 排行榜" />

      <div className="px-4 mb-4">
        <div className="flex bg-white rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <LeaderboardTable
          entries={entries}
          currentUserId={currentUserId}
          valueLabel={activeTabConfig.valueLabel}
          valueFormatter={
            activeTab === 'speed'
              ? (v) => `${v}秒/层`
              : undefined
          }
        />
      </div>
    </div>
  )
}

export default Leaderboard
