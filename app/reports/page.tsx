"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Menu, RefreshCw, LogOut, Download, BarChart3 } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function ReportsPage() {
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
            <h1 className="text-lg font-semibold text-gray-900">Reports</h1>
            <div className="w-8" />
          </div>
        </div>

        <div className="container mx-auto p-6 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Reports & Analytics
                </h1>
                <p className="text-lg text-gray-600 font-medium">Generate comprehensive reports</p>
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-800">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <span>Monthly Report</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Generate monthly performance reports</p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-800">
                  <FileText className="h-6 w-6 text-green-600" />
                  <span>Member Report</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Member statistics and growth</p>
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg font-bold text-gray-800">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  <span>Financial Report</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">Revenue and payment analysis</p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-800">
                <FileText className="h-6 w-6 text-gray-600" />
                <span>Recent Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 text-lg">No reports generated yet</p>
              <p className="text-gray-400 text-sm mt-2">Generated reports will appear here</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 