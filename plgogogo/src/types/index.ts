export interface UserProfile {
  id: string
  nickname: string
  avatar: string
  defaultFloors: number
  createdAt: number
}

export interface ClimbRecord {
  id: string
  userId: string
  userNickname: string
  userAvatar: string
  startTime: number
  endTime: number
  duration: number
  laps: number
  floorsPerLap: number
  totalFloors: number
  createdAt: number
}

export interface SharePayload {
  v: number
  records: ClimbRecord[]
  from: string
}

export interface AchievementDef {
  id: string
  name: string
  description: string
  icon: string
}

export type LeaderboardType = 'totalLaps' | 'totalFloors' | 'speed' | 'monthlyActive'

export interface LeaderboardEntry {
  userId: string
  nickname: string
  avatar: string
  value: number
  rank: number
}
