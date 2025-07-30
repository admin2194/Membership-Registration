"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiClient } from "@/lib/api"

export function ApiTest() {
  const [testResults, setTestResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const runTests = async () => {
    setIsLoading(true)
    const results: any = {}

    try {
      // Test 1: Basic API connection
      try {
        const response = await fetch("http://apieyeamembership.eyea.et/v1")
        results.basicConnection = response.ok ? "✅ Success" : "❌ Failed"
      } catch (error) {
        results.basicConnection = "❌ Failed"
      }

      // Test 2: Admin Login
      try {
        const loginData = await apiClient.login("admin@eyea.com", "admin123")
        results.adminLogin = loginData.access_token ? "✅ Success" : "❌ Failed"
      } catch (error) {
        results.adminLogin = "❌ Failed"
      }

      // Test 3: SSO Login
      try {
        const ssoData = await apiClient.sso("Test User", "251742219814")
        results.ssoLogin = ssoData.token ? "✅ Success" : "❌ Failed"
      } catch (error) {
        results.ssoLogin = "❌ Failed"
      }

      // Test 4: Membership Levels
      try {
        const levelsData = await apiClient.fetchMembershipLevels()
        results.membershipLevels = Array.isArray(levelsData) ? "✅ Success" : "❌ Failed"
      } catch (error) {
        results.membershipLevels = "❌ Failed"
      }

      // Test 5: Donation History
      try {
        const donationsData = await apiClient.fetchDonationHistory()
        results.donationHistory = Array.isArray(donationsData) ? "✅ Success" : "❌ Failed"
      } catch (error) {
        results.donationHistory = "❌ Failed"
      }

    } catch (error) {
      console.error("Test error:", error)
    } finally {
      setIsLoading(false)
      setTestResults(results)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>API Integration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runTests} disabled={isLoading} className="w-full">
          {isLoading ? "Running Tests..." : "Run API Tests"}
        </Button>
        
        {Object.keys(testResults).length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Test Results:</h3>
            {Object.entries(testResults).map(([test, result]) => (
              <div key={test} className="flex justify-between">
                <span className="capitalize">{test.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span>{String(result)}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
