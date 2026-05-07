import type { AchievementDef } from '@/types'

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'first_climb', name: '初次尝试', description: '完成第1次爬楼记录', icon: '🎯' },
  { id: 'streak_7', name: '坚持不懈', description: '连续7天有爬楼记录', icon: '🔥' },
  { id: 'monthly_30', name: '月度达人', description: '单月累计30趟', icon: '⭐' },
  { id: 'speed_star', name: '速度之星', description: '某次爬楼速度 ≤ 15秒/层', icon: '⚡' },
  { id: 'hundred_floors', name: '百层挑战', description: '单次爬楼累计 ≥ 100层', icon: '🏔️' },
  { id: 'rank_1', name: '排行榜首', description: '任意榜单获得第1名', icon: '👑' },
]

export const getAchievementById = (id: string): AchievementDef | undefined =>
  ACHIEVEMENTS.find((a) => a.id === id)
