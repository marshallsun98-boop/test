import React from 'react'
import type { ClimbRecord } from '@/types'
import { formatDateTime, formatDuration } from '@/utils/date'
import { Card } from '@/components/ui/Card'
import { Trash2 } from 'lucide-react'

interface RecordCardProps {
  record: ClimbRecord
  onDelete?: (id: string) => void
  showUser?: boolean
}

export const RecordCard: React.FC<RecordCardProps> = ({ record, onDelete, showUser }) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {showUser && (
              <>
                <span className="text-lg">{record.userAvatar}</span>
                <span className="text-sm text-gray-600">{record.userNickname}</span>
              </>
            )}
            <span className="text-xs text-gray-400">{formatDateTime(record.createdAt)}</span>
          </div>
          <div className="text-lg font-semibold mt-1">
            {record.laps}趟 × {record.floorsPerLap}层 = {record.totalFloors}层
          </div>
          <div className="text-xs text-gray-400">
            用时 {formatDuration(record.duration)} · {Math.round(record.duration / record.totalFloors)}秒/层
          </div>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(record.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </Card>
  )
}
