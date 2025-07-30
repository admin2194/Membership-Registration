"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { MembershipLevelsOverview } from "@/components/membership-levels-overview"
import { RecentPayments } from "@/components/recent-payments"
import { DonationHistory } from "@/components/donation-history"
import { MembersList } from "@/components/members-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, Crown, Sparkles, BarChart3, TrendingUp, Menu } from "lucide-react"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { apiClient } from "@/lib/api"

export default function DashboardPage() {
  const { user, token, isAuthenticated, logout } = useAuth()
  const [membershipLevels, setMembershipLevels] = useState([])
  const [subscriptionPayments, setSubscriptionPayments] = useState([])
  const [donationHistory, setDonationHistory] = useState([])
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push("/")
      return
    }
    
    fetchData()
  }, [isAuthenticated, token, router])

  const fetchData = async () => {
    try {
      setIsRefreshing(true)
      
      // Fetch all data in parallel
      const [levelsData, paymentsData, donationsData, membersData] = await Promise.allSettled([
        apiClient.fetchMembershipLevels(),
        apiClient.fetchSubscriptionPayments(),
        apiClient.fetchDonationHistory(),
        apiClient.fetchMembers(),
      ])

      // Handle successful responses
      if (levelsData.status === 'fulfilled') {
        setMembershipLevels(levelsData.value)
      }
      
      if (paymentsData.status === 'fulfilled') {
        setSubscriptionPayments(paymentsData.value)
      }
      
      if (donationsData.status === 'fulfilled') {
        setDonationHistory(donationsData.value)
      }
      
      if (membersData.status === 'fulfilled') {
        setMembers(membersData.value.users || [])
      }

    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-lg animate-pulse">Loading...</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-medium text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">EYEA Dashboard</h1>
            <div className="w-8" />
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 container mx-auto p-6 space-y-8">
          {/* Enhanced User Profile Card */}
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-blue-50/50 backdrop-blur-sm animate-in slide-in-from-top-4 duration-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <Crown className="h-6 w-6 mr-3 text-yellow-500" />
                {user.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-blue-100">
                  <div className="p-2 rounded-full bg-blue-100">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{user.fullName}</p>
                  </div>
                </div>
                
                {user.email && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-green-100">
                    <div className="p-2 rounded-full bg-green-100">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-purple-100">
                  <div className="p-2 rounded-full bg-purple-100">
                    <Phone className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{user.phoneNumber || user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/70 backdrop-blur-sm border border-orange-100">
                  <div className="p-2 rounded-full bg-orange-100">
                    <Sparkles className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Role</p>
                    <p className="font-semibold text-gray-900 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <DashboardHeader onRefresh={() => fetchData()} isRefreshing={isRefreshing} onLogout={handleLogout} />
          
          <div className="animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <DashboardStats
              membershipLevels={membershipLevels}
              subscriptionPayments={subscriptionPayments}
              donationHistory={donationHistory}
            />
          </div>

          {/* Analytics Dashboard */}
          <div className="animate-in slide-in-from-bottom-4 duration-700 delay-300">
            <AnalyticsDashboard
              membershipLevels={membershipLevels}
              subscriptionPayments={subscriptionPayments}
              donationHistory={donationHistory}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 animate-in slide-in-from-left-4 duration-700 delay-400">
            <MembershipLevelsOverview levels={membershipLevels} />
            <RecentPayments payments={subscriptionPayments} />
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 animate-in slide-in-from-right-4 duration-700 delay-500">
            <MembersList members={members} />
            <DonationHistory donations={donationHistory} />
          </div>
        </div>
      </div>
    </div>
  )
}
