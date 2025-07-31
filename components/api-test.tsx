"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ApiTest() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({ error: 'API test failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>API Test</CardTitle>
        <CardDescription>Test the API endpoints</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={testApi} disabled={loading}>
          {loading ? 'Testing...' : 'Test API'}
        </Button>
        {results && (
          <pre className="mt-4 p-2 bg-gray-100 rounded text-sm">
            {JSON.stringify(results, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}
