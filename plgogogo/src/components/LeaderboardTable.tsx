import React from 'react'
import type { LeaderboardEntry } from '@/types'

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  currentUserId: string
  valueLabel: string
  valueFormatter?: (value: number) => string
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  currentUserId,
  valueLabel,
  valueFormatter = (v) => String(v),
}) => {
  const top10 = entries.slice(0, 10)
  const myEntry = entries.find((e) => e.userId === currentUserId)
  const myRank = myEntry ? entries.findIndex((e) => e.userId === currentUserId) + 1 : null

  return (
    <div className="space-y-2">
      {top10.map((entry) => (
        <div
          key={entry.userId}
          className={`flex items-center gap-3 p-3 rounded-xl ${
            entry.userId === currentUserId
              ? 'bg-primary-50 border border-primary-200'
              : 'bg-white'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              entry.rank === 1
                ? 'bg-yellow-100 text-yellow-700'
                : entry.rank === 2
                ? 'bg-gray-100 text-gray-700'
                : entry.rank === 3
                ? 'bg-orange-100 text-orange-700'
                : 'bg-gray-50 text-gray-500'
            }`}
          >
            {entry.rank}
          </div>
          <div className="text-2xl">{entry.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{entry.nickname}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary-600">
              {valueFormatter(entry.value)}
            </div>
            <div className="text-xs text-gray-400">{valueLabel}</div>
          </div>
        </div>
      ))}

      {myRank && myRank > 10 && myEntry && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 border border-primary-200 mt-4">
          <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center text-sm font-bold">
            {myRank}
          </div>
          <div className="text-2xl">{myEntry.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{myEntry.nickname}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary-600">
              {valueFormatter(myEntry.value)}
            </div>
            <div className="text-xs text-gray-400">{valueLabel}</div>
          </div>
        </div>
      )}
    </div>
  )
}
