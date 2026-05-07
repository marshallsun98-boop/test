import React from 'react'
import type { ClimbRecord } from '@/types'

interface StatsSectionProps {
  records: ClimbRecord[]
}

export const StatsSection: React.FC<StatsSectionProps> = ({ records }) => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const monthRecords = records.filter((r) => {
    const d = new Date(r.createdAt)
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth
  })

  const monthLaps = monthRecords.reduce((sum, r) => sum + r.laps, 0)
  const monthFloors = monthRecords.reduce((sum, r) => sum + r.totalFloors, 0)
  const monthDuration = monthRecords.reduce((sum, r) => sum + r.duration, 0)

  const stats = [
    { label: '本月次数', value: monthRecords.length },
    { label: '本月层数', value: monthFloors },
    { label: '本月用时', value: `${Math.floor(monthDuration / 60)}分` },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 px-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
          <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
