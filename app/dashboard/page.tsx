"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, RefreshCw, Users, DollarSign, Heart, TrendingUp } from "lucide-react"
import { useDashboardStats } from "@/hooks/use-api-data"
import { DashboardStatsSkeleton } from "@/components/ui/loading-skeleton"
import Image from "next/image"

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const { data: stats, loading, error, refetch } = useDashboardStats()

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

  // Default stats structure
  const defaultStats = {
    totalMembers: 0,
    subscriptionRevenue: 0,
    totalDonations: 0,
    activePayments: 0
  }

  const currentStats = stats || defaultStats

  // Debug logging
  console.log('Dashboard stats:', stats)
  console.log('Current stats:', currentStats)
  console.log('Total Members:', currentStats.totalMembers)
  console.log('Subscription Revenue:', currentStats.subscriptionRevenue)
  console.log('Total Donations:', currentStats.totalDonations)
  console.log('Active Payments:', currentStats.activePayments)

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Dashboard Welcome Section */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <Image
                    src="/EYEA_Logo_01_Color.png"
                    alt="EYEA Logo"
                    width={32}
                    height={32}
                    className="object-contain lg:w-8 lg:h-8"
                  />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-base lg:text-lg text-gray-600 font-medium">Welcome back, Admin</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
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
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex-1 lg:flex-none lg:px-6 lg:py-3 lg:text-base"
              >
                <RefreshCw className={`h-4 w-4 lg:h-5 lg:w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
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
              <span className="text-sm font-medium">Error loading dashboard data: {error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Statistics */}
      {loading ? (
        <DashboardStatsSkeleton />
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Members</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-gray-900">
                {(currentStats.totalMembers || 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">Across all membership levels</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Subscription Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-gray-900">
                ₦{(currentStats.subscriptionRevenue || 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">From successful payments</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Donations</CardTitle>
              <Heart className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-gray-900">
                ₦{(currentStats.totalDonations || 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">From generous donors</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Active Payments</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-gray-900">
                {(currentStats.activePayments || 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-600">Successful payments this period</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity Placeholder */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 lg:py-12">
            <div className="text-gray-400 mb-2">
              <TrendingUp className="h-8 w-8 lg:h-12 lg:w-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-sm lg:text-base">Recent activity will be displayed here</p>
            <p className="text-xs lg:text-sm text-gray-400 mt-1">Real-time updates from your organization</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
