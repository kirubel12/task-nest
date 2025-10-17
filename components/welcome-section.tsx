"use client"
import { useSession } from "@/lib/auth-client"
export function WelcomeSection() {
  const { data: session } = useSession()
  const username = session?.user?.name
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-foreground">Welcome back, {username}</h2>
      <p className="mt-2 text-muted-foreground">Here's what's happening with your projects today</p>
    </div>
  )
}
