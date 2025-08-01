"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
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
  Plus,
  User,
  Mail,
  Phone,
  Shield
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { AddMemberModal } from "./add-member-modal"
import { ProfileModal } from "./profile-modal"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('dashboard')
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

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
      href: '/dashboard/analytics'
    },
    {
      id: 'members',
      label: 'Members',
      icon: Users,
      href: '/dashboard/members'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      href: '/dashboard/payments'
    },
    {
      id: 'donations',
      label: 'Donations',
      icon: Heart,
      href: '/dashboard/donations'
    },
    // {
    //   id: 'reports',
    //   label: 'Reports',
    //   icon: FileText,
    //   href: '/dashboard/reports'
    // },
    // {
    //   id: 'notifications',
    //   label: 'Notifications',
    //   icon: Bell,
    //   href: '/dashboard/notifications'
    // },
    // {
    //   id: 'settings',
    //   label: 'Settings',
    //   icon: Settings,
    //   href: '/dashboard/settings'
    // }
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleNavigation = (href: string, id: string) => {
    setActiveItem(id)
    router.push(href)
    // Close sidebar on mobile after navigation
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onToggle()
    }
  }

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/EYEA_Logo_01_Color.png"
                  alt="EYEA Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-gray-900">EYEA</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.href, item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${activeItem === item.id 
                        ? 'bg-gray-900 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Mobile Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div 
              className="group relative cursor-pointer"
              onClick={() => setIsProfileModalOpen(true)}
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.fullName?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.fullName || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
              </div>
              
              {/* Mobile Hover Tooltip */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <span>{user?.fullName || 'Admin User'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3 w-3" />
                    <span>{user?.email || 'admin@example.com'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3" />
                    <span>{user?.phoneNumber || user?.phone || 'No phone'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3" />
                    <span>{user?.role || 'Admin'}</span>
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>

            {/* Mobile Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full mt-3 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-white lg:shadow-xl">
        <div className="flex flex-col h-full">
          {/* Desktop Header */}
          <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="/EYEA_Logo_01_Color.png"
                alt="EYEA Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EYEA</h1>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.href, item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${activeItem === item.id 
                        ? 'bg-gray-900 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Desktop Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div 
              className="group relative cursor-pointer"
              onClick={() => setIsProfileModalOpen(true)}
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.fullName?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.fullName || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
              </div>
              
              {/* Desktop Hover Tooltip */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-nowrap">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <span>{user?.fullName || 'Admin User'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-3 w-3" />
                    <span>{user?.email || 'admin@example.com'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3" />
                    <span>{user?.phoneNumber || user?.phone || 'No phone'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3" />
                    <span>{user?.role || 'Admin'}</span>
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </div>

            {/* Desktop Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full mt-3 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={false}
        onClose={() => {}}
        onSuccess={() => {}}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  )
} 