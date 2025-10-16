"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
import { Shield } from "lucide-react"
import { twoFactor } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

interface TwoFactorVerifyProps {
  onSuccess?: () => void
  redirectTo?: string
}

export function TwoFactorVerify({ onSuccess, redirectTo = "/" }: TwoFactorVerifyProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
      toast.success("Two-factor authentication completed successfully!")
      if (onSuccess) {
        router.push("/dashboard")
      } else {
        router.push(redirectTo)
      }
    }
    
    setIsLoading(false)
  }

  const handleSendOTP = async () => {
    setIsLoading(true)
    toast.dismiss()
    
    const { data, error } = await twoFactor.sendOtp({
      
    })
    
    if (error) {
      toast.error(error.message || "Failed to send OTP")
    } else {
      toast.success("OTP sent to your registered method")
    }
    
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Enter the verification code from your authenticator app or use an alternative method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input
              id="verification-code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="text-center text-lg tracking-widest font-mono"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground text-center">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have access to your authenticator app?
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              Send OTP to Email/Phone
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
