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
import { twoFactor, useSession } from "@/lib/auth-client"
import QRCode from "react-qr-code"

interface TwoFactorTabProps {
  onToggle?: (enabled: boolean) => void
}

export function TwoFactorTab({ onToggle }: TwoFactorTabProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showSetup, setShowSetup] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [password, setPassword] = useState("")
  const [totpUri, setTotpUri] = useState("")
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const { data: session } = useSession()
  
  // Get 2FA status from user session
  const isEnabled = session?.user?.twoFactorEnabled ?? false

  const handleDisable2FA = async () => {
    // Disable 2FA - need password confirmation
    if (!password) {
      toast.error("Please enter your password to disable 2FA")
      return
    }
    
    setIsLoading(true)
    toast.dismiss()
    
    const { data, error } = await twoFactor.disable({
      password
    })
    
    if (error) {
      toast.error(error.message || "Failed to disable 2FA")
    } else {
      toast.success("2FA disabled successfully")
      onToggle?.(false)
      setPassword("")
    }
    setIsLoading(false)
  }

  const handleToggle2FA = async (shouldEnable: boolean) => {
    if (shouldEnable && !isEnabled) {
      // User wants to enable 2FA
      handleEnable2FA()
    } else if (!shouldEnable && isEnabled) {
      // User wants to disable 2FA
      handleDisable2FA()
    }
    // If the state is already what the user wants, do nothing
  }

  const handleEnable2FA = async () => {
    if (!password) {
      toast.error("Please enter your password to enable 2FA")
      return
    }

    // Check if user is authenticated
    if (!session?.user) {
      toast.error("You must be signed in to enable 2FA")
      return
    }
    
    setIsLoading(true)
    toast.dismiss()
    
    try {
      console.log("Attempting to enable 2FA for user:", session.user.email)
      console.log("Password provided:", !!password)
      
      // Remove issuer since it's optional and defaults to appName
      const { data, error } = await twoFactor.enable({
        password
      })
      
      console.log("2FA Enable Response:", { data, error })
      
      if (error) {
        console.error("2FA Enable Error Details:", {
          message: error.message,
          code: error.code,
          status: error.status,
          fullError: error
        })
        toast.error(error.message || "Failed to enable 2FA. Please check your password.")
        setIsLoading(false)
        return
      }
      
      if (data) {
        console.log("2FA Enable Success:", data)
        setTotpUri(data.totpURI)
        setBackupCodes(data.backupCodes)
        setShowSetup(true)
        toast.success("2FA setup initiated. Please scan the QR code.")
      }
    } catch (err) {
      console.error("2FA Enable Exception:", err)
      toast.error("An unexpected error occurred. Please try again.")
    }
    
    setIsLoading(false)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code")
      return
    }

    setIsLoading(true)
    toast.dismiss()
    
    const { data, error } = await twoFactor.verifyTotp({
      code: verificationCode,
      trustDevice: true
    })
    
    if (error) {
      toast.error(error.message || "Invalid verification code")
    } else {
      toast.success("2FA enabled successfully!")
      onToggle?.(true)
      setShowSetup(false)
      setVerificationCode("")
      setPassword("")
      setTotpUri("")
    }
    
    setIsLoading(false)
  }

  const copyBackupCodes = () => {
    const codesText = backupCodes.join("\n")
    navigator.clipboard.writeText(codesText)
    toast.success("Backup codes copied to clipboard")
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
            <div className="space-y-4">
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
                <Switch 
                  checked={isEnabled} 
                  onCheckedChange={handleToggle2FA}
                  disabled={isLoading} 
                />
              </div>
              
              {!isEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                </div>
              )}
              
              {isEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="disable-password">Password (required to disable 2FA)</Label>
                  <Input
                    id="disable-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password to disable 2FA"
                    disabled={isLoading}
                  />
                </div>
              )}
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

                <Button variant="destructive" onClick={handleDisable2FA} disabled={isLoading}>
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
                  {totpUri ? (
                    <QRCode value={totpUri} size={192} />
                  ) : (
                    <div className="h-48 w-48 bg-gray-200 rounded flex items-center justify-center">
                      <p className="text-sm text-gray-500">QR Code will appear here</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </p>
              </div>

              {backupCodes.length > 0 && (
                <div className="space-y-2">
                  <Label>Backup Codes (Save these securely!)</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                      {backupCodes.map((code, index) => (
                        <div key={index} className="p-1">{code}</div>
                      ))}
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={copyBackupCodes}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Backup Codes
                  </Button>
                </div>
              )}
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
