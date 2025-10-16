import {createAuthClient} from "better-auth/react"
import { usernameClient, twoFactorClient } from "better-auth/client/plugins"

export const {signIn, signOut, signUp, useSession, changePassword, updateUser, twoFactor} = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
    plugins: [ 
        usernameClient(),
        twoFactorClient()
    ] 
})