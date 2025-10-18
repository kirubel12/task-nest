import { createAuthClient } from "better-auth/react"
import { usernameClient, twoFactorClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
    plugins: [ 
        usernameClient(),
        twoFactorClient()
    ],
    // Enable session caching for faster subsequent checks
    fetchOptions: {
        cache: "default"
    }
})

export const { signIn, signOut, signUp, useSession, changePassword, updateUser, twoFactor } = authClient

// Fast client-side authentication check using localStorage/sessionStorage
export function useAuthStatus() {
    const { data: session, isPending } = useSession()
    
    // Fast check: if we have a token in the session, user is authenticated
    const isAuthenticated = !!session?.session?.token
    
    return {
        isAuthenticated,
        isLoading: isPending,
        session,
        user: session?.user
    }
}