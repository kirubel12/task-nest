"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileTab } from "@/components/profile-tab"
import { PasswordTab } from "@/components/password-tab"
import { TwoFactorTab } from "@/components/two-factor-tab"
import { User, Lock, Shield } from "lucide-react"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const [profileComplete, setProfileComplete] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-semibold">Account Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Manage your profile, security, and authentication preferences
          </DialogDescription>

          {/* Progress Section */}
         
        </DialogHeader>

        <Tabs defaultValue="profile" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="mx-6 mt-4 grid w-auto grid-cols-3 bg-muted/50">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Password</span>
            </TabsTrigger>
            <TabsTrigger value="2fa" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">2FA</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <TabsContent value="profile" className="mt-6">
              <ProfileTab isComplete={profileComplete} onComplete={setProfileComplete} />
            </TabsContent>

            <TabsContent value="password" className="mt-6">
              <PasswordTab isComplete={passwordUpdated} onComplete={setPasswordUpdated} />
            </TabsContent>

            <TabsContent value="2fa" className="mt-6">
              <TwoFactorTab isEnabled={twoFactorEnabled} onToggle={setTwoFactorEnabled} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
