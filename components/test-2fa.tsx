"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
import { twoFactor, useSession, signIn } from "@/lib/auth-client"

export function Test2FA() {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [diagnostics, setDiagnostics] = useState<any>(null)
  const { data: session } = useSession()

  const runDiagnostics = async () => {
    if (!session?.user) {
      toast.error("Not authenticated")
      return
    }

    setIsLoading(true)
    
    try {
      // Check if user has accounts and what type
      const userInfo = {
        userId: session.user.id,
        email: session.user.email,
        name: session.user.name,
        sessionData: session
      }

      console.log("User diagnostics:", userInfo)
      setDiagnostics(userInfo)
      
      toast.success("Diagnostics completed - check console")
    } catch (err) {
      console.error("Diagnostics error:", err)
      toast.error("Diagnostics failed")
    }

    setIsLoading(false)
  }

  const testPassword = async () => {
    if (!password || !session?.user?.email) {
      toast.error("Please enter password and ensure you're logged in")
      return
    }

    setIsLoading(true)
    toast.dismiss()

    try {
      console.log("=== PASSWORD TEST ===")
      console.log("Testing password for:", session.user.email)
      
      // Try to sign in with the same credentials to verify password
      const result = await signIn.email({
        email: session.user.email,
        password: password.trim()
      })

      console.log("Password test result:", result)

      if (result.error) {
        console.error("Password verification failed:", result.error)
        toast.error("Password verification failed - this might be why 2FA fails")
      } else {
        console.log("Password verification successful")
        toast.success("Password is correct!")
      }
    } catch (err) {
      console.error("Password test exception:", err)
      toast.error("Password test failed")
    }

    setIsLoading(false)
  }

  const testEnable2FA = async () => {
    if (!password) {
      toast.error("Please enter password")
      return
    }

    if (!session?.user) {
      toast.error("Not authenticated")
      return
    }

    setIsLoading(true)
    toast.dismiss()

    try {
      console.log("=== 2FA ENABLE TEST ===")
      console.log("User ID:", session.user.id)
      console.log("User Email:", session.user.email)
      console.log("Password provided:", !!password)
      console.log("Password length:", password.length)
      console.log("Session:", session)

      const result = await twoFactor.enable({
        password: password.trim()
      })

      console.log("=== 2FA ENABLE RESULT ===")
      console.log("Full result:", result)
      console.log("Data:", result.data)
      console.log("Error:", result.error)

      if (result.error) {
        console.error("=== ERROR DETAILS ===")
        console.error("Message:", result.error.message)
        console.error("Status:", result.error.status)
        console.error("Code:", result.error.code)
        console.error("Full error object:", result.error)
        toast.error(`Error: ${result.error.message}`)
      } else if (result.data) {
        console.log("=== SUCCESS ===")
        console.log("Success data:", result.data)
        toast.success("2FA enabled successfully!")
      } else {
        console.log("=== UNEXPECTED ===")
        console.log("No data or error returned")
        toast.error("Unexpected response")
      }
    } catch (err) {
      console.error("=== EXCEPTION ===")
      console.error("Exception:", err)
      toast.error("Exception occurred")
    }

    setIsLoading(false)
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test 2FA Enable</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            User: {session?.user?.email || "Not authenticated"}
          </p>
          {diagnostics && (
            <div className="text-xs bg-muted p-2 rounded">
              <p>ID: {diagnostics.userId}</p>
              <p>Email: {diagnostics.email}</p>
            </div>
          )}
        </div>

        <Button 
          onClick={runDiagnostics} 
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          Run Diagnostics
        </Button>
        
        <div className="space-y-2">
          <Label htmlFor="test-password">Password</Label>
          <Input
            id="test-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={testPassword} 
            disabled={isLoading || !password}
            variant="outline"
          >
            Test Password
          </Button>
          
          <Button 
            onClick={testEnable2FA} 
            disabled={isLoading || !password}
          >
            Test 2FA
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
