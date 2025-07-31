"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, Eye, EyeOff, Loader2, Shield, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth"

export function AdminLoginForm() {
  const [email, setEmail] = useState("admin@eyea.org")
  const [password, setPassword] = useState("admin123")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { adminLogin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      await adminLogin(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="space-y-2 text-center pb-3">
        <div>
          <CardTitle className="text-xl font-bold" style={{ color: '#215ca3' }}>
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm mt-1 text-gray-600">
            Sign in to your admin dashboard
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs font-semibold text-gray-700 flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>Email Address</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="admin@eyea.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-9 bg-white/70 backdrop-blur-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200 transition-all duration-300 text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs font-semibold text-gray-700 flex items-center space-x-1">
              <Lock className="h-3 w-3" />
              <span>Password</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-9 bg-white/70 backdrop-blur-sm border-gray-200 focus:border-blue-300 focus:ring-blue-200 transition-all duration-300 pr-10 text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-3 w-3 text-gray-500" />
                ) : (
                  <Eye className="h-3 w-3 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 py-2">
              <AlertDescription className="text-red-700 text-xs">{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full h-9 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Shield className="mr-1 h-3 w-3" />
                Sign In
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-3 p-2 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex items-center space-x-1 mb-1">
            <Sparkles className="h-3 w-3 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">Default Credentials</span>
          </div>
          <div className="text-xs text-blue-600">
            <p><span className="font-medium">Email:</span> admin@eyea.org</p>
            <p><span className="font-medium">Password:</span> admin123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 