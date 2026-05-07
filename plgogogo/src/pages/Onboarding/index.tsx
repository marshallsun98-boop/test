import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/appStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AVATARS } from '@/data/avatars'

export const Onboarding: React.FC = () => {
  const navigate = useNavigate()
  const setProfile = useAppStore((s) => s.setProfile)
  const [nickname, setNickname] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0])
  const [defaultFloors, setDefaultFloors] = useState(30)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!nickname.trim() || nickname.trim().length < 2) {
      setError('昵称至少需要2个字符')
      return
    }
    if (nickname.trim().length > 10) {
      setError('昵称不能超过10个字符')
      return
    }

    const profile = {
      id: crypto.randomUUID(),
      nickname: nickname.trim(),
      avatar: selectedAvatar,
      defaultFloors,
      createdAt: Date.now(),
    }

    setProfile(profile)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-md mx-auto w-full px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🏃‍♂️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">爬了么</h1>
          <p className="text-gray-500">记录每一次爬楼，挑战更好的自己</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择头像
            </label>
            <div className="grid grid-cols-8 gap-2">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-2xl p-1.5 rounded-lg transition-all ${
                    selectedAvatar === avatar
                      ? 'bg-primary-100 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="昵称"
            placeholder="输入你的昵称"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
              setError('')
            }}
            error={error}
            maxLength={10}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              默认楼层数（每趟）
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={50}
                value={defaultFloors}
                onChange={(e) => setDefaultFloors(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-semibold text-primary-600 w-12 text-right">
                {defaultFloors}
              </span>
            </div>
          </div>

          <Button fullWidth size="lg" onClick={handleSubmit} className="mt-4">
            开始爬楼
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
