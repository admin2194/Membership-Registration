import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'

interface UseApiDataOptions {
  enabled?: boolean
  refetchInterval?: number
}

export function useApiData<T>(
  fetchFunction: () => Promise<T>,
  options: UseApiDataOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { enabled = true, refetchInterval } = options

  const fetchData = async () => {
    if (!enabled) return
    
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [enabled])

  useEffect(() => {
    if (!refetchInterval) return

    const interval = setInterval(fetchData, refetchInterval)
    return () => clearInterval(interval)
  }, [refetchInterval, enabled])

  const refetch = () => {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    refetch,
  }
}

// Specific hooks for different data types with proper fallbacks
export function useDashboardStats() {
  const result = useApiData(() => apiClient.getDashboardStats())
  
  console.log('useDashboardStats hook result:', result)
  console.log('useDashboardStats data:', result.data)
  console.log('useDashboardStats loading:', result.loading)
  console.log('useDashboardStats error:', result.error)
  
  return result
}

export function useAnalyticsData() {
  const result = useApiData(() => apiClient.getAnalyticsData())
  
  console.log('useAnalyticsData hook result:', result)
  console.log('useAnalyticsData data:', result.data)
  console.log('useAnalyticsData loading:', result.loading)
  console.log('useAnalyticsData error:', result.error)
  
  return result
}

export function useMembers(params?: { page?: number; limit?: number; search?: string }) {
  const result = useApiData(() => apiClient.fetchMembers(params))
  
  console.log('useMembers hook result:', result)
  console.log('useMembers data:', result.data)
  console.log('useMembers loading:', result.loading)
  console.log('useMembers error:', result.error)
  
  return result
}

export function useMembershipLevels() {
  return useApiData(() => apiClient.fetchMembershipLevels())
}

export function usePayments(params?: { page?: number; limit?: number; status?: string }) {
  return useApiData(() => apiClient.fetchSubscriptionPayments(params))
}

export function useDonations(params?: { page?: number; limit?: number; donor?: string }) {
  return useApiData(() => apiClient.fetchDonationHistory(params))
}

export function useNotifications(params?: { page?: number; limit?: number; unread?: boolean }) {
  return useApiData(() => apiClient.getNotifications(params))
}

export function useUserProfile() {
  return useApiData(() => apiClient.getUserProfile())
} 