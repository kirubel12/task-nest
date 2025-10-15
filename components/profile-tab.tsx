"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-toastify"
import { User, Mail, Check, Upload } from "lucide-react"
import { useSession, updateUser } from "@/lib/auth-client"

interface ProfileTabProps {
  isComplete: boolean
  onComplete: (complete: boolean) => void
}

export function ProfileTab({ isComplete, onComplete }: ProfileTabProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const { data: session } = useSession()
  const user = session?.user
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize form data with user data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  })

  // Update form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update user profile using Better Auth
      const { data, error } = await updateUser({
        name: formData.name,
        username: formData.username,
                // Note: email updates might need special handling in Better Auth
        // phone, location, bio might need to be added to your user schema
      })

      if (error) {
        toast.error(error.message || "Failed to update profile")
        return
      }

      setIsLoading(false)
      onComplete(true)
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error("Failed to update profile")
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB')
      return
    }

    setIsImageUploading(true)

    try {
      // Convert file to base64 or upload to your storage service
      // For this example, I'll convert to base64, but in production you should upload to a proper storage service
      const reader = new FileReader()
      
      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string
        
        try {
          // Update user image using Better Auth
          const { data, error } = await updateUser({
            image: imageUrl,
          })

          if (error) {
            toast.error(error.message || 'Failed to update profile image')
            return
          }

          toast.success('Profile image updated successfully')
        } catch (error) {
          console.error('Image update error:', error)
          toast.error('Failed to update profile image')
        } finally {
          setIsImageUploading(false)
        }
      }

      reader.onerror = () => {
        toast.error('Failed to read image file')
        setIsImageUploading(false)
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Failed to upload image')
      setIsImageUploading(false)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="flex items-center gap-2">
          Profile Information
          {isComplete && (
            <span className="flex items-center gap-1 text-sm font-normal text-success">
              <Check className="h-4 w-4" />
              Complete
            </span>
          )}
        </CardTitle>
        <CardDescription>Update your personal information and profile details</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleImageClick}>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="text-lg">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            {isImageUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleImageClick}
              disabled={isImageUploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isImageUploading ? "Uploading..." : "Change Photo"}
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Always show name field as it's a core field in Better Auth */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            {/* Always show username field as it's a core field in Better Auth */}
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            {/* Always show email field as it's a core field in Better Auth */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your.email@example.com"
                disabled // Email changes need special handling in Better Auth
              />
              <p className="text-xs text-muted-foreground">
                Email changes require verification. Contact support to change your email.
              </p>
            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
