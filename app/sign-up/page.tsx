import { Header } from "@/components/Header"
import { SignupForm } from "@/components/signup-form"
import { redirectIfAuthenticated } from "@/lib/auth-server"

// Force dynamic rendering since we use headers() for authentication
export const dynamic = 'force-dynamic'

export default async function SignUpPage() {
  // Redirect to home if user is already authenticated
  await redirectIfAuthenticated("/")
  
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
