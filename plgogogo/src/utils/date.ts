export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const formatDate = (timestamp: number): string => {
  const d = new Date(timestamp)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

export const formatDateTime = (timestamp: number): string => {
  const d = new Date(timestamp)
  return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export const isSameDay = (a: number, b: number): boolean => {
  const da = new Date(a)
  const db = new Date(b)
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  )
}

export const getMonthDays = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate()
}

export const getMonthFirstDay = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay()
}
