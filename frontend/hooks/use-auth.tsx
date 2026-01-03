"use client"

import type React from "react"
import { useState, useEffect, createContext, useContext } from "react"
import api from "../lib/api"

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("access_token")
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await api.get<User>("/api/v1/auth/me")
        setUser(res.data)
      } catch (err) {
        localStorage.removeItem("access_token")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  /**
   * LOGIN
   */
  const login = async (email: string, password: string) => {
    const res = await api.post("/api/v1/auth/login", {
      email,
      password,
    })

    const { access_token } = res.data
    localStorage.setItem("access_token", access_token)

    const me = await api.get<User>("/api/v1/auth/me")
    setUser(me.data)
  }

  /**
   * REGISTER
   */
  const register = async (name: string, email: string, password: string) => {
    const res = await api.post("/api/v1/auth/register", {
      name,
      email,
      password,
    })

    const { access_token } = res.data
    localStorage.setItem("access_token", access_token)

    const me = await api.get<User>("/api/v1/auth/me")
    setUser(me.data)
  }

  /**
   * LOGOUT
   */
  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout")
    } catch {
      // ignore backend logout errors
    } finally {
      localStorage.removeItem("access_token")
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}