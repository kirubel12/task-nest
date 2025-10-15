"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
import { Lock, Eye, EyeOff, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { changePassword } from "@/lib/auth-client"

interface PasswordTabProps {
  isComplete: boolean
  onComplete: (complete: boolean) => void
}

export function PasswordTab({ isComplete, onComplete }: PasswordTabProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.length >= 12) strength += 25
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25
    if (/\d/.test(password)) strength += 12.5
    if (/[^a-zA-Z\d]/.test(password)) strength += 12.5
    return strength
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }))
    if (field === "new") {
      setPasswordStrength(calculatePasswordStrength(value))
    }
  }

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match")
      return
    }

    if (passwordStrength < 50) {
      toast.error("Password too weak. Please use a stronger password.")
      return
    }

    if (!passwords.current) {
      toast.error("Current password is required")
      return
    }

    setIsLoading(true)

    try {
      // Use Better Auth changePassword function
      const { data, error } = await changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new,
        revokeOtherSessions: true, // This is required by Better Auth
      })

      if (error) {
        toast.error(error.message || "Failed to change password")
        return
      }

      setIsLoading(false)
      onComplete(true)

      // Clear form
      setPasswords({ current: "", new: "", confirm: "" })
      setPasswordStrength(0)

      toast.success("Password updated successfully")
    } catch (error) {
      console.error("Password change error:", error)
      toast.error("Failed to change password")
      setIsLoading(false)
    }
  }

  const getStrengthColor = () => {
    if (passwordStrength < 25) return "bg-destructive"
    if (passwordStrength < 50) return "bg-orange-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-success"
  }

  const getStrengthLabel = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          Change Password
          {isComplete && (
            <span className="flex items-center gap-1 text-sm font-normal text-success">
              <Check className="h-4 w-4" />
              Updated
            </span>
          )}
        </CardTitle>
        <CardDescription>Ensure your account is using a strong password to stay secure</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your password must be at least 8 characters long and include uppercase, lowercase, numbers, and special
            characters.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPasswords.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => handlePasswordChange("current", e.target.value)}
                placeholder="Enter your current password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              New Password
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPasswords.new ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => handlePasswordChange("new", e.target.value)}
                placeholder="Enter your new password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwords.new && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Password strength</span>
                  <span className="font-medium">{getStrengthLabel()}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                placeholder="Confirm your new password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
