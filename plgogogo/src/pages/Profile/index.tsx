import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/stores/appStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { AVATARS } from '@/data/avatars'
import { PageHeader } from '@/components/layout/PageHeader'

export const Profile: React.FC = () => {
  const navigate = useNavigate()
  const profile = useAppStore((s) => s.profile)
  const updateProfile = useAppStore((s) => s.updateProfile)
  const myRecords = useAppStore((s) => s.myRecords)
  const importedRecords = useAppStore((s) => s.importedRecords)

  const [isEditing, setIsEditing] = useState(false)
  const [nickname, setNickname] = useState(profile?.nickname || '')
  const [selectedAvatar, setSelectedAvatar] = useState(profile?.avatar || AVATARS[0])
  const [defaultFloors, setDefaultFloors] = useState(profile?.defaultFloors || 30)

  if (!profile) {
    navigate('/onboarding')
    return null
  }

  const handleSave = () => {
    if (nickname.trim().length >= 2 && nickname.trim().length <= 10) {
      updateProfile({
        nickname: nickname.trim(),
        avatar: selectedAvatar,
        defaultFloors,
      })
      setIsEditing(false)
    }
  }

  const handleExport = () => {
    const data = {
      profile,
      myRecords,
      importedRecords,
      exportAt: Date.now(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `plgogogo-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        alert(`备份文件包含 ${data.myRecords?.length || 0} 条记录`)
      } catch {
        alert('文件格式错误')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <PageHeader title="👤 我的" />

      <div className="px-4 space-y-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{profile.avatar}</div>
            <div className="flex-1">
              <div className="text-xl font-bold">{profile.nickname}</div>
              <div className="text-sm text-gray-500">
                默认 {profile.defaultFloors} 层/趟
              </div>
              <div className="text-xs text-gray-400 mt-1">
                已记录 {myRecords.length} 次 · 导入 {importedRecords.length} 条
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              编辑
            </Button>
          </div>
        </Card>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">数据管理</h3>
          <Button variant="secondary" fullWidth onClick={handleExport}>
            📥 导出备份
          </Button>
          <label className="block">
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            <Button variant="secondary" fullWidth className="cursor-pointer">
              📤 导入备份
            </Button>
          </label>
        </div>
      </div>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="编辑资料"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              头像
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={10}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              默认楼层数
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

          <Button fullWidth onClick={handleSave}>
            保存
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Profile
