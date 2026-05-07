import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/appStore'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsSection } from './StatsSection'
import { RecentRecords } from './RecentRecords'
import { ClimbCalendar } from '@/components/ClimbCalendar'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const profile = useAppStore((s) => s.profile)
  const myRecords = useAppStore((s) => s.myRecords)

  const now = new Date()

  if (!profile) {
    navigate('/onboarding')
    return null
  }

  return (
    <div>
      <PageHeader
        title={`${profile.avatar} ${profile.nickname}`}
        subtitle="今天也要加油爬楼！"
      />

      <StatsSection records={myRecords} />

      <div className="px-4 mt-6">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate('/climbing')}
          className="py-4 text-xl"
        >
          🚀 开爬！
        </Button>
      </div>

      <div className="mt-6 px-4">
        <ClimbCalendar
          records={myRecords}
          year={now.getFullYear()}
          month={now.getMonth()}
        />
      </div>

      <div className="mt-6">
        <RecentRecords records={myRecords} />
      </div>
    </div>
  )
}

export default Home
