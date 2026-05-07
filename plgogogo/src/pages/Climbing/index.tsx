import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTimer } from '@/hooks/useTimer'
import { Button } from '@/components/ui/Button'
import { formatDuration } from '@/utils/date'

export const Climbing: React.FC = () => {
  const navigate = useNavigate()
  const { isRunning, elapsed, startTime, start, stop } = useTimer()

  useEffect(() => {
    if (!isRunning && elapsed === 0) {
      start()
    }
  }, [])

  const handleStop = () => {
    const duration = stop()
    navigate('/record-complete', {
      state: { startTime, duration },
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-6">
      <div className="text-gray-400 text-sm mb-4">
        {startTime ? new Date(startTime).toLocaleTimeString() : ''}
      </div>

      <div className="text-8xl font-mono font-bold tracking-wider mb-2">
        {formatDuration(elapsed)}
      </div>

      <div className="text-gray-500 text-sm mb-16">
        正在计时...
      </div>

      <Button
        variant="danger"
        size="lg"
        fullWidth
        onClick={handleStop}
        className="py-4 text-xl max-w-xs"
      >
        ⏹️ 结束
      </Button>

      <p className="text-gray-600 text-xs mt-4">
        点击结束并输入爬楼数据
      </p>
    </div>
  )
}

export default Climbing
