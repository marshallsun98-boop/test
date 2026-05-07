import React, { useState, useMemo } from 'react'
import { useAppStore } from '@/stores/appStore'
import { PageHeader } from '@/components/layout/PageHeader'
import { RecordCard } from '@/components/RecordCard'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

export const History: React.FC = () => {
  const myRecords = useAppStore((s) => s.myRecords)
  const deleteRecord = useAppStore((s) => s.deleteRecord)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const months = useMemo(() => {
    const map = new Map<string, number>()
    myRecords.forEach((r) => {
      const d = new Date(r.createdAt)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      map.set(key, (map.get(key) || 0) + 1)
    })
    return Array.from(map.entries()).map(([key, count]) => {
      const [year, month] = key.split('-').map(Number)
      return { key, label: `${year}年${month + 1}月`, count }
    })
  }, [myRecords])

  const [selectedMonth, setSelectedMonth] = useState<string>('all')

  const filteredRecords = useMemo(() => {
    if (selectedMonth === 'all') return myRecords
    return myRecords.filter((r) => {
      const d = new Date(r.createdAt)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      return key === selectedMonth
    })
  }, [myRecords, selectedMonth])

  const handleDelete = () => {
    if (deleteId) {
      deleteRecord(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <div>
      <PageHeader title="📋 历史记录" subtitle={`共 ${myRecords.length} 条记录`} />

      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedMonth('all')}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
              selectedMonth === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            全部
          </button>
          {months.map((m) => (
            <button
              key={m.key}
              onClick={() => setSelectedMonth(m.key)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                selectedMonth === m.key
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {m.label} ({m.count})
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="text-center text-gray-400 py-12">暂无记录</div>
        ) : (
          filteredRecords.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onDelete={(id) => setDeleteId(id)}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="确认删除"
      >
        <p className="text-gray-600 mb-4">确定要删除这条记录吗？此操作不可撤销。</p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setDeleteId(null)}>
            取消
          </Button>
          <Button variant="danger" fullWidth onClick={handleDelete}>
            删除
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default History
