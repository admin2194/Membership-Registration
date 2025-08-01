"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogOut, RefreshCw, BarChart3, TrendingUp } from "lucide-react"

interface DashboardHeaderProps {
  onRefresh: () => void
  isRefreshing: boolean
  onLogout: () => void
}

export function DashboardHeader({ onRefresh, isRefreshing, onLogout }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-lg bg-white border border-gray-200 shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center">
            <Image 
              src="/EYEA_Logo_01_Color.png" 
              alt="EYEA Logo" 
              width={64} 
              height={64}
              className="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Dashboard
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
          onClick={onRefresh} 
          disabled={isRefreshing}
          className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
        >
          <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onLogout}
          className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
