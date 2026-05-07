import React from 'react'
import { useAppStore } from '@/stores/appStore'
import { PageHeader } from '@/components/layout/PageHeader'
import { AchievementBadge } from '@/components/AchievementBadge'
import { ACHIEVEMENTS } from '@/data/achievements'

export const Achievements: React.FC = () => {
  const achievements = useAppStore((s) => s.achievements)
  const myRecords = useAppStore((s) => s.myRecords)

  const unlockedCount = achievements.length
  const totalCount = ACHIEVEMENTS.length

  return (
    <div>
      <PageHeader
        title="🏅 成就墙"
        subtitle={`已解锁 ${unlockedCount}/${totalCount} 个成就`}
      />

      <div className="px-4 mb-4">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">解锁进度</span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round((unlockedCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            unlocked={achievements.includes(achievement.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Achievements
