import React from 'react'
import type { AchievementDef } from '@/types'

interface AchievementBadgeProps {
  achievement: AchievementDef
  unlocked: boolean
  unlockedAt?: number
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  unlocked,
  unlockedAt,
}) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
        unlocked
          ? 'bg-white border-primary-200 shadow-sm'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      <div className={`text-4xl mb-2 ${unlocked ? '' : 'grayscale'}`}>
        {achievement.icon}
      </div>
      <div className="text-sm font-medium text-center">{achievement.name}</div>
      <div className="text-xs text-gray-500 text-center mt-1">
        {achievement.description}
      </div>
      {unlocked && unlockedAt && (
        <div className="text-xs text-primary-500 mt-2">
          {new Date(unlockedAt).toLocaleDateString()} 解锁
        </div>
      )}
    </div>
  )
}
