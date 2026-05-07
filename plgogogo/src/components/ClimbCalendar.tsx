import React from 'react'
import type { ClimbRecord } from '@/types'
import { getMonthDays, getMonthFirstDay, isSameDay } from '@/utils/date'

interface ClimbCalendarProps {
  records: ClimbRecord[]
  year: number
  month: number
}

export const ClimbCalendar: React.FC<ClimbCalendarProps> = ({ records, year, month }) => {
  const days = getMonthDays(year, month)
  const firstDay = getMonthFirstDay(year, month)
  const today = new Date()

  const hasRecord = (day: number): boolean => {
    const date = new Date(year, month, day).getTime()
    return records.some((r) => isSameDay(r.createdAt, date))
  }

  const isToday = (day: number): boolean => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    )
  }

  return (
    <div className="bg-white rounded-xl p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        {year}年{month + 1}月
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-1">
        {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1
          const recorded = hasRecord(day)
          const todayFlag = isToday(day)
          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded-md text-xs ${
                recorded
                  ? 'bg-primary-500 text-white'
                  : todayFlag
                  ? 'ring-1 ring-primary-500 text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
