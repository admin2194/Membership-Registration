"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apiClient } from "./api"

interface AuthState {
  token: string | null
  user: any | null
  isAuthenticated: boolean
  login: (fullName: string, phoneNumber: string) => Promise<boolean>
  adminLogin: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (fullName: string, phoneNumber: string) => {
        try {
          const data = await apiClient.sso(fullName, phoneNumber)

          if (data.status === "success" && data.token) {
            set({
              token: data.token,
              user: data.user,
              isAuthenticated: true,
            })
            return true
          } else {
            console.error("Invalid response format:", data)
            throw new Error("Invalid response from server")
          }
        } catch (error) {
          console.error("Login error:", error)
          return false
        }
      },
      adminLogin: async (email: string, password: string) => {
        try {
          const data = await apiClient.login(email, password)

          if (data.access_token) {
            set({
              token: data.access_token,
              user: data.user,
              isAuthenticated: true,
            })
            return true
          } else {
            console.error("Invalid response format:", data)
            throw new Error("Invalid response from server")
          }
        } catch (error) {
          console.error("Admin login error:", error)
          return false
        }
      },
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: "eyea-auth",
    },
  ),
)
