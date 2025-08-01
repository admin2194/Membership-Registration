"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Shield, Bell, User, Crown, RefreshCw } from "lucide-react"
import { SettingsSkeleton } from "@/components/ui/loading-skeleton"

export default function SettingsPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  if (!isAuthenticated || !user) {
    router.push("/")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="space-y-8">
      {/* Settings Header */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <Settings className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Settings
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">Welcome back, Admin</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System Online</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span>System Configuration</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">System Status</CardTitle>
            <Settings className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">Online</div>
            <p className="text-xs text-gray-600">All systems operational</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Security</CardTitle>
            <Shield className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">Protected</div>
            <p className="text-xs text-gray-600">Security measures active</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">Enabled</div>
            <p className="text-xs text-gray-600">All notifications active</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Last Updated</CardTitle>
            <Settings className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2 hours</div>
            <p className="text-xs text-gray-600">Ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Settings */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="h-5 w-5 mr-2 text-gray-600" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={user.fullName}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  defaultValue={user.email}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <input 
                  type="tel" 
                  defaultValue={user.phoneNumber || user.phone}
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                />
              </div>
            </div>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-gray-600" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <input 
                  type="password" 
                  placeholder="Enter current password"
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password"
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm new password"
                  className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
                />
              </div>
            </div>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-gray-600" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Weekly Reports</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gray-600" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400">
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Timezone</label>
                <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400">
                  <option>UTC+1 (Central European Time)</option>
                  <option>UTC+0 (Greenwich Mean Time)</option>
                  <option>UTC-5 (Eastern Time)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Theme</label>
                <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Auto</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
              Apply Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 