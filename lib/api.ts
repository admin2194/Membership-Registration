"use client"

import { useAuth } from "./auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/v1"

class ApiClient {
  private getAuthHeader() {
    const token = useAuth.getState().token
    return token ? `Bearer ${token}` : ""
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.getAuthHeader()) {
      headers.Authorization = this.getAuthHeader()
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Authentication
  async sso(fullName: string, phoneNumber: string) {
    return this.makeRequest("/auth/sso", {
      method: "POST",
      headers: {
        "X-KEY": "test-api-key",
      },
      body: JSON.stringify({ fullName, phoneNumber }),
    })
  }

  async login(email: string, password: string) {
    return this.makeRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  // Membership
  async fetchMembershipLevels() {
    return this.makeRequest("/membership/levels")
  }

  async registerMembership(membershipData: any) {
    return this.makeRequest("/membership/register", {
      method: "POST",
      body: JSON.stringify(membershipData),
    })
  }

  // Payments
  async fetchSubscriptionPayments() {
    return this.makeRequest("/payments/subscriptions")
  }

  // Donations
  async fetchDonationHistory() {
    return this.makeRequest("/donation/history")
  }

  async submitDonation(donationData: any) {
    return this.makeRequest("/donation", {
      method: "POST",
      body: JSON.stringify(donationData),
    })
  }

  // Members (if needed)
  async fetchMembers() {
    return this.makeRequest("/users")
  }
}

export const apiClient = new ApiClient()
