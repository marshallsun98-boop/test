import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, ClimbRecord } from '@/types'
import { checkAchievements } from '@/utils/achievements'

export interface AppState {
  profile: UserProfile | null
  myRecords: ClimbRecord[]
  importedRecords: ClimbRecord[]
  achievements: string[]

  setProfile: (profile: UserProfile) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  addRecord: (record: ClimbRecord) => string[]
  deleteRecord: (id: string) => void
  importRecords: (records: ClimbRecord[]) => number
  getAllRecords: () => ClimbRecord[]
  getAllUniqueUsers: () => { userId: string; nickname: string; avatar: string }[]
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      profile: null,
      myRecords: [],
      importedRecords: [],
      achievements: [],

      setProfile: (profile) => set({ profile }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),

      addRecord: (record) => {
        const state = get()
        const newRecords = [record, ...state.myRecords]
        const newAchievements = checkAchievements(newRecords, state.achievements)
        set({
          myRecords: newRecords,
          achievements: [...state.achievements, ...newAchievements],
        })
        return newAchievements
      },

      deleteRecord: (id) =>
        set((state) => ({
          myRecords: state.myRecords.filter((r) => r.id !== id),
        })),

      importRecords: (records) => {
        const state = get()
        const existingIds = new Set(state.importedRecords.map((r) => r.id))
        const newRecords = records.filter((r) => !existingIds.has(r.id))
        if (newRecords.length === 0) return 0
        set({
          importedRecords: [...state.importedRecords, ...newRecords],
        })
        return newRecords.length
      },

      getAllRecords: () => {
        const state = get()
        const map = new Map<string, ClimbRecord>()
        ;[...state.myRecords, ...state.importedRecords].forEach((r) => {
          map.set(r.id, r)
        })
        return Array.from(map.values())
      },

      getAllUniqueUsers: () => {
        const records = get().getAllRecords()
        const map = new Map<string, { userId: string; nickname: string; avatar: string }>()
        records.forEach((r) => {
          if (!map.has(r.userId)) {
            map.set(r.userId, {
              userId: r.userId,
              nickname: r.userNickname,
              avatar: r.userAvatar,
            })
          }
        })
        return Array.from(map.values())
      },
    }),
    {
      name: 'plgogogo_v1',
    }
  )
)
