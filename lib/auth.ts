import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }), 
  emailAndPassword: {
    enabled: true,
    autoSignIn: false

  },
 
});