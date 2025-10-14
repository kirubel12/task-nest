import {createAuthClient} from "better-auth/react"
import { usernameClient } from "better-auth/client/plugins"

export const {signIn, signOut, signUp, useSession} = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    plugins: [ 
        usernameClient() 
    ] 
})