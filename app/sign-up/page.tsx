"use client"

import { Header } from "@/components/Header"
import { SignupForm } from "@/components/signup-form"

export default function SignUpPage() {
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
