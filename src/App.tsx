'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const API_BASE_URL = 'https://localhost:7132/' // Replace with your actual backend URL

export default function GoogleLogin() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
          credentials: 'include' // This is important for sending cookies
        })
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error('Error checking login status:', error)
      }
    }

    checkLoginStatus()
  }, [])

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google-login`
  }

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      setUser(null)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Google Authentication</CardTitle>
        <CardDescription>Sign in with your Google account</CardDescription>
      </CardHeader>
      <CardContent>
        {user ? (
          <div className="space-y-4">
            <p className="text-center">Welcome, {user.email}!</p>
            <Button onClick={handleLogout} className="w-full">
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={handleGoogleLogin} className="w-full">
            Sign in with Google
          </Button>
        )}
      </CardContent>
    </Card>
  )
}