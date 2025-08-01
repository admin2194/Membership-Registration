"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, RefreshCw, Crown, TrendingUp, BarChart3, PieChart, Activity } from "lucide-react"
import { ReportsSkeleton } from "@/components/ui/loading-skeleton"

export default function ReportsPage() {
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
      {/* Reports Header */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  <FileText className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    Reports
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
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>Report Management</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <Download className="h-5 w-5 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <p className="text-xs text-gray-600">Generated this month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Downloaded</CardTitle>
            <Download className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">156</div>
            <p className="text-xs text-gray-600">Times this month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-600">Auto-generated reports</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Trending</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+12%</div>
            <p className="text-xs text-gray-600">From last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Monthly Revenue Report", icon: TrendingUp, downloads: 45 },
              { title: "Member Growth Report", icon: Crown, downloads: 32 },
              { title: "Payment Analytics", icon: FileText, downloads: 28 },
              { title: "Donation Summary", icon: FileText, downloads: 19 },
              { title: "System Performance", icon: TrendingUp, downloads: 15 },
              { title: "User Activity Report", icon: Crown, downloads: 12 }
            ].map((report, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <report.icon className="h-5 w-5 text-gray-600" />
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                <p className="text-sm text-gray-600">{report.downloads} downloads</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 