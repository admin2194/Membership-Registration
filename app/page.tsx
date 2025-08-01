"use client"

import { AdminLoginForm } from "@/components/admin-login-form"
import Image from "next/image"

export default function Home() {
  return (
    <div className="h-screen bg-white relative overflow-hidden flex items-center justify-center">
      {/* Centered Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 flex flex-col items-center justify-center h-full">
        {/* Header with Logo */}
        <div className="flex flex-col items-center justify-center space-y-2 mb-6">
          <Image 
            src="/EYEA_Logo_01_Color.png" 
            alt="EYEA Organization" 
            width={240} 
            height={120}
            className="h-24 w-auto"
            priority
          />
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
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
