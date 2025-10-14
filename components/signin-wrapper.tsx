"use client"

import { Suspense } from "react"
import { SignInForm } from "./signin-form"

function SignInFormWithParams() {
  return <SignInForm />
}

export function SignInWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInFormWithParams />
    </Suspense>
  )
}
