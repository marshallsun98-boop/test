import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/appStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { formatDuration } from '@/utils/date'
import { buildShareUrl } from '@/utils/share'
import { Toast } from '@/components/ui/Toast'

interface LocationState {
  startTime: number
  duration: number
}

export const RecordComplete: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { startTime, duration } = (location.state as LocationState) || {}
  const profile = useAppStore((s) => s.profile)
  const addRecord = useAppStore((s) => s.addRecord)

  const [laps, setLaps] = useState(1)
  const [floorsPerLap, setFloorsPerLap] = useState(profile?.defaultFloors || 30)
  const [shareUrl, setShareUrl] = useState('')
  const [showToast, setShowToast] = useState(false)

  if (!profile || !startTime) {
    navigate('/')
    return null
  }

  const totalFloors = laps * floorsPerLap
  const speed = Math.round(duration / totalFloors)

  const handleSave = () => {
    const record = {
      id: crypto.randomUUID(),
      userId: profile.id,
      userNickname: profile.nickname,
      userAvatar: profile.avatar,
      startTime,
      endTime: startTime + duration * 1000,
      duration,
      laps,
      floorsPerLap,
      totalFloors,
      createdAt: Date.now(),
    }

    const newAchievements = addRecord(record)
    const url = buildShareUrl([record], profile.nickname)
    setShareUrl(url)

    if (newAchievements.length > 0) {
      setShowToast(true)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShowToast(true)
    } catch {
      const input = document.createElement('input')
      input.value = shareUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setShowToast(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">🎉 爬楼完成！</h1>

        <Card className="text-center mb-6">
          <div className="text-4xl font-bold text-primary-600 mb-1">
            {formatDuration(duration)}
          </div>
          <div className="text-sm text-gray-500">总用时</div>
        </Card>

        {!shareUrl ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                爬了几趟？
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLaps(Math.max(1, laps - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-xl"
                >
                  -
                </button>
                <span className="text-2xl font-bold flex-1 text-center">{laps}</span>
                <button
                  onClick={() => setLaps(laps + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-xl"
                >
                  +
                </button>
              </div>
            </div>

            <Input
              label="每趟楼层数"
              type="number"
              min={1}
              max={100}
              value={floorsPerLap}
              onChange={(e) => setFloorsPerLap(Number(e.target.value))}
            />

            <Card className="bg-primary-50 border-primary-200">
              <div className="text-center">
                <div className="text-sm text-gray-600">本次累计</div>
                <div className="text-3xl font-bold text-primary-700 mt-1">
                  {totalFloors} 层
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  约 {speed} 秒/层
                </div>
              </div>
            </Card>

            <Button fullWidth size="lg" onClick={handleSave}>
              保存记录
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="bg-green-50 border-green-200 text-center">
              <div className="text-green-600 font-medium mb-2">✅ 记录已保存</div>
              <div className="text-sm text-gray-600">
                {laps}趟 × {floorsPerLap}层 = {totalFloors}层
              </div>
            </Card>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分享链接（发到群里）
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50"
                />
                <Button onClick={handleCopy} className="whitespace-nowrap">
                  复制
                </Button>
              </div>
            </div>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => navigate('/')}
            >
              返回首页
            </Button>
          </div>
        )}
      </div>

      <Toast
        message={showToast ? '已复制到剪贴板！' : ''}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

export default RecordComplete
