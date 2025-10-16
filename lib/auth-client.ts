import {createAuthClient} from "better-auth/react"
import { usernameClient, twoFactorClient } from "better-auth/client/plugins"
import dotenv from "dotenv"
dotenv.config()
export const {signIn, signOut, signUp, useSession, changePassword, updateUser, twoFactor} = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    plugins: [ 
        usernameClient(),
        twoFactorClient()
    ] 
})