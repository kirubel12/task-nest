import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { createAuthMiddleware } from "better-auth/api";
import { twoFactor, username } from "better-auth/plugins"

export const auth = betterAuth({
  appName: "Task Nest",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-here",
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }), 
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  plugins: [ 
    username(),
    twoFactor({
      issuer: "Task Nest",
      skipVerificationOnEnable: false // Require verification before enabling
    })
  ] 
});