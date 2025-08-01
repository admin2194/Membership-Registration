"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth"

export function AuthInitializer() {
  const { initializeAuth } = useAuth()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return null
} 