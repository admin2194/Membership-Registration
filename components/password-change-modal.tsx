"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff, Save, X } from "lucide-react"

interface PasswordChangeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PasswordChangeModal({ isOpen, onClose }: PasswordChangeModalProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validatePassword = () => {
    if (passwordData.newPassword.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return 'New passwords do not match'
    }
    if (passwordData.currentPassword === passwordData.newPassword) {
      return 'New password must be different from current password'
    }
    return null
  }

  const handleChangePassword = async () => {
    const validationError = validatePassword()
    if (validationError) {
      setMessage({ type: 'error', text: validationError })
      return
    }

    setIsLoading(true)
    setMessage(null)
    
    try {
      // Here you would typically make an API call to change password
      console.log('Changing password:', { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
      // await apiClient.changePassword(passwordData.currentPassword, passwordData.newPassword)
      
      setMessage({ type: 'success', text: 'Password changed successfully!' })
      setTimeout(() => {
        onClose()
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setMessage(null)
      }, 1500)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please check your current password.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setMessage(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Change Password</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Message Display */}
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Password Form */}
          <div className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  placeholder="Enter new password (min 8 characters)"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Confirm New Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-gray-100"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex items-center space-x-2"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
            <Button
              onClick={handleChangePassword}
              className="flex items-center space-x-2"
              disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Changing...' : 'Change Password'}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 