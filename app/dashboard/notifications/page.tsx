"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, RefreshCw, Check, CheckCheck, Trash2, Filter } from "lucide-react"
import { useNotifications } from "@/hooks/use-api-data"
import { NotificationsSkeleton } from "@/components/ui/loading-skeleton"
import { apiClient } from "@/lib/api"

export default function NotificationsPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  
  const { data: notificationsData, loading, error, refetch } = useNotifications({
    page: currentPage,
    limit: 10,
    unread: showUnreadOnly ? true : undefined
  })

  if (!isAuthenticated || !user) {
    router.push("/")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleRefresh = () => {
    refetch()
  }

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await apiClient.markNotificationAsRead(notificationId)
      refetch()
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await apiClient.markAllNotificationsAsRead()
      refetch()
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  // Default notifications structure
  const defaultNotificationsData = {
    notifications: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    totalNotifications: 0,
    unread: 0,
    read: 0,
    priority: 0
  }

  const currentNotificationsData = notificationsData || defaultNotificationsData
  const { notifications, total, totalPages, totalNotifications, unread, read, priority } = currentNotificationsData

  return (
    <div className="space-y-8">
      {/* Notifications Header */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <Bell className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Notifications
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
                  <Bell className="h-4 w-4 text-gray-500" />
                  <span>Notification Center</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleMarkAllAsRead}
                disabled={loading}
                className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <Check className="h-5 w-5 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border border-red-200 bg-red-50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-700">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Error loading notifications data: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : totalNotifications || 0}
            </div>
            <p className="text-xs text-gray-600">This week</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Unread</CardTitle>
            <Bell className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : unread || 0}
            </div>
            <p className="text-xs text-gray-600">New notifications</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Read</CardTitle>
            <Check className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : read || 0}
            </div>
            <p className="text-xs text-gray-600">Viewed notifications</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Priority</CardTitle>
            <Bell className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : priority || 0}
            </div>
            <p className="text-xs text-gray-600">High priority alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Notifications</CardTitle>
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-600">Show unread only</span>
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          ) : notifications && notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification: any, index: number) => (
                <div key={notification._id || index} className={`p-4 border rounded-lg transition-colors ${
                  notification.read 
                    ? 'border-gray-100 bg-gray-50' 
                    : 'border-gray-200 bg-white'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${
                          notification.read ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        {notification.priority === 'high' && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        notification.read ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt || notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMarkAsRead(notification._id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications found</p>
              <p className="text-sm text-gray-400 mt-1">
                {showUnreadOnly ? 'All notifications have been read' : 'No notifications yet'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 