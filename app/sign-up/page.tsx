"use client"

import { Header } from "@/components/Header"
import { SignupForm } from "@/components/signup-form"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default function SignUpPage() {
  const { data } = useSession()
  const router = useRouter()
  const isAuthenticated = data?.user !== null
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-lg">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
