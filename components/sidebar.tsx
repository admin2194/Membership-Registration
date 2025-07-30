"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Heart, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Crown,
  Home,
  TrendingUp,
  Activity,
  FileText,
  Bell,
  Plus
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { AddMemberModal } from "./add-member-modal"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('dashboard')

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/dashboard'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      href: '/analytics'
    },
    {
      id: 'members',
      label: 'Members',
      icon: Users,
      href: '/members'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      href: '/payments'
    },
    {
      id: 'donations',
      label: 'Donations',
      icon: Heart,
      href: '/donations'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      href: '/reports'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      href: '/notifications'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/settings'
    }
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleNavigation = (href: string, id: string) => {
    setActiveItem(id)
    router.push(href)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white to-blue-50/50 backdrop-blur-sm
        border-r border-gray-200 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EYEA
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.fullName?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.fullName || 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || user?.phoneNumber || 'admin@eyea.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeItem === item.id ? "default" : "ghost"}
                className={`
                  w-full justify-start h-12 px-4 rounded-xl transition-all duration-300
                  ${activeItem === item.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
                onClick={() => handleNavigation(item.href, item.id)}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start h-12 px-4 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
} 