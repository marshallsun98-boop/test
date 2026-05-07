import type { ClimbRecord } from '@/types'

export const checkAchievements = (
  records: ClimbRecord[],
  existingAchievements: string[]
): string[] => {
  const newAchievements: string[] = []

  if (!existingAchievements.includes('first_climb') && records.length >= 1) {
    newAchievements.push('first_climb')
  }

  if (!existingAchievements.includes('streak_7')) {
    const days = getConsecutiveDays(records)
    if (days >= 7) newAchievements.push('streak_7')
  }

  if (!existingAchievements.includes('monthly_30')) {
    const maxMonthly = getMaxMonthlyLaps(records)
    if (maxMonthly >= 30) newAchievements.push('monthly_30')
  }

  if (!existingAchievements.includes('speed_star')) {
    const hasSpeedStar = records.some((r) => r.duration / r.totalFloors <= 15)
    if (hasSpeedStar) newAchievements.push('speed_star')
  }

  if (!existingAchievements.includes('hundred_floors')) {
    const hasHundred = records.some((r) => r.totalFloors >= 100)
    if (hasHundred) newAchievements.push('hundred_floors')
  }

  return newAchievements
}

const getConsecutiveDays = (records: ClimbRecord[]): number => {
  if (records.length === 0) return 0
  const dates = [...new Set(records.map((r) => {
    const d = new Date(r.createdAt)
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
  }))].sort()

  let maxStreak = 1
  let currentStreak = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1].replace(/-/g, '/'))
    const curr = new Date(dates[i].replace(/-/g, '/'))
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    if (diff === 1) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
    }
  }
  return maxStreak
}

const getMaxMonthlyLaps = (records: ClimbRecord[]): number => {
  const monthly: Record<string, number> = {}
  records.forEach((r) => {
    const d = new Date(r.createdAt)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    monthly[key] = (monthly[key] || 0) + r.laps
  })
  return Math.max(0, ...Object.values(monthly))
}
