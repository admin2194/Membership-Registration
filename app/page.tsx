"use client"

import { AdminLoginForm } from "@/components/admin-login-form"
import Image from "next/image"

export default function Home() {
  return (
    <div className="h-screen bg-blue-50 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 flex flex-col items-center justify-center h-full">
        {/* Header with Logo */}
        <div className="flex flex-col items-center justify-center space-y-2 mb-6">
          <Image 
            src="/EYEA_Logo_01_Color.png" 
            alt="EYEA Organization" 
            width={160} 
            height={80}
            className="h-16 w-auto"
          />
          <div className="text-center">
            <h1 className="text-xl font-bold" style={{ color: '#215ca3' }}>
              Admin Portal
            </h1>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-sm">
          <AdminLoginForm />
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            © 2024 EYEA Organization. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
