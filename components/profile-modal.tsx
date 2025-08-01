"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Phone, Shield, Edit, Save, X, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { apiClient } from "@/lib/api"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || user?.phone || '',
    role: user?.role || 'Admin'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }
  const validatePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) return 'All fields required.'
    if (passwordData.newPassword.length < 8) return 'New password must be at least 8 characters.'
    if (passwordData.newPassword !== passwordData.confirmPassword) return 'New passwords do not match.'
    if (passwordData.currentPassword === passwordData.newPassword) return 'New password must be different.'
    return null
  }
  const handleChangePassword = async () => {
    const error = validatePassword()
    if (error) { setMessage({ type: 'error', text: error }); return }
    setIsLoading(true)
    setMessage(null)
    try {
      // Call the real backend API
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      const result = await response.json();
      setMessage({ type: 'success', text: result.message || 'Password changed successfully!' })
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => { setIsChangingPassword(false); setMessage(null) }, 1200)
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to change password.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)
    
    try {
      // Here you would typically make an API call to update the user profile
      console.log('Saving profile:', formData)
      // await apiClient.updateProfile(formData)
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setIsEditing(false)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || user?.phone || '',
      role: user?.role || 'Admin'
    })
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setIsEditing(false)
    setIsChangingPassword(false)
    setMessage(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Management</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{message.text}</div>
          )}
          {/* Password Change Form */}
          {isChangingPassword && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input type={showCurrentPassword ? 'text' : 'password'} value={passwordData.currentPassword} onChange={e => handlePasswordChange('currentPassword', e.target.value)} placeholder="Current password" />
                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2" onClick={() => setShowCurrentPassword(v => !v)}>{showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <div className="relative">
                    <Input type={showNewPassword ? 'text' : 'password'} value={passwordData.newPassword} onChange={e => handlePasswordChange('newPassword', e.target.value)} placeholder="New password (min 8 chars)" />
                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2" onClick={() => setShowNewPassword(v => !v)}>{showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <div className="relative">
                    <Input type={showConfirmPassword ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={e => handlePasswordChange('confirmPassword', e.target.value)} placeholder="Confirm new password" />
                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2" onClick={() => setShowConfirmPassword(v => !v)}>{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="outline" onClick={() => { setIsChangingPassword(false); setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); setMessage(null) }} disabled={isLoading}><X className="h-4 w-4" />Cancel</Button>
                  <Button onClick={handleChangePassword} disabled={isLoading}>{isLoading ? 'Changing...' : 'Change Password'}</Button>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Profile Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
              <span className="text-2xl font-bold text-gray-700">
                {user?.fullName?.charAt(0) || 'A'}
              </span>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <User className="h-4 w-4" />
                    <span>Full Name</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Phone className="h-4 w-4" />
                    <span>Phone Number</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{formData.phoneNumber}</p>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Shield className="h-4 w-4" />
                    <span>Role</span>
                  </Label>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {formData.role}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Change Password Section */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    <Lock className="h-4 w-4" />
                    <span>Password</span>
                  </Label>
                  {!isChangingPassword && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChangingPassword(true)}
                      className="text-sm"
                    >
                      Change Password
                    </Button>
                  )}
                </div>

                {isChangingPassword && (
                  <div className="space-y-4 pt-2">
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

                    <div className="flex items-center space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsChangingPassword(false)
                          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                        }}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleChangePassword}
                        disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      >
                        {isLoading ? 'Changing...' : 'Change Password'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            {!isChangingPassword && (
              <Button variant="outline" onClick={() => setIsChangingPassword(true)} className="flex items-center space-x-2"><Lock className="h-4 w-4" /><span>Change Password</span></Button>
            )}
            {isEditing ? (
              <>
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
                  onClick={handleSave}
                  className="flex items-center space-x-2"
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 