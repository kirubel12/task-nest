import { Header } from "@/components/Header"
import { SignInWrapper } from "@/components/signin-wrapper"
import { redirectIfAuthenticated } from "@/lib/auth-server"

export default async function SignInPage() {
  // Redirect to home if user is already authenticated
  await redirectIfAuthenticated("/")
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
        <div className="w-full max-w-lg">
          <SignInWrapper />
        </div>
      </div>
    </div>
  )
}