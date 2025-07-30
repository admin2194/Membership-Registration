"use client"

import { Button } from "@/components/ui/button"
import { LogOut, RefreshCw, BarChart3, TrendingUp } from "lucide-react"

interface DashboardHeaderProps {
  onRefresh: () => void
  isRefreshing: boolean
  onLogout: () => void
}

export function DashboardHeader({ onRefresh, isRefreshing, onLogout }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm border border-white/20 shadow-xl animate-in slide-in-from-top-4 duration-500">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              EYEA Dashboard
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
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span>Real-time Analytics</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onRefresh} 
          disabled={isRefreshing}
          className="bg-white/70 backdrop-blur-sm border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onLogout}
          className="bg-gradient-to-r from-red-50 to-pink-50 backdrop-blur-sm border-red-200 hover:bg-red-100 hover:border-red-300 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
