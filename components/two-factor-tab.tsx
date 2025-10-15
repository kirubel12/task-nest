"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
import { Shield, Smartphone, Check, Copy } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"

interface TwoFactorTabProps {
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
}

export function TwoFactorTab({ isEnabled, onToggle }: TwoFactorTabProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showSetup, setShowSetup] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  // Mock QR code and secret key
  const secretKey = "JBSWY3DPEHPK3PXP"
  const qrCodeUrl = `/placeholder.svg?height=200&width=200&query=qr+code+authentication`

  const handleToggle2FA = async () => {
    if (isEnabled) {
      // Disable 2FA
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
      onToggle(false)
      toast.success("2FA disabled")
    } else {
      // Show setup process
      setShowSetup(true)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (verificationCode.length !== 6) {
      toast.error("Invalid code")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    onToggle(true)
    setShowSetup(false)
    setVerificationCode("")

    toast.success("2FA enabled")
  }

  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey)
    toast.success("Copied")
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          Two-Factor Authentication
          {isEnabled && (
            <span className="flex items-center gap-1 text-sm font-normal text-success">
              <Check className="h-4 w-4" />
              Enabled
            </span>
          )}
        </CardTitle>
        <CardDescription>Add an extra layer of security to your account</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Two-factor authentication adds an additional layer of security by requiring a verification code from your
            phone when signing in.
          </AlertDescription>
        </Alert>

        {!showSetup ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Smartphone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">
                    {isEnabled ? "Currently protecting your account" : "Use an app like Google Authenticator or Authy"}
                  </p>
                </div>
              </div>
              <Switch checked={isEnabled} onCheckedChange={handleToggle2FA} disabled={isLoading} />
            </div>

            {isEnabled && (
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <h4 className="font-medium text-sm">Backup Codes</h4>
                  <p className="text-sm text-muted-foreground">
                    Save these backup codes in a secure place. You can use them to access your account if you lose your
                    phone.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    View Backup Codes
                  </Button>
                </div>

                <Button variant="destructive" onClick={handleToggle2FA} disabled={isLoading}>
                  {isLoading ? "Disabling..." : "Disable 2FA"}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4 p-6 border border-border rounded-lg">
                <h4 className="font-medium">Scan QR Code</h4>
                <div className="p-4 bg-white rounded-lg">
                  <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code for 2FA setup" className="h-48 w-48" />
                </div>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Or enter this key manually</Label>
                <div className="flex gap-2">
                  <Input value={secretKey} readOnly className="font-mono text-sm" />
                  <Button type="button" variant="outline" size="icon" onClick={copySecretKey}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Enter Verification Code</Label>
                <Input
                  id="verification-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="text-center text-lg tracking-widest font-mono"
                />
                <p className="text-xs text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowSetup(false)
                    setVerificationCode("")
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading || verificationCode.length !== 6} className="flex-1">
                  {isLoading ? "Verifying..." : "Verify & Enable"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
