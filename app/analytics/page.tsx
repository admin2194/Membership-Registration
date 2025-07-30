"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Menu, RefreshCw, LogOut, DollarSign, Users, CreditCard, Heart } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { apiClient } from "@/lib/api"

export default function AnalyticsPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        <div className="lg:hidden p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Analytics</h1>
            <div className="w-8" />
          </div>
        </div>

        <div className="container mx-auto p-6 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-lg text-gray-600 font-medium">Comprehensive data insights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="lg" className="bg-white/70 backdrop-blur-sm">
                <RefreshCw className="h-5 w-5 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="lg" onClick={handleLogout} className="bg-gradient-to-r from-red-50 to-pink-50">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Total Revenue</CardTitle>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">0 ETB</div>
                <p className="text-xs text-gray-600">From 0 transactions</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Total Members</CardTitle>
                <Users className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <p className="text-xs text-gray-600">Active community members</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Subscription Payments</CardTitle>
                <CreditCard className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <p className="text-xs text-gray-600">Monthly subscriptions</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-semibold text-gray-700">Total Donations</CardTitle>
                <Heart className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">0</div>
                <p className="text-xs text-gray-600">Charitable contributions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 