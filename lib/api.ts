// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use the current origin to determine API URL
    const currentOrigin = window.location.origin
    
    // Development environment
    if (currentOrigin.includes('localhost:3000')) {
      return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1'
    }
    
    // Production environment - EYEA domain
    if (currentOrigin.includes('apieyeamembership.eyea.et')) {
      // Use the same domain for API (assuming backend is on same domain)
      return `${currentOrigin}/v1`
    }
    
    // Staging or other environments
    return process.env.NEXT_PUBLIC_API_URL || `${currentOrigin}/v1`
  }
  
  // Server-side: use environment variable
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1'
}

const API_BASE_URL = getApiBaseUrl()

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    // Add CORS headers for cross-origin requests
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    }

    const response = await fetch(url, {
      headers,
      credentials: 'include', // Include cookies for CORS
      mode: 'cors', // Explicitly set CORS mode
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async sso(fullName: string, phoneNumber: string) {
    return this.request('/auth/sso', {
      method: 'POST',
      body: JSON.stringify({ fullName, phoneNumber }),
    })
  }

  async fetchMembershipLevels() {
    return this.request('/membership/levels', {
      method: 'GET',
    })
  }

  async fetchSubscriptionPayments() {
    return this.request('/payments', {
      method: 'GET',
    })
  }

  async fetchDonationHistory() {
    return this.request('/donations', {
      method: 'GET',
    })
  }

  async fetchMembers() {
    return this.request('/membership', {
      method: 'GET',
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
