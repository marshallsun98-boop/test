import { useState, useRef, useCallback, useEffect } from 'react'

interface TimerState {
  isRunning: boolean
  elapsed: number
  startTime: number | null
}

export const useTimer = () => {
  const [state, setState] = useState<TimerState>({
    isRunning: false,
    elapsed: 0,
    startTime: null,
  })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(() => {
    const now = Date.now()
    setState({
      isRunning: true,
      elapsed: 0,
      startTime: now,
    })
    intervalRef.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        elapsed: Math.floor((Date.now() - (prev.startTime || now)) / 1000),
      }))
    }, 1000)
  }, [])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState((prev) => ({
      ...prev,
      isRunning: false,
    }))
    return state.elapsed
  }, [state.elapsed])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    isRunning: state.isRunning,
    elapsed: state.elapsed,
    startTime: state.startTime,
    start,
    stop,
  }
}
