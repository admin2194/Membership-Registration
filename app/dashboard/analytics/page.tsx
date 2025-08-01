"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, RefreshCw, TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react"
import { useAnalyticsData } from "@/hooks/use-api-data"
import { AnalyticsSkeleton } from "@/components/ui/loading-skeleton"

export default function AnalyticsPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const { data: analytics, loading, error, refetch } = useAnalyticsData()

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

  // Default analytics structure
  const defaultAnalytics = {
    totalRevenue: 0,
    activeMembers: 0,
    growthRate: 0,
    engagement: 0,
    revenueTrends: [],
    memberGrowth: []
  }

  const currentAnalytics = analytics || defaultAnalytics

  // Debug logging
  console.log('Analytics data:', analytics)
  console.log('Current analytics:', currentAnalytics)
  console.log('Total Revenue:', currentAnalytics.totalRevenue)
  console.log('Active Members:', currentAnalytics.activeMembers)
  console.log('Growth Rate:', currentAnalytics.growthRate)
  console.log('Engagement:', currentAnalytics.engagement)

  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Analytics
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
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span>Real-time Analytics</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleRefresh}
                disabled={loading}
                className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh'}
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
              <span className="text-sm font-medium">Error loading analytics data: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `₦${(currentAnalytics.totalRevenue || 0).toLocaleString()}`}
            </div>
            <p className="text-xs text-gray-600">From subscriptions & donations</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Active Members</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : (currentAnalytics.activeMembers || 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Registered members</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `+${(currentAnalytics.growthRate || 0).toFixed(1)}%`}
            </div>
            <p className="text-xs text-gray-600">Member growth rate</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : `${(currentAnalytics.engagement || 0).toFixed(1)}%`}
            </div>
            <p className="text-xs text-gray-600">Member engagement rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                  <p className="text-gray-500">Loading chart data...</p>
                </div>
              ) : currentAnalytics.revenueTrends && currentAnalytics.revenueTrends.length > 0 ? (
                <p className="text-gray-500">Chart data available</p>
              ) : (
                <p className="text-gray-500">No revenue trend data available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Member Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                  <p className="text-gray-500">Loading chart data...</p>
                </div>
              ) : currentAnalytics.memberGrowth && currentAnalytics.memberGrowth.length > 0 ? (
                <p className="text-gray-500">Chart data available</p>
              ) : (
                <p className="text-gray-500">No member growth data available</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 