import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/appStore'
import { decodeShareData } from '@/utils/share'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Toast } from '@/components/ui/Toast'

export const Import: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const profile = useAppStore((s) => s.profile)
  const importRecords = useAppStore((s) => s.importRecords)

  const [payload, setPayload] = useState<ReturnType<typeof decodeShareData>>(null)
  const [imported, setImported] = useState(false)
  const [count, setCount] = useState(0)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const data = searchParams.get('d')
    if (data) {
      const decoded = decodeShareData(data)
      setPayload(decoded)
    }
  }, [searchParams])

  const handleImport = () => {
    if (!payload || payload.records.length === 0) return
    const importedCount = importRecords(payload.records)
    setCount(importedCount)
    setImported(true)
    if (importedCount > 0) {
      setShowToast(true)
    }
  }

  const handleSkip = () => {
    navigate('/')
  }

  if (!profile) {
    navigate('/onboarding')
    return null
  }

  if (!payload) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-xl font-bold mb-2">链接无效</h1>
          <p className="text-gray-500 mb-4">分享链接已损坏或过期</p>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    )
  }

  if (imported) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-xl font-bold mb-2">
            {count > 0 ? `成功导入 ${count} 条记录` : '记录已存在'}
          </h1>
          <p className="text-gray-500 mb-4">
            {count > 0
              ? `${payload.from} 的爬楼记录已添加到你的排行榜中`
              : '这些记录你已经导入过了'}
          </p>
          <Button fullWidth onClick={() => navigate('/leaderboard')}>
            查看排行榜
          </Button>
          <Button variant="ghost" fullWidth onClick={() => navigate('/')} className="mt-2">
            返回首页
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">📥</div>
          <h1 className="text-xl font-bold mb-2">导入记录</h1>
          <p className="text-gray-500">
            <span className="font-medium text-gray-700">{payload.from}</span> 分享了{' '}
            {payload.records.length} 条爬楼记录
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {payload.records.slice(0, 3).map((record) => (
            <Card key={record.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </div>
                  <div className="font-medium">
                    {record.laps}趟 × {record.floorsPerLap}层
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary-600">
                    {Math.floor(record.duration / 60)}分{record.duration % 60}秒
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {payload.records.length > 3 && (
            <p className="text-center text-sm text-gray-400">
              还有 {payload.records.length - 3} 条记录...
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Button fullWidth onClick={handleImport}>
            导入到排行榜
          </Button>
          <Button variant="ghost" fullWidth onClick={handleSkip}>
            跳过
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Import
