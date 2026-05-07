import React from 'react'
import type { ClimbRecord } from '@/types'
import { formatDateTime, formatDuration } from '@/utils/date'
import { Card } from '@/components/ui/Card'

interface RecentRecordsProps {
  records: ClimbRecord[]
}

export const RecentRecords: React.FC<RecentRecordsProps> = ({ records }) => {
  const recent = records.slice(0, 3)

  if (recent.length === 0) {
    return (
      <div className="px-4">
        <Card className="text-center py-8 text-gray-400">
          还没有记录，快去爬楼吧！
        </Card>
      </div>
    )
  }

  return (
    <div className="px-4 space-y-3">
      <h2 className="text-sm font-medium text-gray-700">最近记录</h2>
      {recent.map((record) => (
        <Card key={record.id}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">{formatDateTime(record.createdAt)}</div>
              <div className="text-lg font-semibold mt-1">
                {record.laps}趟 × {record.floorsPerLap}层 = {record.totalFloors}层
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary-600">
                {formatDuration(record.duration)}
              </div>
              <div className="text-xs text-gray-400">
                {Math.round(record.duration / record.totalFloors)}秒/层
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
