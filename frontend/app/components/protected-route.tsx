"use client"

import type React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "hooks/use-auth"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return

    if (!isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, [isAuthenticated, loading, navigate])
  
  if (loading) {
     return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
