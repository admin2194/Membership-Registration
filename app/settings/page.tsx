"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { SettingsModal } from "@/components/settings-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { 
  User, 
  Shield, 
  Bell, 
  Database, 
  Settings as SettingsIcon,
  Key,
  Eye,
  Globe,
  Palette,
  Download
} from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  const settingsCategories = [
    {
      title: "Profile Settings",
      description: "Manage your personal information and profile details",
      icon: User,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      onClick: () => setIsSettingsModalOpen(true)
    },
    {
      title: "Security & Privacy",
      description: "Update password and manage security settings",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      onClick: () => setIsSettingsModalOpen(true)
    },
    {
      title: "Notifications",
      description: "Configure notification preferences and alerts",
      icon: Bell,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      onClick: () => setIsSettingsModalOpen(true)
    },
    {
      title: "System Preferences",
      description: "Language, theme, and system settings",
      icon: Database,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      onClick: () => setIsSettingsModalOpen(true)
    }
  ]

  const quickActions = [
    {
      title: "Export Data",
      description: "Download your data in various formats",
      icon: Download,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      title: "Privacy Policy",
      description: "Read our privacy policy and terms",
      icon: Eye,
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      title: "Language",
      description: "Change application language",
      icon: Globe,
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      title: "Theme",
      description: "Switch between light and dark themes",
      icon: Palette,
      color: "text-pink-600",
      bgColor: "bg-pink-100"
    }
  ]

  return (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        <Button 
          onClick={() => setIsSettingsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <SettingsIcon className="h-5 w-5 mr-2" />
          Open Settings
        </Button>
      </div>

      {/* User Profile Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <User className="h-6 w-6 text-blue-600" />
            <span>Account Overview</span>
          </CardTitle>
          <CardDescription>
            Your current account information and status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Full Name</Label>
              <p className="text-lg font-semibold text-gray-900">{user?.fullName || "Not set"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Email</Label>
              <p className="text-lg font-semibold text-gray-900">{user?.email || "Not set"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Phone</Label>
              <p className="text-lg font-semibold text-gray-900">{user?.phoneNumber || user?.phone || "Not set"}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Role</Label>
              <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role || "User"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsCategories.map((category, index) => (
            <Card 
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm"
              onClick={category.onClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm"
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {action.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Security Status */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <Shield className="h-6 w-6 text-green-600" />
            <span>Security Status</span>
          </CardTitle>
          <CardDescription>
            Your account security information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">Account Active</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-700">2FA Available</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-yellow-700">Last Login: Today</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  )
} 