import React from 'react'
import { Outlet } from 'react-router-dom'
import TabNav from './TabNav'

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main className="max-w-md mx-auto">
        <Outlet />
      </main>
      <TabNav />
    </div>
  )
}

export default AppLayout
